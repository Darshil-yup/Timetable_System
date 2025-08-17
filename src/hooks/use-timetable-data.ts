
"use client";

import useSWR from 'swr';
import type { TimetableData, TimetableMetadata } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, collectionGroup, query } from 'firebase/firestore';

const fetcher = async (url: string) => {
  // Key for fetching all timetable metadata
  if (url === 'timetables/metadata') {
    const querySnapshot = await getDocs(collection(db, "timetables"));
    const metadatas: TimetableMetadata[] = [];
    querySnapshot.forEach((doc) => {
        metadatas.push({ id: doc.id, name: doc.data().name });
    });
    return metadatas;
  }
  
  // Key for fetching all full timetable documents
  if (url === 'timetables/all') {
    const querySnapshot = await getDocs(collection(db, "timetables"));
    const timetables: TimetableData[] = [];
    querySnapshot.forEach((doc) => {
        timetables.push({ id: doc.id, ...doc.data() } as TimetableData);
    });
    return timetables;
  }

  // Key for fetching a single timetable document
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

export function useTimetableData(id?: string, fetchAllFull?: boolean) {
  let key: string | null = null;
  
  if (id) {
    // Fetch a single full timetable
    key = `timetables/${id}`;
  } else if (fetchAllFull) {
    // Fetch all full timetables (for consolidated views)
    key = 'timetables/all';
  } else {
    // Fetch just the metadata (for selectors)
    key = 'timetables/metadata';
  }

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    // A single full timetable
    timetable: id ? (data as TimetableData | null | undefined) : undefined,
    // Metadata for all timetables
    timetables: !id && !fetchAllFull ? (data as TimetableMetadata[] | null | undefined) : undefined,
    // All full timetables for consolidated views
    allTimetables: fetchAllFull ? (data as TimetableData[] | null | undefined) : undefined,
    loading: isLoading,
    error,
    mutate
  };
}

    