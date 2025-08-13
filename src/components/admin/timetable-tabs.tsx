
"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Timetable } from '@/components/shared/timetable';
import { AddClassDialog } from '@/components/admin/add-class-dialog';
import { ALL_CLASSROOMS, ALL_LABS } from './class-form';
import type { TimetableData, TimetableEntry } from '@/lib/types';
import { Pencil, FileSpreadsheet, XCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

interface TimetableActionsProps {
  onAddClass: (newClass: Omit<TimetableEntry, 'id'>) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  handleExportSheet: () => void;
}

const TimetableActions = React.memo(({ onAddClass, isEditMode, onToggleEditMode, handleExportSheet }: TimetableActionsProps) => (
  <div className="flex items-center justify-end gap-2 flex-wrap">
    <Button variant="outline" onClick={handleExportSheet}>
      <FileSpreadsheet />
      Export as Sheet
    </Button>
    <AddClassDialog onAddClass={onAddClass} />
    <Button variant="outline" onClick={onToggleEditMode}>
      {isEditMode ? <XCircle /> : <Pencil />}
      {isEditMode ? 'Exit Edit Mode' : 'Modify Timetable'}
    </Button>
  </div>
));
TimetableActions.displayName = 'TimetableActions';

interface TimetableTabsProps {
  activeTimetable: TimetableData | undefined;
  onAddClass: (newClass: Omit<TimetableEntry, 'id'>) => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onEditClass: (entry: TimetableEntry) => void;
}

export const TimetableTabs: React.FC<TimetableTabsProps> = React.memo(({
  activeTimetable,
  onAddClass,
  isEditMode,
  onToggleEditMode,
  onEditClass
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('master');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [selectedLab, setSelectedLab] = useState('all');

  useEffect(() => {
    setSelectedRoom('all');
    setSelectedLab('all');
  }, [activeTab, activeTimetable?.id]);

  const lectureTimetable = useMemo(() =>
    activeTimetable?.timetable.filter(e => e.type === 'Lecture') || [],
    [activeTimetable]
  );

  const practicalTimetable = useMemo(() =>
    activeTimetable?.timetable.filter(e => e.type === 'Practical') || [],
    [activeTimetable]
  );
  
  const filteredLectureTimetable = useMemo(() => {
    if (selectedRoom === 'all') return lectureTimetable;
    return lectureTimetable.filter(e => e.room === selectedRoom);
  }, [lectureTimetable, selectedRoom]);

  const filteredPracticalTimetable = useMemo(() => {
    if (selectedLab === 'all') return practicalTimetable;
    return practicalTimetable.filter(e => e.room === selectedLab);
  }, [practicalTimetable, selectedLab]);

  const handleExportSheet = useCallback(() => {
    if (!activeTimetable) return toast({ title: "Export Failed", variant: "destructive" });

    let dataToExport: TimetableEntry[];
    let sheetName: string;

    switch (activeTab) {
      case 'classroom':
        dataToExport = filteredLectureTimetable;
        sheetName = 'Classroom Timetable';
        break;
      case 'lab':
        dataToExport = filteredPracticalTimetable;
        sheetName = 'Lab Timetable';
        break;
      default:
        dataToExport = activeTimetable.timetable;
        sheetName = 'Master Timetable';
        break;
    }

    const grid = [
      ["Day/Time", ...TIME_SLOTS],
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    dataToExport.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        if (dayIndex > 0 && timeIndex > 0) {
             const cellContent = [entry.subject, entry.lecturer, entry.room, entry.batches?.join(', ')].filter(Boolean).join('\n');
            for (let i = 0; i < (entry.duration || 1); i++) {
                if (timeIndex + i < grid[0].length) {
                    grid[dayIndex][timeIndex + i] = cellContent;
                }
            }
        }
    });

    const worksheet = XLSX.utils.aoa_to_sheet(grid);
    worksheet['!merges'] = [];
    dataToExport.forEach(entry => {
      const dayIndex = DAYS.indexOf(entry.day) + 1;
      const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
      if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
          worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${activeTimetable.name}-${sheetName}.xlsx`);
    toast({ title: "Export Successful" });
  }, [activeTimetable, activeTab, filteredLectureTimetable, filteredPracticalTimetable, toast]);

  if (!activeTimetable) {
    return null; // Or a message indicating no timetable is selected
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3 max-w-lg">
        <TabsTrigger value="master">Master</TabsTrigger>
        <TabsTrigger value="classroom">Classrooms</TabsTrigger>
        <TabsTrigger value="lab">Labs</TabsTrigger>
      </TabsList>

      <TabsContent value="master">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Master Timetable</CardTitle>
              <CardDescription>Combined view of all classes.</CardDescription>
            </div>
            <TimetableActions {...{ onAddClass, isEditMode, onToggleEditMode, handleExportSheet }} />
          </CardHeader>
          <CardContent>
            <Timetable entries={activeTimetable.timetable} view="admin" isEditMode={isEditMode} onEdit={onEditClass} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="classroom">
        <Card>
          <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Classroom Timetable</CardTitle>
              <CardDescription>Filtered view for lectures.</CardDescription>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classrooms</SelectItem>
                  {ALL_CLASSROOMS.map(room => <SelectItem key={room} value={room}>{room}</SelectItem>)}
                </SelectContent>
              </Select>
              <TimetableActions {...{ onAddClass, isEditMode, onToggleEditMode, handleExportSheet }} />
            </div>
          </CardHeader>
          <CardContent>
            <Timetable entries={filteredLectureTimetable} view="admin" isEditMode={isEditMode} onEdit={onEditClass} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="lab">
        <Card>
          <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Lab Timetable</CardTitle>
              <CardDescription>Filtered view for practicals.</CardDescription>
            </div>
            <div className="flex w-full sm:w-auto items-center gap-2">
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Labs</SelectItem>
                  {ALL_LABS.map(lab => <SelectItem key={lab} value={lab}>{lab}</SelectItem>)}
                </SelectContent>
              </Select>
              <TimetableActions {...{ onAddClass, isEditMode, onToggleEditMode, handleExportSheet }} />
            </div>
          </CardHeader>
          <CardContent>
            <Timetable entries={filteredPracticalTimetable} view="admin" isEditMode={isEditMode} onEdit={onEditClass} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
});

TimetableTabs.displayName = 'TimetableTabs';
