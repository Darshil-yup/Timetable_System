
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, User } from 'lucide-react';
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

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function LecturerDashboardPage() {
  const { toast } = useToast();
  const { allTimetables, loading: timetablesLoading } = useTimetables();
  
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');
  
  useEffect(() => {
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0].name);
    }
  }, [selectedLecturer]);

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

  const handleExportSheet = useCallback(() => {
    if (!selectedLecturer || lecturerTimetable.length === 0) {
        toast({
            title: "Export Failed",
            description: "No timetable data available for the selected lecturer.",
            variant: "destructive",
        });
        return;
    }

    const sheetName = `${selectedLecturer}-Timetable`;

    const grid = [
        ["Day/Time", ...TIME_SLOTS],
        ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];

    lecturerTimetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0) {
             const cellContent = [
                entry.subject,
                entry.room,
                entry.batches?.join(', '),
            ].filter(Boolean).join('\n');
            
            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + i < grid[0].length) {
                    grid[dayIndex][timeIndex + i] = cellContent;
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    worksheet['!merges'] = [];
    lecturerTimetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
            worksheet['!merges']?.push({
                s: { r: dayIndex, c: timeIndex },
                e: { r: dayIndex, c: timeIndex + entry.duration - 1 }
            });
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);

    toast({ title: "Export Successful", description: `Timetable for ${selectedLecturer} has been exported.` });
}, [selectedLecturer, lecturerTimetable, toast]);

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
            <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
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
            <Button variant="outline" onClick={handleExportSheet} disabled={!selectedLecturer}>
              <FileSpreadsheet />
              Export as Sheet
            </Button>
      </div>

      {selectedLecturer ? (
        <Card>
            <CardHeader>
                <CardTitle>Consolidated Timetable for {selectedLecturer}</CardTitle>
                <CardDescription>
                    This is a combined weekly schedule for {selectedLecturer}, including all assigned classes and labs across all departments and semesters.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Timetable 
                    entries={lecturerTimetable} 
                    view="lecturer"
                />
            </CardContent>
        </Card>
       ) : (
         <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-2">No lecturer selected.</p>
            <p className="text-muted-foreground text-center">Please select a lecturer to view their consolidated timetable.</p>
        </div>
       )}
    </div>
  );
}

    