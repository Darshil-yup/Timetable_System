import type { Lecturer, ScheduleEntry } from './types';

export const LECTURERS: Lecturer[] = [
  { id: '1', name: 'Dr. Evelyn Reed' },
  { id: '2', name: 'Prof. Samuel Cruz' },
  { id: '3', name: 'Dr. Alisha Khan' },
  { id: '4', name: 'Mr. Benjamin Carter' },
  { id: '5', name: 'Hrushikesh P' },
  { id: '6', name: 'Radhika G' },
];

export const MASTER_SCHEDULE: ScheduleEntry[] = [
  { id: 'c1', subject: 'Quantum Physics', lecturer: 'Dr. Evelyn Reed', room: '101', day: 'Monday', time: '9:00 AM', type: 'Lecture', duration: 1 },
  { id: 'c2', subject: 'DBMS/OS Lab', lecturer: 'Hrushikesh P, Radhika G', room: 'IOT Lab 1/2', day: 'Monday', time: '10:00 AM', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'] },
  { id: 'c3', subject: 'Data Structures', lecturer: 'Prof. Samuel Cruz', room: '305-A', day: 'Monday', time: '2:00 PM', type: 'Lecture', duration: 1 },
  { id: 'c4', subject: 'Calculus II', lecturer: 'Mr. Benjamin Carter', room: '102', day: 'Tuesday', time: '10:00 AM', type: 'Lecture', duration: 1 },
  { id: 'c5', subject: 'Thermodynamics', lecturer: 'Dr. Evelyn Reed', room: '101', day: 'Tuesday', time: '1:00 PM', type: 'Lecture', duration: 1 },
  { id: 'c6', subject: 'Algorithms', lecturer: 'Prof. Samuel Cruz', room: '305-B', day: 'Wednesday', time: '9:00 AM', type: 'Lecture', duration: 1 },
  { id: 'c7', subject: 'Literary Theory', lecturer: 'Mr. Benjamin Carter', room: '401', day: 'Wednesday', time: '11:00 AM', type: 'Lecture', duration: 1 },
  { id: 'c8', subject: 'DBMS/DAA Lab', lecturer: 'Prof. Samuel Cruz, Mr. Benjamin Carter', room: 'IOT Lab 3/4', day: 'Thursday', time: '10:00 AM', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'] },
  { id: 'c9', subject: 'Inorganic Chemistry', lecturer: 'Dr. Alisha Khan', room: '203', day: 'Thursday', time: '2:00 PM', type: 'Lecture', duration: 1 },
  { id: 'c10', subject: 'Advanced Algorithms', lecturer: 'Prof. Samuel Cruz', room: '305-A', day: 'Friday', time: '10:00 AM', type: 'Lecture', duration: 1 },
  { id: 'c11', subject: 'Creative Writing', lecturer: 'Mr. Benjamin Carter', room: '401', day: 'Friday', time: '1:00 PM', type: 'Lecture', duration: 1 },
  { id: 'c12', subject: 'Physical Chemistry', lecturer: 'Dr. Alisha Khan', room: '203', day: 'Friday', time: '3:00 PM', type: 'Lecture', duration: 1 },
  { id: 'c13', subject: 'Astrophysics', lecturer: 'Dr. Evelyn Reed', room: '101', day: 'Saturday', time: '11:00 AM', type: 'Lecture', duration: 1 },
];
