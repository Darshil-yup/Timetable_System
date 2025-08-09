
"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Timetable } from '@/components/shared/timetable';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, XCircle, FileSpreadsheet, LineChart } from 'lucide-react';
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
import type { ScheduleEntry, TimetableData } from '@/lib/types';
import { EditClassDialog } from '@/components/admin/edit-class-dialog';
import { useTimetables } from '@/context/TimetableContext';
import { AddTimetableDialog } from '@/components/admin/add-timetable-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassUsageChart } from '@/components/admin/analytics/ClassUsageChart';
import { LecturerWorkloadChart } from '@/components/admin/analytics/LecturerWorkloadChart';
import { FreeRoomSlots } from '@/components/admin/analytics/FreeRoomSlots';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"];

const TimetableActions = React.memo(({ onAddClass, isEditMode, onToggleEditMode, handleExportSheet }: {
    onAddClass: (newClass: Omit<ScheduleEntry, 'id'>) => void;
    isEditMode: boolean;
    onToggleEditMode: () => void;
    handleExportSheet: () => void;
}) => (
    <div className="flex items-center justify-end gap-2 flex-wrap">
        <Button variant="outline" onClick={handleExportSheet}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span className="px-0.5">Export as Sheet</span>
        </Button>
        <AddClassDialog onAddClass={onAddClass} />
        <Button variant="outline" onClick={onToggleEditMode}>
            {isEditMode ? <XCircle className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
            <span className="px-0.5">{isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}</span>
        </Button>
    </div>
));
TimetableActions.displayName = 'TimetableActions';

export default function AdminDashboardPage() {
  const { timetables, setTimetables } = useTimetables();
  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ScheduleEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('master');
  const [selectedRoom, setSelectedRoom] = useState('all');

  const activeTimetable = useMemo(() => timetables.find(t => t.id === selectedTimetableId), [timetables, selectedTimetableId]);

  useEffect(() => {
    if (!selectedTimetableId && timetables.length > 0) {
      setSelectedTimetableId(timetables[0].id);
    } else if (timetables.length === 0 && selectedTimetableId) {
      setSelectedTimetableId('');
    }
  }, [timetables, selectedTimetableId]);
  
  useEffect(() => {
    setSelectedRoom('all');
  }, [activeTab, selectedTimetableId]);

  const handleSelectTimetable = useCallback((id: string) => {
    setSelectedTimetableId(id);
    setIsEditMode(false);
    setSelectedClass(null);
    setIsEditDialogOpen(false);
  }, []);
  
  const openEditDialog = useCallback((entry: ScheduleEntry) => {
    setSelectedClass(entry);
    setIsEditDialogOpen(true);
  }, []);

  const closeEditDialog = useCallback(() => {
    setSelectedClass(null);
    setIsEditDialogOpen(false);
  }, []);

  const updateActiveTimetableSchedule = useCallback((newSchedule: ScheduleEntry[]) => {
    setTimetables(currentTimetables => 
        currentTimetables.map(t => 
            t.id === selectedTimetableId ? { ...t, schedule: newSchedule } : t
        )
    );
  }, [selectedTimetableId, setTimetables]);

  const checkForConflicts = useCallback((newClass: Omit<ScheduleEntry, 'id'>, existingSchedule: ScheduleEntry[], updatingClassId?: string): boolean => {
    const newClassStartTime = parseInt(newClass.time.split('-')[0].split(':')[0]);
    const newClassEndTime = newClassStartTime + (newClass.duration || 1);
  
    const scheduleToCheck = existingSchedule.filter(entry => entry.id !== updatingClassId);

    for (const existingEntry of scheduleToCheck) {
      if (existingEntry.day !== newClass.day || existingEntry.type === 'Recess' || newClass.type === 'Recess') {
        continue;
      }
      
      const existingStartTime = parseInt(existingEntry.time.split('-')[0].split(':')[0]);
      const existingEndTime = existingStartTime + (existingEntry.duration || 1);

      // Check for any overlap in time
      const isOverlapping = newClassStartTime < existingEndTime && newClassEndTime > existingStartTime;

      if (isOverlapping) {
        // Lecturer conflict check
        if (newClass.lecturer && existingEntry.lecturer) {
          const newLecturers = newClass.lecturer.split(',').map(l => l.trim()).filter(Boolean);
          const existingLecturers = existingEntry.lecturer.split(',').map(l => l.trim()).filter(Boolean);
          const conflictingLecturer = newLecturers.find(l => existingLecturers.includes(l));
          if (conflictingLecturer) {
            toast({
              variant: "destructive",
              title: "Lecturer Conflict",
              description: `${conflictingLecturer} is already scheduled for "${existingEntry.subject}" at this time.`,
            });
            return true;
          }
        }
        
        // Room/Lab conflict check
        if (newClass.room && existingEntry.room && newClass.room === existingEntry.room) {
          toast({
            variant: "destructive",
            title: "Room/Lab Conflict",
            description: `Room ${newClass.room} is already booked for "${existingEntry.subject}" at this time.`,
          });
          return true;
        }

        // Batch conflict for practicals
        if (newClass.type === 'Practical' && existingEntry.type === 'Practical' && newClass.batches && existingEntry.batches) {
           const newBatches = newClass.batches;
           const existingBatches = existingEntry.batches;
           const conflictingBatch = newBatches.find(b => existingBatches.includes(b));
           if (conflictingBatch) {
             toast({
               variant: "destructive",
               title: "Batch Conflict",
               description: `Batch ${conflictingBatch} is already scheduled for a practical ("${existingEntry.subject}") at this time.`,
             });
             return true;
           }
        }
      }
    }
    return false;
  }, [toast]);
  
  const handleAddClass = useCallback((newClass: Omit<ScheduleEntry, 'id'>) => {
    if (!activeTimetable) return;

    if (checkForConflicts(newClass, activeTimetable.schedule)) {
      return;
    }

    const newEntry: ScheduleEntry = { ...newClass, id: `c${Date.now()}` };
    updateActiveTimetableSchedule([...activeTimetable.schedule, newEntry]);
    toast({
      title: "Class Added!",
      description: `"${newClass.subject}" has been added to the timetable.`,
    });
  }, [activeTimetable, checkForConflicts, updateActiveTimetableSchedule, toast]);
  
  const handleUpdateClass = useCallback((updatedClass: ScheduleEntry) => {
    if (!activeTimetable) return;
    
    if (checkForConflicts(updatedClass, activeTimetable.schedule, updatedClass.id)) {
      return;
    }

    updateActiveTimetableSchedule(activeTimetable.schedule.map(entry => entry.id === updatedClass.id ? updatedClass : entry));
    closeEditDialog();
    toast({
        title: "Class Updated!",
        description: `"${updatedClass.subject}" has been successfully updated.`,
    });
  }, [activeTimetable, checkForConflicts, updateActiveTimetableSchedule, closeEditDialog, toast]);
  
  const handleDeleteClass = useCallback((classId: string) => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule(activeTimetable.schedule.filter(entry => entry.id !== classId));
    closeEditDialog();
    toast({
       title: "Class Deleted",
       description: "The class has been removed from the timetable.",
       variant: "destructive",
    });
  }, [activeTimetable, updateActiveTimetableSchedule, closeEditDialog, toast]);

  const handleCreateTimetable = useCallback((name: string, year: string) => {
    const newTimetable: TimetableData = {
        id: `tt${Date.now()}`,
        name: `${name} (${year})`,
        schedule: []
    };
    setTimetables(currentTimetables => [...currentTimetables, newTimetable]);
    setSelectedTimetableId(newTimetable.id);
    toast({
        title: "Timetable Created!",
        description: `Timetable for "${newTimetable.name}" has been created.`,
    });
  }, [setTimetables, toast]);

  const handleDeleteTimetable = useCallback(() => {
    if (!activeTimetable) return;

    setTimetables(currentTimetables => currentTimetables.filter(t => t.id !== activeTimetable.id));
    
    toast({
      title: "Timetable Deleted",
      description: `The timetable for "${activeTimetable.name}" has been deleted.`,
      variant: "destructive",
    })
  }, [activeTimetable, setTimetables, toast]);

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable) {
        toast({
            title: "Export Failed",
            description: "No active timetable to export.",
            variant: "destructive",
        });
        return;
    }

    let scheduleToExport: ScheduleEntry[];
    let sheetName: string;

    const lectureSchedule = activeTimetable.schedule.filter(e => e.type === 'Lecture');
    const practicalSchedule = activeTimetable.schedule.filter(e => e.type === 'Practical');

    switch (activeTab) {
        case 'classroom':
            scheduleToExport = lectureSchedule;
            if (selectedRoom !== 'all') {
                scheduleToExport = scheduleToExport.filter(e => e.room === selectedRoom);
            }
            sheetName = 'Classroom Schedule';
            break;
        case 'lab':
            scheduleToExport = practicalSchedule;
            sheetName = 'Lab Schedule';
            break;
        default:
            scheduleToExport = activeTimetable.schedule;
            sheetName = 'Master Schedule';
            break;
    }

    const grid: (string | null)[][] = Array(DAYS.length + 1).fill(null).map(() => Array(TIME_SLOTS.length + 1).fill(null));

    grid[0][0] = "Day/Time";
    TIME_SLOTS.forEach((time, i) => grid[0][i + 1] = time);
    DAYS.forEach((day, i) => grid[i + 1][0] = day);

    scheduleToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex !== -1 && timeIndex !== -1) {
            const cellContent = [
                entry.subject,
                entry.lecturer,
                entry.room,
                entry.batches && entry.batches.length > 0 ? `Batches: ${entry.batches.join(', ')}` : null,
            ].filter(Boolean).join('\n');

            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + i < TIME_SLOTS.length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = cellContent;
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    
    worksheet['!merges'] = [];
    scheduleToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex !== -1 && timeIndex !== -1 && entry.duration && entry.duration > 1) {
            worksheet['!merges']?.push({
                s: { r: dayIndex + 1, c: timeIndex + 1 },
                e: { r: dayIndex + 1, c: timeIndex + entry.duration }
            });
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${activeTimetable.name}-${sheetName}.xlsx`);

    toast({
        title: "Export Successful",
        description: `The ${sheetName.toLowerCase()} has been exported to an Excel file.`,
    });
  }, [activeTimetable, activeTab, selectedRoom, toast]);

  const lectureSchedule = useMemo(() => 
    activeTimetable?.schedule.filter(e => e.type === 'Lecture') || [], 
    [activeTimetable]
  );
  
  const practicalSchedule = useMemo(() => 
    activeTimetable?.schedule.filter(e => e.type === 'Practical') || [], 
    [activeTimetable]
  );
  
  const classroomList = useMemo(() => {
    const rooms = lectureSchedule.map(e => e.room).filter(Boolean) as string[];
    return ['all', ...Array.from(new Set(rooms))];
  }, [lectureSchedule]);

  const filteredLectureSchedule = useMemo(() => {
      if (selectedRoom === 'all') return lectureSchedule;
      return lectureSchedule.filter(e => e.room === selectedRoom);
  }, [lectureSchedule, selectedRoom]);

  const toggleEditMode = useCallback(() => {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);
    if (newEditMode) {
      toast({
        title: "Edit Mode Active",
        description: "Click on any class in the timetable to modify it.",
        duration: 5000,
      });
    }
  }, [isEditMode, toast]);
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetables</h1>
        <div className="flex items-center gap-2 flex-wrap">
            <Select 
              value={selectedTimetableId} 
              onValueChange={handleSelectTimetable} 
              disabled={timetables.length === 0}
            >
              <SelectTrigger className="w-auto md:w-[280px]">
                  <SelectValue placeholder="Select a timetable" />
              </SelectTrigger>
              <SelectContent>
                  {timetables.map(timetable => (
                    <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <AddTimetableDialog onCreateTimetable={handleCreateTimetable} />

             {activeTimetable && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span className="px-0.5">Delete Timetable</span>
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
            )}
        </div>
      </div>
     
      {activeTimetable ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-4 max-w-xl">
                <TabsTrigger value="master">Master Timetable</TabsTrigger>
                <TabsTrigger value="classroom">Classroom Timetable</TabsTrigger>
                <TabsTrigger value="lab">Lab Timetable</TabsTrigger>
                <TabsTrigger value="analytics">
                    <LineChart className="mr-2 h-4 w-4" />
                    <span className="px-0.5">Analytics</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="master">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Master Schedule</CardTitle>
                            <CardDescription>Combined view of all lectures and practicals.</CardDescription>
                        </div>
                        <TimetableActions 
                            handleExportSheet={handleExportSheet}
                            onAddClass={handleAddClass}
                            isEditMode={isEditMode}
                            onToggleEditMode={toggleEditMode}
                        />
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={activeTimetable.schedule} 
                            view="admin" 
                            isEditMode={isEditMode}
                            onEdit={openEditDialog}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="classroom">
                 <Card>
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle>Classroom Schedule (Lectures)</CardTitle>
                            <CardDescription>Filtered view showing only lecture slots.</CardDescription>
                        </div>
                        <div className="flex w-full sm:w-auto items-center gap-2">
                             <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Filter by Classroom" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classroomList.map(room => (
                                        <SelectItem key={room} value={room}>
                                            {room === 'all' ? 'All Classrooms' : room}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <TimetableActions 
                                handleExportSheet={handleExportSheet}
                                onAddClass={handleAddClass}
                                isEditMode={isEditMode}
                                onToggleEditMode={toggleEditMode}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                       <Timetable 
                            entries={filteredLectureSchedule} 
                            view="admin" 
                            isEditMode={isEditMode}
                            onEdit={openEditDialog}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="lab">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Lab Schedule (Practicals)</CardTitle>
                            <CardDescription>Filtered view showing only lab/practical slots.</CardDescription>
                        </div>
                        <TimetableActions 
                            handleExportSheet={handleExportSheet}
                            onAddClass={handleAddClass}
                            isEditMode={isEditMode}
                            onToggleEditMode={toggleEditMode}
                        />
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            entries={practicalSchedule} 
                            view="admin" 
                            isEditMode={isEditMode}
                            onEdit={openEditDialog}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="analytics">
                <div className="grid gap-6">
                    <LecturerWorkloadChart schedule={activeTimetable.schedule} />
                    <ClassUsageChart schedule={activeTimetable.schedule} />
                    <FreeRoomSlots schedule={activeTimetable.schedule} />
                </div>
            </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground mb-4">No timetables to display.</p>
          <AddTimetableDialog onCreateTimetable={handleCreateTimetable}>
            <Button>
              <span className="px-0.5">Create New Timetable</span>
            </Button>
          </AddTimetableDialog>
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

    
