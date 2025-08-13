
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
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
import type { TimetableEntry } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { useTimetables } from '@/context/TimetableContext';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export default function LecturerDashboardPage() {
  const { timetables: timetableMetadatas, loading: metadataLoading } = useTimetableData();
  const { setActiveTimetable } = useTimetables();
  const { toast } = useToast();
  
  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [activeTab, setActiveTab] = useState('my-timetable');
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');

  const { timetable: activeTimetable, loading: timetableLoading } = useTimetableData(selectedTimetableId);

  useEffect(() => {
    if (activeTimetable) {
        setActiveTimetable(activeTimetable);
    }
  }, [activeTimetable, setActiveTimetable]);

  useEffect(() => {
    if (!metadataLoading && timetableMetadatas.length > 0 && !selectedTimetableId) {
      setSelectedTimetableId(timetableMetadatas[0].id);
    }
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0].name);
    }
  }, [timetableMetadatas, selectedTimetableId, selectedLecturer, metadataLoading]);

  const lecturerTimetable = useMemo(() => 
    activeTimetable && activeTimetable.timetable && selectedLecturer 
      ? activeTimetable.timetable.filter(entry => entry.lecturer.includes(selectedLecturer))
      : [],
    [activeTimetable, selectedLecturer]
  );

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable || !selectedLecturer) {
        toast({
            title: "Export Failed",
            description: "No timetable or lecturer selected.",
            variant: "destructive",
        });
        return;
    }

    const timetableToExport = activeTab === 'my-timetable' ? lecturerTimetable : activeTimetable.timetable;
    const sheetName = activeTab === 'my-timetable' ? `${selectedLecturer}-Timetable` : `${activeTimetable.name}-Master`;

    const grid = [
        ["Day/Time", ...TIME_SLOTS],
        ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];

    timetableToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0) {
             const cellContent = [
                entry.subject,
                entry.lecturer,
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
    timetableToExport.forEach(entry => {
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

    toast({ title: "Export Successful", description: `Timetable exported.` });
}, [activeTimetable, selectedLecturer, activeTab, lecturerTimetable, toast]);

const isLoading = metadataLoading || timetableLoading;

if (isLoading) {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
               <Skeleton className="h-10 w-[200px]" />
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
        <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedLecturer} onValueChange={setSelectedLecturer} disabled={LECTURERS.length === 0}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Lecturer" />
                </SelectTrigger>
                <SelectContent>
                    {LECTURERS.map(lecturer => (
                        <SelectItem key={lecturer.id} value={lecturer.name}>{lecturer.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedTimetableId} onValueChange={setSelectedTimetableId} disabled={timetableMetadatas.length === 0}>
              <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Department & Year" />
              </SelectTrigger>
              <SelectContent>
                  {timetableMetadatas.map(timetable => (
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
                            Personalized timetable for {selectedLecturer} from {activeTimetable.name}.
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
                            Full read-only timetable. Your classes are highlighted.
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
            <p className="text-muted-foreground mb-2">No timetable data to display.</p>
            <p className="text-muted-foreground text-center">Please select a lecturer and a timetable.</p>
        </div>
       )}
    </div>
  );
}
