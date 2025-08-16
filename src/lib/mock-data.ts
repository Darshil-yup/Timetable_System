
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
    // Recess for all days
    { id: 'rec-mon', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'm3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'm4', subject: 'Library', lecturer: 'Lata R. Tembhare', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'm5', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Rina Parteki, Harsha Tembhekar, Sharayu Sangekar', room: 'CSE(IoT)-Lab-01', day: 'Monday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 't1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 't2', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 't3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 't4', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 't5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-05:00', type: 'Sports', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'w1', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w2', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'w3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'w4', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'w5', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'w6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'th1', subject: 'BPP', lecturer: 'Rina Parteki', room: 'ET-308', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'th2', subject: 'FOME', lecturer: 'N/A', room: 'ET-308', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'th3', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'th4', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'th5', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Charvi S. Suri, Harsha Tembhekar, Sadaf Ansari', room: 'CSE(IoT)-Lab-02', day: 'Thursday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-5))' },

    // Friday
    { id: 'f1', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'f4', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f5', subject: 'MI', lecturer: 'Dr. Rathkanthiwar, Nilesh U. Sambhe, Kirti S., Dr. A. B. Thatere', room: 'CSE(IoT)-Lab-03', day: 'Friday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },
];

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'rec-mon-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1-5', subject: 'DBMS/OS Lab', lecturer: 'Roshan S. Bhanuse, Hrushikesh Panchbudhe, Dr. Gendlal M. Vaidya, Radhika Tekade', room: 'CSE(IoT)-Lab-01', day: 'Monday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'm2-5', subject: 'PE-I:GIS/MFDA', lecturer: 'Charvi S. Suri, Sharayu Sangekar', room: 'ET 316/ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm3-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'm4-5', subject: 'TFCS', lecturer: 'Shubhangi S. Shambharkar', room: 'ET-316', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 't1-5', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 't2-5', subject: 'OS', lecturer: 'Dr. Gendlal M. Vaidya', room: 'ET-316', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 't3-5', subject: 'PE-I:GIS/MFDA', lecturer: 'Charvi S. Suri, Sharayu Sangekar', room: 'ET 316/ET-308', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 't4-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 't5-5', subject: 'PE I: LAB: GIS/MFDA', lecturer: 'Charvi S. Suri, Radhika Tekade, Sharayu Sangekar, Ashwini Gadwe', room: 'CSE(IoT)-Lab-02', day: 'Tuesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },

    // Wednesday
    { id: 'w1-5', subject: 'OE:3 Arthashashtra', lecturer: 'P. V. Barekar', room: 'ET-316', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'w2-5', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'ET-316', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w3-5', subject: 'TFCS', lecturer: 'Shubhangi S. Shambharkar', room: 'ET-316', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'w4-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w5-5', subject: 'LAB: OS/DAA', lecturer: 'Dr. Gendlal M. Vaidya, Hrushikesh Panchbudhe, Dr. S. A. Shirsat, Rina Parteki', room: 'CSE(IoT)-Lab-03', day: 'Wednesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'th1-5', subject: 'OE:3 Arthashashtra', lecturer: 'P. V. Barekar', room: 'ET-316', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'th2-5', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET 316', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'th3-5', subject: 'LAB: DBMS/DAA', lecturer: 'Roshan S. Bhanuse, Rina Parteki, Dr. S. A. Shirsat, Nirmik', room: 'CSE(IoT)-Lab-04', day: 'Thursday', time: '11:00-01:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'th4-5', subject: 'OS', lecturer: 'Dr. Gendlal M. Vaidya', room: 'ET 316', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'th5-5', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'th6-5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'f1-5', subject: 'OE:3 Arthashashtra', lecturer: 'P. V. Barekar', room: 'ET-316', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'f2-5', subject: 'OS', lecturer: 'Dr. Gendlal M. Vaidya', room: 'ET-316', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f3-5', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'ET-316', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f4-5', subject: 'DBMS', lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'f5-5', subject: 'DAA', lecturer: 'Dr. S. A. Shirsat', room: 'ET-316', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f6-5', subject: 'Library', lecturer: 'Radhika Tekade', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
];

const CSE_7_SEM_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'rec-mon-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1-7', subject: 'PE-V: Blockchain / OSC', lecturer: 'Prachi A. Bainalwar / Gousia Ahmed', room: 'EL-204 / EL 203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm2-7', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 302', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'm3-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha Tembhekar / Dr. Prarthana Deshkar', room: 'EL 302 / EL 102', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'm4-7', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'ET 308', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm5-7', subject: 'IOT DP', lecturer: 'Dr. Sanjay P. Pande', room: 'ET 308', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 't1-7', subject: 'LAB: SE / CC', lecturer: 'Nilesh U. Sambhe, Priya Kotewar / Dr. Ganesh Yenurkar, Gousia Ahmed', room: 'CSE(IoT)-Lab-01', day: 'Tuesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },
    { id: 't2-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha Tembhekar / Dr. Prarthana Deshkar', room: 'EL 302 / EL 102', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 't3-7', subject: 'Library', lecturer: 'Gousia Ahmed', room: 'N/A', day: 'Tuesday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 't4-7', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'EL 103', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 't5-7', subject: 'IOT DP', lecturer: 'Dr. Sanjay P. Pande', room: 'EL 103', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'w1-7', subject: 'PE III: LAB: IOT / FEC', lecturer: 'S. Saba, Nirmik / Prachi Gawande, Dr. Shivkumar Karale', room: 'CSE(IoT)-Lab-02', day: 'Wednesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-3))' },
    { id: 'w2-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / Prachi Gawande', room: 'EL-204 / EL102', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w3-7', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '02:00-05:00', type: 'Practical', duration: 3, color: '#E0E0E0' },

    // Thursday
    { id: 'th1-7', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 211', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'th2-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha Tembhekar / Dr. Prarthana Deshkar', room: 'ET316 / EL 211', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'th3-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / Prachi Gawande', room: 'ET 308 / ET 316', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'th4-7', subject: 'PE-V: Blockchain / OSC', lecturer: 'Prachi A. Bainalwar / Gousia Ahmed', room: 'AIDS-LAB-02 / AIDS-LAB-01', day: 'Thursday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-2))' },

    // Friday
    { id: 'f1-7', subject: 'LAB: SE / CC', lecturer: 'Nilesh U. Sambhe, Dr. Gendlal M. Vaidya / Dr. Ganesh Yenurkar, S. S. Bhadoria', room: 'CSE(IoT)-Lab-03', day: 'Friday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-5))' },
    { id: 'f2-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / Prachi Gawande', room: 'ET 308 / ET 316', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f3-7', subject: 'SE', lecturer: 'Nilesh U. Sambhe', room: 'EL 211', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'f4-7', subject: 'CC', lecturer: 'Dr. Ganesh Yenurkar', room: 'EL 102', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

];

const CSE_AIDS_3_SEM_A_TIMETABLE: TimetableEntry[] = [
  // Monday
  { id: 'aids-a-m1', subject: 'OE:1', lecturer: 'N/A', room: 'EL-302', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-a-m2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-a-m3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-m4', subject: 'Library', lecturer: 'Neha Ingole', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Library', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-m5', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-a-m6', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-a-m7', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

  // Tuesday
  { id: 'aids-a-t1', subject: 'OE:1', lecturer: 'N/A', room: 'EL-302', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-a-t2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-a-t3', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-a-t4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-t5', subject: 'ESPM', lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-a-t6', subject: 'LAB: SDS/DS', lecturer: 'S. A. Ghurde,Harsha Tembhekar/Prachi A. Bainalwar,S. Saba', room: 'AIDS-LAB-02 / AIDS-LAB-01', day: 'Tuesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-4))' },

  // Wednesday
  { id: 'aids-a-w1', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-a-w2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-a-w3', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-a-w4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-w5', subject: 'ESPM', lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-a-w6', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  
  // Thursday
  { id: 'aids-a-th1', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-a-th2', subject: 'DS', lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-a-th3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-th4', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-a-th5', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-a-th6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

  // Friday
  { id: 'aids-a-f1', subject: 'LAB: SDS/DS', lecturer: 'S. A. Ghurde,Neha Ingole/Prachi A. Bainalwar,S. SABA', room: 'AIDS-LAB-02/AIDS-LAB-01', day: 'Friday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-4))' },
  { id: 'aids-a-f2', subject: 'SDS', lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-a-f3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
  { id: 'aids-a-f4', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-a-f5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '03:00-05:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const CSE_AIDS_3_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'aids-b-recess-mon', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids-b-recess-tue', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids-b-recess-wed', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids-b-recess-thu', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids-b-recess-fri', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

  // Monday
  { id: 'aids-b-m1', subject: 'OE:1', lecturer: 'N/A', room: 'EL-303', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-b-m2', subject: 'Library', lecturer: 'S. Saba', room: 'N/A', day: 'Monday', time: '11:00-12:00', type: 'Library', duration: 1, color: '#E0E0E0' },
  { id: 'aids-b-m3', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-b-m4', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-b-m5', subject: 'LAB: SDS/DS', lecturer: 'K. P. Khandait,Prachi Gawande / P. V. Barekar, S. Saba', room: 'AIDS-LAB-02/AIDS-LAB-01', day: 'Monday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['B1', 'B2', 'B3', 'B4'], color: 'hsl(var(--chart-4))' },
  
  // Tuesday
  { id: 'aids-b-t1', subject: 'OE:1', lecturer: 'N/A', room: 'EL-303', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-b-t2', subject: 'LAB: SDS/DS', lecturer: 'K. P. Khandait,Prachi Gawande / P. V. Barekar, S. Saba', room: 'AIDS-LAB-02/AIDS-LAB-03', day: 'Tuesday', time: '11:00-01:00', type: 'Practical', duration: 2, batches: ['B3', 'B4', 'B1', 'B2'], color: 'hsl(var(--chart-4))' },
  { id: 'aids-b-t3', subject: 'ESPM', lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-b-t4', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },

  // Wednesday
  { id: 'aids-b-w1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-b-w2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-b-w3', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-b-w4', subject: 'ESPM', lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-b-w5', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

  // Thursday
  { id: 'aids-b-th1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-b-th2', subject: 'FOME', lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
  { id: 'aids-b-th3', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
  { id: 'aids-b-th4', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-b-th5', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

  // Friday
  { id: 'aids-b-f1', subject: 'SDS', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
  { id: 'aids-b-f2', subject: 'LA', lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
  { id: 'aids-b-f3', subject: 'DS', lecturer: 'P. V. Barekar', room: 'EL-303', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
  { id: 'aids-b-f4', subject: 'MDM 1: BDS/MDM2:Front End', lecturer: 'Ashwini Gadwe/Nirmik', room: 'EL-302/EL-303', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
  { id: 'aids-b-f5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '03:00-05:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const CSE_5_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'cse-5a-rec-mon', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-5a-rec-tue', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-5a-rec-wed', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-5a-rec-thu', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-5a-rec-fri', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'cse-5a-m1', subject: 'PE I: LAB: CN/HPC', lecturer: 'Amruta B. Pethe, Reena Parteki Sharayu Kharche, Komal Khandare', room: 'AIDS-LAB-02 / AIDS-LAB-05', day: 'Monday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-m2', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/EL-303', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-m3', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-m4', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-5a-m5', subject: 'FML', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'cse-5a-t1', subject: 'FML', lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'cse-5a-t2', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/EL-303', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-t3', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-5a-t4', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-t5', subject: 'TFCS', lecturer: 'Dr. S. A. Shirsat', room: 'EL-204', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-t6', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

    // Wednesday
    { id: 'cse-5a-w1', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '09:00-10:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'cse-5a-w2', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-w3', subject: 'LAB: AI/DAA', lecturer: 'Prajakta Ingale, Komal Khandare/R. S. Khangan, Harsha Tembhekar', room: 'AIDS-LAB-05/AIDS-LAB-01', day: 'Wednesday', time: '11:00-01:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-3))' },
    { id: 'cse-5a-w4', subject: 'MDM:MS', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-w5', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-5a-w6', subject: 'Library', lecturer: 'Harsha Tembhekar', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    
    // Thursday
    { id: 'cse-5a-th1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-th2', subject: 'TFCS', lecturer: 'Dr. S. A. Shirsat', room: 'EL-204', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-th3', subject: 'PE-I:CN/HPC', lecturer: 'Amruta B. Pethe/Sharayu Kharche', room: 'EL-204/CT-LAB-04', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-th4', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-5a-th5', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-5a-th6', subject: 'TFCS', lecturer: 'Dr. S. A. Shirsat', room: 'EL-204', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-th7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'cse-5a-f1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-5a-f2', subject: 'AI', lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-5a-f3', subject: 'TFCS', lecturer: 'Dr. S. A. Shirsat', room: 'EL-204', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-5a-f4', subject: 'LAB: AI/DAA', lecturer: 'Prajakta Ingale, P. V. Barekar/R. S. Khangan, Harsha Tembhekar', room: 'AIDS-LAB-05/AIDS-LAB-01', day: 'Friday', time: '01:00-03:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-3))' },
    { id: 'cse-5a-f5', subject: 'DAA', lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-5a-f6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];

const CSE_7_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'cse-7a-rec-mon', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-7a-rec-tue', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-7a-rec-wed', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-7a-rec-thu', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'cse-7a-rec-fri', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'cse-7a-m1', subject: 'DL', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-7a-m2', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-7a-m3', subject: 'PE-III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL-211/EL-204', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-7a-m4', subject: 'PE-V: D.SEC/OT', lecturer: 'Dr. Smita R. Kapse/Radhika Tekade', room: 'EL-103/ET-308', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'cse-7a-m5', subject: 'PE-IV: Dis Sy/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL-102/EL-303', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-m6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'cse-7a-t1', subject: 'LAB: HPC', lecturer: 'Shubhangi S. Shambharkar, Komal Khandare/Dr. Sanjay P. Pande, S. A. Ghurde', room: 'AIDS-LAB-01/AIDS-LAB-05', day: 'Tuesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'cse-7a-t2', subject: 'PE-III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL-211/EL-204', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-7a-t3', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-211', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-7a-t4', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-05:00', type: 'Practical', duration: 2, color: '#E0E0E0' },
    
    // Wednesday
    { id: 'cse-7a-w1', subject: 'CT', lecturer: 'Hrushikesh Panchbudhe', room: 'ARCH AG 02B', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-w2', subject: 'PE-V: D.SEC/OT', lecturer: 'Dr. Smita R. Kapse/Radhika Tekade', room: 'ARCH AG 02B/FL. 211', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'cse-7a-w3', subject: 'PE-III: SNDA/DW', lecturer: 'Neha Ingole/Sadaf Ansari', room: 'EL-211/ET-204', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'cse-7a-w4', subject: 'DL', lecturer: 'Shubhangi S. Shambharkar', room: 'ET-211', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-7a-w5', subject: 'LAB: DL/BDH', lecturer: 'Shubhangi S. Shambharkar, Charvi S. Suri/Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS-LAB-01/AIDS-LAB-02', day: 'Wednesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-1))' },

    // Thursday
    { id: 'cse-7a-th1', subject: 'LAB: DL/BDH', lecturer: 'Shubhangi S. Shambharkar, Sadaf Ansari/Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS-LAB-01/AIDS-LAB-02', day: 'Thursday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'cse-7a-th2', subject: 'PE-IV: DS/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL 211/ARCH AG 02B', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-th3', subject: 'CL', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-203', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-th4', subject: 'BDH', lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-302', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'cse-7a-th5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'cse-7a-f1', subject: 'PE-IV: DS/CC', lecturer: 'Dr. Shivkumar Karale/Akhil Jajulwar', room: 'EL-211/ARCH AG 02B', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-f2', subject: 'PE-V: D.SEC/OT', lecturer: 'Dr. Smita R. Kapse/Radhika Tekade', room: 'ARCH AG 02B/EL-211', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'cse-7a-f3', subject: 'CL', lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'cse-7a-f4', subject: 'DL', lecturer: 'Shubhangi S. Shambharkar', room: 'EL-211', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'cse-7a-f5', subject: 'Library', lecturer: 'Sadaf Ansari', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'cse-7a-f6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];


export const MASTER_TIMETABLE: TimetableData[] = [
    {
        id: 'tt-sem3-iot',
        name: 'CSE(IOT) 3rd Sem',
        timetable: CSE_IOT_3_SEM_TIMETABLE,
    },
    {
        id: 'tt-sem5-iot',
        name: 'CSE(IOT) 5th Sem',
        timetable: CSE_IOT_5_SEM_TIMETABLE,
    },
    {
        id: 'tt-sem7-cse-a',
        name: 'CSE 7th Sem',
        timetable: CSE_7_SEM_TIMETABLE,
    },
    {
        id: 'tt-sem3-aids-a',
        name: 'CSE(AIDS) 3rd Sem - Section A',
        timetable: CSE_AIDS_3_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-sem3-aids-b',
        name: 'CSE(AIDS) 3rd Sem - Section B',
        timetable: CSE_AIDS_3_SEM_B_TIMETABLE,
    },
    {
        id: 'tt-sem5-cse-a',
        name: 'CSE 5th Sem - Section A',
        timetable: CSE_5_SEM_A_TIMETABLE,
    },
    {
        id: 'tt-sem7-a',
        name: 'CSE 7th Sem - Section A',
        timetable: CSE_7_SEM_A_TIMETABLE,
    }
];
