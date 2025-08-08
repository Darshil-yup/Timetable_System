
"use client"

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Timetable } from '@/components/shared/timetable';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, XCircle, FileDown } from 'lucide-react';
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

export default function AdminDashboardPage() {
  const { timetables, setTimetables } = useTimetables();
  const { toast } = useToast();

  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ScheduleEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('master');
  
  const timetableRefs = {
    master: useRef<HTMLDivElement>(null),
    classroom: useRef<HTMLDivElement>(null),
    lab: useRef<HTMLDivElement>(null),
  };

  const activeTimetable = timetables.find(t => t.id === selectedTimetableId);

  useEffect(() => {
    if (!selectedTimetableId && timetables.length > 0) {
      setSelectedTimetableId(timetables[0].id);
    } else if (timetables.length === 0 && selectedTimetableId) {
      setSelectedTimetableId('');
    }
  }, [timetables, selectedTimetableId]);

  const handleSelectTimetable = (id: string) => {
    setSelectedTimetableId(id);
    setIsEditMode(false);
    setSelectedClass(null);
    setIsEditDialogOpen(false);
  };
  
  const openEditDialog = (entry: ScheduleEntry) => {
    setSelectedClass(entry);
    setIsEditDialogOpen(true);
  }

  const closeEditDialog = () => {
    setSelectedClass(null);
    setIsEditDialogOpen(false);
  }

  const updateActiveTimetableSchedule = (newSchedule: ScheduleEntry[]) => {
    setTimetables(currentTimetables => 
        currentTimetables.map(t => 
            t.id === selectedTimetableId ? { ...t, schedule: newSchedule } : t
        )
    );
  }
  
  const handleAddClass = (newClass: Omit<ScheduleEntry, 'id'>) => {
    if (!activeTimetable) return;

    const newEntry: ScheduleEntry = { ...newClass, id: `c${Date.now()}` };
    updateActiveTimetableSchedule([...activeTimetable.schedule, newEntry]);
    toast({
      title: "Class Added!",
      description: `"${newClass.subject}" has been added to the timetable.`,
    });
  };
  
  const handleUpdateClass = (updatedClass: ScheduleEntry) => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule(activeTimetable.schedule.map(entry => entry.id === updatedClass.id ? updatedClass : entry));
    closeEditDialog();
    toast({
        title: "Class Updated!",
        description: `"${updatedClass.subject}" has been successfully updated.`,
    });
  };
  
  const handleDeleteClass = (classId: string) => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule(activeTimetable.schedule.filter(entry => entry.id !== classId));
    closeEditDialog();
    toast({
       title: "Class Deleted",
       description: "The class has been removed from the timetable.",
       variant: "destructive",
    });
  }

  const handleCreateTimetable = (name: string, year: string) => {
    const newTimetable: TimetableData = {
        id: `tt${Date.now()}`,
        name: `${name} (${year})`,
        schedule: []
    };
    setTimetables(currentTimetables => [...currentTimetables, newTimetable]);
    setSelectedTimetableId(newTimetable.id);
    toast({
        title: "Timetable Created!",
        description: `Timetable for "${newTimetable.name}" has been created.`
    });
  };

  const handleDeleteTimetable = () => {
    if (!activeTimetable) return;

    const remainingTimetables = timetables.filter(t => t.id !== activeTimetable.id);
    setTimetables(remainingTimetables);
    
    toast({
      title: "Timetable Deleted",
      description: `The timetable for "${activeTimetable.name}" has been deleted.`,
      variant: "destructive",
    })
  }

  const handleExportPDF = () => {
    const timetableRef = timetableRefs[activeTab as keyof typeof timetableRefs];
    const timetableName = `${activeTimetable?.name}-${activeTab}`;

    if (!timetableRef?.current || !activeTimetable) {
        toast({
            title: "Export Failed",
            description: "No active timetable to export.",
            variant: "destructive",
        });
        return;
    }

    html2canvas(timetableRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${timetableName}-timetable.pdf`);
    }).catch(err => {
        console.error("Error generating PDF:", err);
        toast({
            title: "PDF Export Failed",
            description: "Could not export the timetable. Please try again.",
            variant: "destructive",
        })
    });
  };

  const lectureSchedule = activeTimetable?.schedule.filter(e => e.type === 'Lecture') || [];
  const practicalSchedule = activeTimetable?.schedule.filter(e => e.type === 'Practical') || [];

  return (
    <div className="container mx-auto">
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
            )}
        </div>
      </div>
     
      {activeTimetable ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="master">Master Timetable</TabsTrigger>
                    <TabsTrigger value="classroom">Classroom Timetable</TabsTrigger>
                    <TabsTrigger value="lab">Lab Timetable</TabsTrigger>
                </TabsList>

                <div className="flex items-center justify-end gap-2 flex-wrap">
                    <Button variant="outline" onClick={handleExportPDF}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Export as PDF
                    </Button>
                    <AddClassDialog onAddClass={handleAddClass} />
                    <Button variant="outline" onClick={() => setIsEditMode(prev => !prev)}>
                      {isEditMode ? <XCircle className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
                      {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
                    </Button>
                </div>
            </div>

            <p className="text-muted-foreground mb-6">
                This is the central schedule for {activeTimetable.name}. Changes made here will automatically update individual lecturer timetables.
                {isEditMode && <span className="block font-semibold text-primary mt-2">Edit mode is active. Click on a class to modify it.</span>}
            </p>

            <TabsContent value="master">
                <Card>
                    <CardHeader>
                        <CardTitle>Master Schedule</CardTitle>
                        <CardDescription>Combined view of all lectures and practicals.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            ref={timetableRefs.master}
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
                    <CardHeader>
                        <CardTitle>Classroom Schedule (Lectures)</CardTitle>
                        <CardDescription>Filtered view showing only 1-hour lecture slots.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Timetable 
                            ref={timetableRefs.classroom}
                            entries={lectureSchedule} 
                            view="admin" 
                            isEditMode={isEditMode}
                            onEdit={openEditDialog}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="lab">
                 <Card>
                    <CardHeader>
                        <CardTitle>Lab Schedule (Practicals)</CardTitle>
                        <CardDescription>Filtered view showing only 2-hour lab/practical slots.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            ref={timetableRefs.lab}
                            entries={practicalSchedule} 
                            view="admin" 
                            isEditMode={isEditMode}
                            onEdit={openEditDialog}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground mb-4">No timetables to display.</p>
          <AddTimetableDialog onCreateTimetable={handleCreateTimetable}>
            <Button>
              Create New Timetable
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

    