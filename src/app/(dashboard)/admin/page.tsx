
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import type { TimetableEntry, TimetableData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, FileSpreadsheet, XCircle } from 'lucide-react';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Timetable } from '@/components/shared/timetable';
import * as XLSX from 'xlsx';

const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];


export default function AdminDashboardPage() {
  const { timetables: timetableMetadatas, loading: metadataLoading, mutate: mutateMetadatas } = useTimetableData();
  const { setActiveTimetable } = useTimetables();
  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);

  const { timetable: activeTimetable, loading: timetableLoading, mutate: mutateTimetable } = useTimetableData(selectedTimetableId);

  useEffect(() => {
      if (activeTimetable) {
          setActiveTimetable(activeTimetable);
      }
  }, [activeTimetable, setActiveTimetable]);

  useEffect(() => {
    if (!metadataLoading && timetableMetadatas && timetableMetadatas.length > 0 && !selectedTimetableId) {
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
  
  const addTimetable = useCallback(async (name: string, year: string, entries: TimetableEntry[] = []): Promise<string | null> => {
    try {
      const newTimetable = { name: `${name} (${year})`, timetable: entries };
      const docRef = await addDoc(collection(db, "timetables"), newTimetable);
      toast({ title: "Timetable Created!", description: `The timetable for "${name} (${year})" has been created.` });
      mutateMetadatas();
      return docRef.id;
    } catch (error) {
      console.error("Error creating timetable: ", error);
      toast({ title: 'Error Creating Timetable', description: 'Could not save the new timetable to the database.', variant: 'destructive' });
      return null;
    }
  }, [toast, mutateMetadatas]);

  const deleteTimetable = useCallback(async (id: string) => {
    try {
      const timetableToDelete = timetableMetadatas?.find(t => t.id === id);
      await deleteDoc(doc(db, "timetables", id));
      toast({ title: "Timetable Deleted", description: `The timetable for "${timetableToDelete?.name}" has been deleted.`, variant: "destructive" });
      
      const updatedMetadatas = timetableMetadatas?.filter(t => t.id !== id) || [];
      mutateMetadatas(updatedMetadatas, false); // Optimistic update
      
      if (updatedMetadatas.length > 0) {
        setSelectedTimetableId(updatedMetadatas[0].id);
      } else {
        setSelectedTimetableId('');
      }
    } catch (error) {
      console.error("Error deleting timetable: ", error);
       toast({ title: 'Error Deleting Timetable', description: 'There was a problem deleting the timetable.', variant: 'destructive' });
       mutateMetadatas(); // Revalidate on error
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
          const conflictingLecturer = newLecturers.find(l => existingLecturers.includes(l));
          if (conflictingLecturer) {
            toast({ 
                variant: "destructive", 
                title: "Lecturer Conflict", 
                description: `${conflictingLecturer} is already scheduled for "${existingEntry.subject}" at ${existingEntry.time} on ${existingEntry.day}.` 
            });
            return true;
          }
        }
        
        if (newClass.room && existingEntry.room && newClass.room !== 'N/A' && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
          toast({ 
              variant: "destructive", 
              title: "Room/Lab Conflict", 
              description: `Room ${newClass.room} is already booked for "${existingEntry.subject}" at ${existingEntry.time} on ${existingEntry.day}.` 
          });
          return true;
        }

        if (newClass.type === 'Practical' && existingEntry.type === 'Practical' && newClass.batches && existingEntry.batches) {
           const conflictingBatch = newClass.batches.find(b => existingEntry.batches?.includes(b));
           if (conflictingBatch) {
             toast({ 
                 variant: "destructive", 
                 title: "Batch Conflict", 
                 description: `Batch ${conflictingBatch} is already scheduled for a practical ("${existingEntry.subject}") at ${existingEntry.time} on ${existingEntry.day}.` 
             });
             return true;
           }
        }
      }
    }
    return false;
  }, [toast]);
  
  const handleAddClass = useCallback(async (newClass: Omit<TimetableEntry, 'id'>) => {
    if (!activeTimetable || !selectedTimetableId) return;
    if (checkForConflicts(newClass, activeTimetable.timetable)) return;

    const newEntry: TimetableEntry = { ...newClass, id: `c${Date.now()}` };
    const updatedTimetable = [...activeTimetable.timetable, newEntry];

    try {
      mutateTimetable({ ...activeTimetable, timetable: updatedTimetable }, false);
      const timetableRef = doc(db, 'timetables', selectedTimetableId);
      await updateDoc(timetableRef, { timetable: updatedTimetable });
      toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
    } catch(e) {
      console.error("Failed to add class", e);
      toast({ title: 'Error Adding Class', description: 'Could not save the new class.', variant: 'destructive' });
      mutateTimetable();
    }
  }, [activeTimetable, selectedTimetableId, checkForConflicts, mutateTimetable, toast]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable || !selectedTimetableId) return;
    if (checkForConflicts(updatedClass, activeTimetable.timetable, updatedClass.id)) return;
    
    const updatedTimetable = activeTimetable.timetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry);

    try {
      mutateTimetable({ ...activeTimetable, timetable: updatedTimetable }, false);
      const timetableRef = doc(db, 'timetables', selectedTimetableId);
      await updateDoc(timetableRef, { timetable: updatedTimetable });
      closeEditDialog();
      toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
    } catch(e) {
      console.error("Failed to update class", e);
      toast({ title: 'Error Updating Class', description: 'Could not save the changes.', variant: 'destructive' });
      mutateTimetable();
    }
  }, [activeTimetable, selectedTimetableId, checkForConflicts, mutateTimetable, closeEditDialog, toast]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable || !selectedTimetableId) return;

    const classToDelete = activeTimetable.timetable.find(c => c.id === classId);
    const updatedTimetable = activeTimetable.timetable.filter(entry => entry.id !== classId);
    
    try {
      mutateTimetable({ ...activeTimetable, timetable: updatedTimetable }, false);
      const timetableRef = doc(db, 'timetables', selectedTimetableId);
      await updateDoc(timetableRef, { timetable: updatedTimetable });
      closeEditDialog();
      toast({ title: "Class Deleted", description: `"${classToDelete?.subject}" has been removed.`, variant: "destructive" });
    } catch(e) {
      console.error("Failed to delete class", e);
      toast({ title: 'Error Deleting Class', description: 'Could not remove the class.', variant: 'destructive' });
      mutateTimetable();
    }
  }, [activeTimetable, selectedTimetableId, mutateTimetable, closeEditDialog, toast]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
    toast({
      title: !isEditMode ? "Edit Mode Active" : "Edit Mode Deactivated",
      description: !isEditMode ? "Click on any class to modify it." : undefined,
      duration: 4000,
    });
  }, [isEditMode, toast]);

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable) return toast({ title: "Export Failed", variant: "destructive" });

    const grid = [
      ["Day/Time", ...TIME_SLOTS],
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    activeTimetable.timetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0) {
             const cellContent = [entry.subject, entry.lecturer, entry.room, entry.batches?.join(', ')].filter(Boolean).join('\n');
            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + i < grid[0].length) {
                    grid[dayIndex][timeIndex + i] = cellContent;
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    worksheet['!merges'] = [];
    activeTimetable.timetable.forEach(entry => {
      const dayIndex = DAYS.indexOf(entry.day) + 1;
      const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
      if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
          worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Master Timetable');
    XLSX.writeFile(workbook, `${activeTimetable.name}-Master-Timetable.xlsx`);
    toast({ title: "Export Successful" });
  }, [activeTimetable, toast]);

  const hasTimetables = timetableMetadatas && timetableMetadatas.length > 0;

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
        timetables={timetableMetadatas || []}
        selectedTimetableId={selectedTimetableId}
        onSelectTimetable={handleSelectTimetable}
        onCreateTimetable={addTimetable}
        onDeleteTimetable={deleteTimetable}
      />
     
     {hasTimetables ? (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Master Timetable</CardTitle>
                <CardDescription>Combined view of all classes. Add, edit, and manage timetable entries here.</CardDescription>
              </div>
               <div className="flex items-center justify-end gap-2 flex-wrap">
                  <Button variant="outline" onClick={handleExportSheet} disabled={!activeTimetable}>
                    <FileSpreadsheet />
                    Export as Sheet
                  </Button>
                  <AddClassDialog onAddClass={handleAddClass} />
                  <Button variant="outline" onClick={toggleEditMode}>
                    {isEditMode ? <XCircle /> : <Pencil />}
                    {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
                  </Button>
                </div>
            </CardHeader>
            <CardContent>
              {timetableLoading ? <Skeleton className="h-[600px] w-full" /> : 
                  <Timetable entries={activeTimetable?.timetable || []} view="admin" isEditMode={isEditMode} onEdit={openEditDialog} />
              }
            </CardContent>
          </Card>
      ) : (
          <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-2">No timetables found.</p>
            <p className="text-muted-foreground text-center">Create your first timetable using the button above.</p>
        </div>
      )}
      
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

    