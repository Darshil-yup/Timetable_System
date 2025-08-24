
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, User, Book, FileDown, FileText, FileType } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import type { TimetableEntry, TimetableMetadata } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuPortal } from '@/components/ui/dropdown-menu';

const ClassDetailsDialog = dynamic(() => import('@/components/shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function LecturerDashboardPage() {
  const { toast } = useToast();
  const { allTimetables, loading: timetablesLoading } = useTimetables();
  
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedMasterTimetableId, setSelectedMasterTimetableId] = useState('');

  
  useEffect(() => {
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0].name);
    }
  }, [selectedLecturer]);

  useEffect(() => {
    if (!timetablesLoading && allTimetables && allTimetables.length > 0 && !selectedMasterTimetableId) {
      setSelectedMasterTimetableId(allTimetables[0].id);
    }
  }, [timetablesLoading, allTimetables, selectedMasterTimetableId]);

  const timetableMetadatas = useMemo((): TimetableMetadata[] => {
    return allTimetables?.map(t => ({ id: t.id, name: t.name })) || [];
  }, [allTimetables]);

  const activeMasterTimetable = useMemo(() => {
    return allTimetables?.find(t => t.id === selectedMasterTimetableId) || null;
  }, [allTimetables, selectedMasterTimetableId]);

  const handleLecturerChange = (lecturerName: string) => {
    setSelectedLecturer(lecturerName);
    setSelectedSubject('all');
  }

  const lecturerTimetable = useMemo(() => {
    if (!selectedLecturer || !allTimetables) return [];
    
    const allClasses: TimetableEntry[] = [];
    allTimetables.forEach(timetable => {
        const lecturerClasses = timetable.timetable.filter(entry => 
            entry.lecturer && entry.lecturer.includes(selectedLecturer)
        );
        allClasses.push(...lecturerClasses);
    });
    return allClasses;
  }, [selectedLecturer, allTimetables]);

  const lecturerSubjects = useMemo(() => {
    if (!lecturerTimetable) return [];
    const subjects = new Set(lecturerTimetable.map(entry => entry.subject));
    return ['All Subjects', ...Array.from(subjects)];
  }, [lecturerTimetable]);

  const filteredTimetable = useMemo(() => {
    if (selectedSubject === 'all' || selectedSubject === 'All Subjects') {
      return lecturerTimetable;
    }
    return lecturerTimetable.filter(entry => entry.subject === selectedSubject);
  }, [lecturerTimetable, selectedSubject]);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);

  const generateGridData = useCallback(() => {
    const isMasterView = activeTab === 'master';
    const timetableToExport = isMasterView ? activeMasterTimetable?.timetable : filteredTimetable;

    if (!timetableToExport) return [];

    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
        header,
        ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    timetableToExport.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        const group = timetableToExport.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration
        );
        
        const cellContent = group.map(g => {
            const subject = g.type === 'Practical' ? `LAB: ${g.subject}` : g.subject;
            const room = g.room;
            const lecturer = isMasterView ? g.lecturer : undefined;
            const batches = g.batches?.join(', ');
            return [subject, lecturer, room, batches].filter(Boolean).join('\n');
        }).join('\n---\n');
        
        if (grid[dayIndex + 1][timeIndex + 1] === null) {
            grid[dayIndex + 1][timeIndex + 1] = cellContent;
            group.forEach(g => placedEntries.add(g.id));

            for (let i = 1; i < duration; i++) {
                if (timeIndex + 1 + i < grid[0].length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = ""; 
                }
            }
        }
    });

    return grid;
  }, [activeTab, activeMasterTimetable, filteredTimetable]);

  const handleExportXLSX = useCallback(() => {
    const isMasterView = activeTab === 'master';
    const timetableToExport = isMasterView ? activeMasterTimetable?.timetable : filteredTimetable;
    const name = isMasterView ? activeMasterTimetable?.name : selectedLecturer;

    if (!timetableToExport || timetableToExport.length === 0) {
        toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" });
        return;
    }

    const grid = generateGridData();
    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    
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
    timetableToExport.forEach(entry => {
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
    const sheetName = `${name}-Timetable`;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
    toast({ title: "Export Successful" });
  }, [activeTab, activeMasterTimetable, filteredTimetable, selectedLecturer, toast, generateGridData]);

  const handleExportCSV = useCallback(() => {
    const isMasterView = activeTab === 'master';
    const name = isMasterView ? activeMasterTimetable?.name : selectedLecturer;
    const grid = generateGridData();
    if (grid.length === 0) { toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); return; }
    
    const csvContent = grid.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${name}-Timetable.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Export Successful" });
  }, [activeTab, activeMasterTimetable, selectedLecturer, toast, generateGridData]);

  const handleExportPDF = useCallback(() => {
    const isMasterView = activeTab === 'master';
    const name = isMasterView ? activeMasterTimetable?.name : selectedLecturer;
    const grid = generateGridData();
    if (grid.length === 0) { toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); return; }

    const doc = new jsPDF({ orientation: 'landscape' });
    const body = grid.slice(1).map(row => row.map(cell => cell || ''));
    
    (doc as any).autoTable({
        head: [grid[0]],
        body: body,
        styles: { halign: 'center', valign: 'middle', cellPadding: 2, fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });

    doc.save(`${name}-Timetable.pdf`);
    toast({ title: "Export Successful" });
  }, [activeTab, activeMasterTimetable, selectedLecturer, toast, generateGridData]);

if (timetablesLoading) {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
               <Skeleton className="h-10 w-[280px]" />
               <Skeleton className="h-10 w-[170px]" />
            </div>
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <TabsList>
                    <TabsTrigger value="personal">My Timetable</TabsTrigger>
                    <TabsTrigger value="master">Master View</TabsTrigger>
                </TabsList>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <FileDown />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={handleExportXLSX}>
                          <FileSpreadsheet />
                          Export as XLSX
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={handleExportCSV}>
                          <FileText />
                          Export as CSV
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={handleExportPDF}>
                          <FileType />
                          Export as PDF
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
            <TabsContent value="personal">
                <div className="flex items-start justify-start mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <Select value={selectedLecturer} onValueChange={handleLecturerChange}>
                        <SelectTrigger className="w-[280px]">
                            <div className="flex items-center gap-2">
                                <User />
                                <SelectValue placeholder="Select a Lecturer" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {LECTURERS.map(lecturer => (
                                <SelectItem key={lecturer.id} value={lecturer.name}>{lecturer.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedLecturer || lecturerSubjects.length <= 1}>
                            <SelectTrigger className="w-[280px]">
                                <div className="flex items-center gap-2">
                                    <Book />
                                    <SelectValue placeholder="Select a Subject" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {lecturerSubjects.map(subject => (
                                    <SelectItem key={subject} value={subject === 'All Subjects' ? 'all' : subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 {selectedLecturer ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Consolidated Timetable for {selectedLecturer}</CardTitle>
                            <CardDescription>
                                {selectedSubject === 'all' 
                                    ? `This is a combined weekly schedule for ${selectedLecturer}, including all assigned classes and labs across all departments and semesters.`
                                    : `Weekly schedule for ${selectedLecturer} for the subject: ${selectedSubject}.`
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Timetable 
                                entries={filteredTimetable} 
                                view="lecturer"
                                onCellClick={handleCellClick}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <p className="text-muted-foreground mb-2">No lecturer selected.</p>
                        <p className="text-muted-foreground text-center">Please select a lecturer to view their consolidated timetable.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="master">
                 <div className="flex items-start justify-start mb-6 flex-wrap gap-4">
                    <Select value={selectedMasterTimetableId} onValueChange={setSelectedMasterTimetableId}>
                        <SelectTrigger className="w-[320px]">
                           <SelectValue placeholder="Select a timetable" />
                        </SelectTrigger>
                        <SelectContent>
                            {timetableMetadatas.map(timetable => (
                                <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {activeMasterTimetable ? (
                     <Card>
                        <CardHeader>
                            <CardTitle>{activeMasterTimetable.name}</CardTitle>
                            <CardDescription>Master view of the full timetable.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Timetable
                                entries={activeMasterTimetable?.timetable || []}
                                view="lecturer"
                                onCellClick={handleCellClick}
                                highlightedLecturer={selectedLecturer}
                            />
                        </CardContent>
                    </Card>
                ) : (
                     <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <p className="text-muted-foreground mb-2">No timetable selected.</p>
                    </div>
                )}
            </TabsContent>
        </Tabs>

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


    

    