"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import type { ScheduleEntry } from "@/lib/types";
import { ClassForm } from "./class-form";

type EditClassDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    classEntry: ScheduleEntry;
    onUpdateClass: (updatedClass: ScheduleEntry) => void;
    onDeleteClass: (classId: string) => void;
};

export function EditClassDialog({ 
    isOpen, 
    onOpenChange, 
    classEntry, 
    onUpdateClass,
    onDeleteClass
}: EditClassDialogProps) {

  const handleFormSubmit = (data: Omit<ScheduleEntry, 'id'>) => {
    onUpdateClass({ ...data, id: classEntry.id });
  };
  
  const handleDelete = () => {
    onDeleteClass(classEntry.id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Modify the details for "{classEntry.subject}". Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ClassForm
          defaultValues={classEntry}
          onSubmit={handleFormSubmit}
          submitButtonText="Save Changes"
        >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Class
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this class slot.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </ClassForm>
      </DialogContent>
    </Dialog>
  );
}
