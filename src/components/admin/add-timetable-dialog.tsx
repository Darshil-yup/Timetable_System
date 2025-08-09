
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import React from "react";

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

const formSchema = z.object({
  departmentName: z.string().min(1, "Department name is required"),
  year: z.string().min(1, "Year is required"),
});

type FormValues = z.infer<typeof formSchema>;

type AddTimetableDialogProps = {
  onCreateTimetable: (name: string, year: string) => void;
  children?: React.ReactNode;
};

export function AddTimetableDialog({ onCreateTimetable, children }: AddTimetableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        departmentName: '',
        year: ''
    }
  });

  const handleSubmit = (values: FormValues) => {
    onCreateTimetable(values.departmentName, values.year);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? children :
            <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span className="px-0.5">New Timetable</span>
            </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create New Timetable</DialogTitle>
          <DialogDescription>
            Select the department and academic year for the new timetable.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="departmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department Name</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit"><span className="px-0.5">Create Timetable</span></Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
