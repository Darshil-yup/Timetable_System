
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TimetableData, TimetableEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface TimetableContextType {
  timetables: TimetableData[];
  loading: boolean;
  addTimetable: (name: string, year: string) => Promise<string | null>;
  deleteTimetable: (id: string) => Promise<void>;
  updateTimetableEntries: (timetableId: string, entries: TimetableEntry[]) => Promise<void>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

const cseIotTimetable: Omit<TimetableData, 'id'> = {
  name: "CSE(IoT) (3rd Sem)",
  timetable: [
    // Monday
    { id: "ciot1", subject: "OE:1", lecturer: "N/A", room: "ET-308", day: "Monday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot2", subject: "CAO", lecturer: "Harsha", room: "ET-308", day: "Monday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot3", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Monday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot4", subject: "DS", lecturer: "LRT", room: "ET-308", day: "Monday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot5", subject: "LIBRARY", lecturer: "LRT", room: "N/A", day: "Monday", time: "02:00-03:00", type: "Library", duration: 1 },
    { id: "ciot6", subject: "DS/CWS", lecturer: "LRT, RinaP, Harsha, Sharayu S", room: "IOT Lab 3,4/IOT Lab 1,2", day: "Monday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A1", "A2", "A3", "A4"], color: "hsl(var(--chart-3))" },
    
    // Tuesday
    { id: "ciot7", subject: "OE:1", lecturer: "N/A", room: "ET-308", day: "Tuesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot8", subject: "BPP", lecturer: "RinaP", room: "ET-308", day: "Tuesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot9", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Tuesday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot10", subject: "DS", lecturer: "LRT", room: "ET-308", day: "Tuesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot11", subject: "MI", lecturer: "N/A", room: "ET-308", day: "Tuesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot12", subject: "SPORTS", lecturer: "N/A", room: "N/A", day: "Tuesday", time: "03:00-05:00", type: "Sports", duration: 2 },

    // Wednesday
    { id: "ciot13", subject: "CAO", lecturer: "Harsha", room: "ET-308", day: "Wednesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot14", subject: "MI", lecturer: "N/A", room: "ET-308", day: "Wednesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot15", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot16", subject: "DS", lecturer: "LRT", room: "ET-308", day: "Wednesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot17", subject: "BPP", lecturer: "RinaP", room: "ET-308", day: "Wednesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot18", subject: "FOME", lecturer: "N/A", room: "ET-308", day: "Wednesday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot19", subject: "HELP DESK", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "04:00-05:00", type: "Help Desk", duration: 1 },

    // Thursday
    { id: "ciot20", subject: "BPP", lecturer: "RinaP", room: "ET-308", day: "Thursday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot21", subject: "FOME", lecturer: "N/A", room: "ET-308", day: "Thursday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot22", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Thursday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot23", subject: "CAO", lecturer: "Harsha", room: "ET-308", day: "Thursday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot24", subject: "MDM 1: IOT Arch. Pro.", lecturer: "Priya Kotewar", room: "ET-308", day: "Thursday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot25", subject: "DS/CWS", lecturer: "LRT, CSS, Harsha, Sadaf", room: "IOT Lab 3,4/IOT Lab 1,2", day: "Thursday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A3", "A4", "A1", "A2"], color: "hsl(var(--chart-3))" },

    // Friday
    { id: "ciot26", subject: "MI", lecturer: "N/A", room: "ET-308", day: "Friday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot27", subject: "CAO", lecturer: "Harsha", room: "ET-308", day: "Friday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot28", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Friday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot29", subject: "DS", lecturer: "LRT", room: "ET-308", day: "Friday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot30", subject: "MDM 1: IOT Arch. Pro.", lecturer: "Priya Kotewar", room: "ET-308", day: "Friday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot31", subject: "MI", lecturer: "Rath., SN,, Kirti S., ABT", room: "IOT Lab 1,2 / IOT Lab 3,4", day: "Friday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A1", "A2", "A3", "A4"], color: "hsl(var(--chart-4))" },
  ]
};

const cseIot5thSemTimetable: Omit<TimetableData, 'id'> = {
  name: "CSE(IoT) (5th Sem)",
  timetable: [
    // Monday
    { id: "ciot5-1", subject: "LAB: DBMS", lecturer: "RSB, Hrushikesh P", room: "IOT Lab 1,2", day: "Monday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A1", "A2"], color: "hsl(var(--chart-1))" },
    { id: "ciot5-2", subject: "LAB: OS", lecturer: "GMD, Radhika", room: "IOT Lab 3,4", day: "Monday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A3", "A4"], color: "hsl(var(--chart-1))" },
    { id: "ciot5-3a", subject: "PE-I:GIS", lecturer: "CSS", room: "ET 316", day: "Monday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot5-3b", subject: "PE-I:MFDA", lecturer: "Sharayu S", room: "ET-308", day: "Monday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot5-4", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Monday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot5-5", subject: "MDM:FOG", lecturer: "Prachi Gawande", room: "ET-316", day: "Monday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot5-6", subject: "TFCS", lecturer: "SSS", room: "ET-316", day: "Monday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    
    // Tuesday
    { id: "ciot5-7", subject: "DBMS", lecturer: "RSB", room: "ET-316", day: "Tuesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-8", subject: "OS", lecturer: "GMD", room: "ET-316", day: "Tuesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot5-9a", subject: "PE-I:GIS", lecturer: "CSS", room: "ET 316", day: "Tuesday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot5-9b", subject: "PE-I:MFDA", lecturer: "Sharayu S", room: "ET-308", day: "Tuesday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot5-10", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Tuesday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot5-11", subject: "MDM:FOG", lecturer: "Prachi Gawande", room: "ET-316", day: "Tuesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot5-12a", subject: "PE I: LAB: GIS", lecturer: "CSS, Radhika", room: "IOT Lab 3,4", day: "Tuesday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A1"], color: "hsl(var(--chart-2))" },
    { id: "ciot5-12b", subject: "PE I: LAB: MFDA", lecturer: "Sharayu S, AG", room: "IOT Lab 1,2", day: "Tuesday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A2"], color: "hsl(var(--chart-2))" },

    // Wednesday
    { id: "ciot5-13", subject: "OE:3 Arthashashtra", lecturer: "PVB", room: "ET-316", day: "Wednesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-14", subject: "DAA", lecturer: "SAS", room: "ET-316", day: "Wednesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot5-15", subject: "DAA", lecturer: "SAS", room: "ET-316", day: "Wednesday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot5-16", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot5-17", subject: "MDM:FOG", lecturer: "Prachi Gawande", room: "ET-316", day: "Wednesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot5-18", subject: "LAB: OS/DAA", lecturer: "GMD, Hrushikesh P/SAS, RinaP", room: "IOT Lab 3,4/IOT Lab 1,2", day: "Wednesday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A1", "A2", "A3", "A4"], color: "hsl(var(--chart-5))" },

    // Thursday
    { id: "ciot5-19", subject: "OE:3 Arthashashtra", lecturer: "PVB", room: "ET-316", day: "Thursday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-20", subject: "DBMS", lecturer: "RSB", room: "ET-316", day: "Thursday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-21", subject: "LAB: DBMS/DAA", lecturer: "RSB, RinaP/SAS, Nirmik", room: "IOT Lab 1,2/IOT Lab 3,4", day: "Thursday", time: "12:00-02:00", type: "Practical", duration: 2, batches: ["A3", "A4", "A1", "A2"], color: "hsl(var(--chart-4))" },
    { id: "ciot5-22", subject: "OS", lecturer: "GMD", room: "ET-316", day: "Thursday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot5-23", subject: "HELP DESK", lecturer: "N/A", room: "N/A", day: "Thursday", time: "04:00-05:00", type: "Help Desk", duration: 1, },
    { id: "ciot5-24", subject: "SPORTS", lecturer: "N/A", room: "N/A", day: "Thursday", time: "04:00-05:00", type: "Sports", duration: 1, },

    // Friday
    { id: "ciot5-25", subject: "OE:3 Arthashashtra", lecturer: "PVB", room: "ET-316", day: "Friday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-26", subject: "OS", lecturer: "GMD", room: "ET-316", day: "Friday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot5-27", subject: "TFCS", lecturer: "SSS", room: "ET-316", day: "Friday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot5-28", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Friday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot5-29", subject: "DBMS", lecturer: "RSB", room: "ET-316", day: "Friday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot5-30", subject: "DAA", lecturer: "SAS", room: "ET-316", day: "Friday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot5-31", subject: "LIBRARY", lecturer: "RADHIKA Tekade", room: "N/A", day: "Friday", time: "04:00-05:00", type: "Library", duration: 1 },
    { id: "ciot5-32", subject: "SPORTS", lecturer: "N/A", room: "N/A", day: "Friday", time: "04:00-05:00", type: "Sports", duration: 1 },
  ]
};

const cseIot7thSemTimetable: Omit<TimetableData, 'id'> = {
  name: "CSE(IoT) (7th Sem)",
  timetable: [
    // Monday
    { id: "ciot7-1a", subject: "PE-V: Blockchain", lecturer: "PAB", room: "EL-204", day: "Monday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-1b", subject: "PE-V: OSC", lecturer: "GA", room: "EL-203", day: "Monday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-2", subject: "SE", lecturer: "NUS", room: "EL-302", day: "Monday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot7-3a", subject: "PE-IV: SPI", lecturer: "Harsha", room: "EL-302", day: "Monday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-3b", subject: "PE-IV: DAI", lecturer: "PD", room: "EL-102", day: "Monday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-4", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Monday", time: "02:00-03:00", type: "Recess", duration: 1 },
    { id: "ciot7-5", subject: "CC", lecturer: "GKY", room: "ET-308", day: "Monday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot7-6", subject: "IOT DP", lecturer: "SPP", room: "ET-308", day: "Monday", time: "04:00-05:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },

    // Tuesday
    { id: "ciot7-7", subject: "LAB: SE/CC", lecturer: "NUS, PI/GKY, GA", room: "IOT Lab 1,2/IOT Lab 3,4", day: "Tuesday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A1", "A2", "A3", "A4"], color: "hsl(var(--chart-3))" },
    { id: "ciot7-8", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Tuesday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot7-9a", subject: "PE-IV: SPI", lecturer: "Harsha", room: "EL-302", day: "Tuesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-9b", subject: "PE-IV: DAI", lecturer: "PD", room: "EL-102", day: "Tuesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-10", subject: "LIBRARY", lecturer: "G. Ahmed", room: "N/A", day: "Tuesday", time: "02:00-03:00", type: "Library", duration: 1 },
    { id: "ciot7-11", subject: "CC", lecturer: "GKY", room: "EL-103", day: "Tuesday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "ciot7-12", subject: "IOT DP", lecturer: "SPP", room: "EL-103", day: "Tuesday", time: "04:00-05:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },

    // Wednesday
    { id: "ciot7-13", subject: "PE-III: LAB: IOT/FEC", lecturer: "S. Saba, Nirmik/PG, SJK", room: "IOT Lab 1,2/IOT Lab 3,4", day: "Wednesday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A1", "A2"], color: "hsl(var(--chart-1))" },
    { id: "ciot7-14", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "12:00-01:00", type: "Recess", duration: 1 },
    { id: "ciot7-15a", subject: "PE-III: IOT", lecturer: "S. Saba", room: "EL-204", day: "Wednesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-15b", subject: "PE-III: FEC", lecturer: "PG", room: "EL-102", day: "Wednesday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-16", subject: "Project", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "02:00-05:00", type: "Practical", duration: 3, color: "hsl(var(--chart-2))" },

    // Thursday
    { id: "ciot7-17", subject: "SE", lecturer: "NUS", room: "EL-211", day: "Thursday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot7-18a", subject: "PE-IV: SPI", lecturer: "Harsha", room: "ET-316", day: "Thursday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-18b", subject: "PE-IV: DAI", lecturer: "PD", room: "EL-211", day: "Thursday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "ciot7-19a", subject: "PE-III: IOT", lecturer: "S. Saba", room: "ET-308", day: "Thursday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-19b", subject: "PE-III: FEC", lecturer: "PG", room: "ET-316", day: "Thursday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-20", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Thursday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot7-21a", subject: "PE-V: Blockchain", lecturer: "PAB", room: "AIDS Lab 2", day: "Thursday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-21b", subject: "PE-V: OSC", lecturer: "GA", room: "AIDS Lab 1", day: "Thursday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-22", subject: "IOT DP", lecturer: "SPP", room: "EL-211", day: "Thursday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-23", subject: "HELP DESK", lecturer: "N/A", room: "N/A", day: "Thursday", time: "04:00-05:00", type: "Help Desk", duration: 1 },

    // Friday
    { id: "ciot7-24", subject: "LAB: SE/CC", lecturer: "NUS, GMV/GKY, SSB", room: "IOT Lab 1,2/IOT Lab 3,4", day: "Friday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A3", "A4", "A1", "A2"], color: "hsl(var(--chart-3))" },
    { id: "ciot7-25a", subject: "PE-III: IOT", lecturer: "S. Saba", room: "ET-308", day: "Friday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-25b", subject: "PE-III: FEC", lecturer: "PG", room: "ET-316", day: "Friday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "ciot7-26", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Friday", time: "01:00-02:00", type: "Recess", duration: 1 },
    { id: "ciot7-27a", subject: "PE-V: Blockchain", lecturer: "PAB", room: "AIDS Lab 2", day: "Friday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-27b", subject: "PE-V: OSC", lecturer: "GA", room: "EL-204", day: "Friday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "ciot7-28", subject: "SE", lecturer: "NUS", room: "EL-211", day: "Friday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "ciot7-29", subject: "CC", lecturer: "GKY", room: "EL-102", day: "Friday", time: "04:00-05:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
  ]
};

const cseAids3rdSemTimetable: Omit<TimetableData, 'id'> = {
  name: "CSE(AIDS) (3rd Sem)",
  timetable: [
    // Monday
    { id: "aids3-1", subject: "OE:1", lecturer: "N/A", room: "EL-302", day: "Monday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "aids3-2", subject: "LA", lecturer: "NAB", room: "EL-302", day: "Monday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "aids3-3", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Monday", time: "12:00-01:00", type: "Recess", duration: 1, },
    { id: "aids3-4", subject: "Library", lecturer: "NEHA INGOLE", room: "N/A", day: "Monday", time: "01:00-02:00", type: "Library", duration: 1, },
    { id: "aids3-5", subject: "DS", lecturer: "PAB", room: "EL-302", day: "Monday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "aids3-6", subject: "SDS", lecturer: "SAG", room: "EL-302", day: "Monday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "aids3-7", subject: "FOME", lecturer: "SSN", room: "EL-302", day: "Monday", time: "04:00-05:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },

    // Tuesday
    { id: "aids3-8", subject: "OE:1", lecturer: "N/A", room: "EL-302", day: "Tuesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "aids3-9", subject: "DS", lecturer: "PAB", room: "EL-302", day: "Tuesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "aids3-10", subject: "LA", lecturer: "NAB", room: "EL-302", day: "Tuesday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "aids3-11", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Tuesday", time: "01:00-02:00", type: "Recess", duration: 1, },
    { id: "aids3-12", subject: "ESPM", lecturer: "PVG", room: "EL-302", day: "Tuesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "aids3-13", subject: "LAB: SDS/DS", lecturer: "SAG,HARSHA/PAB,S. SABA", room: "AIDS LAB2/AIDS LAB 1", day: "Tuesday", time: "03:00-05:00", type: "Practical", duration: 2, batches: ["A1", "A2", "A3", "A4"], color: "hsl(var(--chart-4))" },

    // Wednesday
    { id: "aids3-14", subject: "SDS", lecturer: "SAG", room: "EL-302", day: "Wednesday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "aids3-15", subject: "DS", lecturer: "PAB", room: "EL-302", day: "Wednesday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "aids3-16", subject: "FOME", lecturer: "SSN", room: "EL-302", day: "Wednesday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "aids3-17", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Wednesday", time: "01:00-02:00", type: "Recess", duration: 1, },
    { id: "aids3-18", subject: "ESPM", lecturer: "PVG", room: "EL-302", day: "Wednesday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-3))" },
    { id: "aids3-19", subject: "LA", lecturer: "NAB", room: "EL-302", day: "Wednesday", time: "03:00-04:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },

    // Thursday
    { id: "aids3-20", subject: "SDS", lecturer: "SAG", room: "EL-302", day: "Thursday", time: "10:00-11:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "aids3-21", subject: "DS", lecturer: "PAB", room: "EL-302", day: "Thursday", time: "11:00-12:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-5))" },
    { id: "aids3-22", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Thursday", time: "12:00-01:00", type: "Recess", duration: 1, },
    { id: "aids3-23", subject: "LA", lecturer: "NAB", room: "EL-302", day: "Thursday", time: "01:00-02:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-1))" },
    { id: "aids3-24", subject: "MDM 1: BDS/MDM2:Front End", lecturer: "AG/Nirmik", room: "EL-302/EL-303", day: "Thursday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "aids3-25", subject: "HELP DESK", lecturer: "N/A", room: "N/A", day: "Thursday", time: "03:00-04:00", type: "Help Desk", duration: 1, },

    // Friday
    { id: "aids3-26", subject: "LAB: SDS/DS", lecturer: "SAG,NI/PAB,S. SABA", room: "AIDS LAB2/AIDS LAB 1", day: "Friday", time: "10:00-12:00", type: "Practical", duration: 2, batches: ["A3", "A4", "A1", "A2"], color: "hsl(var(--chart-4))" },
    { id: "aids3-27", subject: "SDS", lecturer: "SAG", room: "EL-302", day: "Friday", time: "12:00-01:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-4))" },
    { id: "aids3-28", subject: "Recess", lecturer: "N/A", room: "N/A", day: "Friday", time: "01:00-02:00", type: "Recess", duration: 1, },
    { id: "aids3-29", subject: "MDM 1: BDS/MDM2:Front End", lecturer: "AG/Nirmik", room: "EL-302/EL-303", day: "Friday", time: "02:00-03:00", type: "Lecture", duration: 1, color: "hsl(var(--chart-2))" },
    { id: "aids3-30", subject: "SPORTS", lecturer: "N/A", room: "N/A", day: "Friday", time: "03:00-05:00", type: "Sports", duration: 2, },
  ]
};

const timetablesToSeed = [cseIotTimetable, cseIot5thSemTimetable, cseIot7thSemTimetable, cseAids3rdSemTimetable];

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const seedAndFetch = async () => {
        try {
            const timetablesCollection = collection(db, "timetables");
            const querySnapshot = await getDocs(timetablesCollection);
            const existingTimetableNames = querySnapshot.docs.map(doc => doc.data().name);

            const batch = writeBatch(db);

            for (const timetableToSeed of timetablesToSeed) {
                if (!existingTimetableNames.includes(timetableToSeed.name)) {
                    const newDocRef = doc(timetablesCollection);
                    batch.set(newDocRef, timetableToSeed);
                    console.log(`Seeding timetable: ${timetableToSeed.name}`);
                }
            }
            await batch.commit();

        } catch (error) {
            console.error("Error seeding database: ", error);
            toast({
                title: 'Error Seeding Data',
                description: 'Could not seed the initial timetable.',
                variant: 'destructive',
            });
        } finally {
            const unsubscribe = onSnapshot(collection(db, "timetables"), (snapshot) => {
              const timetablesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              } as TimetableData));
              setTimetables(timetablesData);
              setLoading(false);
            }, (error) => {
                console.error("Error fetching timetables:", error);
                toast({
                    title: 'Error Fetching Data',
                    description: 'Could not fetch timetables from the database.',
                    variant: 'destructive',
                });
                setLoading(false);
            });
            return unsubscribe;
        }
    };
    
    const unsubscribePromise = seedAndFetch();

    return () => {
        unsubscribePromise.then(unsubscribe => unsubscribe && unsubscribe());
    };
  }, [toast]);

  const addTimetable = useCallback(async (name: string, year: string): Promise<string | null> => {
    try {
      const newTimetable = {
        name: `${name} (${year})`,
        timetable: []
      };
      const docRef = await addDoc(collection(db, "timetables"), newTimetable);
       toast({
        title: "Timetable Created!",
        description: `Timetable for "${newTimetable.name}" has been created.`,
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating timetable: ", error);
      toast({
        title: 'Error Creating Timetable',
        description: 'Could not save the new timetable to the database.',
        variant: 'destructive',
      });
      return null;
    }
  }, [toast]);

  const deleteTimetable = useCallback(async (id: string) => {
    try {
      const timetableToDelete = timetables.find(t => t.id === id);
      await deleteDoc(doc(db, "timetables", id));
      toast({
        title: "Timetable Deleted",
        description: `The timetable for "${timetableToDelete?.name}" has been deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting timetable: ", error);
       toast({
        title: 'Error Deleting Timetable',
        description: 'There was a problem deleting the timetable.',
        variant: 'destructive',
      });
    }
  }, [toast, timetables]);
  
  const updateTimetableEntries = useCallback(async (timetableId: string, entries: TimetableEntry[]) => {
    try {
      const timetableRef = doc(db, "timetables", timetableId);
      await updateDoc(timetableRef, {
        timetable: entries
      });
    } catch (error) {
       console.error("Error updating timetable entries: ", error);
       toast({
        title: 'Error Updating Timetable',
        description: 'Could not save changes to the database.',
        variant: 'destructive',
      });
    }
  }, [toast]);


  return (
    <TimetableContext.Provider value={{ timetables, loading, addTimetable, deleteTimetable, updateTimetableEntries }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetables() {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetables must be used within a TimetableProvider');
  }
  return context;
}
