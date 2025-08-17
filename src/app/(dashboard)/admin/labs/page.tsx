
"use client";

import React from 'react';
import { LabView } from '@/components/admin/lab-view';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function LabsPage() {
    const { allTimetables, loading } = useTimetableData();

    if (loading) {
        return (
            <div className="container mx-auto p-8">
                <Skeleton className="h-[700px] w-full" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-8">
            <LabView 
                allTimetables={allTimetables || []}
            />
        </div>
    );
}

    