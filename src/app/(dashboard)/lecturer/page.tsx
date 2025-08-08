
"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { ScheduleEntry } from '@/lib/types';

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

  const lecturerSchedule = useMemo(() => 
    activeTimetable && selectedLecturer 
      ? activeTimetable.schedule.filter(entry => entry.lecturer.includes(selectedLecturer))
      : [],
    [activeTimetable, selectedLecturer]
  );

  const handleExportSheet = () => {
    if (!activeTimetable || !selectedLecturer) {
      toast({
          title: "Export Failed",
          description: "No active timetable or lecturer selected to export.",
          variant: "destructive",
      });
      return;
    }

    let scheduleToExport: ScheduleEntry[];
    let sheetName: string;

    if (activeTab === 'my-timetable') {
        scheduleToExport = lecturerSchedule;
        sheetName = `${selectedLecturer}-Schedule`;
    } else {
        scheduleToExport = activeTimetable.schedule;
        sheetName = `${activeTimetable.name}-Master`;
    }
    
    const data = scheduleToExport.map(entry => ({
      Day: entry.day,
      Time: entry.time,
      Subject: entry.subject,
      Type: entry.type,
      Lecturer: entry.lecturer,
      'Room/Lab': entry.room,
      Batches: entry.batches?.join(', ') || 'N/A',
      Duration: entry.duration
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);

    toast({
      title: "Export Successful",
      description: `The schedule has been exported to an Excel file.`,
    });
  };

  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Lecturer Dashboard</h1>
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
                  <SelectValue placeholder="Select Department & Year" />
              </SelectTrigger>
              <SelectContent>
                  {timetables.map(timetable => (
                  <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
             <Button variant="outline" onClick={handleExportSheet} disabled={!activeTimetable || !selectedLecturer}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
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
                        <CardTitle>Schedule for {selectedLecturer}</CardTitle>
                        <CardDescription>
                            Displaying the personalized timetable for {selectedLecturer} from the {activeTimetable.name} schedule.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={lecturerSchedule} 
                            view="lecturer"
                        />
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="master-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Master Schedule: {activeTimetable.name}</CardTitle>
                        <CardDescription>
                            This is the full, read-only timetable. Your classes are highlighted for convenience.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={activeTimetable.schedule} 
                            view="lecturer"
                            highlightedLecturer={selectedLecturer}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
       ) : (
         <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <User className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">No lecturer or timetable selected.</p>
            <p className="text-muted-foreground text-center">Please select a lecturer and a timetable from the dropdowns above to view schedules.</p>
        </div>
       )}
    </div>
  );
}
