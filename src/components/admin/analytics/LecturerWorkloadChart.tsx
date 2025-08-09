
"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScheduleEntry } from '@/lib/types';

interface LecturerWorkloadChartProps {
    schedule: ScheduleEntry[];
}

const getColor = (hours: number) => {
    if (hours > 12) return 'hsl(var(--destructive))'; // Red for high workload
    if (hours > 8) return 'hsl(var(--chart-3))'; // Yellow for medium workload
    return 'hsl(var(--chart-2))'; // Green for low workload
};

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
            .sort((a, b) => a.hours - b.hours);
    }, [schedule]);

    if (lecturerWorkloadData.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lecturer Workload</CardTitle>
                <CardDescription>Total weekly teaching hours per lecturer. Red indicates high workload, green indicates low workload.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart 
                        data={lecturerWorkloadData} 
                        layout="vertical" 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={150} 
                            interval={0}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Legend />
                        <Bar dataKey="hours" name="Weekly Hours">
                            {lecturerWorkloadData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.hours)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
