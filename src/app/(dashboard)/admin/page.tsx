
"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { TimetableEntry } from '@/lib/types';
import { useTimetables } from '@/context/TimetableContext';
import { useToast } from '@/hooks/use-toast';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { TimetableTabs } from '@/components/admin/timetable-tabs';
import { EditClassDialog } from '@/components/admin/edit-class-dialog';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const { timetables, loading, addTimetable, deleteTimetable, updateTimetableEntries } = useTimetables();
  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);

  const activeTimetable = useMemo(() => 
    timetables.find(t => t.id === selectedTimetableId), 
    [timetables, selectedTimetableId]
  );

  useEffect(() => {
    if (!loading && timetables.length > 0 && !selectedTimetableId) {
        setSelectedTimetableId(timetables[0].id);
    }
  }, [timetables, loading, selectedTimetableId]);

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
      await updateTimetableEntries(selectedTimetableId, newTimetable);
  }, [selectedTimetableId, updateTimetableEntries]);

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

  if (loading) {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <Skeleton className="h-10 w-full max-w-lg ml-auto" />
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <TimetableSelector
        timetables={timetables}
        selectedTimetableId={selectedTimetableId}
        onSelectTimetable={handleSelectTimetable}
        onCreateTimetable={addTimetable}
        onDeleteTimetable={deleteTimetable}
      />
     
      <TimetableTabs
        activeTimetable={activeTimetable}
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

    