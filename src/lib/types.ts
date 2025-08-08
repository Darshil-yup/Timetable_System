export type ScheduleEntry = {
  id: string;
  subject: string;
  lecturer: string; // Can be a comma-separated list of names for labs
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  type?: 'Lecture' | 'Practical' | 'Recess';
  duration?: number; // Duration in hours
  batches?: string[];
  color?: string; // Hex color code
};

export type Lecturer = {
  id: string;
  name: string;
};

export type TimetableData = {
  id: string;
  name: string;
  schedule: ScheduleEntry[];
};
