
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
import { ALL_LABS } from './class-form';
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

export const LabView: React.FC = React.memo(() => {
  const { toast } = useToast();
  const { allTimetables, loading } = useTimetables();
  const [selectedLab, setSelectedLab] = useState(ALL_LABS[0]);
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);

  const practicalTimetable = useMemo(() => {
    if (!allTimetables) return [];
    const allClasses: TimetableEntry[] = [];
    allTimetables.forEach(timetable => {
        const labClasses = timetable.timetable.filter(entry => 
            entry.type === 'Practical' && entry.room && ALL_LABS.includes(entry.room)
        );
        allClasses.push(...labClasses);
    });
    return allClasses;
  }, [allTimetables]);
  
  const filteredPracticalTimetable = useMemo(() => {
    if (selectedLab === 'all') return practicalTimetable;
    return practicalTimetable.filter(e => e.room === selectedLab);
  }, [practicalTimetable, selectedLab]);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);

  const handleExport = useCallback((format: 'xlsx' | 'csv' | 'pdf') => {
    if (!filteredPracticalTimetable || filteredPracticalTimetable.length === 0) { 
        toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" }); 
        return; 
    }
    const filename = `Consolidated-${selectedLab === 'all' ? 'All-Labs' : selectedLab}`;
    const title = `Timetable for ${selectedLab === 'all' ? 'All Labs' : selectedLab}`;
    
    if (format === 'xlsx') {
        handleExportXLSX(filteredPracticalTimetable, filename, true);
    } else if (format === 'csv') {
        handleExportCSV(filteredPracticalTimetable, filename, true);
    } else if (format === 'pdf') {
        exportTimetableToPDF(filteredPracticalTimetable, title, true);
    }
    toast({ title: "Export Successful" });
  }, [filteredPracticalTimetable, selectedLab, toast]);


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
            <div className='flex-1'>
              <CardTitle>Consolidated Lab Timetable</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Labs</SelectItem>
                  {ALL_LABS.map(lab => <SelectItem key={lab} value={lab}>{lab}</SelectItem>)}
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
            <Timetable entries={filteredPracticalTimetable} view="admin" onCellClick={handleCellClick} />
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
LabView.displayName = 'LabView';
