
"use client";

import React from 'react';
import { LabView } from '@/components/admin/lab-view';
import { MASTER_TIMETABLE } from '@/lib/mock-data';
import type { TimetableData } from '@/lib/types';

export default function LabsPage() {
    // We pass the entire master timetable to the view component,
    // which will handle consolidation and filtering.
    const allTimetables: TimetableData[] = MASTER_TIMETABLE;

    return (
        <div className="container mx-auto p-8">
            <LabView 
                allTimetables={allTimetables}
            />
        </div>
    );
}
