
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
            entry.type === 'Lecture'
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

    const grid: (string | null)[][] = [
      ["Day/Time", ...TIME_SLOTS],
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    filteredLectureTimetable.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex > -1 && timeIndex > -1) {
            const cellContent = [entry.subject, entry.lecturer, entry.room].filter(Boolean).join('\n');
            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + 1 + i < grid[0].length) {
                    if (grid[dayIndex + 1][timeIndex + 1] === null) {
                        grid[dayIndex + 1][timeIndex + 1] = cellContent;
                    } else {
                        grid[dayIndex + 1][timeIndex + 1] += `\n\n${cellContent}`;
                    }
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    worksheet['!merges'] = [];
    const processedMerges = new Set();
    filteredLectureTimetable.forEach(entry => {
      const dayIndex = DAYS.indexOf(entry.day) + 1;
      const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
      const mergeKey = `${dayIndex}-${timeIndex}`;
      if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1 && !processedMerges.has(mergeKey)) {
          worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
          processedMerges.add(mergeKey);
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
              <Button variant="outline" onClick={handleExportSheet}>
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
