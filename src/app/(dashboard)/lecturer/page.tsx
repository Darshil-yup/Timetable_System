
"use client";

import React, { useState } from 'react';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import type { ScheduleEntry, TimetableData } from '@/lib/types';
import { useTimetables } from '@/context/TimetableContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LecturerDashboardPage() {
  const { timetables } = useTimetables();
  
  const [selectedTimetableId, setSelectedTimetableId] = useState(timetables[0]?.id || '');
  const [currentLecturerName, setCurrentLecturerName] = useState(LECTURERS[0]?.name || '');

  React.useEffect(() => {
    if (timetables.length > 0 && !selectedTimetableId) {
      setSelectedTimetableId(timetables[0].id);
    }
    if (LECTURERS.length > 0 && !currentLecturerName) {
      setCurrentLecturerName(LECTURERS[0].name);
    }
  }, [timetables, selectedTimetableId, currentLecturerName]);

  const activeTimetable = timetables.find(t => t.id === selectedTimetableId);

  const lecturerSchedule = activeTimetable 
    ? activeTimetable.schedule.filter(entry => entry.lecturer.includes(currentLecturerName))
    : [];

  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Lecturer Dashboard</h1>
        <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedTimetableId} onValueChange={setSelectedTimetableId}>
              <SelectTrigger className="w-auto md:w-[280px]">
                  <SelectValue placeholder="Select Department & Year" />
              </SelectTrigger>
              <SelectContent>
                  {timetables.map(timetable => (
                  <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Select value={currentLecturerName} onValueChange={setCurrentLecturerName}>
              <SelectTrigger className="w-auto md:w-[280px]">
                  <SelectValue placeholder="Select Lecturer" />
              </SelectTrigger>
              <SelectContent>
                  {LECTURERS.map(lecturer => (
                  <SelectItem key={lecturer.id} value={lecturer.name}>{lecturer.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
        </div>
      </div>

      {activeTimetable && currentLecturerName ? (
        <Tabs defaultValue="my-timetable">
            <TabsList className="mb-4">
                <TabsTrigger value="my-timetable">My Timetable</TabsTrigger>
                <TabsTrigger value="master-timetable">Master Timetable</TabsTrigger>
            </TabsList>
            <TabsContent value="my-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule for {currentLecturerName}</CardTitle>
                        <CardDescription>
                            Displaying the personalized timetable for {currentLecturerName} from the {activeTimetable.name} schedule.
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
                            highlightedLecturer={currentLecturerName}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
       ) : (
         <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-4">No timetable or lecturer selected.</p>
            <p className="text-muted-foreground">Admins can create timetables and register lecturers.</p>
        </div>
       )}
    </div>
  );
}
