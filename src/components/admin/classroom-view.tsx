
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timetable } from '@/components/shared/timetable';
import { ALL_CLASSROOMS } from './class-form';
import type { TimetableData, TimetableEntry } from '@/lib/types';
import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import { ClassDetailsDialog } from '../shared/class-details-dialog';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export const ClassroomView: React.FC = React.memo(() => {
  const { toast } = useToast();
  const { allTimetables, loading } = useTimetables();
  const [selectedRoom, setSelectedRoom] = useState(ALL_CLASSROOMS[0]);
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);

  const lectureTimetable = useMemo(() => {
    if (!allTimetables) return [];
    const allClasses: TimetableEntry[] = [];
    allTimetables.forEach(timetable => {
        const lectureClasses = timetable.timetable.filter(entry => 
            entry.type === 'Lecture' && entry.room && ALL_CLASSROOMS.includes(entry.room)
        );
        allClasses.push(...lectureClasses);
    });
    return allClasses;
  }, [allTimetables]);
  
  const filteredLectureTimetable = useMemo(() => {
    if (selectedRoom === 'all') return lectureTimetable;
    return lectureTimetable.filter(e => e.room === selectedRoom);
  }, [lectureTimetable, selectedRoom]);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);

  const handleExportSheet = useCallback(() => {
    if (!filteredLectureTimetable || filteredLectureTimetable.length === 0) {
        toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" });
        return;
    }

    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
      header,
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    filteredLectureTimetable.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        const group = filteredLectureTimetable.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration &&
          e.room === entry.room
        );
        
        const cellContent = group.map(g => {
            const subject = g.subject;
            const lecturer = g.lecturer;
            const batches = g.batches?.join(', ');
            return [subject, lecturer, batches].filter(Boolean).join('\n');
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
    filteredLectureTimetable.forEach(entry => {
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
    const sheetName = selectedRoom === 'all' ? 'All Classrooms' : selectedRoom;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `Consolidated-${sheetName}.xlsx`);
    toast({ title: "Export Successful" });
  }, [filteredLectureTimetable, selectedRoom, toast]);

  if (loading) {
    return <Skeleton className="h-[700px] w-full" />
  }

  if (!allTimetables) {
    return (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground">No timetable data available.</p>
        </div>
    );
  }

  return (
    <>
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Consolidated Classroom Timetable</CardTitle>
              <CardDescription>View of all lectures scheduled in a classroom across all timetables.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classrooms</SelectItem>
                  {ALL_CLASSROOMS.map(room => <SelectItem key={room} value={room}>{room}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button onClick={handleExportSheet}>
                <FileSpreadsheet />
                Export as Sheet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Timetable entries={filteredLectureTimetable} view="admin" onCellClick={handleCellClick} />
          </CardContent>
        </Card>
        {viewingEntries && (
            <ClassDetailsDialog
                isOpen={!!viewingEntries}
                onOpenChange={(isOpen) => !isOpen && closeDetailsDialog()}
                entries={viewingEntries}
            />
        )}
    </>
  );
});

ClassroomView.displayName = 'ClassroomView';
