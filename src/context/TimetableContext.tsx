
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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
  
  // This useEffect hook sets up a real-time listener to the Firestore database.
  useEffect(() => {
    // Reference to the "timetables" collection in Firestore.
    const timetablesCollection = collection(db, "timetables");

    // onSnapshot listens for any changes in the collection.
    // When data is added, updated, or deleted, this function will run.
    const unsubscribe = onSnapshot(timetablesCollection, (snapshot) => {
      // We map over the documents returned from Firestore.
      const timetablesData = snapshot.docs.map(doc => ({
        id: doc.id, // The unique ID of the document.
        ...doc.data() // The rest of the data (name, timetable array).
      } as TimetableData));
      
      // Update the component's state with the new data.
      setTimetables(timetablesData);
      setLoading(false); // Stop loading, as we have the data now.
    }, (error) => {
        console.error("Error fetching timetables:", error);
        toast({
            title: 'Error Fetching Data',
            description: 'Could not fetch timetables from the database.',
            variant: 'destructive',
        });
        setLoading(false);
    });

    // Cleanup: unsubscribe from the listener when the component unmounts.
    return () => unsubscribe();
  }, [toast]);

  // Function to add a new timetable document to Firestore.
  const addTimetable = useCallback(async (name: string, year: string): Promise<string | null> => {
    try {
      const newTimetable = {
        name: `${name} (${year})`,
        timetable: [] // Starts with an empty timetable array.
      };
      // addDoc creates a new document in the "timetables" collection.
      const docRef = await addDoc(collection(db, "timetables"), newTimetable);
       toast({
        title: "Timetable Created!",
        description: `Timetable for "${newTimetable.name}" has been created.`,
      });
      return docRef.id; // Return the new document's ID.
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

  // Function to delete a timetable document from Firestore.
  const deleteTimetable = useCallback(async (id: string) => {
    try {
      const timetableToDelete = timetables.find(t => t.id === id);
      // deleteDoc deletes a document from Firestore using its ID.
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
  
  // Function to update the 'timetable' array within a specific document.
  const updateTimetableEntries = useCallback(async (timetableId: string, entries: TimetableEntry[]) => {
    try {
      // Get a reference to the specific document using its ID.
      const timetableRef = doc(db, "timetables", timetableId);
      // updateDoc updates the document, here we replace the 'timetable' field.
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
