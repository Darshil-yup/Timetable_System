
"use client";

import { useState } from 'react';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import type { ScheduleEntry } from '@/lib/types';
import { useTimetables } from '@/context/TimetableContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LecturerDashboardPage() {
  // In a real app, you'd get the logged-in user's ID. Here we mock it.
  const [currentLecturerName, setCurrentLecturerName] = useState(LECTURERS[0].name);

  const { timetables } = useTimetables();

  // Flatten all schedules from all timetables and then filter by lecturer
  const allScheduleEntries = timetables.flatMap(timetable => timetable.schedule);
  
  const lecturerSchedule = allScheduleEntries.filter(
    (entry: ScheduleEntry) => entry.lecturer.includes(currentLecturerName)
  );
  
  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Timetable</h1>
        <div className="flex items-center gap-2 flex-wrap">
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
       <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="p-6 pt-0">
          <p className="text-muted-foreground my-6">
            Here are your scheduled classes for the week. This schedule is automatically updated from the master timetable.
          </p>
          <Timetable entries={lecturerSchedule} view="lecturer" />
        </div>
      </div>
    </div>
  );
}
