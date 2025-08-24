
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import type { TimetableEntry } from "@/lib/types";
import { ClassForm, type ClassFormValues } from "./class-form";


type AddClassDialogProps = {
    onAddClass: (newClass: Omit<TimetableEntry, 'id'>, parallelClass?: Omit<TimetableEntry, 'id'>) => void;
    children?: React.ReactNode;
}

export function AddClassDialog({ onAddClass, children }: AddClassDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (data: ClassFormValues) => {
    const { parallelPractical, ...mainClassData } = data;
    
    const mainClass = {
        ...mainClassData,
        batches: mainClassData.batches ? mainClassData.batches.split(',').map(b => b.trim()).filter(b => b) : [],
    };
    
    let parallelClass: Omit<TimetableEntry, 'id'> | undefined = undefined;

    if (mainClass.type === 'Practical' && parallelPractical?.enabled && parallelPractical.subject) {
        parallelClass = {
            subject: parallelPractical.subject,
            lecturer: parallelPractical.lecturer,
            room: parallelPractical.room,
            batches: parallelPractical.batches ? parallelPractical.batches.split(',').map(b => b.trim()).filter(b => b) : [],
            day: mainClass.day,
            time: mainClass.time,
            type: 'Practical',
            duration: mainClass.duration,
            color: parallelPractical.color || mainClass.color,
        }
    }
    onAddClass(mainClass, parallelClass);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
            <Button>
                <PlusCircle />
                Add New Class
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new class to the timetable.
            </DialogDescription>
          </DialogHeader>
          <ClassForm 
            onSubmit={handleFormSubmit}
            submitButtonText="Save Class"
          />
      </DialogContent>
    </Dialog>
  )
}
AddClassDialog.displayName = 'AddClassDialog';
