
"use client";

import React from 'react';
import { ClassroomView } from '@/components/admin/classroom-view';
import { MASTER_TIMETABLE } from '@/lib/mock-data';
import { TimetableData } from '@/lib/types';

export default function ClassroomsPage() {
    // We pass the entire master timetable to the view component,
    // which will handle consolidation and filtering.
    const allTimetables: TimetableData[] = MASTER_TIMETABLE;

    return (
        <div className="container mx-auto p-8">
            <ClassroomView 
                allTimetables={allTimetables}
            />
        </div>
    );
}
