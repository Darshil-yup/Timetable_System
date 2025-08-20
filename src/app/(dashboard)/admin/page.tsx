
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
import { Pencil, FileSpreadsheet, XCircle, PlusCircle, MoreVertical, Upload } from 'lucide-react';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Timetable } from '@/components/shared/timetable';
import * as XLSX from 'xlsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ImportTimetableDialog } from '@/components/admin/import-timetable-dialog';

const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function AdminDashboardPage() {
  const { 
    allTimetables,
    loading,
    conflictingEntryIds,
    addTimetable,
    deleteTimetable,
    importTimetable,
    addEntry,
    updateEntry,
    deleteEntry
  } = useTimetables();

  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);

  useEffect(() => {
    if (!loading && allTimetables && allTimetables.length > 0 && !selectedTimetableId) {
      setSelectedTimetableId(allTimetables[0].id);
    }
  }, [loading, allTimetables, selectedTimetableId]);

  const timetableMetadatas = useMemo((): TimetableMetadata[] => {
    return allTimetables?.map(t => ({ id: t.id, name: t.name })) || [];
  }, [allTimetables]);

  const activeTimetable = useMemo(() => {
    return allTimetables?.find(t => t.id === selectedTimetableId) || null;
  }, [allTimetables, selectedTimetableId]);

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
  
  const handleAddClass = useCallback(async (newClass: Omit<TimetableEntry, 'id'>) => {
    if (!activeTimetable) return;
    const success = addEntry(selectedTimetableId, newClass);
    if(success) {
      toast({ title: "Class Added!", description: `"${newClass.subject}" has been added.` });
    }
  }, [activeTimetable, addEntry, toast, selectedTimetableId]);
  
  const handleUpdateClass = useCallback(async (updatedClass: TimetableEntry) => {
    if (!activeTimetable) return;
    const success = updateEntry(selectedTimetableId, updatedClass)
    if(success) {
      closeEditDialog();
      toast({ title: "Class Updated!", description: `"${updatedClass.subject}" has been updated.` });
    }
  }, [activeTimetable, updateEntry, toast, closeEditDialog, selectedTimetableId]);
  
  const handleDeleteClass = useCallback(async (classId: string) => {
    if (!activeTimetable) return;
    const classToDelete = activeTimetable.timetable.find(c => c.id === classId);
    if(classToDelete) {
        deleteEntry(selectedTimetableId, classId);
        closeEditDialog();
        toast({ title: "Class Deleted", description: `"${classToDelete.subject}" has been removed.`, variant: "destructive" });
    }
  }, [activeTimetable, deleteEntry, closeEditDialog, toast, selectedTimetableId]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
    toast({
      title: !isEditMode ? "Edit Mode Active" : "Edit Mode Deactivated",
      description: !isEditMode ? "Click on any class to modify it. Conflicting slots are highlighted in red." : undefined,
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

  const handleCreateTimetable = async (name: string, year: string) => {
    const newId = await addTimetable(name, year);
    if(newId) {
        setSelectedTimetableId(newId);
    }
    return newId;
  };

  const handleImportTimetable = async (newTimetable: TimetableData) => {
    const newId = await importTimetable(newTimetable);
    if(newId) {
        setSelectedTimetableId(newId);
    }
    return newId;
  };

  const handleDeleteTimetable = async (id: string) => {
    const timetableToDelete = allTimetables?.find(t => t.id === id);
    if (timetableToDelete) {
        deleteTimetable(id);
        const remainingTimetables = allTimetables?.filter(t => t.id !== id);
        if (remainingTimetables && remainingTimetables.length > 0) {
            setSelectedTimetableId(remainingTimetables[0].id);
        } else {
            setSelectedTimetableId('');
        }
    }
  };
  
  const hasTimetables = timetableMetadatas && timetableMetadatas.length > 0;

  if (loading) {
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
        onCreateTimetable={handleCreateTimetable}
        onDeleteTimetable={handleDeleteTimetable}
        onImportTimetable={handleImportTimetable}
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
                            <ImportTimetableDialog onImport={handleImportTimetable}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Upload />
                                    Import from Sheet
                                </DropdownMenuItem>
                            </ImportTimetableDialog>
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
              <Timetable entries={activeTimetable?.timetable || []} view="admin" isEditMode={isEditMode} onEdit={openEditDialog} conflictingIds={conflictingEntryIds}/>
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
    

    

