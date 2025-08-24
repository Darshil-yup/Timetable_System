
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Trash2 } from "lucide-react";
import type { TimetableEntry } from "@/lib/types";
import { ClassForm, type ClassFormValues } from "./class-form";

type EditClassDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    classEntry: TimetableEntry;
    onUpdateClass: (updatedClass: TimetableEntry) => void;
    onDeleteClass: (classId: string) => void;
};

export function EditClassDialog({ 
    isOpen, 
    onOpenChange, 
    classEntry, 
    onUpdateClass,
    onDeleteClass
}: EditClassDialogProps) {

  const handleFormSubmit = (data: ClassFormValues) => {
    const dataToSend = {
      ...data,
      batches: data.batches ? data.batches.split(',').map(b => b.trim()).filter(b => b) : [],
    };
    onUpdateClass({ ...dataToSend, id: classEntry.id });
  };
  
  const handleDelete = () => {
    onDeleteClass(classEntry.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <ClassForm
          defaultValues={classEntry}
          onSubmit={handleFormSubmit}
          submitButtonText="Save Changes"
          footerContent={
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  <Trash2 />
                  Delete Class
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this class slot. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
EditClassDialog.displayName = "EditClassDialog";
