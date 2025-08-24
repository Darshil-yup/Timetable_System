
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timetable } from '@/components/shared/timetable';
import { ALL_CLASSROOMS } from './class-form';
import type { TimetableEntry } from '@/lib/types';
import { FileSpreadsheet, FileDown, FileText, FileType } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import dynamic from 'next/dynamic';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { exportTimetableToPDF } from '@/lib/pdf-export';
import { handleExportCSV, handleExportXLSX } from '@/lib/export';

const ClassDetailsDialog = dynamic(() => import('../shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

export const ClassroomView: React.FC = React.memo(() => {
  const { toast } = useToast();
  const { allTimetables, loading } = useTimetables();
  const [selectedRoom, setSelectedRoom] = useState(ALL_CLASSROOMS[0]);
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);

  const lectureTimetable = useMemo(() => {
    if (!allTimetables) return [];
    const allClasses: TimetableEntry[] = [];
    allTimetables.forEach(timetable => {
        const lectureClasses = timetable.timetable.filter(entry => 
            entry.type === 'Lecture' && entry.room && ALL_CLASSROOMS.includes(entry.room)
        );
        allClasses.push(...lectureClasses);
    });
    return allClasses;
  }, [allTimetables]);
  
  const filteredLectureTimetable = useMemo(() => {
    if (selectedRoom === 'all') return lectureTimetable;
    return lectureTimetable.filter(e => e.room === selectedRoom);
  }, [lectureTimetable, selectedRoom]);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);
  
  const handleExport = useCallback((format: 'xlsx' | 'csv' | 'pdf') => {
    if (!filteredLectureTimetable || filteredLectureTimetable.length === 0) { 
        toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); 
        return; 
    }
    const filename = `Consolidated-${selectedRoom === 'all' ? 'All-Classrooms' : selectedRoom}`;
    const title = `Timetable for ${selectedRoom === 'all' ? 'All Classrooms' : selectedRoom}`;
    
    if (format === 'xlsx') {
        handleExportXLSX(filteredLectureTimetable, filename, true);
    } else if (format === 'csv') {
        handleExportCSV(filteredLectureTimetable, filename, true);
    } else if (format === 'pdf') {
        exportTimetableToPDF(filteredLectureTimetable, title, true);
    }
    toast({ title: "Export Successful" });
  }, [filteredLectureTimetable, selectedRoom, toast]);


  if (loading) {
    return <Skeleton className="h-[700px] w-full" />
  }

  if (!allTimetables) {
    return (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground">No timetable data available.</p>
        </div>
    );
  }

  return (
    <>
        <Card>
          <CardHeader className="flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <CardTitle>Consolidated Classroom Timetable</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classrooms</SelectItem>
                  {ALL_CLASSROOMS.map(room => <SelectItem key={room} value={room}>{room}</SelectItem>)}
                </SelectContent>
              </Select>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>
                      <FileDown />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={() => handleExport('xlsx')}>
                        <FileSpreadsheet />
                        Export as XLSX
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport('csv')}>
                        <FileText />
                        Export as CSV
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleExport('pdf')}>
                        <FileType />
                        Export as PDF
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Timetable entries={filteredLectureTimetable} onCellClick={handleCellClick} />
          </CardContent>
        </Card>
        {viewingEntries && (
            <ClassDetailsDialog
                isOpen={!!viewingEntries}
                onOpenChange={(isOpen) => !isOpen && closeDetailsDialog()}
                entries={viewingEntries}
            />
        )}
    </>
  );
});

ClassroomView.displayName = 'ClassroomView';
