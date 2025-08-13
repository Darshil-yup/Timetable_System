
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
import { ALL_LABS } from './class-form';
import type { TimetableData } from '@/lib/types';
import { FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

interface LabViewProps {
  activeTimetable: TimetableData | undefined | null;
  isLoading: boolean;
}

export const LabView: React.FC<LabViewProps> = ({ activeTimetable, isLoading }) => {
  const { toast } = useToast();
  const [selectedLab, setSelectedLab] = useState('all');

  const practicalTimetable = useMemo(() =>
    activeTimetable?.timetable.filter(e => e.type === 'Practical') || [],
    [activeTimetable]
  );
  
  const filteredPracticalTimetable = useMemo(() => {
    if (selectedLab === 'all') return practicalTimetable;
    return practicalTimetable.filter(e => e.room === selectedLab);
  }, [practicalTimetable, selectedLab]);

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable) return toast({ title: "Export Failed", variant: "destructive" });

    const grid = [
      ["Day/Time", ...TIME_SLOTS],
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    filteredPracticalTimetable.forEach(entry => {
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
    filteredPracticalTimetable.forEach(entry => {
      const dayIndex = DAYS.indexOf(entry.day) + 1;
      const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
      if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
          worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
      }
    });

    const workbook = XLSX.utils.book_new();
    const sheetName = selectedLab === 'all' ? 'All Labs' : selectedLab;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${activeTimetable.name}-${sheetName}.xlsx`);
    toast({ title: "Export Successful" });
  }, [activeTimetable, filteredPracticalTimetable, selectedLab, toast]);

  if (!activeTimetable && !isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground">Please select a timetable to view lab schedules.</p>
        </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Lab Timetable</CardTitle>
          <CardDescription>Read-only view for practicals. Filter by specific lab.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedLab} onValueChange={setSelectedLab}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Labs</SelectItem>
              {ALL_LABS.map(lab => <SelectItem key={lab} value={lab}>{lab}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportSheet} disabled={isLoading || !activeTimetable}>
            <FileSpreadsheet />
            Export as Sheet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
         {isLoading ? <Skeleton className="h-[600px] w-full" /> : 
            <Timetable entries={filteredPracticalTimetable} view="admin" />
         }
      </CardContent>
    </Card>
  );
};
