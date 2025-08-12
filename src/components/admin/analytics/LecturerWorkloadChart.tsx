
"use client"

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import type { TimetableEntry } from '@/lib/types';
import type { ChartConfig } from '@/components/ui/chart';

interface LecturerWorkloadChartProps {
    timetable: TimetableEntry[];
}

export function LecturerWorkloadChart({ timetable }: LecturerWorkloadChartProps) {
    const { chartData, chartConfig, totalHours } = useMemo(() => {
        const lecturerWorkload: { [key: string]: number } = {};

        timetable.forEach(entry => {
            if (entry.lecturer && entry.type !== 'Recess' && entry.lecturer !== 'N/A') {
                const lecturers = entry.lecturer.split(',').map(l => l.trim());
                lecturers.forEach(lecturer => {
                    const duration = entry.duration || 1;
                    lecturerWorkload[lecturer] = (lecturerWorkload[lecturer] || 0) + duration;
                });
            }
        });

        const sortedLecturers = Object.entries(lecturerWorkload)
            .sort(([, a], [, b]) => b - a);

        const chartData = sortedLecturers.map(([name, hours], index) => ({
            name,
            hours,
            fill: `hsl(var(--chart-${(index % 5) + 1}))`
        }));

        const chartConfig: ChartConfig = {};
        chartData.forEach((data, index) => {
            chartConfig[data.name] = {
                label: data.name,
                color: `hsl(var(--chart-${(index % 5) + 1}))`,
            };
        });
        
        const totalHours = chartData.reduce((acc, curr) => acc + curr.hours, 0);

        return { chartData, chartConfig, totalHours };
    }, [timetable]);

    if (!chartData || chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Lecturer Workload</CardTitle>
                    <CardDescription>No lecturer workload data available in this timetable.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please add classes with assigned lecturers.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lecturer Workload</CardTitle>
                <CardDescription>
                    Total weekly hours per lecturer. Total across all lecturers: {totalHours} hours.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'hsl(var(--foreground))' }}
                            width={120}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="hours" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

    