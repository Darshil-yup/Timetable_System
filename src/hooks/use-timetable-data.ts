
"use client";

import useSWR from 'swr';
import type { TimetableData, TimetableMetadata } from '@/lib/types';
import { MASTER_TIMETABLE } from '@/lib/mock-data';

const fetcher = async (url: string) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  if (url === '/timetables') {
    const timetables: TimetableMetadata[] = MASTER_TIMETABLE.map(tt => ({
      id: tt.id,
      name: tt.name,
    }));
    return timetables;
  }

  if (url.startsWith('/timetables/')) {
    const id = url.split('/')[2];
    if (!id) return null;
    const timetable = MASTER_TIMETABLE.find(tt => tt.id === id);
    return timetable || null;
  }
  
  return null;
};


export function useTimetableData(id?: string) {
  const key = id ? `/timetables/${id}` : '/timetables';

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false, 
  });

  // This logic is a bit tricky. When id is provided, `data` is TimetableData.
  // When id is not provided, `data` is TimetableMetadata[].
  // We cast based on the presence of `id` to help TypeScript and avoid returning incorrect types.
  return {
    timetable: id ? (data as TimetableData) : undefined,
    timetables: !id ? (data as TimetableMetadata[]) : [],
    loading: isLoading,
    error,
    mutate
  };
}
