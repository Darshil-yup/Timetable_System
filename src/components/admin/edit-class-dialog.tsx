
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { ClassForm } from "./class-form";

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

  const handleFormSubmit = (data: Omit<TimetableEntry, 'id'>) => {
    onUpdateClass({ ...data, id: classEntry.id });
  };
  
  const handleDelete = () => {
    onDeleteClass(classEntry.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Modify the details for "{classEntry.subject}". Click save when you're done.
          </DialogDescription>
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
                  </dlv>
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
