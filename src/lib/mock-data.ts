
import type { Lecturer, TimetableEntry, TimetableData } from './types';

export const LECTURERS: Lecturer[] = [
    { id: 'lec1', name: 'Roshan S. Bhanuse' },
    { id: 'lec2', name: 'Hrushikesh P' },
    { id: 'lec3', name: 'Dr. Gauri M. Dhopavkar' },
    { id: 'lec4', name: 'Radhika' },
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
    { id: 'lec18', name: 'Sadaf' },
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
    { id: 'lec29', name: 'Dr. S. J. Kadarpachi' },
    { id: 'lec30', name: 'Dr. G. M. Vidhale' },
    { id: 'lec31', name: 'S. S. Bhadoria' },
];

const CSE_IOT_3_SEM_TIMETABLE: TimetableEntry[] = [
    // Recess for all days
    { id: 'rec-mon', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-sat', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Saturday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'm3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'm4', subject: 'Library', lecturer: 'Lata R. Tembhare', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'm5', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Rina Parteki, Harsha Tembhekar, Sharayu Sangekar', room: 'IOT Lab 1,2,3,4', day: 'Monday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },

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
    { id: 'th5', subject: 'DS/CWS', lecturer: 'Lata R. Tembhare, Charvi S. Suri, Harsha Tembhekar, Sadaf', room: 'IOT Lab 1,2,3,4', day: 'Thursday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-5))' },

    // Friday
    { id: 'f1', subject: 'MI', lecturer: 'N/A', room: 'ET-308', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f2', subject: 'CAO', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f3', subject: 'DS', lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'f4', subject: 'MDM 1: IOT Arch. Pro.', lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f5', subject: 'MI', lecturer: 'Dr. Rathkanthiwar, Nilesh U. Sambhe, Kirti S., Dr. A. B. Thatere', room: 'IOT Lab 1,2,3,4', day: 'Friday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },
];

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'rec-mon-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1-5', subject: 'DBMS/OS Lab', lecturer: 'RSB, Hrushikesh P, GMD, Radhika', room: 'IOT Lab 1,2/3,4', day: 'Monday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2', 'A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'm2-5', subject: 'PE-I:GIS/MFDA', lecturer: 'CSS, Sharayu S', room: 'ET 316/ET-308', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm3-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'm4-5', subject: 'TFCS', lecturer: 'SSS', room: 'ET-316', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 't1-5', subject: 'DBMS', lecturer: 'RSB', room: 'ET-316', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 't2-5', subject: 'OS', lecturer: 'GMD', room: 'ET-316', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 't3-5', subject: 'PE-I:GIS/MFDA', lecturer: 'CSS, Sharayu S', room: 'ET 316/ET-308', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 't4-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 't5-5', subject: 'PE I: LAB: GIS/MFDA', lecturer: 'CSS, Radhika, Sharayu S, AG', room: 'IOT Lab 3,4/1,2', day: 'Tuesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },

    // Wednesday
    { id: 'w1-5', subject: 'OE:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'w2-5', subject: 'DAA', lecturer: 'SAS', room: 'ET-316', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w3-5', subject: 'DAA', lecturer: 'SAS', room: 'ET-316', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w4-5', subject: 'MDM:FOG', lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w5-5', subject: 'LAB: OS/DAA', lecturer: 'GMD, Hrushikesh P, SAS, RinaP', room: 'IOT Lab 3,4/1,2', day: 'Wednesday', time: '03:00-05:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'th1-5', subject: 'OE:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'th2-5', subject: 'DBMS', lecturer: 'RSB', room: 'ET 316', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'th3-5', subject: 'LAB: DBMS/DAA', lecturer: 'RSB, RinaP, SAS, Nirmik', room: 'IOT Lab 1,2/3,4', day: 'Thursday', time: '11:00-01:00', type: 'Practical', duration: 2, batches: ['A3', 'A4', 'A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'th4-5', subject: 'OS', lecturer: 'GMD', room: 'ET 316', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'th5-5', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'th6-5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'f1-5', subject: 'OE:3 Arthashashtra', lecturer: 'PVB', room: 'ET-316', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'f2-5', subject: 'OS', lecturer: 'GMD', room: 'ET-316', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'f3-5', subject: 'TFCS', lecturer: 'SSS', room: 'ET-316', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'f4-5', subject: 'DBMS', lecturer: 'RSB', room: 'ET-316', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'f5-5', subject: 'DAA', lecturer: 'SAS', room: 'ET-316', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f6-5', subject: 'Library', lecturer: 'RADHIKA Tekade', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    
    // Saturday
    { id: 'sa1-5', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Saturday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];

const CSE_7_SEM_TIMETABLE: TimetableEntry[] = [
    // Recess
    { id: 'rec-mon-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-tue-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-wed-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-thu-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'rec-fri-7', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },

    // Monday
    { id: 'm1-7', subject: 'PE-V: Blockchain / OSC', lecturer: 'PAB / GA', room: 'EL-204 / EL 203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm2-7', subject: 'SE', lecturer: 'NUS', room: 'EL 302', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'm3-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha / PD', room: 'EL 302 / EL 102', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'm4-7', subject: 'CC', lecturer: 'GKY', room: 'ET 308', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'm5-7', subject: 'IOT DP', lecturer: 'SPP', room: 'ET 308', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 't1-7', subject: 'LAB: SE / CC', lecturer: 'NUS, PI / GKY, GA', room: 'IOT Lab 1,2 / IOT Lab 3,4', day: 'Tuesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-5))' },
    { id: 't2-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha / PD', room: 'EL 302 / EL 102', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 't3-7', subject: 'LIBRARY', lecturer: 'G. AHMED', room: 'N/A', day: 'Tuesday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 't4-7', subject: 'CC', lecturer: 'GKY', room: 'EL 103', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 't5-7', subject: 'IOT DP', lecturer: 'SPP', room: 'EL 103', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'w1-7', subject: 'PE III: LAB: IOT / FEC', lecturer: 'S. Saba, Nirmik / PG, SJK', room: 'IOT Lab 1,2 / IOT Lab 3,4', day: 'Wednesday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A1','A2','A3','A4'], color: 'hsl(var(--chart-3))' },
    { id: 'w2-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / PG', room: 'EL-204 / EL102', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'w3-7', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '02:00-05:00', type: 'Practical', duration: 3, color: '#E0E0E0' },

    // Thursday
    { id: 'th1-7', subject: 'SE', lecturer: 'NUS', room: 'EL 211', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'th2-7', subject: 'PE-IV: SPI / DAI', lecturer: 'Harsha / PD', room: 'ET316 / EL 211', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'th3-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / PG', room: 'ET 308 / ET 316', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'th4-7', subject: 'PE-V: Blockchain / OSC', lecturer: 'PAB / GA', room: 'AIDS Lab 2 / AIDS Lab 1', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 1, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'th5-7', subject: 'IOT DP', lecturer: 'SPP', room: 'EL 211', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'th6-7', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    
    // Friday
    { id: 'f1-7', subject: 'LAB: SE / CC', lecturer: 'NUS, GMV / GKY, SSB', room: 'IOT Lab 1,2 / IOT Lab 3,4', day: 'Friday', time: '10:00-12:00', type: 'Practical', duration: 2, batches: ['A3','A4','A1','A2'], color: 'hsl(var(--chart-5))' },
    { id: 'f2-7', subject: 'PE-III: IOT / FEC', lecturer: 'S. Saba / PG', room: 'ET 308 / ET 316', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'f3-7', subject: 'PE-V: Blockchain / OSC', lecturer: 'PAB / GA', room: 'AIDS Lab 2 / EL-204', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 1, batches: ['A3','A4'], color: 'hsl(var(--chart-2))' },
    { id: 'f4-7', subject: 'SE', lecturer: 'NUS', room: 'EL 211', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'f5-7', subject: 'CC', lecturer: 'GKY', room: 'EL 102', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

];


export const MASTER_TIMETABLE: TimetableData[] = [
    {
        id: 'tt-sem3-iot',
        name: 'CSE(IOT) 3rd Sem',
        timetable: CSE_IOT_3_SEM_TIMETABLE,
    },
    {
        id: 'tt-sem5-iot-a',
        name: 'CSE(IOT) 5th Sem',
        timetable: CSE_IOT_5_SEM_TIMETABLE,
    },
    {
        id: 'tt-sem7-cse-a',
        name: 'CSE 7th Sem',
        timetable: CSE_7_SEM_TIMETABLE,
    }
];
