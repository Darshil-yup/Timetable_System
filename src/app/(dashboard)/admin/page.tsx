
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
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from '@/components/ui/dropdown-menu';

const AddClassDialog = dynamic(() => import('@/components/admin/add-class-dialog').then(mod => mod.AddClassDialog));
const EditClassDialog = dynamic(() => import('@/components/admin/edit-class-dialog').then(mod => mod.EditClassDialog));
const ClassDetailsDialog = dynamic(() => import('@/components/shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

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
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);

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

  const generateGridData = useCallback((forPDF = false) => {
    if (!activeTimetable) return [];
    
    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
      header.map(h => h || null), // Ensure header has no undefined values
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    activeTimetable.timetable.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        const group = activeTimetable.timetable.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration
        );
        
        const cellContent = group.map(g => {
            const subject = g.type === 'Practical' ? `LAB: ${g.subject}` : g.subject;
            const lecturer = g.lecturer;
            const room = g.room;
            const batches = g.batches?.join(', ');
            return [subject, lecturer, room, batches].filter(Boolean).join('\n');
        }).join(forPDF ? '\n\n' : '\n---\n');
        
        if (grid[dayIndex + 1][timeIndex + 1] === null) {
            grid[dayIndex + 1][timeIndex + 1] = cellContent;
            group.forEach(g => placedEntries.add(g.id));

            for (let i = 1; i < duration; i++) {
                if (timeIndex + 1 + i < grid[0].length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = forPDF ? "" : "MERGED";
                }
            }
        }
    });

    if (forPDF) {
        return grid.map(row => row.filter(cell => cell !== "MERGED"));
    }
    // Filter out "MERGED" placeholder for non-PDF exports
    return grid.map(row => row.map(cell => cell === "MERGED" ? "" : cell));

  }, [activeTimetable]);
  
  const handleExportXLSX = useCallback(() => {
    if (!activeTimetable) { toast({ title: "Export Failed", variant: "destructive" }); return; }
    
    const grid = generateGridData();
    const worksheet = XLSX.utils.aoa_to_sheet(grid.map(row => row.map(cell => cell === "MERGED" ? "" : cell)));

    const columnWidths = [ { wch: 15 }, ...TIME_SLOTS.map(() => ({ wch: 25 })) ];
    worksheet['!cols'] = columnWidths;

    for (let C = 0; C < grid[0].length; ++C) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: 0});
        if(worksheet[cellAddress]) {
            worksheet[cellAddress].s = { font: { bold: true }, alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
        }
    }
    
    for(let R = 1; R < grid.length; ++R) {
        for(let C = 0; C < grid[R].length; ++C) {
            const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
            if(worksheet[cellAddress]) {
                 worksheet[cellAddress].s = { alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
            }
        }
    }

    worksheet['!merges'] = [];
    activeTimetable.timetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
            const existingMerge = worksheet['!merges']?.find(m => m.s.r === dayIndex && m.s.c === timeIndex);
            if (!existingMerge) {
                worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
            }
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Master Timetable');
    XLSX.writeFile(workbook, `${activeTimetable.name}-Master-Timetable.xlsx`);
    toast({ title: "Export Successful" });
  }, [activeTimetable, toast, generateGridData]);

  const handleExportCSV = useCallback(() => {
    if (!activeTimetable) { toast({ title: "Export Failed", variant: "destructive" }); return; }
    const grid = generateGridData();
    const csvContent = grid.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeTimetable.name}-Master-Timetable.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Export Successful" });
  }, [activeTimetable, toast, generateGridData]);

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
                  <CardDescription>Combined view of all classes. Add, edit, and manage timetable entries here.</CardDescription>
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
                                        <DropdownMenuItem onClick={handleExportXLSX} disabled={!activeTimetable}>
                                            <FileSpreadsheet />
                                            Export as XLSX
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleExportCSV} disabled={!activeTimetable}>
                                            <FileText />
                                            Export as CSV
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
    
