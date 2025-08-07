import { Timetable } from '@/components/shared/timetable';
import { MASTER_SCHEDULE, LECTURERS } from '@/lib/mock-data';
import type { ScheduleEntry } from '@/lib/types';

export default function LecturerDashboardPage() {
  // In a real app, you'd get the logged-in user's ID. Here we mock it.
  const currentLecturerName = LECTURERS[0].name;

  const lecturerSchedule = MASTER_SCHEDULE.filter(
    (entry: ScheduleEntry) => entry.lecturer === currentLecturerName
  );

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Timetable</h1>
      </div>
      <p className="text-muted-foreground mb-6">
        Here are your scheduled classes for the week. This schedule is automatically updated.
      </p>
      <Timetable entries={lecturerSchedule} view="lecturer" />
    </div>
  );
}
