
"use client"

import React, { useState, useCallback } from "react";
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { TimetableData, TimetableEntry, ClassType } from "@/lib/types";
import { Upload } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

type ImportTimetableDialogProps = {
  onImport: (newTimetable: TimetableData) => Promise<string | null>;
  children?: React.ReactNode;
};

export function ImportTimetableDialog({ onImport, children }: ImportTimetableDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [timetableName, setTimetableName] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      // Automatically generate a name from the file, user can edit it
      setTimetableName(selectedFile.name.replace(/\.(xlsx|xls|csv)$/i, ''));
    }
  };

  const handleImport = useCallback(async () => {
    if (!file || !timetableName) {
      toast({
        title: "Missing Information",
        description: "Please select a file and provide a timetable name.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: (string | null)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const entries: TimetableEntry[] = [];
        // Start from row 1 to skip header row
        for (let r = 1; r < json.length; r++) {
            const row = json[r];
            if (!row) continue;
            const day = row[0] as TimetableEntry['day'];
            if (!DAYS.includes(day)) continue;

            // Start from col 1 to skip day column
            for (let c = 1; c < row.length; c++) {
                const cell = row[c];
                if (!cell) continue;

                // Simple check to avoid processing merged cells again
                const isAlreadyProcessed = entries.some(entry => 
                    entry.day === day &&
                    TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) <= (c - 1) &&
                    (TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + (entry.duration || 1) -1) >= (c - 1)
                );
                if (isAlreadyProcessed) continue;

                const [subject, lecturer, room, batchesStr] = cell.split('\n');
                
                // Determine duration by looking ahead for identical content
                let duration = 1;
                while (c + duration < row.length && row[c + duration] === cell) {
                    duration++;
                }

                // Naive type detection
                let type: ClassType = 'Lecture';
                if (subject.toLowerCase().includes('practical') || subject.toLowerCase().includes('lab')) type = 'Practical';
                if (['Recess', 'Library', 'Help Desk', 'Sports'].includes(subject)) type = subject as ClassType;


                entries.push({
                    id: `imported-${day}-${c}-${Date.now()}`,
                    day,
                    time: TIME_SLOTS[c-1],
                    subject,
                    lecturer: lecturer || 'N/A',
                    room: room || 'N/A',
                    batches: batchesStr ? batchesStr.split(',').map(b => b.trim()) : [],
                    type,
                    duration,
                    color: `hsl(var(--chart-${(entries.length % 5) + 1}))` // Cycle through colors
                });
            }
        }
        
        const newTimetable: TimetableData = {
          id: `tt-imported-${Date.now()}`,
          name: timetableName,
          timetable: entries,
        };

        await onImport(newTimetable);
        setIsOpen(false);
        setFile(null);
        setTimetableName("");

      } catch (error) {
        console.error("Error parsing timetable file:", error);
        toast({
          title: "Import Failed",
          description: "There was an error parsing the file. Please ensure it is a valid Excel file in the correct format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsBinaryString(file);
  }, [file, timetableName, onImport, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Timetable
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Timetable</DialogTitle>
          <DialogDescription>
            Select an Excel (.xlsx, .xls) file to import. The file should have days in the first column and time slots in the first row.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="timetable-file">Excel File</Label>
            <Input id="timetable-file" type="file" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="timetable-name">Timetable Name</Label>
            <Input id="timetable-name" type="text" value={timetableName} onChange={(e) => setTimetableName(e.target.value)} placeholder="e.g. Computer Science (1st Sem)" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleImport} disabled={!file || !timetableName}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
ImportTimetableDialog.displayName = "ImportTimetableDialog";
