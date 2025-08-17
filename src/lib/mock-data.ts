
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

const CSE_IOT_3_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot3-mon-1', subject: 'OE:1', lecturer: 'Harsha', room: 'ET-308', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-mon-2', subject: 'CAO', lecturer: 'Harsha', room: 'ET-308', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-4', subject: 'DS', lecturer: 'LRT', room: 'ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-mon-5', subject: 'Library', lecturer: 'LRT', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-6', subject: 'DS/CWS', lecturer: 'LRT, RinaP, Harsha, Sharayu S', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-4))' },
    
    // Tuesday
    { id: 'ciot3-tue-1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-2', subject: 'BPP', lecturer: 'RinaP', room: 'ET-308', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-tue-4', subject: 'DS', lecturer: 'LRT', room: 'ET-308', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-tue-5', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-04:00', type: 'Sports', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'ciot3-wed-1', subject: 'CAO', lecturer: 'Harsha', room: 'ET-308', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-wed-2', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-wed-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-wed-4', subject: 'DS', lecturer: 'LRT', room: 'ET-308', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-wed-5', subject: 'BPP', lecturer: 'RinaP', room: 'ET-308', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-wed-6', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-wed-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot3-thu-1', subject: 'BPP', lecturer: 'RinaP', room: 'ET-308', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-thu-2', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-thu-4', subject: 'CAO', lecturer: 'Harsha', room: 'ET-308', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-thu-5', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-thu-6', subject: 'DS/CWS', lecturer: 'LRT, CSS, Harsha, Sadaf', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-4))' },
    
    // Friday
    { id: 'ciot3-fri-1', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-2', subject: 'CAO', lecturer: 'Harsha', room: 'ET-308', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-fri-4', subject: 'DS', lecturer: 'LRT', room: 'ET-308', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-fri-5', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-6', subject: 'MI', lecturer: 'Rath., SN,, Kirti S., ABT', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-5))' },
];

export const MASTER_TIMETABLE: TimetableData[] = [
    {
        id: 'tt-cse-iot-3',
        name: 'Computer Science and Engineering (IoT) (3rd Sem)',
        timetable: CSE_IOT_3_SEM_TIMETABLE,
    },
];
