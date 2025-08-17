
"use client"

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

const DEPARTMENTS = [
    "Computer Engineering", 
    "Civil Engineering", 
    "Electronics Engineering", 
    "Electronics and Telecommunication Engineering", 
    "Computer Science and Engineering", 
    "Information Technology", 
    "CSE (IoT)", 
    "CSE (AIDS)", 
    "Computer Technology", 
    "Mechanical Engineering", 
    "Electrical Engineering"
];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

type AddTimetableDialogProps = {
  onCreateTimetable: (name: string, year: string) => Promise<string | null>;
  children?: React.ReactNode;
};

export function AddTimetableDialog({ onCreateTimetable, children }: AddTimetableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      departmentName: "",
      year: "",
    },
  });

  const onSubmit = async (data: { departmentName: string; year: string }) => {
    const newId = await onCreateTimetable(data.departmentName, data.year);
    if (newId) {
        setIsOpen(false);
        reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? children :
            <Button variant="outline">
                <PlusCircle />
                New Timetable
            </Button>
        }
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Timetable</DialogTitle>
          <DialogDescription>
            Select the department and academic year for the new timetable.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="departmentName">
                  Department
                </Label>
                 <Controller
                    name="departmentName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                    {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="year">
                  Year
                </Label>
                <Controller
                    name="year"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                                {YEARS.map((year) => (
                                    <SelectItem key={year} value={year}>
                                    {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
              </div>
            </div>
            <DialogFooter>
            <Button type="submit">Create Timetable</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
AddTimetableDialog.displayName = "AddTimetableDialog";
