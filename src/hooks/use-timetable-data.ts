
"use client";

import useSWR from 'swr';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TimetableData, TimetableMetadata } from '@/lib/types';

const fetcher = async (url: string) => {
  if (url === '/timetables') {
    const querySnapshot = await getDocs(collection(db, "timetables"));
    const timetables: TimetableMetadata[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));
    return timetables;
  }

  if (url.startsWith('/timetables/')) {
    const id = url.split('/')[2];
    if (!id) return null;
    const docRef = doc(db, 'timetables', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TimetableData;
    }
    return null;
  }
  
  return null;
};


export function useTimetableData(id?: string) {
  const key = id ? `/timetables/${id}` : '/timetables';

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false, // Optional: disable revalidation on window focus
  });

  return {
    timetable: data as TimetableData,
    timetables: data as TimetableMetadata[],
    loading: isLoading,
    error,
    mutate
  };
}
