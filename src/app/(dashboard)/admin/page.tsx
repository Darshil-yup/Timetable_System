
"use client"

import React, { useReducer, useEffect } from 'react';
import { Timetable } from '@/components/shared/timetable';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, XCircle } from 'lucide-react';
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

type State = {
  selectedTimetableId: string;
  isEditMode: boolean;
  selectedClass: ScheduleEntry | null;
  isEditDialogOpen: boolean;
};

type Action =
  | { type: 'SET_SELECTED_TIMETABLE'; payload: string }
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'OPEN_EDIT_DIALOG'; payload: ScheduleEntry }
  | { type: 'CLOSE_EDIT_DIALOG' };

const initialState: State = {
  selectedTimetableId: '',
  isEditMode: false,
  selectedClass: null,
  isEditDialogOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SELECTED_TIMETABLE':
      return { ...state, selectedTimetableId: action.payload, isEditMode: false, selectedClass: null, isEditDialogOpen: false };
    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditMode: !state.isEditMode };
    case 'OPEN_EDIT_DIALOG':
      return { ...state, isEditDialogOpen: true, selectedClass: action.payload };
    case 'CLOSE_EDIT_DIALOG':
      return { ...state, isEditDialogOpen: false, selectedClass: null };
    default:
      return state;
  }
}


export default function AdminDashboardPage() {
  const { timetables, setTimetables } = useTimetables();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { toast } = useToast();

  const activeTimetable = timetables.find(t => t.id === state.selectedTimetableId);

  useEffect(() => {
    if (!state.selectedTimetableId && timetables.length > 0) {
      dispatch({ type: 'SET_SELECTED_TIMETABLE', payload: timetables[0].id });
    } else if (timetables.length === 0 && state.selectedTimetableId) {
      dispatch({ type: 'SET_SELECTED_TIMETABLE', payload: '' });
    }
  }, [timetables, state.selectedTimetableId]);

  const updateActiveTimetableSchedule = (newSchedule: ScheduleEntry[]) => {
    setTimetables(currentTimetables => 
        currentTimetables.map(t => 
            t.id === state.selectedTimetableId ? { ...t, schedule: newSchedule } : t
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
    dispatch({ type: 'CLOSE_EDIT_DIALOG' });
    toast({
        title: "Class Updated!",
        description: `"${updatedClass.subject}" has been successfully updated.`,
    });
  };
  
  const handleDeleteClass = (classId: string) => {
    if (!activeTimetable) return;
    updateActiveTimetableSchedule(activeTimetable.schedule.filter(entry => entry.id !== classId));
    dispatch({ type: 'CLOSE_EDIT_DIALOG' });
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
    dispatch({ type: 'SET_SELECTED_TIMETABLE', payload: newTimetable.id });
    toast({
        title: "Timetable Created!",
        description: `Timetable for "${newTimetable.name}" has been created.`
    });
  };

  const handleDeleteTimetable = () => {
    if (!activeTimetable) return;

    const remainingTimetables = timetables.filter(t => t.id !== activeTimetable.id);
    setTimetables(remainingTimetables);
    // The useEffect hook will handle setting the next timetable ID
    
    toast({
      title: "Timetable Deleted",
      description: `The timetable for "${activeTimetable.name}" has been deleted.`,
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Master Timetables</h1>
        <div className="flex items-center gap-2 flex-wrap">
            <Select 
              value={state.selectedTimetableId} 
              onValueChange={(id) => dispatch({ type: 'SET_SELECTED_TIMETABLE', payload: id })} 
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
        <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex items-center justify-end gap-2 flex-wrap">
                <AddClassDialog onAddClass={handleAddClass} />
                <Button variant="outline" onClick={() => dispatch({ type: 'TOGGLE_EDIT_MODE' })}>
                  {state.isEditMode ? <XCircle className="mr-2 h-4 w-4" /> : <Pencil className="mr-2 h-4 w-4" />}
                  {state.isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
                </Button>
            </div>
            <div className="p-6 pt-0">
                <p className="text-muted-foreground mb-6">
                    This is the central schedule for {activeTimetable.name}. Changes made here will automatically update individual lecturer timetables.
                    {state.isEditMode && <span className="block font-semibold text-primary mt-2">Edit mode is active. Click on a class to modify it.</span>}
                </p>
                <Timetable 
                    entries={activeTimetable.schedule} 
                    view="admin" 
                    isEditMode={state.isEditMode}
                    onEdit={(entry) => dispatch({ type: 'OPEN_EDIT_DIALOG', payload: entry })}
                />
            </div>
        </div>
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
      
      {state.selectedClass && (
        <EditClassDialog
            isOpen={state.isEditDialogOpen}
            onOpenChange={() => dispatch({ type: 'CLOSE_EDIT_DIALOG' })}
            classEntry={state.selectedClass}
            onUpdateClass={handleUpdateClass}
            onDeleteClass={handleDeleteClass}
        />
      )}
    </div>
  );
}
