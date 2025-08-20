
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import { Trash2, PlusCircle, Upload } from 'lucide-react';
import type { TimetableMetadata, TimetableData } from '@/lib/types';
import { AddTimetableDialog } from '@/components/admin/add-timetable-dialog';
import { ImportTimetableDialog } from '@/components/admin/import-timetable-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TimetableSelectorProps {
  timetables: TimetableMetadata[];
  selectedTimetableId: string;
  onSelectTimetable: (id: string) => void;
  onCreateTimetable: (name: string, year: string, entries?: any[]) => Promise<string | null>;
  onDeleteTimetable: (id: string) => Promise<void>;
  onImportTimetable: (newTimetable: TimetableData) => Promise<string | null>;
  isReadOnly?: boolean;
}

export const TimetableSelector: React.FC<TimetableSelectorProps> = React.memo(({
  timetables,
  selectedTimetableId,
  onSelectTimetable,
  onCreateTimetable,
  onDeleteTimetable,
  onImportTimetable,
  isReadOnly = false
}) => {
  const activeTimetable = timetables.find(t => t.id === selectedTimetableId);

  const handleDelete = () => {
    if (activeTimetable) {
      onDeleteTimetable(activeTimetable.id);
    }
  };
  
  if (timetables.length === 0 && !isReadOnly) {
      return (
        <div className="flex items-center justify-end mb-6 gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        <PlusCircle />
                        New Timetable
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                     <AddTimetableDialog onCreateTimetable={onCreateTimetable}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <PlusCircle />
                            Create Blank Timetable
                        </DropdownMenuItem>
                    </AddTimetableDialog>
                    <ImportTimetableDialog onImport={onImportTimetable}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Upload />
                            Import from Sheet
                        </DropdownMenuItem>
                    </ImportTimetableDialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
  }

  return (
    <div className="flex items-center justify-end mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Select 
          value={selectedTimetableId} 
          onValueChange={onSelectTimetable} 
          disabled={timetables.length === 0}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a timetable" />
          </SelectTrigger>
          <SelectContent>
            {timetables.map(timetable => (
              <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!isReadOnly && (
          <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <PlusCircle />
                        New Timetable
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                     <AddTimetableDialog onCreateTimetable={onCreateTimetable}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <PlusCircle />
                            Create Blank Timetable
                        </DropdownMenuItem>
                    </AddTimetableDialog>
                    <ImportTimetableDialog onImport={onImportTimetable}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Upload />
                            Import from Sheet
                        </DropdownMenuItem>
                    </ImportTimetableDialog>
                </DropdownMenuContent>
            </DropdownMenu>
            {activeTimetable && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 />
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
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </>
        )}
      </div>
    </div>
  );
});

TimetableSelector.displayName = 'TimetableSelector';
