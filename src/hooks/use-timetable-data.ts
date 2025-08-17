
"use client";

import { useState, useEffect } from 'react';
import type { TimetableData } from '@/lib/types';
import { MASTER_TIMETABLE } from '@/lib/mock-data';

// This hook now simulates an async data fetch from the mock data file.
export function useTimetableData() {
  const [allTimetables, setAllTimetables] = useState<TimetableData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
        try {
            // In a real app, this would be an API call.
            // Here, we're just using the imported mock data.
            setAllTimetables(MASTER_TIMETABLE);
        } catch (e) {
            setError(e instanceof Error ? e : new Error('Failed to load timetable data'));
        } finally {
            setLoading(false);
        }
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // The hook's return value is simplified as it always returns all timetables.
  // Individual components can filter this data as needed.
  return {
    allTimetables,
    loading,
    error,
  };
}

    