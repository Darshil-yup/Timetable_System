"use client";

import { Timetable } from '@/components/shared/timetable';
import { MASTER_SCHEDULE, LECTURERS } from '@/lib/mock-data';
import type { ScheduleEntry, TimetableData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useState } from 'react';

export default function LecturerDashboardPage() {
  // In a real app, you'd get the logged-in user's ID. Here we mock it.
  const currentLecturerName = LECTURERS[0].name;

  // In a real app, this would likely be fetched or managed globally.
  // For now, we use a local state initialized with mock data.
  const [timetables] = useState<TimetableData[]>(MASTER_SCHEDULE);

  // Flatten all schedules from all timetables and then filter by lecturer
  const allScheduleEntries = timetables.flatMap(timetable => timetable.schedule);
  
  const lecturerSchedule = allScheduleEntries.filter(
    (entry: ScheduleEntry) => entry.lecturer.includes(currentLecturerName)
  );

  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Timetable</h1>
      </div>
       <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
         <div className="p-6 flex items-center justify-end gap-2">
            <Button variant="secondary">
              <Eye className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
        </div>
        <div className="p-6 pt-0">
          <p className="text-muted-foreground mb-6">
            Here are your scheduled classes for the week. This schedule is automatically updated.
          </p>
          <Timetable entries={lecturerSchedule} view="lecturer" />
        </div>
      </div>
    </div>
  );
}
