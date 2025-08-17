
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import type { TimetableEntry, TimetableData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import { useTimetableData } from '@/hooks/use-timetable-data';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, FileSpreadsheet, XCircle } from 'lucide-react';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Timetable } from '@/components/shared/timetable';
import * as XLSX from 'xlsx';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, addDoc, deleteDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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

  const addTimetable = useCallback(async (name: string, year: string): Promise<string | null> => {
    try {
      const timetableName = `${name} (${year})`;
      const newTimetableRef = await addDoc(collection(db, "timetables"), {
        name: timetableName,
        timetable: []
      });
      await mutateMetadatas();
      setSelectedTimetableId(newTimetableRef.id);
      toast({ title: "Timetable Created!", description: `The timetable for "${timetableName}" has been created.` });
      return newTimetableRef.id;
    } catch (error) {
      console.error("Error creating timetable:", error);
      toast({ title: "Error", description: "Failed to create timetable.", variant: "destructive" });
      return null;
    }
  }, [mutateMetadatas, toast]);

  const deleteTimetable = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, "timetables", id);
      const docSnap = await getDoc(docRef);
      const timetableName = docSnap.exists() ? docSnap.data().name : "the timetable";

      await deleteDoc(docRef);
      
      const newMetadatas = timetableMetadatas?.filter(t => t.id !== id);
      mutateMetadatas(newMetadatas, false);

      toast({ title: "Timetable Deleted", description: `The timetable for "${timetableName}" has been deleted.`, variant: "destructive" });
      
      if (newMetadatas && newMetadatas.length > 0) {
        setSelectedTimetableId(newMetadatas[0].id);
      } else {
        setSelectedTimetableId('');
      }
    } catch (error) {
      console.error("Error deleting timetable:", error);
      toast({ title: "Error", description: "Failed to delete timetable.", variant: "destructive" });
    }
  }, [timetableMetadatas, mutateMetadatas, toast]);

  const checkForConflicts = useCallback((newClass: Omit<TimetableEntry, 'id'>, existingTimetable: TimetableEntry[], updatingClassId?: string): boolean => {
    const newClassStartTime = parseInt(newClass.time.split(':')[0]);
    const newClassEndTime = newClassStartTime + (newClass.duration || 1);
  
    const timetableToCheck = existingTimetable.filter(entry => entry.id !== updatingClassId);

    for (const existingEntry of timetableToCheck) {
      if (existingEntry.day !== newClass.day) continue;
      
      const existingStartTime = parseInt(existingEntry.time.split(':')[0]);
      const existingEndTime = existingStartTime + (existingEntry.duration || 1);

      const isOverlapping = newClassStartTime < existingEndTime && newClassEndTime > existingStartTime;

      if (isOverlapping) {
        if (newClass.lecturer && existingEntry.lecturer && newClass.lecturer !== 'N/A' && existingEntry.lecturer !== 'N/A' && newClass.lecturer === existingEntry.lecturer) {
            toast({ variant: "destructive", title: "Lecturer Conflict", description: `${newClass.lecturer} is already scheduled at this time.` });
            return true;
        }
        if (newClass.room && existingEntry.room && newClass.room !== 'N/A' && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
            toast({ variant: "destructive", title: "Room Conflict", description: `Room ${newClass.room} is already booked at this time.` });
            return true;
        }
        if (newClass.type === 'Practical' && existingEntry.type === 'Practical' && newClass.batches && existingEntry.batches) {
           const conflictingBatch = newClass.batches.find(b => existingEntry.batches?.includes(b));
           if (conflictingBatch) {
             toast({ variant: "destructive", title: "Batch Conflict", description: `Batch ${conflictingBatch} is already scheduled at this time.` });
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
    
    try {
      const docRef = doc(db, "timetables", selectedTimetableId);
      await updateDoc(docRef, {
        timetable: arrayUnion(newEntry)
      });

      const updatedData = { ...activeTimetable, timetable: [...activeTimetable.timetable, newEntry] };
      mutateTimetable(updatedData, false);

      toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
    } catch (error) {
      console.error("Error adding class:", error);
      toast({ title: "Error", description: "Failed to add class.", variant: "destructive" });
    }
  }, [activeTimetable, selectedTimetableId, checkForConflicts, mutateTimetable, toast]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable || !selectedTimetableId) return;
    if (checkForConflicts(updatedClass, activeTimetable.timetable, updatedClass.id)) return;
    
    const originalTimetable = activeTimetable.timetable;
    const updatedTimetable = originalTimetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry);

    try {
      const docRef = doc(db, "timetables", selectedTimetableId);
      await setDoc(docRef, { ...activeTimetable, timetable: updatedTimetable });

      mutateTimetable({ ...activeTimetable, timetable: updatedTimetable }, false);

      closeEditDialog();
      toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
    } catch (error) {
       console.error("Error updating class:", error);
       toast({ title: "Error", description: "Failed to update class.", variant: "destructive" });
    }
  }, [activeTimetable, selectedTimetableId, checkForConflicts, mutateTimetable, closeEditDialog, toast]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable || !selectedTimetableId) return;

    const classToDelete = activeTimetable.timetable.find(c => c.id === classId);
    if (!classToDelete) return;

    try {
        const docRef = doc(db, "timetables", selectedTimetableId);
        await updateDoc(docRef, {
            timetable: arrayRemove(classToDelete)
        });

        const updatedData = { ...activeTimetable, timetable: activeTimetable.timetable.filter(c => c.id !== classId) };
        mutateTimetable(updatedData, false);

        closeEditDialog();
        toast({ title: "Class Deleted", description: `"${classToDelete?.subject}" has been removed.`, variant: "destructive" });
    } catch (error) {
        console.error("Error deleting class:", error);
        toast({ title: "Error", description: "Failed to delete class.", variant: "destructive" });
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

  if (metadataLoading && !hasTimetables) {
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

    