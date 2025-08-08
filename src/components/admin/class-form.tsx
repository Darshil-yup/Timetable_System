
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { ScheduleEntry } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { DialogFooter } from "@/components/ui/dialog";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"];
const COLORS = [
    { value: 'hsl(var(--chart-1))', label: 'Tomato' },
    { value: 'hsl(var(--chart-2))', label: 'Teal' },
    { value: 'hsl(var(--chart-3))', label: 'Navy' },
    { value: 'hsl(var(--chart-4))', label: 'Gold' },
    { value: 'hsl(var(--chart-5))', label: 'Orange' },
];

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  lecturer: z.string().min(1, "Lecturer is required"),
  room: z.string().min(1, "Room/Lab is required"),
  type: z.enum(["Lecture", "Practical"]),
  batches: z.string().optional(),
  day: z.string().min(1, "Day is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(1).max(3),
  color: z.string().min(1, "Color is required"),
});

type FormValues = Omit<ScheduleEntry, 'id' | 'batches'> & { batches?: string };

type ClassFormProps = {
    defaultValues?: ScheduleEntry;
    onSubmit: (data: Omit<ScheduleEntry, 'id'>) => void;
    submitButtonText?: string;
    children?: React.ReactNode;
}

export function ClassForm({ defaultValues, onSubmit, submitButtonText = "Submit", children }: ClassFormProps) {
  const formatedDefaultValues = defaultValues ? {
        ...defaultValues,
        batches: defaultValues.batches?.join(", ") || "",
  } : {
        type: 'Lecture',
        duration: 1,
        color: COLORS[0].value,
        subject: '',
        lecturer: '',
        room: '',
        day: '',
        time: '',
        batches: '',
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formatedDefaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const dataToSend = {
      ...values,
      batches: values.batches ? values.batches.split(',').map(b => b.trim()).filter(b => b) : [],
    };
    onSubmit(dataToSend);
  };
  
  const classType = form.watch("type");

  React.useEffect(() => {
    if (classType === 'Practical') {
        form.setValue('duration', 2);
    } else {
        form.setValue('duration', 1);
    }
  }, [classType, form]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 py-4">
            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Subject</FormLabel>
                    <FormControl>
                        <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lecturer"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Lecturer(s)</FormLabel>
                    <FormControl>
                        <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Room/Lab</FormLabel>
                    <FormControl>
                        <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Type</FormLabel>
                     <FormControl>
                        <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="col-span-3 flex gap-4"
                        >
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <RadioGroupItem value="Lecture" id="r1" />
                                </FormControl>
                                <Label htmlFor="r1">Lecture</Label>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <RadioGroupItem value="Practical" id="r2" />
                                </FormControl>
                                <Label htmlFor="r2">Practical</Label>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="batches"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Batches</FormLabel>
                    <FormControl>
                        <Input className="col-span-3" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Day</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {DAYS.map(day => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Time</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {TIME_SLOTS.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Color</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="col-span-3 flex gap-2"
                        >
                            {COLORS.map(color => (
                                <FormControl key={color.value}>
                                    <FormItem>
                                        <RadioGroupItem value={color.value} id={`c-${color.label}`} className="sr-only" />
                                        <Label htmlFor={`c-${color.label}`}
                                            className={cn(
                                                "w-6 h-6 rounded-full border-2 border-transparent cursor-pointer",
                                                "ring-offset-background [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-ring"
                                            )}
                                            style={{ backgroundColor: color.value }}
                                            title={color.label}
                                        >
                                            <span className="sr-only">{color.label}</span>
                                        </Label>
                                    </FormItem>
                                </FormControl>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage className="col-span-4 text-right" />
                </FormItem>
                )}
            />
        </div>
        <DialogFooter>
          {children}
          <Button type="submit">{submitButtonText}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
