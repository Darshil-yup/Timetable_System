
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { TimetableData, TimetableEntry, SpecialClassType } from '@/lib/types';
import { MASTER_TIMETABLE } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

interface TimetableContextType {
  allTimetables: TimetableData[] | null;
  loading: boolean;
  addTimetable: (name: string, year: string) => Promise<string | null>;
  deleteTimetable: (id: string) => void;
  importTimetable: (newTimetable: TimetableData) => Promise<string | null>;
  addEntry: (timetableId: string, newClass: Omit<TimetableEntry, 'id'>, parallelClass?: Omit<TimetableEntry, 'id'>) => boolean;
  updateEntry: (timetableId: string, updatedClass: TimetableEntry) => boolean;
  deleteEntry: (timetableId: string, classId: string) => void;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [allTimetables, setAllTimetables] = useState<TimetableData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
        try {
            setAllTimetables(MASTER_TIMETABLE);
        } finally {
            setLoading(false);
        }
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const checkForConflicts = useCallback((
    timetables: TimetableData[], 
    newClass: Omit<TimetableEntry, 'id'>, 
    timetableId: string, 
    updatingClassId?: string
  ): boolean => {
    if (SPECIAL_TYPES.includes(newClass.type as SpecialClassType)) return false;

    const newClassStartHour = parseInt(newClass.time.split('-')[0].split(':')[0]);
    const newClassEndHour = newClassStartHour + (newClass.duration || 1);

    for (const timetable of timetables) {
        for (const existingEntry of timetable.timetable) {
            if (existingEntry.id === updatingClassId) continue;
            if (SPECIAL_TYPES.includes(existingEntry.type as SpecialClassType)) continue;
            if (existingEntry.day !== newClass.day) continue;
            
            const existingStartHour = parseInt(existingEntry.time.split('-')[0].split(':')[0]);
            const existingEndHour = existingStartHour + (existingEntry.duration || 1);
            const isOverlapping = newClassStartHour < existingEndHour && newClassEndHour > existingStartHour;

            if (isOverlapping) {
                // Room conflict
                if (newClass.room && newClass.room !== 'N/A' && existingEntry.room && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
                    toast({
                        variant: "destructive",
                        title: "Room Conflict",
                        description: `Room ${newClass.room} is booked at this time in "${timetable.name}".`
                    });
                    return true;
                }

                // Lecturer conflict
                const newClassLecturers = (newClass.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
                const existingLecturers = (existingEntry.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
                const conflictingLecturer = newClassLecturers.find(lecturer => existingLecturers.includes(lecturer));
                if (conflictingLecturer) {
                     toast({
                         variant: "destructive",
                         title: "Lecturer Conflict",
                         description: `${conflictingLecturer} is scheduled at this time in "${timetable.name}".`
                     });
                     return true;
                }

                // Batch conflict logic
                if (timetable.id === timetableId) {
                    const newClassBatches = newClass.type === 'Practical' ? (newClass.batches || []) : [];
                    const existingEntryBatches = existingEntry.type === 'Practical' ? (existingEntry.batches || []) : [];
                    
                    const isNewLecture = newClass.type === 'Lecture';
                    const isExistingLecture = existingEntry.type === 'Lecture';

                    if (isNewLecture && existingEntryBatches.length > 0) {
                        toast({ variant: "destructive", title: "Batch Conflict", description: `A batch is busy in a practical at this time.` });
                        return true;
                    }
                    if (isExistingLecture && newClassBatches.length > 0) {
                        toast({ variant: "destructive", title: "Batch Conflict", description: `A batch in the new practical is busy in a lecture.` });
                        return true;
                    }
                    if (!isNewLecture && !isExistingLecture) {
                        const conflictingBatch = newClassBatches.find(b => existingEntryBatches.includes(b));
                        if (conflictingBatch) {
                            toast({ variant: "destructive", title: "Batch Conflict", description: `Batch ${conflictingBatch} is already scheduled.` });
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
  }, [toast]);
  

  const addTimetable = useCallback(async (name: string, year: string): Promise<string | null> => {
    const timetableName = `${name} (${year})`;
    const newTimetable: TimetableData = {
      id: `tt-${Date.now()}`,
      name: timetableName,
      timetable: []
    };
    
    setAllTimetables(prev => [...(prev || []), newTimetable]);
    toast({ title: "Timetable Created!", description: `The timetable for "${timetableName}" has been created.` });
    return newTimetable.id;
  }, [toast]);

  const deleteTimetable = useCallback(async (id: string) => {
    const timetableToDelete = allTimetables?.find(t => t.id === id);
    if (!timetableToDelete) return;

    setAllTimetables(prev => {
        const newTimetables = (prev || []).filter(t => t.id !== id);
        return newTimetables;
    });
    
    toast({ title: "Timetable Deleted", description: `The timetable for "${timetableToDelete.name}" has been deleted.`, variant: "destructive" });
  }, [allTimetables, toast]);

  const importTimetable = useCallback(async (newTimetable: TimetableData): Promise<string | null> => {
    setAllTimetables(prev => [...(prev || []), newTimetable]);
    toast({ title: "Timetable Imported!", description: `The timetable for "${newTimetable.name}" has been imported.` });
    return newTimetable.id;
  }, [toast]);

  const addEntry = useCallback((timetableId: string, newClass: Omit<TimetableEntry, 'id'>, parallelClass?: Omit<TimetableEntry, 'id'>): boolean => {
    if (!allTimetables) return false;
    
    if (checkForConflicts(allTimetables, newClass, timetableId)) return false;
    if (parallelClass && checkForConflicts(allTimetables, parallelClass, timetableId)) return false;
    
    if(parallelClass) {
        // check for conflicts between the two new classes themselves
        if(newClass.room === parallelClass.room) {
             toast({ variant: "destructive", title: "Room Conflict", description: `Cannot add two practicals in the same room "${newClass.room}" at the same time.`});
             return false;
        }
        const newClassLecturers = (newClass.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
        const parallelLecturers = (parallelClass.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
        if(newClassLecturers.some(l => parallelLecturers.includes(l))) {
            toast({ variant: "destructive", title: "Lecturer Conflict", description: `Cannot schedule the same lecturer for parallel practicals.`});
            return false;
        }
        const newClassBatches = newClass.batches || [];
        const parallelBatches = parallelClass.batches || [];
        if(newClassBatches.some(b => parallelBatches.includes(b))) {
            toast({ variant: "destructive", title: "Batch Conflict", description: `Cannot schedule the same batch for parallel practicals.`});
            return false;
        }
    }


    const newEntry: TimetableEntry = { ...newClass, id: `c${Date.now()}` };
    const newEntries = [newEntry];
    if (parallelClass) {
        newEntries.push({ ...parallelClass, id: `c${Date.now() + 1}` });
    }

    setAllTimetables(prev => (prev || []).map(t => 
        t.id === timetableId ? { ...t, timetable: [...t.timetable, ...newEntries] } : t
    ));
    return true;
  }, [allTimetables, checkForConflicts, toast]);

  const updateEntry = useCallback((timetableId: string, updatedClass: TimetableEntry): boolean => {
    if (!allTimetables) return false;
    if (checkForConflicts(allTimetables, updatedClass, timetableId, updatedClass.id)) return false;
    
    setAllTimetables(prev => (prev || []).map(t => 
        t.id === timetableId 
        ? { ...t, timetable: t.timetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry) } 
        : t
    ));
    return true;
  }, [allTimetables, checkForConflicts]);

  const deleteEntry = useCallback((timetableId: string, classId: string) => {
    setAllTimetables(prev => (prev || []).map(t => 
        t.id === timetableId 
        ? { ...t, timetable: t.timetable.filter(c => c.id !== classId) }
        : t
    ));
  }, []);

  return (
    <TimetableContext.Provider value={{ allTimetables, loading, addTimetable, deleteTimetable, importTimetable, addEntry, updateEntry, deleteEntry }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetables() {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetables must be used within a TimetableProvider');
  }
  return context;
}
