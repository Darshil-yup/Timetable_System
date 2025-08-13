
"use client";

import useSWR from 'swr';
import type { TimetableData, TimetableMetadata } from '@/lib/types';
import { MASTER_TIMETABLE } from '@/lib/mock-data';

const fetcher = async (url: string) => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 300));
  
  if (url === 'timetables') {
    return MASTER_TIMETABLE.map(({ id, name }) => ({ id, name }));
  }
  
  if (url.startsWith('timetables/')) {
    const id = url.split('/')[1];
    return MASTER_TIMETABLE.find(t => t.id === id) || null;
  }
  
  return null;
};

export function useTimetableData(id?: string) {
  const key = id ? `timetables/${id}` : 'timetables';

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    timetable: id ? (data as TimetableData | null | undefined) : undefined,
    timetables: !id ? (data as TimetableMetadata[] | null | undefined) : undefined,
    loading: isLoading,
    error,
    mutate
  };
}

    