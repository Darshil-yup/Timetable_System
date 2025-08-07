import { Timetable } from '@/components/shared/timetable';
import { MASTER_SCHEDULE } from '@/lib/mock-data';
import { AddClassDialog } from '@/components/admin/add-class-dialog';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetable</h1>
        <AddClassDialog />
      </div>
      <p className="text-muted-foreground mb-6">
        This is the central schedule for all lecturers and classes. Changes made here will automatically update individual lecturer timetables.
      </p>
      <Timetable entries={MASTER_SCHEDULE} view="admin" />
    </div>
  );
}
