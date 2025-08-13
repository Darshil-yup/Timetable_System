
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import type { TimetableEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { TimetableTabs } from '@/components/admin/timetable-tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';

const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));

export default function AdminDashboardPage() {
  const { timetables: timetableMetadatas, loading: metadataLoading, mutate: mutateMetadatas } = useTimetableData();
  const { activeTimetable, setActiveTimetable } = useTimetables();
  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);

  const { timetable: activeTimetableData, loading: timetableLoading, mutate: mutateTimetable } = useTimetableData(selectedTimetableId);

  useEffect(() => {
      if (activeTimetableData) {
          setActiveTimetable(activeTimetableData);
      }
  }, [activeTimetableData, setActiveTimetable]);

  useEffect(() => {
    if (!metadataLoading && timetableMetadatas.length > 0 && !selectedTimetableId) {
        setSelectedTimetableId(timetableMetadatas[0].id);
    }
  }, [timetableMetadatas, metadataLoading, selectedTimetableId]);

  const handleSelectTimetable = useCallback((id: string) => {
    setSelectedTimetableId(id);
    setIsEditMode(false);
    setSelectedClass(null);
  }, []);

  const openEditDialog = useCallback((entry: TimetableEntry) => {
    setSelectedClass(entry);
  }, []);

  const closeEditDialog = useCallback(() => {
    setSelectedClass(null);
  }, []);

  const updateActiveTimetable = useCallback(async (newTimetable: TimetableEntry[]) => {
      if (!selectedTimetableId) return;
      try {
        const timetableRef = doc(db, "timetables", selectedTimetableId);
        await updateDoc(timetableRef, { timetable: newTimetable });
        mutateTimetable(); // Revalidate the current timetable data
      } catch (error) {
         console.error("Error updating timetable entries: ", error);
         toast({ title: 'Error Updating Timetable', description: 'Could not save changes to the database.', variant: 'destructive' });
      }
  }, [selectedTimetableId, mutateTimetable, toast]);
  
  const addTimetable = useCallback(async (name: string, year: string, entries: TimetableEntry[] = []): Promise<string | null> => {
    try {
      const newTimetable = { name: `${name} (${year})`, timetable: entries };
      const docRef = await addDoc(collection(db, "timetables"), newTimetable);
      toast({ title: "Timetable Created!", description: `Timetable for "${newTimetable.name}" has been created.` });
      mutateMetadatas(); // Revalidate the list of timetables
      setSelectedTimetableId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating timetable: ", error);
      toast({ title: 'Error Creating Timetable', description: 'Could not save the new timetable to the database.', variant: 'destructive' });
      return null;
    }
  }, [toast, mutateMetadatas]);

  const deleteTimetable = useCallback(async (id: string) => {
    try {
      const timetableToDelete = timetableMetadatas.find(t => t.id === id);
      await deleteDoc(doc(db, "timetables", id));
      toast({ title: "Timetable Deleted", description: `The timetable for "${timetableToDelete?.name}" has been deleted.`, variant: "destructive" });
      mutateMetadatas(); // Revalidate the list of timetables
      setSelectedTimetableId(timetableMetadatas.length > 1 ? timetableMetadatas.filter(t => t.id !== id)[0].id : '');
    } catch (error) {
      console.error("Error deleting timetable: ", error);
       toast({ title: 'Error Deleting Timetable', description: 'There was a problem deleting the timetable.', variant: 'destructive' });
    }
  }, [toast, timetableMetadatas, mutateMetadatas]);


  const checkForConflicts = useCallback((newClass: Omit<TimetableEntry, 'id'>, existingTimetable: TimetableEntry[], updatingClassId?: string): boolean => {
    const newClassStartTime = parseInt(newClass.time.split(':')[0]);
    const newClassEndTime = newClassStartTime + (newClass.duration || 1);
  
    const timetableToCheck = existingTimetable.filter(entry => entry.id !== updatingClassId);

    for (const existingEntry of timetableToCheck) {
      if (existingEntry.day !== newClass.day || existingEntry.type === 'Recess' || newClass.type === 'Recess') {
        continue;
      }
      
      const existingStartTime = parseInt(existingEntry.time.split(':')[0]);
      const existingEndTime = existingStartTime + (existingEntry.duration || 1);

      const isOverlapping = newClassStartTime < existingEndTime && newClassEndTime > existingStartTime;

      if (isOverlapping) {
        if (newClass.lecturer && existingEntry.lecturer && newClass.lecturer !== 'N/A' && existingEntry.lecturer !== 'N/A') {
          const newLecturers = newClass.lecturer.split(',').map(l => l.trim());
          const existingLecturers = existingEntry.lecturer.split(',').map(l => l.trim());
          if (newLecturers.some(l => existingLecturers.includes(l))) {
            toast({ variant: "destructive", title: "Lecturer Conflict", description: `A lecturer is already scheduled for "${existingEntry.subject}" at this time.` });
            return true;
          }
        }
        
        if (newClass.room && existingEntry.room && newClass.room !== 'N/A' && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
          toast({ variant: "destructive", title: "Room/Lab Conflict", description: `Room ${newClass.room} is already booked for "${existingEntry.subject}" at this time.` });
          return true;
        }

        if (newClass.type === 'Practical' && existingEntry.type === 'Practical' && newClass.batches && existingEntry.batches) {
           if (newClass.batches.some(b => existingEntry.batches?.includes(b))) {
             toast({ variant: "destructive", title: "Batch Conflict", description: `A batch is already scheduled for a practical ("${existingEntry.subject}") at this time.` });
             return true;
           }
        }
      }
    }
    return false;
  }, [toast]);
  
  const handleAddClass = useCallback(async (newClass: Omit<TimetableEntry, 'id'>) => {
    if (!activeTimetable) return;
    if (checkForConflicts(newClass, activeTimetable.timetable)) return;

    const newEntry: TimetableEntry = { ...newClass, id: `c${Date.now()}` };
    await updateActiveTimetable([...activeTimetable.timetable, newEntry]);
    toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
  }, [activeTimetable, checkForConflicts, updateActiveTimetable, toast]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable) return;
    if (checkForConflicts(updatedClass, activeTimetable.timetable, updatedClass.id)) return;

    await updateActiveTimetable(activeTimetable.timetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry));
    closeEditDialog();
    toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
  }, [activeTimetable, checkForConflicts, updateActiveTimetable, closeEditDialog, toast]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable) return;
    await updateActiveTimetable(activeTimetable.timetable.filter(entry => entry.id !== classId));
    closeEditDialog();
    toast({ title: "Class Deleted", description: "The class has been removed.", variant: "destructive" });
  }, [activeTimetable, updateActiveTimetable, closeEditDialog, toast]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
    toast({
      title: !isEditMode ? "Edit Mode Active" : "Edit Mode Deactivated",
      description: !isEditMode ? "Click on any class to modify it." : undefined,
      duration: 4000,
    });
  }, [isEditMode, toast]);

  if (metadataLoading) {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <Skeleton className="h-10 w-full max-w-lg ml-auto" />
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }
  
  return (
    <div className="container mx-auto p-8">
      <TimetableSelector
        timetables={timetableMetadatas}
        selectedTimetableId={selectedTimetableId}
        onSelectTimetable={handleSelectTimetable}
        onCreateTimetable={addTimetable}
        onDeleteTimetable={deleteTimetable}
      />
     
      <TimetableTabs
        activeTimetable={activeTimetable}
        isLoading={timetableLoading}
        onAddClass={handleAddClass}
        isEditMode={isEditMode}
        onToggleEditMode={toggleEditMode}
        onEditClass={openEditDialog}
      />
      
      {selectedClass && (
        <EditClassDialog
            isOpen={!!selectedClass}
            onOpenChange={(isOpen) => !isOpen && closeEditDialog()}
            classEntry={selectedClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
        />
      )}
    </div>
  );
}
