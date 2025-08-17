
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
    { id: 'lec35', name: 'S. A. Ghurde' },
    { id: 'lec36', name: 'S. S. Narkhede' },
    { id: 'lec37', name: 'P. V. Gulhane' },
    { id: 'lec38', name: 'Ashwini Gadwe' },
    { id: 'lec39', name: 'A. R. Banubakode' },
    { id: 'lec40', name: 'K. R. Satpute' },
    { id: 'lec41', name: 'P. V. Barekar' },
    { id: 'lec42', name: 'K. P. Khandait' },
    { id: 'lec44', name: 'Snehal Khalatkar' },
    { id: 'lec45', name: 'Amruta B. Pethe' },
    { id: 'lec46', name: 'Reena Parteki' },
    { id: 'lec47', name: 'Sharayu Kharche' },
    { id: 'lec48', name: 'Komal Khandare' },
    { id: 'lec49', name: 'Prajakta Ingale' },
    { id: 'lec50', name: 'R. S. Khangan' },
    { id: 'lec52', name: 'Shubhangi S. Shambharkar' },
    { id: 'lec54', name: 'Dr. Smita R. Kapse' },
    { id: 'lec56', name: 'Akhil Jajulwar' },
    { id: 'lec57', name: 'Dr. Piyush Ingole' },
    { id: 'lec58', name: 'Dr. Roshni S. Khedgaokar' },
    { id: 'lec59', name: 'Sneha A. Sahare' },
    { id: 'lec60', name: 'Dr. Kavita R. Singh' },
    { id: 'lec61', name: 'Dr. Arvind B. Patil' },
    { id: 'lec62', name: 'Sharayu Kawale' }
];

const CSE_IOT_3_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot3-mon-1', subject: 'OE:1', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-mon-2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-4', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-mon-5', subject: 'Library', lecturer: 'Lata R. Tembhare', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-6', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Rina Parteki, Harsha Tembhekar, Sharayu Sangekar', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-4))' },
    
    // Tuesday
    { id: 'ciot3-tue-1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-2', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-tue-4', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-tue-5', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-04:00', type: 'Sports', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'ciot3-wed-1', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-wed-2', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-wed-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-wed-4', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-wed-5', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-wed-6', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-wed-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot3-thu-1', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-thu-2', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-thu-4', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-thu-5', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-thu-6', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Charvi S. Suri, Harsha Tembhekar, Sadaf Ansari', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-4))' },
    
    // Friday
    { id: 'ciot3-fri-1', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-fri-4', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-fri-5', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-6', subject: 'MI', lecturer: 'Dr. Rathkanthiwar, S. Khan, Kirti S., Dr. A. B. Thatere', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-5))' },
];

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot5-mon-1', subject: 'DBMS/OS', lecturer: 'Roshan S. Bhanuse, Hrushikesh Panchbudhe, Dr. Gauri M. Dhopavkar, Radhika Tekade', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-mon-2', subject: 'PE-I:GIS/MFDA', lecturer: 'Charvi S. Suri, Sharayu Sangekar', room: 'ET-316/ET-308', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-mon-4', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-mon-5', subject: 'TFCS', lecturer: 'Dr. S. S. Sherekar', room: 'ET-316', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'ciot5-tue-1', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-tue-2', subject: 'OS', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-tue-3', subject: 'PE-I:GIS/MFDA', lecturer: 'Charvi S. Suri, Sharayu Sangekar', room: 'ET-316/ET-308', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-tue-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-tue-6', subject: 'PE I: LAB: GIS/MFDA', lecturer: 'Charvi S. Suri, Radhika Tekade, Sharayu Sangekar, Gousia Ahmed', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },

    // Wednesday
    { id: 'ciot5-wed-1', subject: 'OE:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-wed-2', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'E1-316', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-3', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'E1-316', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-wed-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'E1-316', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-wed-6', subject: 'LAB: OS/DAA', lecturer: 'Dr. Gauri M. Dhopavkar, Hrushikesh Panchbudhe, Dr. S. A. Shirsat, Rina Parteki', room: 'IOT Lab 3,4/IOT Lab 1,2', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'ciot5-thu-1', subject: 'OF:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-2', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-3', subject: 'LAB: DBMS/DAA', lecturer: 'Roshan S. Bhanuse, Rina Parteki, Dr. S. A. Shirsat, Nirmik', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Thursday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-5', subject: 'OS', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-thu-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'ciot5-fri-1', subject: 'OE:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-2', subject: 'OS', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-fri-3', subject: 'TFCS', lecturer: 'Dr. S. S. Sherekar', room: 'ET-316', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot5-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-5', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-6', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'ET-316', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-fri-7', subject: 'Library', lecturer: 'Radhika Tekade', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-8', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];

const CSE_IOT_7_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot7-mon-1', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'Prachi A. Bainalwar, Gousia Ahmed', room: 'EL-204/EL 203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-mon-2', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 302', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-mon-3', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha Tembhekar, Dr. Prarthana Deshkar', room: 'EL 302/EL 102', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-mon-5', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'ET 308', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-mon-6', subject: 'IOT DP', lecturer: 'Dr. Sanjay P. Pande', room: 'ET 308', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 'ciot7-tue-1', subject: 'LAB: SE/CC', lecturer: 'Nilesh U. Sambhe, Prajakta Ingale, Dr. Ganesh Yenurkar, Gousia Ahmed', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-tue-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-3', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha Tembhekar, Dr. Prarthana Deshkar', room: 'EL 302/EL 102', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-tue-4', subject: 'Library', lecturer: 'Gousia Ahmed', room: 'N/A', day: 'Tuesday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-5', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'EL 103', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-tue-6', subject: 'IOT DP', lecturer: 'Dr. Sanjay P. Pande', room: 'EL 103', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Wednesday
    { id: 'ciot7-wed-1', subject: 'PE III: LAB: IOT/FEC', lecturer: 'S. Saba, Nirmik, P. V. Gulhane, Dr. Shivkumar Karale', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A1', 'A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-wed-3', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, P. V. Gulhane', room: 'EL-204/EL102', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-4', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '02:00-03:00', type: 'Practical', duration: 2, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot7-thu-1', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 211', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-2', subject: 'PE-IV: SPI/DAI', lecturer: 'Harsha Tembhekar, Dr. Prarthana Deshkar', room: 'ET316/EL 211', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-thu-3', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, P. V. Gulhane', room: 'ET 308/ET 316', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-thu-5', subject: 'PE-V: Blockchain/OSC', lecturer: 'Prachi A. Bainalwar, Gousia Ahmed', room: 'AIDS Lab 2/AIDS Lab 1', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-thu-6', subject: 'IOT DP', lecturer: 'Dr. Sanjay P. Pande', room: 'EL 211', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot7-thu-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    
    // Friday
    { id: 'ciot7-fri-1', subject: 'LAB: SE/CC', lecturer: 'Nilesh U. Sambhe, Dr. Gendlal M. Vaidya, Dr. Ganesh Yenurkar, S. S. Bhadoria', room: 'IOT Lab 1,2/IOT Lab 3,4', day: 'Friday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-2', subject: 'PE-III: IOT/FEC', lecturer: 'S. Saba, P. V. Gulhane', room: 'ET 308/ET 316', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-fri-4', subject: 'PE-V: Blockchain/OSC', lecturer: 'Prachi A. Bainalwar, Gousia Ahmed', room: 'AIDS Lab 2/EL-204', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-5', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 211', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-6', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'EL 102', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
];

const CT_3_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct3a-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-102', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-mon-2', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-102', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-mon-3', subject: 'Library', lecturer: 'Ashwini Gadwe', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-mon-5', subject: 'DMPT', lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-mon-6', subject: 'DS/WT', lecturer: 'Gousia Ahmed,Ashwini Gadwe,Sadaf Ansari,Radhika Tekade', room: 'CT-LAB-2/CT-LAB-3', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-4))' },
    
    // Tuesday
    { id: 'ct3a-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-204', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-tue-2', subject: 'DS', lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-tue-3', subject: 'CAO', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-tue-5', subject: 'DMPT', lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-tue-6', subject: 'CL', lecturer: 'Rina Parteki', room: 'EL-102', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-tue-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct3a-wed-1', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '10:00-11:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-wed-2', subject: 'DS', lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-wed-3', subject: 'DMPT', lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-wed-5', subject: 'CAO', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-wed-6', subject: 'DS/WT', lecturer: 'Dr. Shivkumar Karale,Ashwini Gadwe,Sadaf Ansari,Radhika Tekade', room: 'CT-LAB-2/CT-LAB-3', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-4))' },

    // Thursday
    { id: 'ct3a-thu-1', subject: 'DS', lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-thu-2', subject: 'CAO', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-thu-4', subject: 'MDM 1: FSE / MDM2: FAR-VR', lecturer: 'Sharayu Sangekar/K. P. Khandait', room: 'EL-102/EL-103', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-thu-5', subject: 'CL', lecturer: 'Rina Parteki', room: 'EL-102', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-thu-6', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-102', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    
    // Friday
    { id: 'ct3a-fri-1', subject: 'DS', lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-103', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-fri-2', subject: 'CL', lecturer: 'Rina Parteki', room: 'EL-102', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-fri-3', subject: 'DMPT', lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-fri-5', subject: 'MDM 1: FSE / MDM2: FAR-VR', lecturer: 'Sharayu Sangekar/K. P. Khandait', room: 'EL-102/EL-103', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-fri-6', subject: 'CAO', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-fri-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
];

const CT_3_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct3b-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-103', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-mon-2', subject: 'DS', lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-mon-4', subject: 'DMPT', lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-mon-5', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-mon-6', subject: 'Library', lecturer: 'Nirmik', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct3b-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-103', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-tue-2', subject: 'FOME', lecturer: '', room: 'EL-103', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-tue-4', subject: 'CAO', lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-tue-5', subject: 'DS', lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-tue-6', subject: 'LAB: DS/WT', lecturer: 'Dr. Shivkumar Karale,Nirmik,Sadaf Ansari,Priya Kotewar', room: 'CT-LAB-2/CT-LAB-3', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B1','B2','B3','B4'], color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'ct3b-wed-1', subject: 'CAO', lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-wed-2', subject: 'DMPT', lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-wed-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-wed-4', subject: 'CL', lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-wed-5', subject: 'DS', lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-wed-6', subject: 'DMPT', lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-wed-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ct3b-thu-1', subject: 'DMPI', lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-thu-2', subject: 'DS', lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-thu-4', subject: 'CAO', lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-thu-5', subject: 'MDM 1: FSE/MDM2: FAR-VR', lecturer: 'Sharayu Sangekar/K. P. Khandait', room: 'EL-102/EL-103', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-thu-6', subject: 'CL', lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-thu-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'ct3b-fri-1', subject: 'LAB: DS/WT', lecturer: 'Gousia Ahmed,Nirmik/Sadaf Ansari,Priya Kotewar', room: 'CT-LAB-2/CT-LAB-3', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['B3','B4','B1','B2'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-fri-3', subject: 'CAO', lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-fri-4', subject: 'MDM 1: FSE/MDM2: FAR-VR', lecturer: 'Sharayu Sangekar/K. P. Khandait', room: 'EL-102/EL-103', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-5', subject: 'FOME', lecturer: '', room: 'EL-103', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-fri-6', subject: 'CL', lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
];

const CT_5_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct5a-mon-1', subject: 'LAB: DBMS/JAVA', lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar,Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-4/CT-LAB-1', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-mon-2', subject: 'PE-I:CV/ISF', lecturer: 'Priya Kotewar/S. A. Ghurde', room: 'EL-203/CT Lab 1', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-mon-3', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-mon-4', subject: 'TFCS', lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-mon-5', subject: 'LAB: DBMS/JAVA', lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar,Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-4/CT-LAB-1', day: 'Monday', time: '04:00-05:00', type: 'Practical', duration: 1, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-1))' },

    // Tuesday
    { id: 'ct5a-tue-1', subject: 'DBMS', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-tue-2', subject: 'MFDA', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-tue-3', subject: 'PE-I:CV/ISF', lecturer: 'Priya Kotewar/S. A. Ghurde', room: 'EL-203/CT Lab 1', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-tue-5', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-tue-6', subject: 'LAB: DBMS/JAVA', lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar,Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-4/CT-LAB-1', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-1))' },

    // Wednesday
    { id: 'ct5a-wed-1', subject: 'OE:3 ICP', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-wed-2', subject: 'MFDA', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-wed-3', subject: 'TFCS', lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-wed-4', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-wed-5', subject: 'DBMS', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-wed-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ct5a-thu-1', subject: 'OE:3 ICP', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-thu-2', subject: 'DBMS', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '11:00-12:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-thu-4', subject: 'LAB PE:1: CV/ISF', lecturer: 'Priya Kotewar,S. A. Ghurde,Radhika Tekade', room: 'CT-LAB-7/CT-LAB-4', day: 'Thursday', time: '12:00-01:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-thu-5', subject: 'LIBRARY', lecturer: 'Rina Parteki', room: 'N/A', day: 'Thursday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-thu-6', subject: 'MFDA', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-thu-7', subject: 'TFCS', lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Friday
    { id: 'ct5a-fri-1', subject: 'OE:3 ICP', lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-fri-2', subject: 'DBMS', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-fri-3', subject: 'TFCS', lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-fri-4', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-fri-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-fri-6', subject: 'MFDA', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-fri-7', subject: 'LAB: MFDA', lecturer: 'Dr. Prarthana Deshkar,Rina Parteki,K. P. Khandait,Sharayu Sangekar', room: 'CT-LAB-2/CT-LAB-3', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-1))' },
];

const CT_7_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct7b-mon-1', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B/EL-211/EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-mon-2', subject: 'ORO', lecturer: 'Nirmik', room: 'ARCH AG 02B', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7b-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-mon-4', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-mon-5', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ARCH AG 02B/EL-211', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-mon-6', subject: 'LIBRARY', lecturer: 'Priya Kotewar', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-mon-7', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct7b-tue-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '10:00-11:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-tue-2', subject: 'ORO', lecturer: 'Nirmik', room: 'ARCH AG 02B', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-tue-4', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-tue-5', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ARCH AG 02B/AIDS Lab 1', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-tue-6', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B-/EL-211/EL-203', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-tue-7', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct7b-wed-1', subject: 'PE: IV LAB:CF/ML/CRM', lecturer: 'Pooja B,Akhil Jajulwar/Shubhangi S. Shambharkar,Priya Kotewar/Dr. Ganesh Yenurkar,Rina Parteki', room: 'CT LAB-4/CT LAB-3/CT LAB-2', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7b-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-wed-3', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-wed-4', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ ARCH AG 02B/CT Lab 3', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-wed-5', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B-/EL 211/CT-LAB 4', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-wed-6', subject: 'ORO', lecturer: 'Nirmik', room: 'ARCH AG 02B', day: 'Wednesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
];

const CT_7_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct7a-mon-1', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B/EL-211/EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-mon-2', subject: 'ORO', lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7a-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-mon-4', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-mon-5', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ARCH AG 02B/EL-211', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-mon-6', subject: 'PROJECT', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-mon-7', subject: 'LIBRARAY', lecturer: 'Akhil Jajulwar', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct7a-tue-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '10:00-11:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-tue-2', subject: 'ORO', lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-tue-4', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-tue-5', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ARCH AG 02B/AIDS Lab 1', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-tue-6', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B/EL-211/EL-203', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-tue-7', subject: 'PROJECT', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Practical', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct7a-wed-1', subject: 'PE: IV LAB:CF/ML/CRM', lecturer: 'Pooja B,Akhil Jajulwar/Shubhangi S. Shambharkar,Priya Kotewar/Dr. Ganesh Yenurkar,Rina Parteki', room: 'CT LAB-4/CT LAB-3/CT LAB-2', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7a-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-wed-3', subject: 'PE-IV: CF/ML/CRM', lecturer: 'Pooja B./Shubhangi S. Shambharkar/Dr. Ganesh Yenurkar', room: 'ARCH AG 02B/EL-203/EL-211', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-wed-4', subject: 'PE-V: INLP/ES/CV', lecturer: 'Dr. Gendlal M. Vaidya/Dr. Sanjay P. Pande/S. S. Bhadoria', room: 'AIDS LAB-2/ARCH AG 02B/CT Lab 3', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-wed-5', subject: 'PE-III: NNFL/AWN/DM', lecturer: 'P. V. Gulhane/Nilesh U. Sambhe/Dr. Piyush Ingole', room: 'ARCH AG 02B/EL-211/CT-LAB 4', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-wed-6', subject: 'ORO', lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Wednesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'ct7a-thu-1', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '10:00-11:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_3_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids3a-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-302', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-mon-2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-mon-4', subject: 'Library', lecturer: 'Neha Ingole', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-mon-5', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-mon-6', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-mon-7', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 'aids3a-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-302', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-tue-2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-tue-3', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-tue-5', subject: 'ESPM', lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-tue-6', subject: 'LAB: SDS/DS', lecturer: 'S. A. Ghurde,Harsha Tembhekar/Prachi A. Bainalwar,S. Saba', room: 'AIDS LAB2/AIDS LAB 1', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'aids3a-wed-1', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-wed-2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-wed-3', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids3a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-wed-5', subject: 'ESPM', lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-wed-6', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'aids3a-thu-1', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-thu-2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-thu-4', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-thu-5', subject: 'MDM 1: BDS /MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-thu-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'aids3a-fri-1', subject: 'LAB: SDS/DS', lecturer: 'S. A. Ghurde,Neha Ingole/Prachi A. Bainalwar,S. Saba', room: 'AIDS LAB2/AIDS LAB 1', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-fri-2', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-fri-4', subject: 'MDM 1: BDS /MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-fri-5', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '02:00-03:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_3_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids3b-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-303', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-mon-2', subject: 'Library', lecturer: 'S. Saba', room: 'N/A', day: 'Monday', time: '11:00-12:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-mon-3', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-mon-5', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-mon-6', subject: 'LAB: SDS/DS', lecturer: 'K. P. Khandait,P. V. Gulhane/P. V. Barekar, S. Saba', room: 'AIDS LAB2/AIDS LAB 1', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B1','B2','B3','B4'], color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'aids3b-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-303', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-tue-2', subject: 'LAB: SDS/DS', lecturer: 'K. P. Khandait,P. V. Gulhane/P. V. Barekar, S. Saba', room: 'AIDS LAB2/AIDS LAB 3,4', day: 'Tuesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['B3','B4','B1','B2'], color: 'hsl(var(--chart-5))' },
    { id: 'aids3b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-tue-4', subject: 'ESPM', lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-tue-5', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

    // Wednesday
    { id: 'aids3b-wed-1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-wed-2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-wed-3', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-wed-5', subject: 'ESPM', lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-wed-6', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'aids3b-thu-1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-thu-2', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids3b-thu-3', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-thu-5', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-thu-6', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Friday
    { id: 'aids3b-fri-1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-fri-2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-fri-3', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-fri-5', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-fri-6', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_5_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids5a-mon-1', subject: 'PE I: LAB: CN/HPC', lecturer: 'Amruta B. Pethe, Reena Parteki, Sharayu Kharche, Komal Khandare', room: 'AIDS LAB 2/AIDS LAB 5,6', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-mon-3', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/EL-303', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-4', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-mon-5', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-mon-6', subject: 'FML', lecturer: 'Dr. Kavita R. Singh', room: 'EL-102', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'aids5a-tue-1', subject: 'FML', lecturer: 'Dr. Kavita R. Singh', room: 'EL-102', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids5a-tue-2', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/EL-303', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-tue-4', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-tue-5', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-tue-6', subject: 'TFCS', lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-tue-7', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

    // Wednesday
    { id: 'aids5a-wed-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '09:00-10:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-wed-2', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-wed-3', subject: 'LAB: AI/DAA', lecturer: 'Prajakta Ingale, Komal Khandare/R. S. Khangan, Harsha Tembhekar', room: 'AIDS LAB 5,6/AIDS LAB 1', day: 'Wednesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-wed-5', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-wed-6', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-wed-7', subject: 'LIBRARY', lecturer: 'Harsha Tembhekar', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'aids5a-thu-1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-thu-2', subject: 'TFCS', lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-thu-3', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/CT LAB 4', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-thu-5', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-thu-6', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-thu-7', subject: 'TFCS', lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },

    // Friday
    { id: 'aids5a-fri-1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-fri-2', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-fri-3', subject: 'TFCS', lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-fri-5', subject: 'LAB: AI/DAA', lecturer: 'Prajakta Ingale, P. V. Barekar/R. S. Khangan, Harsha Tembhekar', room: 'AIDS LAB 5,6/AIDS LAB 1', day: 'Friday', time: '02:00-03:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-3))' },
];

const AIDS_7_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids7a-mon-1', subject: 'DL', lecturer: 'Dr. S. S. Sherekar', room: 'EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-mon-2', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-mon-3', subject: 'PE-III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL-211/EL-204', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-mon-5', subject: 'PE-V: D.SEC/OT', lecturer: 'Dr. Shivkumar Karale/Radhika Tekade', room: 'EL 103/ET 308', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-mon-6', subject: 'PE-IV: Dis Sy/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL 102, EL 303', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-mon-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'aids7a-tue-1', subject: 'LAB: HPC', lecturer: 'Dr. S. S. Sherekar, Komal Khandare/Dr. Sanjay P. Pande, S. A. Ghurde', room: 'AIDS LAB 1/AIDS LAB 5,6', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-tue-2', subject: 'PE III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL.211/EL.204', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-tue-4', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-211', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-tue-5', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'aids7a-wed-1', subject: 'C.T.', lecturer: 'Hrushikesh Panchbudhe', room: 'ARCH AG 02B', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-wed-2', subject: 'PE V: D.SEC/OT', lecturer: 'Dr. Shivkumar Karale/Radhika Tekade', room: 'ARCH AG 02B/EL. 211', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-wed-3', subject: 'PE III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL. 211/ET. 204', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-wed-5', subject: 'DI.', lecturer: 'Dr. S. S. Sherekar', room: 'EL. 211', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-wed-6', subject: 'LAB: DL/BDH', lecturer: 'Dr. S. S. Sherekar, Charvi S. Suri/Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS LAB 1/AIDS LAB 2', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'aids7a-thu-1', subject: 'LAB: DL/BDH', lecturer: 'Dr. S. S. Sherekar, Sadaf Ansari/Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS LAB 1/AIDS LAB 2', day: 'Thursday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-thu-2', subject: 'PE-IV: DS/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL 211/ARCH AG 02B', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-thu-4', subject: 'CL', lecturer: 'Hrushikesh Panchbudhe', room: 'EL 203', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-thu-5', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-302', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-thu-6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'aids7a-fri-1', subject: 'PE-IV: DS/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL211/ARCH AG 02B', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-fri-2', subject: 'PE-V: D.SEC/OT', lecturer: 'Dr. Shivkumar Karale/Radhika Tekade', room: 'ARCH AG 02B/EL-211', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-fri-3', subject: 'CL', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-fri-5', subject: 'DL', lecturer: 'Dr. S. S. Sherekar', room: 'EL-211', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-fri-6', subject: 'Library', lecturer: 'Sadaf Ansari', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-fri-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
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
    {
        id: 'tt-ct-3-a',
        name: 'Computer Technology (3rd Sem Sec A)',
        timetable: CT_3_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-ct-3-b',
        name: 'Computer Technology (3rd Sem Sec B)',
        timetable: CT_3_SEM_B_TIMETABLE,
    },
    {
        id: 'tt-ct-5-a',
        name: 'Computer Technology (5th Sem Sec A)',
        timetable: CT_5_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-ct-7-b',
        name: 'Computer Technology (7th Sem Sec B)',
        timetable: CT_7_SEM_B_TIMETABLE,
    },
    {
        id: 'tt-ct-7-a',
        name: 'Computer Technology (7th Sem Sec A)',
        timetable: CT_7_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-aids-3-a',
        name: 'Department of AIDS (3rd Sem Sec A)',
        timetable: AIDS_3_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-aids-3-b',
        name: 'Department of AIDS (3rd Sem Sec B)',
        timetable: AIDS_3_SEM_B_TIMETABLE,
    },
    {
        id: 'tt-aids-5-a',
        name: 'Department of AIDS (5th Sem Sec A)',
        timetable: AIDS_5_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-aids-7-a',
        name: 'Department of AIDS (7th Sem Sec A)',
        timetable: AIDS_7_SEM_A_TIMETABLE,
    }
];
