
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
import type { TimetableEntry, SpecialClassType } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

export const ALL_CLASSROOMS = [
    'EL-102', 'EL-103', 'EL-203', 'EL-204', 'EL-211', 'EL-302', 'EL-303',
    'ET-308', 'ET-316', 'AG-0213'
];

export const ALL_LABS = [
    'CT-LAB-01', 'CT-LAB-02', 'CT-LAB-03', 'CT-LAB-04', 'CT-LAB-05', 'CT-LAB-06', 'CT-LAB-07', 'CT-LAB-08',
    'AIDS-LAB-01', 'AIDS-LAB-02', 'AIDS-LAB-03', 'AIDS-LAB-04', 'AIDS-LAB-05', 'AIDS-LAB-06',
    'IOT Lab 1', 'IOT Lab 2', 'IOT Lab 3', 'IOT Lab 4',
];


const PALETTE_COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
];

const parallelPracticalSchema = z.object({
    enabled: z.boolean().default(false),
    subject: z.string().optional(),
    lecturer: z.string().optional(),
    room: z.string().optional(),
    batches: z.string().optional(),
    color: z.string().optional(),
}).optional();

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
  parallelPractical: parallelPracticalSchema,
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
    path: ['lecturer'], 
}).refine(data => {
    if (data.type === 'Practical' && data.parallelPractical?.enabled) {
        const parallel = data.parallelPractical;
        return parallel.subject && parallel.subject.length > 0 &&
               parallel.lecturer && parallel.lecturer.length > 0 &&
               parallel.room && parallel.room.length > 0 &&
               parallel.batches && parallel.batches.length > 0 &&
               parallel.color && parallel.color.length > 0;
    }
    return true;
}, {
    message: "All fields for the parallel practical are required.",
    path: ['parallelPractical.subject'],
});


type FormValues = Omit<TimetableEntry, 'id' | 'batches'> & { 
    batches?: string,
    parallelPractical?: z.infer<typeof parallelPracticalSchema>
};
export type ClassFormValues = FormValues;

type ClassFormProps = {
    defaultValues?: TimetableEntry;
    onSubmit: (data: FormValues) => void;
    submitButtonText?: string;
    footerContent?: React.ReactNode;
}

export const ClassForm = React.memo(({ defaultValues, onSubmit, submitButtonText = "Submit", footerContent }: ClassFormProps) => {
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
        parallelPractical: {
            enabled: false,
            subject: '',
            lecturer: '',
            room: '',
            batches: '',
            color: PALETTE_COLORS[1]
        }
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formatedDefaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };
  
  const classType = form.watch("type");
  const isSpecialType = SPECIAL_TYPES.includes(classType as SpecialClassType);
  const parallelEnabled = form.watch("parallelPractical.enabled");

  const roomOptions = classType === 'Lecture' ? ALL_CLASSROOMS : classType === 'Practical' ? ALL_LABS : [];
  const roomLabel = classType === 'Lecture' ? 'Classroom' : classType === 'Practical' ? 'Lab' : 'Room/Lab';
  
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
        setValue('parallelPractical.enabled', false);
    } else { // Lecture
        setValue('duration', 1);
        setValue('parallelPractical.enabled', false);
        if (SPECIAL_TYPES.includes(getValues('subject') as SpecialClassType)) {
            setValue('subject', '');
            setValue('lecturer', '');
            setValue('room', '');
        }
    }
    setValue('room', ''); // Reset room on type change
  }, [classType, form, isSpecialType]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col overflow-hidden h-full">
        <div className="space-y-4 px-6 overflow-y-auto flex-1">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Type</FormLabel>
                     <FormControl>
                        <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4 pt-2"
                        >
                           <FormItem className="flex items-center space-x-2">
                               <FormControl><RadioGroupItem value="Lecture" id="r-Lecture" /></FormControl>
                               <Label htmlFor="r-Lecture" className="font-normal">Lecture</Label>
                           </FormItem>
                           <FormItem className="flex items-center space-x-2">
                               <FormControl><RadioGroupItem value="Practical" id="r-Practical" /></FormControl>
                               <Label htmlFor="r-Practical" className="font-normal">Practical</Label>
                           </FormItem>
                            {SPECIAL_TYPES.map((type) => (
                               <FormItem key={type} className="flex items-center space-x-2">
                                   <FormControl><RadioGroupItem value={type} id={`r-${type}`} /></FormControl>
                                   <Label htmlFor={`r-${type}`} className="font-normal">{type}</Label>
                               </FormItem>
                           ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className={cn(classType === 'Practical' && "border p-4 rounded-md")}>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={isSpecialType} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lecturer"
                    render={({ field }) => (
                    <FormItem className="mt-4">
                        <FormLabel>Lecturer(s)</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={isSpecialType} placeholder="e.g. John Doe, Jane Smith"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                    <FormItem className="mt-4">
                        <FormLabel>{roomLabel}</FormLabel>
                         <Select 
                            onValueChange={field.onChange} 
                            value={field.value}
                            disabled={isSpecialType || (classType !== 'Lecture' && classType !== 'Practical')}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={`Select a ${roomLabel.toLowerCase()}`} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {roomOptions.map(room => (
                                <SelectItem key={room} value={room}>{room}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="batches"
                    render={({ field }) => (
                    <FormItem className="mt-4">
                        <FormLabel>Batches</FormLabel>
                        <FormControl>
                            <Input {...field} disabled={classType !== 'Practical'} placeholder="e.g. A1, A2" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                    <FormItem className="mt-4">
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                             <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-wrap gap-2 pt-2"
                            >
                                {PALETTE_COLORS.map((color) => (
                                    <FormItem key={color} className="flex items-center space-x-2">
                                         <FormControl>
                                            <RadioGroupItem value={color} id={color} className="sr-only" disabled={isSpecialType}/>
                                         </FormControl>
                                         <Label 
                                            htmlFor={color}
                                            className={cn(
                                                "h-6 w-6 rounded-full border border-muted-foreground/50",
                                                !isSpecialType ? "cursor-pointer" : "cursor-not-allowed opacity-50",
                                                "ring-offset-background [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-ring",
                                            )}
                                            style={{ backgroundColor: color }}
                                        />
                                    </FormItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            {classType === 'Practical' && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 pt-2">
                        <FormField
                            control={form.control}
                            name="parallelPractical.enabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full">
                                <div className="space-y-0.5">
                                    <FormLabel>Add Parallel Practical</FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                     {parallelEnabled && (
                        <div className="border p-4 rounded-md space-y-4">
                             <p className="text-sm font-medium text-center">Parallel Practical Details</p>
                             <Separator />
                             <FormField
                                control={form.control}
                                name="parallelPractical.subject"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parallelPractical.lecturer"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lecturer(s)</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g. John Doe, Jane Smith"/></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parallelPractical.room"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lab</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select a lab" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ALL_LABS.map(lab => <SelectItem key={lab} value={lab}>{lab}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="parallelPractical.batches"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Batches</FormLabel>
                                    <FormControl><Input {...field} placeholder="e.g. A3, A4" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="parallelPractical.color"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-wrap gap-2 pt-2">
                                            {PALETTE_COLORS.map((color) => (
                                                <FormItem key={`p-${color}`} className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem value={color} id={`p-${color}`} className="sr-only"/>
                                                    </FormControl>
                                                    <Label htmlFor={`p-${color}`} className={cn("h-6 w-6 rounded-full border border-muted-foreground/50 cursor-pointer", "ring-offset-background [&:has([data-state=checked])]:ring-2 [&:has([data-state=checked])]:ring-ring")} style={{ backgroundColor: color }}/>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                     )}
                </div>
            )}


             <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Day</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {DAYS.map(day => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Time</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {TIME_SLOTS.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
        <DialogFooter className="mt-auto px-6 py-4 bg-background flex justify-between w-full sticky bottom-0">
            <div>
              {footerContent}
            </div>
            <Button type="submit">{submitButtonText}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
});
ClassForm.displayName = 'ClassForm';
