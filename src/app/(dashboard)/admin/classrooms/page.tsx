
"use client";

import React from 'react';
import { ClassroomView } from '@/components/admin/classroom-view';
import { useTimetables } from '@/context/TimetableContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClassroomsPage() {
    const { loading } = useTimetables();

    if (loading) {
        return (
            <div className="container mx-auto p-8">
                <Skeleton className="h-[700px] w-full" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-8">
            <ClassroomView />
        </div>
    );
}

    