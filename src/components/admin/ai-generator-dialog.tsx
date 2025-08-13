
"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateTimetable } from '@/ai/flows/generate-timetable-flow';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { ALL_CLASSROOMS, ALL_LABS } from './class-form';
import { LECTURERS } from '@/lib/mock-data';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const subjectSchema = z.object({
  name: z.string().min(1, 'Subject name is required'),
  lecturesPerWeek: z.coerce.number().min(0),
  practicalsPerWeek: z.coerce.number().min(0),
  lecturers: z.array(z.string()).min(1, 'At least one lecturer is required'),
  batches: z.array(z.string()).optional(),
});

const formSchema = z.object({
  subjects: z.array(subjectSchema),
});

type FormValues = z.infer<typeof formSchema>;

type AIGeneratorDialogProps = {
  children: React.ReactNode;
  formValues: { departmentName: string; year: string };
  onGenerationSuccess: (departmentName: string, year: string, entries: any[]) => void;
};

export function AIGeneratorDialog({ children, formValues, onGenerationSuccess }: AIGeneratorDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjects: [{ name: '', lecturesPerWeek: 4, practicalsPerWeek: 1, lecturers: [], batches: ['A1', 'A2', 'A3'] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  const handleGenerate = async (data: FormValues) => {
    const { departmentName, year } = formValues;
    if (!departmentName || !year) {
      toast({
        title: 'Department and Year Required',
        description: 'Please select a department and year before generating.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await generateTimetable({
        subjects: data.subjects,
        availableClassrooms: ALL_CLASSROOMS,
        availableLabs: ALL_LABS,
      });

      // Assign random colors to subjects
      const subjectColorMap = new Map<string, string>();
      const PALETTE_COLORS = [ 'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
      
      const entriesWithColors = result.timetable.map((entry: any) => {
        if (!subjectColorMap.has(entry.subject)) {
            const color = PALETTE_COLORS[subjectColorMap.size % PALETTE_COLORS.length];
            subjectColorMap.set(entry.subject, color);
        }
         if (entry.type === 'Recess') {
            return { ...entry, color: '#E0E0E0' };
        }
        return { ...entry, color: subjectColorMap.get(entry.subject) };
      });
      
      onGenerationSuccess(departmentName, year, entriesWithColors);
      toast({
        title: 'Timetable Generated!',
        description: 'The AI has successfully created the timetable.',
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error generating timetable:', error);
      toast({
        title: 'Generation Failed',
        description: 'The AI could not generate the timetable. Please check your inputs or try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Generate Timetable with AI</DialogTitle>
          <DialogDescription>
            Define the subjects and their constraints. The AI will build the schedule for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerate)} className='flex flex-col overflow-hidden h-full'>
                <ScrollArea className='flex-grow pr-6'>
                <div className="space-y-6">
                    {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name={`subjects.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Subject Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g. Data Structures" />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`subjects.${index}.lecturers`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Lecturers</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <FormControl>
                                            <Button variant="outline" role="combobox" className='w-full justify-between'>
                                              {field.value?.length > 0 ? `${field.value.length} selected` : "Select lecturers"}
                                            </Button>
                                          </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <ScrollArea className='h-72'>
                                            <div className='p-4'>
                                                {LECTURERS.map((lecturer) => (
                                                <FormField
                                                    key={lecturer.id}
                                                    control={form.control}
                                                    name={`subjects.${index}.lecturers`}
                                                    render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                        key={lecturer.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                        <FormControl>
                                                            <Checkbox
                                                            checked={field.value?.includes(lecturer.name)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                ? field.onChange([...(field.value || []), lecturer.name])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                    (value) => value !== lecturer.name
                                                                    )
                                                                )
                                                            }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {lecturer.name}
                                                        </FormLabel>
                                                        </FormItem>
                                                    )
                                                    }}
                                                />
                                                ))}
                                            </div>
                                            </ScrollArea>
                                        </PopoverContent>
                                      </Popover>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                                control={form.control}
                                name={`subjects.${index}.lecturesPerWeek`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Lectures / Week</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`subjects.${index}.practicalsPerWeek`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Practicals / Week</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    ))}
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => append({ name: '', lecturesPerWeek: 4, practicalsPerWeek: 1, lecturers: [], batches: ['A1', 'A2', 'A3'] })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Subject
                </Button>
                </ScrollArea>
                <DialogFooter className="mt-auto pt-4 border-t">
                    <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    {isLoading ? 'Generating...' : 'Generate Timetable'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

