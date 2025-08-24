
"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, User, Book, FileDown, FileText, FileType } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import type { TimetableEntry, TimetableMetadata } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportTimetableToPDF } from '@/lib/pdf-export';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { handleExportCSV, handleExportXLSX } from '@/lib/export';

const ClassDetailsDialog = dynamic(() => import('@/components/shared/class-details-dialog').then(mod => mod.ClassDetailsDialog));

export default function LecturerDashboardPage() {
  const { toast } = useToast();
  const { allTimetables, loading: timetablesLoading } = useTimetables();
  
  const [selectedLecturer, setSelectedLecturer] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewingEntries, setViewingEntries] = useState<TimetableEntry[] | null>(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedMasterTimetableId, setSelectedMasterTimetableId] = useState('');

  
  useEffect(() => {
    if (LECTURERS.length > 0 && !selectedLecturer) {
        setSelectedLecturer(LECTURERS[0].name);
    }
  }, [selectedLecturer]);

  useEffect(() => {
    if (!timetablesLoading && allTimetables && allTimetables.length > 0 && !selectedMasterTimetableId) {
      setSelectedMasterTimetableId(allTimetables[0].id);
    }
  }, [timetablesLoading, allTimetables, selectedMasterTimetableId]);

  const timetableMetadatas = useMemo((): TimetableMetadata[] => {
    return allTimetables?.map(t => ({ id: t.id, name: t.name })) || [];
  }, [allTimetables]);

  const activeMasterTimetable = useMemo(() => {
    return allTimetables?.find(t => t.id === selectedMasterTimetableId) || null;
  }, [allTimetables, selectedMasterTimetableId]);

  const handleLecturerChange = (lecturerName: string) => {
    setSelectedLecturer(lecturerName);
    setSelectedSubject('all');
  }

  const lecturerTimetable = useMemo(() => {
    if (!selectedLecturer || !allTimetables) return [];
    
    const allClasses: TimetableEntry[] = [];
    allTimetables.forEach(timetable => {
        const lecturerClasses = timetable.timetable.filter(entry => 
            entry.lecturer && entry.lecturer.includes(selectedLecturer)
        );
        allClasses.push(...lecturerClasses);
    });
    return allClasses;
  }, [selectedLecturer, allTimetables]);

  const lecturerSubjects = useMemo(() => {
    if (!lecturerTimetable) return [];
    const subjects = new Set(lecturerTimetable.map(entry => entry.subject));
    return ['All Subjects', ...Array.from(subjects)];
  }, [lecturerTimetable]);

  const filteredTimetable = useMemo(() => {
    if (selectedSubject === 'all' || selectedSubject === 'All Subjects') {
      return lecturerTimetable;
    }
    return lecturerTimetable.filter(entry => entry.subject === selectedSubject);
  }, [lecturerTimetable, selectedSubject]);

  const handleCellClick = useCallback((entries: TimetableEntry[]) => {
    if (entries.length > 0) {
        setViewingEntries(entries);
    }
  }, []);

  const closeDetailsDialog = useCallback(() => {
    setViewingEntries(null);
  }, []);

  const handleExport = useCallback((format: 'xlsx' | 'csv' | 'pdf') => {
    const isMasterView = activeTab === 'master';
    const timetableToExport = isMasterView ? activeMasterTimetable?.timetable : filteredTimetable;
    const name = isMasterView ? activeMasterTimetable?.name : selectedLecturer;
    const title = isMasterView ? `${activeMasterTimetable?.name} - Timetable` : `Timetable for ${selectedLecturer}`;
    
    if (!timetableToExport || timetableToExport.length === 0) {
        toast({ title: "Export Failed", description: "No data to export.", variant: "destructive" });
        return;
    }

    const filename = `${name}-Timetable`;

    if (format === 'xlsx') {
        handleExportXLSX(timetableToExport, filename, isMasterView);
    } else if (format === 'csv') {
        handleExportCSV(timetableToExport, filename, isMasterView);
    } else if (format === 'pdf') {
        exportTimetableToPDF(timetableToExport, title, isMasterView);
    }
    toast({ title: "Export Successful" });
  }, [activeTab, activeMasterTimetable, filteredTimetable, selectedLecturer, toast]);


if (timetablesLoading) {
    return (
        <div className="container mx-auto p-8 space-y-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
               <Skeleton className="h-10 w-[280px]" />
               <Skeleton className="h-10 w-[170px]" />
            </div>
            <Skeleton className="h-[600px] w-full" />
        </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <TabsList>
                    <TabsTrigger value="personal">My Timetable</TabsTrigger>
                    <TabsTrigger value="master">Master View</TabsTrigger>
                </TabsList>
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
            <TabsContent value="personal">
                <div className="flex items-start justify-start mb-6 flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <Select value={selectedLecturer} onValueChange={handleLecturerChange}>
                        <SelectTrigger className="w-[280px]">
                            <div className="flex items-center gap-2">
                                <User />
                                <SelectValue placeholder="Select a Lecturer" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {LECTURERS.map(lecturer => (
                                <SelectItem key={lecturer.id} value={lecturer.name}>{lecturer.name}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={!selectedLecturer || lecturerSubjects.length <= 1}>
                            <SelectTrigger className="w-[280px]">
                                <div className="flex items-center gap-2">
                                    <Book />
                                    <SelectValue placeholder="Select a Subject" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {lecturerSubjects.map(subject => (
                                    <SelectItem key={subject} value={subject === 'All Subjects' ? 'all' : subject}>
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 {selectedLecturer ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Hello, {selectedLecturer}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Timetable 
                                entries={filteredTimetable} 
                                view="lecturer"
                                onCellClick={handleCellClick}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <p className="text-muted-foreground mb-2">No lecturer selected.</p>
                        <p className="text-muted-foreground text-center">Please select a lecturer to view their consolidated timetable.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="master">
                 <div className="flex items-start justify-start mb-6 flex-wrap gap-4">
                    <Select value={selectedMasterTimetableId} onValueChange={setSelectedMasterTimetableId}>
                        <SelectTrigger className="w-[320px]">
                           <SelectValue placeholder="Select a timetable" />
                        </SelectTrigger>
                        <SelectContent>
                            {timetableMetadatas.map(timetable => (
                                <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {activeMasterTimetable ? (
                     <Card>
                        <CardHeader>
                            <CardTitle>{activeMasterTimetable.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Timetable
                                entries={activeMasterTimetable?.timetable || []}
                                view="lecturer"
                                onCellClick={handleCellClick}
                                highlightedLecturer={selectedLecturer}
                            />
                        </CardContent>
                    </Card>
                ) : (
                     <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <p className="text-muted-foreground mb-2">No timetable selected.</p>
                    </div>
                )}
            </TabsContent>
        </Tabs>

      {viewingEntries && (
        <ClassDetailsDialog
            isOpen={!!viewingEntries}
            onOpenChange={(isOpen) => !isOpen && closeDetailsDialog()}
            entries={viewingEntries}
        />
      )}
    </div>
  );
}
