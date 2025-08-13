
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

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [timetables, setTimetables] = useState<TimetableData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const timetablesCollection = collection(db, "timetables");
    const unsubscribe = onSnapshot(timetablesCollection, (snapshot) => {
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
