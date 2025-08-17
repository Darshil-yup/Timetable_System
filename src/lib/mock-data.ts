
import type { Lecturer, TimetableEntry, TimetableData } from './types';

export const LECTURERS: Lecturer[] = [
    { id: 'lec1', name: 'Roshan S. Bhanuse' },
    { id: 'lec2', name: 'Hrushikesh Panchbudhe' },
    { id: 'lec3', name: 'Dr. Gauri M. Dhopavkar' },
    { id: 'lec4', name: 'Radhika Tekade' },
    { id: 'lec5', name: 'Charvi S. Suri' },
    { id: 'lec6', name: 'Sharayu Sangekar' },
    { id: 'lec7', name: 'Prachi Gawande' },
    { id: 'lec8', name: 'Dr. S. S. Sherekar' },
    { id: 'lec9', name: 'Gousia Ahmed' },
    { id: 'lec10', name: 'P.V.Barekar' },
    { id: 'lec11', name: 'Dr. S. A. Shirsat' },
    { id: 'lec12', name: 'Rina Parteki' },
    { id: 'lec13', name: 'Nirmik' },
    { id: 'lec14', name: 'Radhika Tekade' },
    { id: 'lec15', name: 'Lata R. Tembhare' },
    { id: 'lec16', name: 'Harsha Tembhekar' },
    { id: 'lec17', name: 'Priya Kotewar' },
    { id: 'lec18', name: 'Sadaf Ansari' },
    { id: 'lec19', name: 'Dr. Rathkanthiwar' },
    { id: 'lec20', name: 'S. Khan' },
    { id: 'lec21', name: 'Kirti S.' },
    { id: 'lec22', name: 'Dr. A. B. Thatere' },
    { id: 'lec23', name: 'Prachi A. Bainalwar' },
    { id: 'lec24', name: 'Nilesh U. Sambhe' },
    { id: 'lec25', name: 'Dr. Prarthana Deshkar' },
    { id: 'lec26', name: 'Dr. Ganesh Yenurkar' },
    { id: 'lec27', name: 'Dr. Sanjay P. Pande' },
    { id: 'lec28', name: 'S. Saba' },
    { id: 'lec29', name: 'Dr. Shivkumar Karale' },
    { id: 'lec30', name: 'Dr. Gendlal M. Vaidya' },
    { id: 'lec31', name: 'S. S. Bhadoria' },
    { id: 'lec32', name: 'Neha A. Bele' },
    { id: 'lec33', name: 'Neha Ingole' },
    { id: 'lec34', name: 'Prachi A. Bainalwar' },
    { id: 'lec35', name: 'S. A. Ghurde' },
    { id: 'lec36', name: 'S. S. Narkhede' },
    { id: 'lec37', name: 'P. V. Gulhane' },
    { id: 'lec38', name: 'Ashwini Gadwe' },
    { id: 'lec39', name: 'A. R. Banubakode' },
    { id: 'lec40', name: 'K. R. Satpute' },
    { id: 'lec41', name: 'P. V. Barekar' },
    { id: 'lec42', name: 'K. P. Khandait' },
    { id: 'lec43', name: 'Prachi Gawande' },
    { id: 'lec44', name: 'Snehal Khalatkar' },
    { id: 'lec45', name: 'Amruta B. Pethe' },
    { id: 'lec46', name: 'Reena Parteki' },
    { id: 'lec47', name: 'Sharayu Kharche' },
    { id: 'lec48', name: 'Komal Khandare' },
    { id: 'lec49', name: 'Prajakta Ingale' },
    { id: 'lec50', name: 'R. S. Khangan' },
    { id: 'lec51', name: 'Dr. S. A. Shirsat' },
    { id: 'lec52', name: 'Shubhangi S. Shambharkar' },
    { id: 'lec53', name: 'Dr. Gendlal M. Vaidya' },
    { id: 'lec54', name: 'Dr. Smita R. Kapse' },
    { id: 'lec55', name: 'Dr. Shivkumar Karale' },
    { id: 'lec56', name: 'Akhil Jajulwar' },
    { id: 'lec57', name: 'Dr. Sanjay P. Pande' },
    { id: 'lec58', name: 'Charvi S. Suri' }
];

const CE_3_SEM_TIMETABLE: TimetableEntry[] = [
  { id: 'ce3-1', subject: 'WT', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-102', day: 'Monday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'ce3-2', subject: 'OS', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-102', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'ce3-3', subject: 'DS', lecturer: 'Radhika Tekade', room: 'EL-102', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'ce3-4', subject: 'DS', lecturer: 'Sharayu Sangekar', room: 'CT-LAB-01', day: 'Monday', time: '02:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-3))' },
  { id: 'ce3-5', subject: 'WT Lab', lecturer: 'Hrushikesh Panchbudhe, Roshan S. Bhanuse', room: 'CT-LAB-02', day: 'Tuesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
  { id: 'ce3-6', subject: 'OS', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-102', day: 'Wednesday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'ce3-7', subject: 'Recess', type: 'Recess', day: 'Wednesday', time: '12:00-01:00', room: 'N/A', lecturer: 'N/A' },
  { id: 'ce3-8', subject: 'Library', type: 'Library', day: 'Thursday', time: '01:00-02:00', room: 'N/A', lecturer: 'N/A' },
];

const IT_5_SEM_TIMETABLE: TimetableEntry[] = [
  { id: 'it5-1', subject: 'CN', lecturer: 'Dr. S. S. Sherekar', room: 'EL-103', day: 'Tuesday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'it5-2', subject: 'DBMS', lecturer: 'Gousia Ahmed', room: 'EL-103', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'it5-3', subject: 'AI', lecturer: 'P.V.Barekar', room: 'EL-103', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'it5-4', subject: 'CN Lab', lecturer: 'Dr. S. A. Shirsat', room: 'CT-LAB-03', day: 'Wednesday', time: '02:00-04:00', type: 'Practical', duration: 2, batches: ['B1', 'B2'], color: 'hsl(var(--chart-4))' },
  { id: 'it5-5', subject: 'DBMS Lab', lecturer: 'Rina Parteki', room: 'CT-LAB-04', day: 'Thursday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['B1', 'B2'], color: 'hsl(var(--chart-5))' },
  { id: 'it5-6', subject: 'AI', lecturer: 'P.V.Barekar', room: 'EL-103', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
];

const CSE_IOT_3_SEM_TIMETABLE: TimetableEntry[] = [
  { id: 'iot3-1', subject: 'IoT Protocols', lecturer: 'Dr. Prarthana Deshkar', room: 'AG-0213', day: 'Monday', time: '10:00-11:00', type: 'Lecture', color: 'hsl(var(--chart-2))' },
  { id: 'iot3-2', subject: 'Embedded Systems', lecturer: 'Dr. Ganesh Yenurkar', room: 'AG-0213', day: 'Monday', time: '11:00-12:00', type: 'Lecture', color: 'hsl(var(--chart-3))' },
  { id: 'iot3-3', subject: 'Embedded Systems Lab', lecturer: 'Dr. Ganesh Yenurkar', room: 'CSE(IoT)-Lab-01', day: 'Tuesday', time: '02:00-04:00', type: 'Practical', duration: 2, batches: ['I1'], color: 'hsl(var(--chart-3))' },
  { id: 'iot3-4', subject: 'IoT Protocols Lab', lecturer: 'Dr. Prarthana Deshkar', room: 'CSE(IoT)-Lab-02', day: 'Thursday', time: '09:00-11:00', type: 'Practical', duration: 2, batches: ['I1'], color: 'hsl(var(--chart-2))' },
];

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
  { id: 'iot5-1', subject: 'Cloud Computing', lecturer: 'Dr. Sanjay P. Pande', room: 'ET-308', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', color: 'hsl(var(--chart-5))' },
  { id: 'iot5-2', subject: 'Edge AI', lecturer: 'S. Saba', room: 'ET-308', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', color: 'hsl(var(--chart-1))' },
  { id: 'iot5-3', subject: 'Cloud Lab', lecturer: 'Dr. Sanjay P. Pande', room: 'CSE(IoT)-Lab-03', day: 'Friday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['J1'], color: 'hsl(var(--chart-5))' },
  { id: 'iot5-4', subject: 'Edge AI Lab', lecturer: 'S. Saba', room: 'CSE(IoT)-Lab-04', day: 'Friday', time: '02:00-04:00', type: 'Practical', duration: 2, batches: ['J1'], color: 'hsl(var(--chart-1))' },
];

export const MASTER_TIMETABLE: TimetableData[] = [
    {
        id: 'tt1',
        name: 'Computer Engineering (3rd Year)',
        timetable: CE_3_SEM_TIMETABLE,
    },
    {
        id: 'tt2',
        name: 'Information Technology (5th Year)',
        timetable: IT_5_SEM_TIMETABLE,
    },
    {
        id: 'tt3',
        name: 'CSE (IoT) (3rd Year)',
        timetable: CSE_IOT_3_SEM_TIMETABLE,
    },
    {
        id: 'tt4',
        name: 'CSE (IoT) (5th Year)',
        timetable: CSE_IOT_5_SEM_TIMETABLE,
    }
];

    