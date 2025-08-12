
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
    
    // Saturday - Empty
  ]
};


export function TimetableProvider({ children }: { children: ReactNode }) {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const seedDatabase = useCallback(async () => {
    try {
        const timetablesCollection = collection(db, "timetables");
        const querySnapshot = await getDocs(timetablesCollection);
        const timetableExists = querySnapshot.docs.some(doc => doc.data().name === cseIotTimetable.name);

        if (!timetableExists) {
            await addDoc(timetablesCollection, cseIotTimetable);
            console.log("CSE(IoT) timetable seeded successfully.");
        }
    } catch (error) {
        console.error("Error seeding database: ", error);
        toast({
            title: 'Error Seeding Data',
            description: 'Could not seed the initial timetable.',
            variant: 'destructive',
        });
    }
  }, [toast]);


  useEffect(() => {
    setLoading(true);
    seedDatabase(); 

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

    return () => unsubscribe();
  }, [toast, seedDatabase]);

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

    