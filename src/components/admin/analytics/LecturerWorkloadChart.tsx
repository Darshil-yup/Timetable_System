
"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScheduleEntry } from '@/lib/types';

interface LecturerWorkloadChartProps {
    schedule: ScheduleEntry[];
}

export function LecturerWorkloadChart({ schedule }: LecturerWorkloadChartProps) {
    const lecturerWorkloadData = useMemo(() => {
        const workload: Record<string, number> = {};

        schedule.forEach(entry => {
            if (entry.lecturer && (entry.type === 'Lecture' || entry.type === 'Practical')) {
                const lecturers = entry.lecturer.split(',').map(l => l.trim());
                lecturers.forEach(lecturer => {
                    if (!workload[lecturer]) {
                        workload[lecturer] = 0;
                    }
                    workload[lecturer] += entry.duration || 1;
                });
            }
        });

        return Object.entries(workload)
            .map(([name, hours]) => ({ name, hours }))
            .sort((a, b) => b.hours - a.hours);
    }, [schedule]);

    if (lecturerWorkloadData.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lecturer Workload</CardTitle>
                <CardDescription>Total weekly teaching hours per lecturer.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={lecturerWorkloadData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Legend />
                        <Bar dataKey="hours" fill="hsl(var(--chart-2))" name="Weekly Hours" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

    