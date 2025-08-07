
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { TimetableData } from '@/lib/types';
import { MASTER_SCHEDULE } from '@/lib/mock-data';

interface TimetableContextType {
  timetables: TimetableData[];
  setTimetables: React.Dispatch<React.SetStateAction<TimetableData[]>>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [timetables, setTimetables] = useState<TimetableData[]>(MASTER_SCHEDULE);

  return (
    <TimetableContext.Provider value={{ timetables, setTimetables }}>
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
