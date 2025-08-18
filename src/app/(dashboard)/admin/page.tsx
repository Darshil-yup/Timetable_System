
"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { TimetableEntry, TimetableData, SpecialClassType, TimetableMetadata } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, FileSpreadsheet, XCircle, PlusCircle, MoreVertical } from 'lucide-react';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Timetable } from '@/components/shared/timetable';
import * as XLSX from 'xlsx';
import { MASTER_TIMETABLE } from '@/lib/mock-data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

export default function AdminDashboardPage() {
  const { setActiveTimetable: setGlobalActiveTimetable } = useTimetables();
  const { toast } = useToast();

  const [allTimetables, setAllTimetables] = useState<TimetableData[]>([]);
  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    setAllTimetables(MASTER_TIMETABLE);
    if (MASTER_TIMETABLE.length > 0) {
      setSelectedTimetableId(MASTER_TIMETABLE[0].id);
    }
    setIsLoading(false);
  }, []);

  const timetableMetadatas = useMemo((): TimetableMetadata[] => {
    return allTimetables.map(t => ({ id: t.id, name: t.name }));
  }, [allTimetables]);

  const activeTimetable = useMemo(() => {
    return allTimetables.find(t => t.id === selectedTimetableId) || null;
  }, [allTimetables, selectedTimetableId]);

  useEffect(() => {
    if (activeTimetable) {
      setGlobalActiveTimetable(activeTimetable);
    }
  }, [activeTimetable, setGlobalActiveTimetable]);

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
    const timetableName = `${name} (${year})`;
    const newTimetable: TimetableData = {
      id: `tt-${Date.now()}`,
      name: timetableName,
      timetable: []
    };
    
    setAllTimetables(prev => [...prev, newTimetable]);
    setSelectedTimetableId(newTimetable.id);
    toast({ title: "Timetable Created!", description: `The timetable for "${timetableName}" has been created.` });
    return newTimetable.id;
  }, [toast]);
  
  const importTimetable = useCallback(async (newTimetable: TimetableData): Promise<string | null> => {
    setAllTimetables(prev => [...prev, newTimetable]);
    setSelectedTimetableId(newTimetable.id);
    toast({ title: "Timetable Imported!", description: `The timetable for "${newTimetable.name}" has been imported.` });
    return newTimetable.id;
  }, [toast]);

  const deleteTimetable = useCallback(async (id: string) => {
    const timetableToDelete = allTimetables.find(t => t.id === id);
    if (!timetableToDelete) return;

    setAllTimetables(prev => {
        const newTimetables = prev.filter(t => t.id !== id);
        if (newTimetables.length > 0) {
            setSelectedTimetableId(newTimetables[0].id);
        } else {
            setSelectedTimetableId('');
        }
        return newTimetables;
    });
    
    toast({ title: "Timetable Deleted", description: `The timetable for "${timetableToDelete.name}" has been deleted.`, variant: "destructive" });
  }, [allTimetables, toast]);
  
  const checkForConflicts = useCallback((newClass: Omit<TimetableEntry, 'id'>, updatingClassId?: string): boolean => {
    const newClassStartHour = parseInt(newClass.time.split('-')[0].split(':')[0]);
    const newClassEndHour = newClassStartHour + (newClass.duration || 1);

    if (SPECIAL_TYPES.includes(newClass.type as SpecialClassType)) return false;

    const newClassLecturers = (newClass.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
    const allDeptBatches = [...new Set(activeTimetable?.timetable.flatMap(e => e.batches || []))];
    const newClassBatches = newClass.type === 'Lecture' ? allDeptBatches : (newClass.batches || []);

    for (const timetable of allTimetables) {
        for (const existingEntry of timetable.timetable) {
            if (existingEntry.id === updatingClassId) continue;
            if (SPECIAL_TYPES.includes(existingEntry.type as SpecialClassType)) continue;
            if (existingEntry.day !== newClass.day) continue;

            const existingStartHour = parseInt(existingEntry.time.split('-')[0].split(':')[0]);
            const existingEndHour = existingStartHour + (existingEntry.duration || 1);
            const isOverlapping = newClassStartHour < existingEndHour && newClassEndHour > existingStartHour;

            if (isOverlapping) {
                // Room conflict (any type of class)
                if (newClass.room && newClass.room !== 'N/A' && existingEntry.room && existingEntry.room !== 'N/A' && newClass.room === existingEntry.room) {
                    toast({
                        variant: "destructive",
                        title: "Room Conflict",
                        description: `Room ${newClass.room} is already booked at this time in the "${timetable.name}" timetable.`
                    });
                    return true;
                }

                // Lecturer conflict (any type of class)
                const existingLecturers = (existingEntry.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
                const lecturerConflict = newClassLecturers.some(lecturer => existingLecturers.includes(lecturer));
                if (lecturerConflict) {
                     const conflictingLecturer = newClassLecturers.find(lecturer => existingLecturers.includes(lecturer));
                     toast({
                         variant: "destructive",
                         title: "Lecturer Conflict",
                         description: `${conflictingLecturer} is already scheduled for a class at this time in the "${timetable.name}" timetable.`
                     });
                     return true;
                }

                // Batch conflict
                const batchesInConflictTimetable = [...new Set(timetable.timetable.flatMap(e => e.batches || []))];
                const existingEntryBatches = existingEntry.type === 'Lecture' 
                    ? batchesInConflictTimetable
                    : (existingEntry.batches || []);
                const conflictingBatch = newClassBatches.find(b => existingEntryBatches.includes(b));
                if (conflictingBatch) {
                     toast({
                        variant: "destructive",
                        title: "Batch Conflict",
                        description: `Batch ${conflictingBatch} is already scheduled for another class at this time in the "${timetable.name}" timetable.`
                    });
                    return true;
                }
            }
        }
    }

    return false;
  }, [toast, allTimetables, activeTimetable]);

  const handleAddClass = useCallback(async (newClass: Omit<TimetableEntry, 'id'>) => {
    if (!activeTimetable) return;
    if (checkForConflicts(newClass)) return;

    const newEntry: TimetableEntry = { ...newClass, id: `c${Date.now()}` };
    
    setAllTimetables(prev => prev.map(t => 
        t.id === selectedTimetableId ? { ...t, timetable: [...t.timetable, newEntry] } : t
    ));

    toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
  }, [activeTimetable, checkForConflicts, toast, selectedTimetableId]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable) return;
    if (checkForConflicts(updatedClass, updatedClass.id)) return;
    
    setAllTimetables(prev => prev.map(t => 
        t.id === selectedTimetableId 
        ? { ...t, timetable: t.timetable.map(entry => entry.id === updatedClass.id ? updatedClass : entry) } 
        : t
    ));

    closeEditDialog();
    toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
  }, [activeTimetable, checkForConflicts, toast, closeEditDialog, selectedTimetableId]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable) return;

    const classToDelete = activeTimetable.timetable.find(c => c.id === classId);
    if (!classToDelete) return;
    
    setAllTimetables(prev => prev.map(t => 
        t.id === selectedTimetableId 
        ? { ...t, timetable: t.timetable.filter(c => c.id !== classId) }
        : t
    ));
    
    closeEditDialog();
    toast({ title: "Class Deleted", description: `"${classToDelete.subject}" has been removed.`, variant: "destructive" });
  }, [activeTimetable, closeEditDialog, toast, selectedTimetableId]);

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

  if (isLoading) {
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
        onImportTimetable={importTimetable}
      />
     
     {hasTimetables ? (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Master Timetable</CardTitle>
                <CardDescription>Combined view of all classes. Add, edit, and manage timetable entries here.</CardDescription>
              </div>
                <div className="flex items-center justify-end gap-2 flex-wrap">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" data-state={isEditMode ? 'open' : 'closed'}>
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <AddClassDialog onAddClass={handleAddClass}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <PlusCircle />
                                    Add New Class
                                </DropdownMenuItem>
                            </AddClassDialog>
                            <DropdownMenuItem onClick={handleExportSheet} disabled={!activeTimetable}>
                                <FileSpreadsheet />
                                Export as Sheet
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={toggleEditMode}>
                                {isEditMode ? <XCircle /> : <Pencil />}
                                {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
              <Timetable entries={activeTimetable?.timetable || []} view="admin" isEditMode={isEditMode} onEdit={openEditDialog} />
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

    

    
