
"use client";

import useSWR from 'swr';
import type { TimetableData, TimetableMetadata } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const fetcher = async (url: string) => {
  // Simulate network delay
  // await new Promise(res => setTimeout(res, 300));
  
  if (url === 'timetables') {
    const querySnapshot = await getDocs(collection(db, "timetables"));
    const timetables: (TimetableData | TimetableMetadata)[] = [];
    querySnapshot.forEach((doc) => {
        // Decide whether to fetch full data or just metadata based on context
        // For simplicity here, we'll fetch full data for 'timetables' key
        // In a more optimized scenario, you might have separate keys like 'timetables/metadata'
        timetables.push({ id: doc.id, ...doc.data() } as TimetableData);
    });
    return timetables;
  }
  
  if (url.startsWith('timetables/')) {
    const id = url.split('/')[1];
    if (!id) return null;
    const docRef = doc(db, "timetables", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as TimetableData;
    }
    return null;
  }
  
  return null;
};

export function useTimetableData(id?: string) {
  // If an ID is provided, we fetch a single document.
  // If no ID is provided, we fetch all documents (for consolidated views).
  const key = id ? `timetables/${id}` : 'timetables';

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    // If ID is present, we're fetching a single timetable
    timetable: id ? (data as TimetableData | null | undefined) : undefined,
    // If no ID, we're fetching all timetables for consolidation
    timetables: !id ? (data as TimetableData[] | null | undefined) : undefined,
    loading: isLoading,
    error,
    mutate
  };
}
