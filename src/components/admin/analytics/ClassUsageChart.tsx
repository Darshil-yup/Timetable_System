
"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScheduleEntry } from '@/lib/types';

interface ClassUsageChartProps {
    schedule: ScheduleEntry[];
}

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y} C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const getColor = (hours: number) => {
    if (hours > 8) return 'hsl(var(--destructive))'; // Red for high usage
    if (hours > 5) return 'hsl(var(--chart-3))'; // Yellow for medium usage
    return 'hsl(var(--chart-2))'; // Green for low usage
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
                <CardDescription>Weekly hours allocated per subject. Red indicates high usage, green indicates low usage.</CardDescription>
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
                        <Bar dataKey="hours" name="Hours per Week">
                            {classUsageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.hours)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
