
"use client";

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Timetable } from '@/components/shared/timetable';
import { LECTURERS } from '@/lib/mock-data';
import { useTimetables } from '@/context/TimetableContext';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

export default function LecturerDashboardPage() {
  const { timetables } = useTimetables();
  const { toast } = useToast();
  
  const [selectedTimetableId, setSelectedTimetableId] = useState('');
  const [activeTab, setActiveTab] = useState('my-timetable');

  // Simulate a logged-in user. In a real app, this would come from an auth context.
  const currentLecturerName = LECTURERS[1].name;

  const myTimetableRef = useRef<HTMLDivElement>(null);
  const masterTimetableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timetables.length > 0 && !timetables.some(t => t.id === selectedTimetableId)) {
      setSelectedTimetableId(timetables[0].id);
    }
  }, [timetables, selectedTimetableId]);

  const activeTimetable = timetables.find(t => t.id === selectedTimetableId);

  const lecturerSchedule = activeTimetable 
    ? activeTimetable.schedule.filter(entry => entry.lecturer.includes(currentLecturerName))
    : [];

  const handleExportPDF = () => {
    const timetableToExportRef = activeTab === 'my-timetable' ? myTimetableRef : masterTimetableRef;
    const timetableName = activeTab === 'my-timetable' ? `${currentLecturerName}-Timetable` : `${activeTimetable?.name}-Master`;

    if (!timetableToExportRef.current || !activeTimetable) return;

    html2canvas(timetableToExportRef.current, {
        scale: 2,
        useCORS: true,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${timetableName}.pdf`);
    }).catch(err => {
        console.error("Error generating PDF:", err);
        toast({
            title: "PDF Export Failed",
            description: "Could not export the timetable. Please try again.",
            variant: "destructive",
        })
    });
  };

  return (
    <div className="container mx-auto">
       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Lecturer Dashboard</h1>
        <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedTimetableId} onValueChange={setSelectedTimetableId} disabled={timetables.length === 0}>
              <SelectTrigger className="w-auto md:w-[280px]">
                  <SelectValue placeholder="Select Department & Year" />
              </SelectTrigger>
              <SelectContent>
                  {timetables.map(timetable => (
                  <SelectItem key={timetable.id} value={timetable.id}>{timetable.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
             <Button variant="outline" onClick={handleExportPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
        </div>
      </div>

      {activeTimetable ? (
        <Tabs defaultValue="my-timetable" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="my-timetable">My Timetable</TabsTrigger>
                <TabsTrigger value="master-timetable">Master Timetable</TabsTrigger>
            </TabsList>
            <TabsContent value="my-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule for {currentLecturerName}</CardTitle>
                        <CardDescription>
                            Displaying the personalized timetable for {currentLecturerName} from the {activeTimetable.name} schedule.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            ref={myTimetableRef}
                            entries={lecturerSchedule} 
                            view="lecturer"
                        />
                    </CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="master-timetable">
                <Card>
                    <CardHeader>
                        <CardTitle>Master Schedule: {activeTimetable.name}</CardTitle>
                        <CardDescription>
                            This is the full, read-only timetable. Your classes are highlighted for convenience.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Timetable 
                            ref={masterTimetableRef}
                            entries={activeTimetable.schedule} 
                            view="lecturer"
                            highlightedLecturer={currentLecturerName}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
       ) : (
         <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
            <p className="text-muted-foreground mb-4">No timetable selected.</p>
            <p className="text-muted-foreground">Select a timetable from the dropdown to view schedules.</p>
        </div>
       )}
    </div>
  );
}
