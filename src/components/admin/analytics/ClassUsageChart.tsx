
"use client"

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import type { TimetableEntry } from '@/lib/types';
import { ChartConfig } from '@/components/ui/chart';

interface ClassUsageChartProps {
    timetable: TimetableEntry[];
}

export function ClassUsageChart({ timetable }: ClassUsageChartProps) {
    const { chartData, chartConfig, totalHours } = useMemo(() => {
        const classUsage: { [key: string]: number } = {};

        timetable.forEach(entry => {
            if (entry.room && (entry.type === 'Lecture' || entry.type === 'Practical')) {
                const duration = entry.duration || 1;
                classUsage[entry.room] = (classUsage[entry.room] || 0) + duration;
            }
        });

        const sortedRooms = Object.entries(classUsage)
            .sort(([, a], [, b]) => b - a)
            .map(([room]) => room);

        const chartData = sortedRooms.map(room => ({
            room,
            hours: classUsage[room],
            fill: `hsl(var(--chart-${(sortedRooms.indexOf(room) % 5) + 1}))`
        }));
        
        const chartConfig: ChartConfig = {};
        chartData.forEach((data, index) => {
            chartConfig[data.room] = {
                label: data.room,
                color: `hsl(var(--chart-${(index % 5) + 1}))`,
            }
        });

        const totalHours = chartData.reduce((acc, curr) => acc + curr.hours, 0);

        return { chartData, chartConfig, totalHours };
    }, [timetable]);

    if (!chartData || chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Classroom & Lab Usage</CardTitle>
                    <CardDescription>No class/lab usage data available in this timetable.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please add lectures or practicals with assigned rooms.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Classroom & Lab Usage</CardTitle>
                <CardDescription>
                    Total weekly scheduled hours per room. Total across all rooms: {totalHours} hours.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="room" 
                            type="category" 
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'hsl(var(--foreground))' }}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="hours" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

    