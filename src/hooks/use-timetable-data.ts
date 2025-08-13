
"use client";

import useSWR from 'swr';
import type { TimetableData, TimetableMetadata } from '@/lib/types';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const fetcher = async (url: string) => {
  if (url === 'timetables') {
    const querySnapshot = await getDocs(collection(db, "timetables"));
    const timetables: TimetableMetadata[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
    }));
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
  const key = id ? `timetables/${id}` : 'timetables';

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    // Add Firestore real-time updates if needed in the future with SWR's subscription feature
  });

  return {
    timetable: id ? (data as TimetableData | null | undefined) : undefined,
    timetables: !id ? (data as TimetableMetadata[] | null | undefined) : undefined,
    loading: isLoading,
    error,
    mutate
  };
}

    