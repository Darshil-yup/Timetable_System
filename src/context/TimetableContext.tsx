
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { TimetableData } from '@/lib/types';

interface TimetableContextType {
  activeTimetable: TimetableData | null | undefined;
  setActiveTimetable: React.Dispatch<React.SetStateAction<TimetableData | null | undefined>>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export function TimetableProvider({ children }: { children: ReactNode }) {
  const [activeTimetable, setActiveTimetable] = useState<TimetableData | null | undefined>(undefined);

  return (
    <TimetableContext.Provider value={{ activeTimetable, setActiveTimetable }}>
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
