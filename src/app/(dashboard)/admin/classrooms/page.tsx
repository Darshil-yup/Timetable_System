
"use client";

import React from 'react';
import { ClassroomView } from '@/components/admin/classroom-view';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClassroomsPage() {
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
            <ClassroomView 
                allTimetables={allTimetables || []}
            />
        </div>
    );
}

    