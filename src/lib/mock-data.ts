
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

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot5-mon-1', subject: 'DBMS/OS', lecturer: 'RSB, Hrushikesh P, GMD, Radhika', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-mon-2', subject: 'PE-I:GIS/MFDA', lecturer: 'CSS, Sharayu S', room: 'ET-316/ET-308', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-mon-4', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-mon-5', subject: 'TFCS', lecturer: 'SSS', room: 'ET-316', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'ciot5-tue-1', subject: 'DBMS', lecturer: 'RSB', room: 'ET-316', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-tue-2', subject: 'OS', lecturer: 'GMD', room: 'ET-316', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-tue-3', subject: 'PE-I:GIS/MFDA', lecturer: 'CSS, Sharayu S', room: 'ET-316/ET-308', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-tue-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-tue-6', subject: 'PE I: LAB: GIS/MFDA', lecturer: 'CSS, Radhika, Sharayu S, AG', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },

    // Wednesday
    { id: 'ciot5-wed-1', subject: 'OE:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-wed-2', subject: 'DAA', lecturer: 'SAS', room: 'E1-316', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-3', subject: 'DAA', lecturer: 'SAS', room: 'E1-316', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-wed-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'E1-316', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-wed-6', subject: 'LAB: OS/DAA', lecturer: 'GMD, Hrushikesh P, SAS, RinaP', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'ciot5-thu-1', subject: 'OF:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-2', subject: 'DBMS', lecturer: 'RSB', room: 'ET-316', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-3', subject: 'LAB: DBMS/DAA', lecturer: 'RSB, RinaP, SAS, Nirmik', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Thursday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-5', subject: 'OS', lecturer: 'GMD', room: 'ET-316', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-thu-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'ciot5-fri-1', subject: 'OE:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-2', subject: 'OS', lecturer: 'GMD', room: 'ET-316', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-fri-3', subject: 'TFCS', lecturer: 'SSS', room: 'ET-316', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot5-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-5', subject: 'DBMS', lecturer: 'RSB', room: 'ET-316', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-6', subject: 'DAA', lecturer: 'SAS', room: 'ET-316', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-fri-7', subject: 'Library', lecturer: 'RADHIKA Tekade', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-8', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];

const CSE_IOT_7_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot7-mon-1', subject: 'PE-V: Blockchain/OSC', lecturer: 'PAB, GA', room: 'EL-204/EL 203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-mon-2', subject: 'SE', lecturer: 'NUS', room: 'EL 302', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-mon-3', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha, PD', room: 'EL 302/EL 102', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-mon-5', subject: 'CC', lecturer: 'GKY', room: 'ET 308', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-mon-6', subject: 'IOT DP', lecturer: 'SPP', room: 'ET 308', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 'ciot7-tue-1', subject: 'LAB: SE/CC', lecturer: 'NUS, PI, GKY, GA', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-tue-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-3', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha, PD', room: 'EL 302/EL 102', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-tue-4', subject: 'Library', lecturer: 'G. AHMED', room: 'N/A', day: 'Tuesday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-5', subject: 'CC', lecturer: 'GKY', room: 'EL 103', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-tue-6', subject: 'IOT DP', lecturer: 'SPP', room: 'EL 103', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Wednesday
    { id: 'ciot7-wed-1', subject: 'PE III: LAB: IOT/FEC', lecturer: 'S. Saba, Nirmik, PG, SJK', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A1', 'A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-wed-3', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, PG', room: 'EL-204/EL102', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-4', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '02:00-03:00', type: 'Practical', duration: 2, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot7-thu-1', subject: 'SE', lecturer: 'NUS', room: 'EL 211', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-2', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha, PD', room: 'ET316/EL 211', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-thu-3', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, PG', room: 'ET 308/ET 316', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-thu-5', subject: 'PE-V: Blockchain/OSC', lecturer: 'PAB, GA', room: 'AIDS Lab 2/AIDS Lab 1', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-thu-6', subject: 'IOT DP', lecturer: 'SPP', room: 'EL 211', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot7-thu-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    
    // Friday
    { id: 'ciot7-fri-1', subject: 'LAB: SE/CC', lecturer: 'NUS, GMV, GKY, SSB', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Friday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-2', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, PG', room: 'ET 308/ET 316', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-fri-4', subject: 'PE-V: Blockchain/OSC', lecturer: 'PAB, GA', room: 'AIDS Lab 2/EL-204', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-5', subject: 'SE', lecturer: 'NUS', room: 'EL 211', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-6', subject: 'CC', lecturer: 'GKY', room: 'EL 102', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
];

export const MASTER_TIMETABLE: TimetableData[] = [
    {
        id: 'tt-cse-iot-3',
        name: 'Computer Science and Engineering (IoT) (3rd Sem)',
        timetable: CSE_IOT_3_SEM_TIMETABLE,
    },
    {
        id: 'tt-cse-iot-5',
        name: 'Computer Science and Engineering (IoT) (5th Sem)',
        timetable: CSE_IOT_5_SEM_TIMETABLE,
    },
    {
        id: 'tt-cse-iot-7',
        name: 'Computer Science and Engineering (IoT) (7th Sem)',
        timetable: CSE_IOT_7_SEM_TIMETABLE,
    },
];
