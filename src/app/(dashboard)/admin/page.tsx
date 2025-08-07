"use client"

import { useState } from 'react';
import { Timetable } from '@/components/shared/timetable';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';
import type { ScheduleEntry } from '@/lib/types';
import { EditClassDialog } from '@/components/admin/edit-class-dialog';
import { useTimetables } from '@/context/TimetableContext';

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function AdminDashboardPage() {
  const { timetables, setTimetables } = useTimetables();
  const [selectedTimetableId, setSelectedTimetableId] = useState(timetables[0]?.id || '');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ScheduleEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const activeTimetable = timetables.find(t => t.id === selectedTimetableId);

  const updateActiveTimetableSchedule = (newSchedule: ScheduleEntry[]) => {
    setTimetables(timetables.map(t => 
        t.id === selectedTimetableId ? { ...t, schedule: newSchedule } : t
    ));
  }
  
  const handleAddClass = (newClass: Omit<ScheduleEntry, 'id'>) => {
    if (!activeTimetable) return;

    const newEntry: ScheduleEntry = {
      ...newClass,
      id: `c${Date.now()}`,
    };
    updateActiveTimetableSchedule([...activeTimetable.schedule, newEntry]);
    toast({
      title: "Class Added!",
      description: `"${newClass.subject}" has been added to the timetable.`,
    });
  };

  const handleEditClass = (entry: ScheduleEntry) => {
    setSelectedClass(entry);
    setIsEditDialogOpen(true);
  };

  const handleUpdateClass = (updatedClass: ScheduleEntry) => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule(activeTimetable.schedule.map(entry => entry.id === updatedClass.id ? updatedClass : entry));
    toast({
        title: "Class Updated!",
        description: `"${updatedClass.subject}" has been successfully updated.`,
    });
    setIsEditDialogOpen(false);
    setSelectedClass(null);
  };
  
  const handleDeleteClass = (classId: string) => {
    if (!activeTimetable) return;
     updateActiveTimetableSchedule(activeTimetable.schedule.filter(entry => entry.id !== classId));
     toast({
        title: "Class Deleted",
        description: "The class has been removed from the timetable.",
        variant: "destructive",
     });
     setIsEditDialogOpen(false);
     setSelectedClass(null);
  }

  const handleDeleteTimetable = () => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule([]);
    toast({
      title: "Timetable Cleared",
      description: `The timetable for "${activeTimetable.name}" has been cleared.`,
      variant: "destructive",
    })
  }
  
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetables</h1>
        <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedTimetableId} onValueChange={setSelectedTimetableId}>
            <SelectTrigger className="w-auto md:w-[280px]">
                <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
                {timetables.map(timetable => (
                <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                ))}
            </SelectContent>
            </Select>
            <Select defaultValue={YEARS[0]}>
            <SelectTrigger className="w-auto md:w-[180px]">
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
     
      {activeTimetable ? (
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
                        entire timetable for {activeTimetable.name}.
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
                    This is the central schedule for {activeTimetable.name}. Changes made here will automatically update individual lecturer timetables.
                    {isEditMode && <span className="block font-semibold text-primary mt-2">Edit mode is active. Click on a class to modify it.</span>}
                </p>
                <Timetable 
                    entries={activeTimetable.schedule} 
                    view="admin" 
                    isEditMode={isEditMode}
                    onEdit={handleEditClass}
                />
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground">Select a department to view the timetable.</p>
        </div>
      )}
      
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
