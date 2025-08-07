"use client";

import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import type { ScheduleEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useTimetables } from '@/context/TimetableContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function LecturerDashboardPage() {
  // In a real app, you'd get the logged-in user's ID. Here we mock it.
  const currentLecturerName = LECTURERS[0].name;

  // Consume the shared state from the context
  const { timetables } = useTimetables();

  // Flatten all schedules from all timetables and then filter by lecturer
  const allScheduleEntries = timetables.flatMap(timetable => timetable.schedule);
  
  const lecturerSchedule = allScheduleEntries.filter(
    (entry: ScheduleEntry) => entry.lecturer.includes(currentLecturerName)
  );
  
  const departmentNames = timetables.map(t => t.name);

  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Timetable</h1>
           <div className="flex items-center gap-2">
             <Select defaultValue={departmentNames[0]}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentNames.map(name => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue={YEARS[0]}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
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
