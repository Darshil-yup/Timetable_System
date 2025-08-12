
"use client"

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { TimetableEntry } from '@/lib/types';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

interface FreeRoomSlotsProps {
    timetable: TimetableEntry[];
}

type RoomTimetable = Record<string, { day: string, time: string }[]>;

export function FreeRoomSlots({ timetable }: FreeRoomSlotsProps) {
    const { freeSlotsByRoom, allRooms } = useMemo(() => {
        const scheduledSlots: RoomTimetable = {};
        const allRooms = new Set<string>();

        timetable.forEach(entry => {
            if (entry.room && (entry.type === 'Lecture' || entry.type === 'Practical')) {
                allRooms.add(entry.room);
                if (!scheduledSlots[entry.room]) {
                    scheduledSlots[entry.room] = [];
                }
                const startTime = parseInt(entry.time.split(':')[0]);
                for (let i = 0; i < (entry.duration || 1); i++) {
                    const currentHour = (startTime + i);
                    const slotTime = `${String(currentHour).padStart(2, '0')}:00`;
                    const slot = TIME_SLOTS.find(ts => ts.startsWith(slotTime));
                    if(slot) {
                       scheduledSlots[entry.room].push({ day: entry.day, time: slot });
                    }
                }
            }
        });
        
        const freeSlotsByRoom: Record<string, { day: string; slots: string[] }[]> = {};
        
        Array.from(allRooms).sort().forEach(room => {
            freeSlotsByRoom[room] = [];
            DAYS.forEach(day => {
                const dayFreeSlots: string[] = [];
                TIME_SLOTS.forEach(time => {
                    const isScheduled = scheduledSlots[room]?.some(s => s.day === day && s.time === time);
                    if (!isScheduled) {
                        dayFreeSlots.push(time);
                    }
                });
                if (dayFreeSlots.length > 0) {
                    freeSlotsByRoom[room].push({ day: day, slots: dayFreeSlots });
                }
            });
        });

        return { freeSlotsByRoom, allRooms: Array.from(allRooms).sort() };
    }, [timetable]);

    if (allRooms.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Free Room Slots</CardTitle>
                    <CardDescription>Report of all available (unscheduled) room slots.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No rooms found in the timetable to analyze.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Free Room Slots</CardTitle>
                <CardDescription>Report of all available (unscheduled) room slots.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {allRooms.map(room => (
                        <AccordionItem value={room} key={room}>
                            <AccordionTrigger className="font-bold">{room}</AccordionTrigger>
                            <AccordionContent>
                                {freeSlotsByRoom[room] && freeSlotsByRoom[room].length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[150px]">Day</TableHead>
                                                <TableHead>Available Slots</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {freeSlotsByRoom[room].map(({ day, slots }) => (
                                                <TableRow key={day}>
                                                    <TableCell className="font-medium">{day}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-2">
                                                          {slots.join(', ')}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-muted-foreground p-4">This room is fully booked.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}

    