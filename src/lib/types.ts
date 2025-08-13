
export type SpecialClassType = 'Recess' | 'Library' | 'Help Desk' | 'Sports';
export type ClassType = 'Lecture' | 'Practical' | SpecialClassType;

export type TimetableEntry = {
  id: string;
  subject: string;
  lecturer: string; // Can be a comma-separated list of names for labs
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  type: ClassType;
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
  timetable: TimetableEntry[];
};

export type TimetableMetadata = {
  id: string;
  name: string;
};
