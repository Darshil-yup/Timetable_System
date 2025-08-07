import { Timetable } from '@/components/shared/timetable';
import { MASTER_SCHEDULE } from '@/lib/mock-data';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetable</h1>
      </div>
      <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex items-center justify-end gap-2">
            <AddClassDialog />
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Modify Timetable
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Timetable
            </Button>
             <Button variant="secondary">
              <Eye className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
        </div>
        <div className="p-6 pt-0">
            <p className="text-muted-foreground mb-6">
                This is the central schedule for all lecturers and classes. Changes made here will automatically update individual lecturer timetables.
            </p>
            <Timetable entries={MASTER_SCHEDULE} view="admin" />
        </div>
      </div>
    </div>
  );
}
