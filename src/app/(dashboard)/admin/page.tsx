
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
import { Pencil, FileSpreadsheet, XCircle, PlusCircle, MoreVertical, Upload, FileDown, FileText, FileType } from 'lucide-react';
import { Timetable } from '@/components/shared/timetable';
import { handleExportCSV, handleExportXLSX } from '@/lib/export';
import { exportTimetableToPDF } from '@/lib/pdf-export';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from '@/components/ui/dropdown-menu';

const AddClassDialog = dynamic(() => import('@/components/admin/add-class-dialog').then(mod => mod.AddClassDialog));
const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));
const ClassDetailsDialog = dynamic(() => import('@/components/shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

export default function AdminDashboardPage() {
  const { 
    allTimetables,
    loading,
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
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);
  const [conflictingEntryIds, setConflictingEntryIds] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    if (!allTimetables || !activeTimetable) {
        setConflictingEntryIds(new Set());
        return;
    };

    const newConflictingIds = new Set<string>();
    const allEntries = allTimetables.flatMap(t => t.timetable.map(entry => ({ ...entry, timetableId: t.id, timetableName: t.name })));

    for (let i = 0; i < allEntries.length; i++) {
        for (let j = i + 1; j < allEntries.length; j++) {
            const entryA = allEntries[i];
            const entryB = allEntries[j];

            if (entryA.day !== entryB.day || SPECIAL_TYPES.includes(entryA.type as SpecialClassType) || SPECIAL_TYPES.includes(entryB.type as SpecialClassType)) {
                continue;
            }

            const startA = parseInt(entryA.time.split('-')[0].split(':')[0]);
            const endA = startA + (entryA.duration || 1);
            const startB = parseInt(entryB.time.split('-')[0].split(':')[0]);
            const endB = startB + (entryB.duration || 1);

            const timeOverlap = startA < endB && endA > startB;
            if (!timeOverlap) continue;

            // Room conflict
            if (entryA.room && entryB.room && entryA.room !== 'N/A' && entryA.room === entryB.room) {
                newConflictingIds.add(entryA.id);
                newConflictingIds.add(entryB.id);
            }

            // Lecturer conflict
            const lecturersA = (entryA.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
            const lecturersB = (entryB.lecturer || "").split(',').map(l => l.trim()).filter(Boolean);
            if (lecturersA.some(l => lecturersB.includes(l))) {
                newConflictingIds.add(entryA.id);
                newConflictingIds.add(entryB.id);
            }

            // Batch conflict
            if (entryA.timetableId === entryB.timetableId) { // Only within same timetable
                const batchesA = entryA.batches || [];
                const batchesB = entryB.batches || [];
                
                const isALecture = entryA.type === 'Lecture';
                const isBLecture = entryB.type === 'Lecture';
                
                if ((isALecture && batchesB.length > 0) || (isBLecture && batchesA.length > 0) || (batchesA.length > 0 && batchesB.length > 0 && batchesA.some(b => batchesB.includes(b)))) {
                    newConflictingIds.add(entryA.id);
                    newConflictingIds.add(entryB.id);
                }
            }
        }
    }
    setConflictingEntryIds(newConflictingIds);
  }, [allTimetables, activeTimetable]);

  const handleSelectTimetable = useCallback((id: string) => {
    setSelectedTimetableId(id);
    setIsEditMode(false);
    setSelectedClass(null);
  }, []);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (isEditMode && entries.length === 1) {
        setSelectedClass(entries[0]);
    } else if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, [isEditMode]);

  const closeEditDialog = useCallback(() => {
    setSelectedClass(null);
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);
  
  const handleAddClass = useCallback(async (newClass: Omit<TimetableEntry, 'id'>, parallelClass?: Omit<TimetableEntry, 'id'>) => {
    if (!activeTimetable) return;

    let success = addEntry(selectedTimetableId, newClass, parallelClass);
    
    if(success) {
      let description = `"${newClass.subject}" has been added.`;
      if (parallelClass) {
        description += ` and "${parallelClass.subject}" has been added in parallel.`
      }
      toast({ title: "Class Added!", description: description });
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

  const handleExport = useCallback((format: 'xlsx' | 'csv' | 'pdf') => {
    if (!activeTimetable) { 
        toast({ title: "Export Failed", variant: "destructive" }); 
        return; 
    }
    const filename = `${activeTimetable.name}-Master-Timetable`;
    const title = `${activeTimetable.name} - Master Timetable`;
    
    if (format === 'xlsx') {
        handleExportXLSX(activeTimetable.timetable, filename, true);
    } else if (format === 'csv') {
        handleExportCSV(activeTimetable.timetable, filename, true);
    } else if (format === 'pdf') {
        exportTimetableToPDF(activeTimetable.timetable, title, true);
    }
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
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }
  
  return (
    <div className="container mx-auto p-8">
       <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
          <TimetableSelector
            timetables={timetableMetadatas || []}
            selectedTimetableId={selectedTimetableId}
            onSelectTimetable={handleSelectTimetable}
            onCreateTimetable={handleCreateTimetable}
            onDeleteTimetable={handleDeleteTimetable}
            onImportTimetable={handleImportTimetable}
          />
      </div>

     {hasTimetables ? (
        <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <CardTitle>Master Timetable</CardTitle>
                  <CardDescription>
                    {activeTimetable ? `Viewing timetable for ${activeTimetable.name}.` : 'Select a timetable to view.'}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-end gap-2 flex-wrap">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
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
                             <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <FileDown />
                                    Export
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem onClick={() => handleExport('xlsx')} disabled={!activeTimetable}>
                                            <FileSpreadsheet />
                                            Export as XLSX
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleExport('csv')} disabled={!activeTimetable}>
                                            <FileText />
                                            Export as CSV
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleExport('pdf')} disabled={!activeTimetable}>
                                            <FileType />
                                            Export as PDF
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem onClick={toggleEditMode}>
                                {isEditMode ? <XCircle /> : <Pencil />}
                                {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Timetable entries={activeTimetable?.timetable || []} view="admin" isEditMode={isEditMode} onCellClick={handleCellClick} conflictingIds={conflictingEntryIds}/>
            </CardContent>
          </Card>
      ) : (
          <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-2">No timetables found.</p>
             <TimetableSelector
                timetables={timetableMetadatas || []}
                selectedTimetableId={selectedTimetableId}
                onSelectTimetable={handleSelectTimetable}
                onCreateTimetable={handleCreateTimetable}
                onDeleteTimetable={handleDeleteTimetable}
                onImportTimetable={handleImportTimetable}
              />
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

      {viewingEntries && (
        <ClassDetailsDialog
            isOpen={!!viewingEntries}
            onOpenChange={(isOpen) => !isOpen && closeDetailsDialog()}
            entries={viewingEntries}
        />
      )}
    </div>
  );
}
