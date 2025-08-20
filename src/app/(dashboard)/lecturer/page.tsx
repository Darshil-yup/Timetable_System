
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, User, Book } from 'lucide-react';
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
import type { TimetableEntry } from '@/lib/types';
import { ClassDetailsDialog } from '@/components/shared/class-details-dialog';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function LecturerDashboardPage() {
  const { toast } = useToast();
  const { allTimetables, loading: timetablesLoading } = useTimetables();
  
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);
  
  useEffect(() => {
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0].name);
    }
  }, [selectedLecturer]);

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

  const handleExportSheet = useCallback(() => {
    if (!selectedLecturer || filteredTimetable.length === 0) {
        toast({
            title: "Export Failed",
            description: "No timetable data available for the current selection.",
            variant: "destructive",
        });
        return;
    }

    const sheetName = `${selectedLecturer}-Timetable`;
    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
        header,
        ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    filteredTimetable.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        const group = filteredTimetable.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration
        );
        
        const cellContent = group.map(g => {
            const subject = g.type === 'Practical' ? `LAB: ${g.subject}` : g.subject;
            const room = g.room;
            const batches = g.batches?.join(', ');
            return [subject, room, batches].filter(Boolean).join('\n');
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

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    
    // Set column widths
    const columnWidths = [
      { wch: 15 }, // Day/Time
      ...TIME_SLOTS.map(() => ({ wch: 25 })) // Time slots
    ];
    worksheet['!cols'] = columnWidths;

    // Apply bold formatting to headers and enable text wrapping
    for (let C = 0; C < header.length; ++C) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: 0});
        if(worksheet[cellAddress]) {
            worksheet[cellAddress].s = { font: { bold: true }, alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
        }
    }
    
    // Enable text wrapping for all cells
    for(let R = 1; R < grid.length; ++R) {
        for(let C = 0; C < grid[R].length; ++C) {
            const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
            if(worksheet[cellAddress]) {
                 worksheet[cellAddress].s = { alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
            }
        }
    }

    // Handle merged cells
    worksheet['!merges'] = [];
    filteredTimetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        
        if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
             const existingMerge = worksheet['!merges']?.find(m => m.s.r === dayIndex && m.s.c === timeIndex);
            if (!existingMerge) {
                worksheet['!merges']?.push({
                    s: { r: dayIndex, c: timeIndex },
                    e: { r: dayIndex, c: timeIndex + entry.duration - 1 }
                });
            }
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);

    toast({ title: "Export Successful", description: `Timetable for ${selectedLecturer} has been exported.` });
}, [selectedLecturer, filteredTimetable, toast]);

if (timetablesLoading) {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
               <Skeleton className="h-10 w-[280px]" />
               <Skeleton className="h-10 w-[170px]" />
            </div>
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
       <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
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
            <Button onClick={handleExportSheet} disabled={!selectedLecturer}>
              <FileSpreadsheet />
              Export as Sheet
            </Button>
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
