
"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScheduleEntry } from '@/lib/types';

interface ClassUsageChartProps {
    schedule: ScheduleEntry[];
}

export function ClassUsageChart({ schedule }: ClassUsageChartProps) {
    const classUsageData = useMemo(() => {
        const usage = schedule.reduce((acc, entry) => {
            if (entry.type === 'Lecture' || entry.type === 'Practical') {
                const duration = entry.duration || 1;
                if (!acc[entry.subject]) {
                    acc[entry.subject] = 0;
                }
                acc[entry.subject] += duration;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(usage)
            .map(([name, hours]) => ({ name, hours }))
            .sort((a, b) => a.hours - b.hours);
    }, [schedule]);

    if (classUsageData.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Class Usage Analytics</CardTitle>
                <CardDescription>Weekly hours allocated per subject.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart 
                        data={classUsageData} 
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
                        <Bar dataKey="hours" fill="hsl(var(--primary))" name="Hours per Week" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
