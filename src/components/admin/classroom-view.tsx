
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
import type { TimetableData, TimetableEntry } from '@/lib/types';
import { FileSpreadsheet, FileDown, FileText, FileType } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { useTimetables } from '@/context/TimetableContext';
import dynamic from 'next/dynamic';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ClassDetailsDialog = dynamic(() => import('../shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

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
  
  const generateGridData = useCallback(() => {
    if (!filteredLectureTimetable) return [];
    
    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
      header,
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    filteredLectureTimetable.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        const group = filteredLectureTimetable.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration &&
          e.room === entry.room
        );
        
        const cellContent = group.map(g => {
            const subject = g.subject;
            const lecturer = g.lecturer;
            const batches = g.batches?.join(', ');
            return [subject, lecturer, batches].filter(Boolean).join('\n');
        }).join('\n---\n');

        if (grid[dayIndex + 1][timeIndex + 1] === null) {
            grid[dayIndex + 1][timeIndex + 1] = cellContent;
            group.forEach(g => placedEntries.add(g.id));
            
            for (let i = 1; i < duration; i++) {
                if (timeIndex + 1 + i < grid[0].length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = ""; 
                }
            }
        }
    });
    return grid;
  }, [filteredLectureTimetable]);


  const handleExportXLSX = useCallback(() => {
    if (!filteredLectureTimetable || filteredLectureTimetable.length === 0) { toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); return; }

    const grid = generateGridData();
    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    
    const columnWidths = [ { wch: 15 }, ...TIME_SLOTS.map(() => ({ wch: 25 })) ];
    worksheet['!cols'] = columnWidths;

    for (let C = 0; C < grid[0].length; ++C) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: 0});
        if(worksheet[cellAddress]) {
            worksheet[cellAddress].s = { font: { bold: true }, alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
        }
    }
    
    for(let R = 1; R < grid.length; ++R) {
        for(let C = 0; C < grid[R].length; ++C) {
            const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
            if(worksheet[cellAddress]) {
                 worksheet[cellAddress].s = { alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
            }
        }
    }

    worksheet['!merges'] = [];
    filteredLectureTimetable.forEach(entry => {
      const dayIndex = DAYS.indexOf(entry.day) + 1;
      const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
      if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
          const existingMerge = worksheet['!merges']?.find(m => m.s.r === dayIndex && m.s.c === timeIndex);
          if (!existingMerge) {
            worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
          }
      }
    });

    const workbook = XLSX.utils.book_new();
    const sheetName = selectedRoom === 'all' ? 'All Classrooms' : selectedRoom;
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `Consolidated-${sheetName}.xlsx`);
    toast({ title: "Export Successful" });
  }, [filteredLectureTimetable, selectedRoom, toast, generateGridData]);
  
  const handleExportCSV = useCallback(() => {
    const grid = generateGridData();
    if (grid.length === 0) { toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); return; }
    
    const csvContent = grid.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    const sheetName = selectedRoom === 'all' ? 'All Classrooms' : selectedRoom;
    link.setAttribute("href", url);
    link.setAttribute("download", `Consolidated-${sheetName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Export Successful" });
  }, [generateGridData, selectedRoom, toast]);

  const handleExportPDF = useCallback(() => {
    const grid = generateGridData();
    if (grid.length === 0) { toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); return; }

    const doc = new jsPDF({ orientation: 'landscape' });
    const body = grid.slice(1).map(row => row.map(cell => cell || ''));
    
    (doc as any).autoTable({
        head: [grid[0]],
        body: body,
        styles: { halign: 'center', valign: 'middle', cellPadding: 2, fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' }
    });
    
    const sheetName = selectedRoom === 'all' ? 'All Classrooms' : selectedRoom;
    doc.save(`Consolidated-${sheetName}.pdf`);
    toast({ title: "Export Successful" });
  }, [generateGridData, selectedRoom, toast]);


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
              <CardDescription>View of all lectures scheduled in a classroom across all timetables.</CardDescription>
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
                     <DropdownMenuItem onClick={handleExportXLSX}>
                        <FileSpreadsheet />
                        Export as XLSX
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleExportCSV}>
                        <FileText />
                        Export as CSV
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleExportPDF}>
                        <FileType />
                        Export as PDF
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Timetable entries={filteredLectureTimetable} view="admin" onCellClick={handleCellClick} />
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

    