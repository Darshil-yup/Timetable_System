
import { useState, useEffect } from 'react';
import type { TimetableData, TimetableEntry } from '@/lib/types';

export function useConflicts(allTimetables: TimetableData[]) {
  const [conflictingEntryIds, setConflictingEntryIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const findConflicts = () => {
      const newConflictingIds = new Set<string>();
      if (!allTimetables || allTimetables.length === 0) {
        setConflictingEntryIds(newConflictingIds);
        return;
      }
      
      const allEntries = allTimetables.flatMap(t => t.timetable);
      const scheduleMap: { [key: string]: TimetableEntry[] } = {};

      allEntries.forEach(entry => {
        if (!entry.lecturer || entry.lecturer === 'N/A') return;
        const lecturers = entry.lecturer.split(',').map(l => l.trim());
        
        lecturers.forEach(lecturer => {
          for (let i = 0; i < (entry.duration || 1); i++) {
            const startHour = parseInt(entry.time.split('-')[0]);
            const currentHour = startHour + i;
            const key = `${lecturer}-${entry.day}-${currentHour}`;
            
            if (!scheduleMap[key]) {
              scheduleMap[key] = [];
            }
            scheduleMap[key].push(entry);
          }
        });
      });

      Object.values(scheduleMap).forEach(entriesInSlot => {
        if (entriesInSlot.length > 1) {
          entriesInSlot.forEach(entry => newConflictingIds.add(entry.id));
        }
      });
      
      setConflictingEntryIds(newConflictingIds);
    };

    findConflicts();
  }, [allTimetables]);

  return { conflictingEntryIds };
}
