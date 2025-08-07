export type ScheduleEntry = {
  id: string;
  subject: string;
  lecturer: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
};

export type Lecturer = {
  id: string;
  name: string;
};
