
"use client"

import React, from 'react';
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
import { LECTURERS, MASTER_TIMETABLE } from '@/lib/mock-data';
import { useState, useEffect, useCallback } from 'react';

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

  const updateActiveTimetable = useCallback((newTimetableData: TimetableData) => {
    // This function will update the SWR cache for the specific timetable
    mutateTimetable(newTimetableData, false);

    // Also update the list of timetables if the name changed, for example
    // This is a bit more complex as it requires knowing the previous state
    // For now, we'll just revalidate the list
    mutateMetadatas();
  }, [mutateTimetable, mutateMetadatas]);

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
    // This is a mock implementation. In a real app, you'd save this to a database.
    const newId = `tt-${Date.now()}`;
    const newTimetable = {
      id: newId,
      name: `${name} (${year})`,
      timetable: entries,
    };
    MASTER_TIMETABLE.push(newTimetable);
    mutateMetadatas(); // Re-fetch the list of timetables
    toast({ title: "Timetable Created!", description: `The timetable for "${name} (${year})" has been created.` });
    return newId;
  }, [mutateMetadatas, toast]);

  const deleteTimetable = useCallback(async (id: string) => {
    // This is a mock implementation. In a real app, you'd delete this from a database.
    const index = MASTER_TIMETABLE.findIndex(t => t.id === id);
    if (index !== -1) {
      const deletedTimetableName = MASTER_TIMETABLE[index].name;
      MASTER_TIMETABLE.splice(index, 1);
      mutateMetadatas(); // Re-fetch the list of timetables
      toast({ title: "Timetable Deleted", description: `The timetable for "${deletedTimetableName}" has been deleted.`, variant: "destructive" });
      
      // Select the first timetable in the list if one exists
      if (MASTER_TIMETABLE.length > 0) {
        setSelectedTimetableId(MASTER_TIMETABLE[0].id);
      } else {
        setSelectedTimetableId('');
      }
    }
  }, [mutateMetadatas, toast]);


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
        // Lecturer conflict
        if (newClass.lecturer && existingEntry.lecturer && newClass.lecturer !== 'N/A' && existingEntry.lecturer !== 'N/A' && !SPECIAL_TYPES.includes(newClass.type as SpecialClassType) && !SPECIAL_TYPES.includes(existingEntry.type as SpecialClassType)) {
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
        
        // Room/Lab conflict
        if (newClass.room && existingEntry.room && newClass.room !== 'N/A' && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
          toast({ 
              variant: "destructive", 
              title: "Room/Lab Conflict", 
              description: `Room ${newClass.room} is already booked for "${existingEntry.subject}" at ${existingEntry.time} on ${existingEntry.day}.` 
          });
          return true;
        }

        // Batch conflict for practicals
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
    if (!activeTimetable) return;
    if (checkForConflicts(newClass, activeTimetable.timetable)) return;

    const newEntry: TimetableEntry = { ...newClass, id: `c${Date.now()}` };
    const updatedTimetableData = {
        ...activeTimetable,
        timetable: [...activeTimetable.timetable, newEntry]
    };
    updateActiveTimetable(updatedTimetableData);
    toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
  }, [activeTimetable, checkForConflicts, updateActiveTimetable, toast]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable) return;
    if (checkForConflicts(updatedClass, activeTimetable.timetable, updatedClass.id)) return;
    
    const updatedTimetableData = {
        ...activeTimetable,
        timetable: activeTimetable.timetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry)
    };
    updateActiveTimetable(updatedTimetableData);
    closeEditDialog();
    toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
  }, [activeTimetable, checkForConflicts, updateActiveTimetable, closeEditDialog, toast]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable) return;

    const classToDelete = activeTimetable.timetable.find(c => c.id === classId);
    const updatedTimetableData = {
        ...activeTimetable,
        timetable: activeTimetable.timetable.filter(entry => entry.id !== classId)
    };
    updateActiveTimetable(updatedTimetableData);
    closeEditDialog();
    toast({ title: "Class Deleted", description: `"${classToDelete?.subject}" has been removed.`, variant: "destructive" });
  }, [activeTimetable, updateActiveTimetable, closeEditDialog, toast]);

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

    

    