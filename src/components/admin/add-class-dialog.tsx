
"use client"

import { useState } from "react";
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
import { ClassForm } from "./class-form";


type AddClassDialogProps = {
    onAddClass: (newClass: Omit<TimetableEntry, 'id'>) => void;
}

export function AddClassDialog({ onAddClass }: AddClassDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (data: Omit<TimetableEntry, 'id'>) => {
    onAddClass(data);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Fill in the details for the new class. This will be added to the master timetable.
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
