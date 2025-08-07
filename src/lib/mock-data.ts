
import type { Lecturer, ScheduleEntry, TimetableData } from './types';

export const LECTURERS: Lecturer[] = [
    { id: 'lec1', name: 'Dr. Smith' },
    { id: 'lec2', name: 'Prof. Jones' },
    { id: 'lec3', name: 'Dr. Taylor' },
    { id: 'lec4', name: 'Prof. Brown' },
];

const initialSchedule: ScheduleEntry[] = [
  {
    id: 'c1',
    subject: 'Data Structures',
    lecturer: 'Dr. Smith',
    room: 'C-101',
    day: 'Monday',
    time: '10:00 AM',
    type: 'Lecture',
    duration: 1,
    color: 'hsl(var(--chart-1))',
  },
  {
    id: 'c2',
    subject: 'Algorithms Lab',
    lecturer: 'Prof. Jones',
    room: 'Lab-A',
    day: 'Tuesday',
    time: '2:00 PM',
    type: 'Practical',
    duration: 2,
    batches: ['B1', 'B2'],
    color: 'hsl(var(--chart-2))',
  },
  {
    id: 'c3',
    subject: 'Operating Systems',
    lecturer: 'Dr. Smith',
    room: 'C-102',
    day: 'Wednesday',
    time: '11:00 AM',
    type: 'Lecture',
    duration: 1,
    color: 'hsl(var(--chart-1))',
  },
    {
    id: 'c4',
    subject: 'Database Management',
    lecturer: 'Dr. Taylor',
    room: 'C-201',
    day: 'Monday',
    time: '1:00 PM',
    type: 'Lecture',
    duration: 1,
    color: 'hsl(var(--chart-3))',
  },
  {
    id: 'c5',
    subject: 'Web Development',
    lecturer: 'Prof. Brown',
    room: 'Lab-B',
    day: 'Thursday',
    time: '9:00 AM',
    type: 'Practical',
    duration: 2,
    batches: ['B3'],
    color: 'hsl(var(--chart-4))',
  },
];


export const MASTER_SCHEDULE: TimetableData[] = [
    {
        id: 'tt1',
        name: 'CSE (IoT) (3rd Year)',
        schedule: initialSchedule
    },
    {
        id: 'tt2',
        name: 'Information Technology (2nd Year)',
        schedule: []
    }
];
