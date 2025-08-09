
"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { ScheduleEntry, SpecialClassType } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00"];
const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

const PALETTE_COLORS = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E',
];

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  lecturer: z.string().optional(),
  room: z.string().optional(),
  type: z.enum(["Lecture", "Practical", ...SPECIAL_TYPES]),
  batches: z.string().optional(),
  day: z.string().min(1, "Day is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.number().min(1).max(3),
  color: z.string().min(1, "Color is required"),
}).refine(data => {
    if (data.type === 'Practical') {
        return data.batches && data.batches.length > 0;
    }
    if (SPECIAL_TYPES.includes(data.type as SpecialClassType)) {
        return true;
    }
    return data.lecturer && data.lecturer.length > 0 && data.room && data.room.length > 0;
}, {
    message: "Lecturer, Room/Lab, and Batches are required for this class type.",
    path: ['lecturer'], // You can choose which field to attach the error to
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
        type: 'Lecture' as const,
        duration: 1,
        color: PALETTE_COLORS[0],
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
  const isSpecialType = SPECIAL_TYPES.includes(classType as SpecialClassType);

  React.useEffect(() => {
    const { getValues, setValue } = form;
    if (classType === 'Practical') {
        setValue('duration', 2);
    } else if (isSpecialType) {
        setValue('duration', 1);
        setValue('subject', classType);
        setValue('color', '#E0E0E0'); // A neutral grey for special types
        setValue('lecturer', 'N/A');
        setValue('room', 'N/A');
        setValue('batches', '');
    } else { // Lecture
        setValue('duration', 1);
        if (SPECIAL_TYPES.includes(getValues('subject') as SpecialClassType)) {
            setValue('subject', '');
            setValue('lecturer', '');
            setValue('room', '');
        }
    }
  }, [classType, form, isSpecialType]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 py-4">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-start gap-4">
                    <FormLabel className="text-right pt-2">Type</FormLabel>
                     <FormControl>
                        <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="col-span-3 grid grid-cols-2 gap-4"
                        >
                           <FormItem className="flex items-center space-x-2">
                               <FormControl><RadioGroupItem value="Lecture" id="r-Lecture" /></FormControl>
                               <Label htmlFor="r-Lecture">Lecture</Label>
                           </FormItem>
                           <FormItem className="flex items-center space-x-2">
                               <FormControl><RadioGroupItem value="Practical" id="r-Practical" /></FormControl>
                               <Label htmlFor="r-Practical">Practical</Label>
                           </FormItem>
                            {SPECIAL_TYPES.map((type) => (
                               <FormItem key={type} className="flex items-center space-x-2">
                                   <FormControl><RadioGroupItem value={type} id={`r-${type}`} /></FormControl>
                                   <Label htmlFor={`r-${type}`}>{type}</Label>
                               </FormItem>
                           ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage className="col-start-2 col-span-3 text-right" />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Subject</FormLabel>
                    <FormControl>
                        <Input className="col-span-3" {...field} disabled={isSpecialType} />
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
                        <Input className="col-span-3" {...field} disabled={isSpecialType} placeholder="e.g. John Doe, Jane Smith"/>
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
                        <Input className="col-span-3" {...field} disabled={isSpecialType} />
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
                        <Input className="col-span-3" {...field} disabled={classType !== 'Practical'} placeholder="e.g. A1, A2" />
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
                            value={field.value}
                            onValueChange={field.onChange}
                            className="col-span-3 flex flex-wrap gap-2"
                        >
                            {PALETTE_COLORS.map((color) => (
                                <FormItem key={color} className="flex items-center space-x-2">
                                     <FormControl>
                                        <>
                                            <RadioGroupItem value={color} id={color} className="sr-only" disabled={isSpecialType}/>
                                            <Label 
                                                htmlFor={color}
                                                className={cn(
                                                    "h-6 w-6 rounded-full border border-muted-foreground/50",
                                                    !isSpecialType ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                                                    "ring-offset-background [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-ring",
                                                )}
                                                style={{ backgroundColor: color }}
                                            />
                                        </>
                                    </FormControl>
                                </FormItem>
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
