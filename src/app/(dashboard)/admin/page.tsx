"use client"

import { useState } from 'react';
import { Timetable } from '@/components/shared/timetable';
import { MASTER_SCHEDULE } from '@/lib/mock-data';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Eye, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import type { ScheduleEntry } from '@/lib/types';
import { EditClassDialog } from '@/components/admin/edit-class-dialog';

export default function AdminDashboardPage() {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(MASTER_SCHEDULE);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ScheduleEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddClass = (newClass: Omit<ScheduleEntry, 'id'>) => {
    const newEntry: ScheduleEntry = {
      ...newClass,
      id: `c${schedule.length + 1}`, // simple id generation
    };
    setSchedule([...schedule, newEntry]);
    toast({
      title: "Class Added!",
      description: `"${newClass.subject}" has been added to the master timetable.`,
    });
  };

  const handleEditClass = (entry: ScheduleEntry) => {
    setSelectedClass(entry);
    setIsEditDialogOpen(true);
  };

  const handleUpdateClass = (updatedClass: ScheduleEntry) => {
    setSchedule(schedule.map(entry => entry.id === updatedClass.id ? updatedClass : entry));
    toast({
        title: "Class Updated!",
        description: `"${updatedClass.subject}" has been successfully updated.`,
    });
    setIsEditDialogOpen(false);
    setSelectedClass(null);
  };
  
  const handleDeleteClass = (classId: string) => {
     setSchedule(schedule.filter(entry => entry.id !== classId));
     toast({
        title: "Class Deleted",
        description: "The class has been removed from the timetable.",
        variant: "destructive",
     });
     setIsEditDialogOpen(false);
     setSelectedClass(null);
  }

  const handleDeleteTimetable = () => {
    setSchedule([]);
    toast({
      title: "Timetable Deleted",
      description: "The master timetable has been cleared.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetable</h1>
      </div>
      <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex items-center justify-end gap-2 flex-wrap">
            <AddClassDialog onAddClass={handleAddClass} />
            <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? <XCircle className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
              {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Timetable
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    entire master timetable and remove all scheduled classes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTimetable}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
             <Button variant="secondary">
              <Eye className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
        </div>
        <div className="p-6 pt-0">
            <p className="text-muted-foreground mb-6">
                This is the central schedule for all lecturers and classes. Changes made here will automatically update individual lecturer timetables.
                {isEditMode && <span className="block font-semibold text-primary mt-2">Edit mode is active. Click on a class to modify it.</span>}
            </p>
            <Timetable 
                entries={schedule} 
                view="admin" 
                isEditMode={isEditMode}
                onEdit={handleEditClass}
            />
        </div>
      </div>
      {selectedClass && (
        <EditClassDialog
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            classEntry={selectedClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
        />
      )}
    </div>
  );
}
