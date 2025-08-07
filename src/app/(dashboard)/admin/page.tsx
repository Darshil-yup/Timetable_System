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


export default function AdminDashboardPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const handleEditClass = (classEntry: ScheduleEntry) => {
    // In a real app, you would open a dialog pre-filled with classEntry data.
    // For this example, we'll just log to console and show a toast.
    console.log("Editing class:", classEntry);
    toast({
        title: "Editing Class",
        description: `You are now editing "${classEntry.subject}". (Functionality to be fully implemented)`,
    });
  };
  
  const handleDeleteTimetable = () => {
    // In a real app, this would trigger a backend call to delete data.
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
            <AddClassDialog />
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
                entries={MASTER_SCHEDULE} 
                view="admin" 
                isEditMode={isEditMode}
                onEdit={handleEditClass}
            />
        </div>
      </div>
    </div>
  );
}
