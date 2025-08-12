
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { TimetableEntry } from '@/lib/types';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function LecturerDashboardPage() {
  const { timetables } = useTimetables();
  const { toast } = useToast();
  
  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [activeTab, setActiveTab] = useState('my-timetable');
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');

  useEffect(() => {
    if (timetables.length > 0 && !timetables.some(t => t.id === selectedTimetableId)) {
      setSelectedTimetableId(timetables[0]?.id || '');
    }
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0]?.name || '');
    }
  }, [timetables, selectedTimetableId, selectedLecturer]);

  const activeTimetable = useMemo(() => 
    timetables.find(t => t.id === selectedTimetableId), 
    [timetables, selectedTimetableId]
  );

  const lecturerTimetable = useMemo(() => 
    activeTimetable && selectedLecturer 
      ? activeTimetable.timetable.filter(entry => entry.lecturer.includes(selectedLecturer))
      : [],
    [activeTimetable, selectedLecturer]
  );

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable || !selectedLecturer) {
        toast({
            title: "Export Failed",
            description: "No active timetable or lecturer selected to export.",
            variant: "destructive",
        });
        return;
    }

    let timetableToExport: TimetableEntry[];
    let sheetName: string;

    if (activeTab === 'my-timetable') {
        timetableToExport = lecturerTimetable;
        sheetName = `${selectedLecturer}-Timetable`;
    } else {
        timetableToExport = activeTimetable.timetable;
        sheetName = `${activeTimetable.name}-Master`;
    }

    const grid: (string | null)[][] = Array(DAYS.length + 1).fill(null).map(() => Array(TIME_SLOTS.length + 1).fill(null));
    
    grid[0][0] = "Day/Time";
    TIME_SLOTS.forEach((time, i) => grid[0][i + 1] = time);
    DAYS.forEach((day, i) => grid[i + 1][0] = day);

    timetableToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex !== -1 && timeIndex !== -1) {
             const cellContent = [
                entry.subject,
                entry.lecturer,
                entry.room,
                entry.batches && entry.batches.length > 0 ? `${entry.batches.join(', ')}` : null,
            ].filter(Boolean).join('\n');
            
            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + i < TIME_SLOTS.length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = cellContent;
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);

    worksheet['!merges'] = [];
    timetableToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex !== -1 && timeIndex !== -1 && entry.duration && entry.duration > 1) {
            worksheet['!merges']?.push({
                s: { r: dayIndex + 1, c: timeIndex + 1 },
                e: { r: dayIndex + 1, c: timeIndex + entry.duration }
            });
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);

    toast({
        title: "Export Successful",
        description: `The timetable has been exported to an Excel file.`,
    });
}, [activeTimetable, selectedLecturer, activeTab, lecturerTimetable, toast]);


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
       <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedLecturer} onValueChange={setSelectedLecturer} disabled={LECTURERS.length === 0}>
                <SelectTrigger className="w-auto md:w-[200px]">
                    <SelectValue placeholder="Select Lecturer" />
                </SelectTrigger>
                <SelectContent>
                    {LECTURERS.map(lecturer => (
                        <SelectItem key={lecturer.id} value={lecturer.name}>{lecturer.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedTimetableId} onValueChange={setSelectedTimetableId} disabled={timetables.length === 0}>
              <SelectTrigger className="w-auto md:w-[280px]">
                  <SelectValue placeholder="Select Department &amp; Year" />
              </SelectTrigger>
              <SelectContent>
                  {timetables.map(timetable => (
                  <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
             <Button variant="outline" onClick={handleExportSheet} disabled={!activeTimetable || !selectedLecturer}>
              <FileSpreadsheet />
              Export as Sheet
            </Button>
        </div>
      </div>

      {activeTimetable && selectedLecturer ? (
        <Tabs defaultValue="my-timetable" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="my-timetable">My Timetable</TabsTrigger>
                <TabsTrigger value="master-timetable">Master Timetable</TabsTrigger>
            </TabsList>
            <TabsContent value="my-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Timetable for {selectedLecturer}</CardTitle>
                        <CardDescription>
                            Displaying the personalized timetable for {selectedLecturer} from the {activeTimetable.name} timetable.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={lecturerTimetable} 
                            view="lecturer"
                        />
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="master-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Master Timetable: {activeTimetable.name}</CardTitle>
                        <CardDescription>
                            This is the full, read-only timetable. Your classes are highlighted for convenience.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={activeTimetable.timetable} 
                            view="lecturer"
                            highlightedLecturer={selectedLecturer}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
       ) : (
         <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-2">No lecturer or timetable selected.</p>
            <p className="text-muted-foreground text-center">Please select a lecturer and a timetable from the dropdowns above to view timetables.</p>
        </div>
       )}
    </div>
  );
}
