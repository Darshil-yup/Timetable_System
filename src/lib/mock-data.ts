
import type { Lecturer, TimetableEntry, TimetableData } from './types';
import { SUBJECT_ABBREVIATIONS } from './constants';

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
    { id: 'lec13', name: 'Nirmik Rathod' },
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
    { id: 'lec41', name: 'K. P. Khandait' },
    { id: 'lec42', name: 'Snehal Khalatkar' },
    { id: 'lec43', name: 'Amruta B. Pethe' },
    { id: 'lec44', name: 'Reena Parteki' },
    { id: 'lec45', name: 'Sharayu Kharche' },
    { id: 'lec46', name: 'Komal Khandare' },
    { id: 'lec47', name: 'Prajakta Ingale' },
    { id: 'lec48', name: 'R. S. Khangan' },
    { id: 'lec49', name: 'Shubhangi S. Shambharkar' },
    { id: 'lec50', name: 'Dr. Smita R. Kapse' },
    { id: 'lec51', name: 'Akhil Jajulwar' },
    { id: 'lec52', name: 'Dr. Piyush Ingole' },
    { id: 'lec53', name: 'Dr. Roshni S. Khedgaokar' },
    { id: 'lec54', name: 'Sneha A. Sahare' },
    { id: 'lec55', name: 'Dr. Kavita R. Singh' },
    { id: 'lec56', name: 'Dr. Arvind B. Patil' },
    { id: 'lec57', name: 'Sharayu Kawale' },
    { id: 'lec58', name: 'Prof. N. A. Bhosale' },
    { id: 'lec59', name: 'S. S. Nagpure' },
    { id: 'lec60', name: 'Prof A.R. Bhange' },
    { id: 'lec61', name: 'Kalyani P. Karule' },
    { id: 'lec62', name: 'Praful V. Bardar' },
    { id: 'lec63', name: 'Ashwini Gote' },
    { id: 'lec64', name: 'Dr.Supriya Thombre' },
    { id: 'lec65', name: 'Pooja Bhandarkar' },
    { id: 'lec66', name: 'Sneha Badhe' },
    { id: 'lec67', name: 'Shweta Khalatkar' },
    { id: 'lec68', name: 'Shweta A. Gode' },
    { id: 'lec69', name: 'Dr.Gauri Chaudhary' },
    { id: 'lec70', name: 'Kiran Khandare' },
    { id: 'lec71', name: 'Pooja B.' }
];

const CSE_IOT_3_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot3-mon-1', subject: 'OE:1', lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-mon-2', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-4', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-mon-5', subject: 'Library', lecturer: 'Lata R. Tembhare', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-mon-6', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare, Rina Parteki', room: 'IOT Lab 3', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-mon-7', subject: 'Computer Workshop', abbreviation: SUBJECT_ABBREVIATIONS['Computer Workshop'], lecturer: 'Harsha Tembhekar, Sharayu Sangekar', room: 'IOT Lab 1', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-4))' },
    
    // Tuesday
    { id: 'ciot3-tue-1', subject: 'OE:1', lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-2', subject: 'Basics of Python Programming', abbreviation: SUBJECT_ABBREVIATIONS['Basics of Python Programming'], lecturer: 'Rina Parteki', room: 'ET-308', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-tue-4', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-tue-5', subject: 'Microcontroller & Interfacing', abbreviation: SUBJECT_ABBREVIATIONS['Microcontroller & Interfacing'], lecturer: 'N/A', room: 'ET-308', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-tue-6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-04:00', type: 'Sports', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'ciot3-wed-1', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-wed-2', subject: 'Microcontroller & Interfacing', abbreviation: SUBJECT_ABBREVIATIONS['Microcontroller & Interfacing'], lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-wed-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-wed-4', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-wed-5', subject: 'Basics of Python Programming', abbreviation: SUBJECT_ABBREVIATIONS['Basics of Python Programming'], lecturer: 'Rina Parteki', room: 'ET-308', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-wed-6', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'N/A', room: 'ET-308', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-wed-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot3-thu-1', subject: 'Basics of Python Programming', abbreviation: SUBJECT_ABBREVIATIONS['Basics of Python Programming'], lecturer: 'Rina Parteki', room: 'ET-308', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-thu-2', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'N/A', room: 'ET-308', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-thu-4', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-thu-5', subject: 'IoT Architecture and Protocol', abbreviation: SUBJECT_ABBREVIATIONS['IoT Architecture and Protocol'], lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-thu-6', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare, Charvi S. Suri', room: 'IOT Lab 4', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-4))' },
    { id: 'ciot3-thu-7', subject: 'Computer Workshop', abbreviation: SUBJECT_ABBREVIATIONS['Computer Workshop'], lecturer: 'Harsha Tembhekar, Sadaf Ansari', room: 'IOT Lab 2', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-4))' },
    
    // Friday
    { id: 'ciot3-fri-1', subject: 'Microcontroller & Interfacing', abbreviation: SUBJECT_ABBREVIATIONS['Microcontroller & Interfacing'], lecturer: 'N/A', room: 'ET-308', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-2', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Harsha Tembhekar', room: 'ET-308', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot3-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot3-fri-4', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Lata R. Tembhare', room: 'ET-308', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot3-fri-5', subject: 'IoT Architecture and Protocol', abbreviation: SUBJECT_ABBREVIATIONS['IoT Architecture and Protocol'], lecturer: 'Priya Kotewar', room: 'ET-308', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot3-fri-6', subject: 'Microcontroller & Interfacing', abbreviation: SUBJECT_ABBREVIATIONS['Microcontroller & Interfacing'], lecturer: 'Dr. Rathkanthiwar, S. Khan', room: 'IOT Lab 2', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-5))' },
    { id: 'ciot3-fri-7', subject: 'Microcontroller & Interfacing', abbreviation: SUBJECT_ABBREVIATIONS['Microcontroller & Interfacing'], lecturer: 'Kirti S., Dr. A. B. Thatere', room: 'IOT Lab 4', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-5))' },
];

const CSE_IOT_5_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot5-mon-1', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Roshan S. Bhanuse, Hrushikesh Panchbudhe', room: 'IOT Lab 1', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-mon-2', subject: 'Operating System', abbreviation: SUBJECT_ABBREVIATIONS['Operating System'], lecturer: 'Dr. Gauri M. Dhopavkar, Radhika Tekade', room: 'IOT Lab 3', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-mon-3', subject: 'Geographical Information System', abbreviation: SUBJECT_ABBREVIATIONS['Geographical Information System'], lecturer: 'Charvi S. Suri', room: 'ET-316', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-mon-4', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Sharayu Sangekar', room: 'ET-308', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-mon-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-mon-6', subject: 'Fog Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fog Computing'], lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-mon-7', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Dr. S. S. Sherekar', room: 'ET-316', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'ciot5-tue-1', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-tue-2', subject: 'Operating System', abbreviation: SUBJECT_ABBREVIATIONS['Operating System'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-tue-3', subject: 'Geographical Information System', abbreviation: SUBJECT_ABBREVIATIONS['Geographical Information System'], lecturer: 'Charvi S. Suri', room: 'ET-316', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-tue-4', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Sharayu Sangekar', room: 'ET-308', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-tue-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-tue-6', subject: 'Fog Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fog Computing'], lecturer: 'Prachi Gawande', room: 'ET-316', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-tue-7', subject: 'Geographical Information System', abbreviation: SUBJECT_ABBREVIATIONS['Geographical Information System'], lecturer: 'Charvi S. Suri, Radhika Tekade', room: 'IOT Lab 3', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-tue-8', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Sharayu Sangekar, Gousia Ahmed', room: 'IOT Lab 1', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },

    // Wednesday
    { id: 'ciot5-wed-1', subject: 'OE:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-wed-2', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'Dr. S. A. Shirsat', room: 'E1-316', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-3', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'Dr. S. A. Shirsat', room: 'E1-316', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-wed-5', subject: 'Fog Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fog Computing'], lecturer: 'Prachi Gawande', room: 'E1-316', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot5-wed-6', subject: 'Operating System', abbreviation: SUBJECT_ABBREVIATIONS['Operating System'], lecturer: 'Dr. Gauri M. Dhopavkar, Hrushikesh Panchbudhe', room: 'IOT Lab 3', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-wed-7', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'Dr. S. A. Shirsat, Rina Parteki', room: 'IOT Lab 1', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'ciot5-thu-1', subject: 'OF:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-2', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-3', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Roshan S. Bhanuse, Rina Parteki', room: 'IOT Lab 1', day: 'Thursday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-4', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'Dr. S. A. Shirsat, Nirmik Rathod', room: 'IOT Lab 3', day: 'Thursday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-thu-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-6', subject: 'Operating System', abbreviation: SUBJECT_ABBREVIATIONS['Operating System'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-thu-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-thu-8', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'ciot5-fri-1', subject: 'OE:3 Arthashashtra', lecturer: 'P.V.Barekar', room: 'ET-316', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-2', subject: 'Operating System', abbreviation: SUBJECT_ABBREVIATIONS['Operating System'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'ET-316', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot5-fri-3', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Dr. S. S. Sherekar', room: 'ET-316', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot5-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-5', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Roshan S. Bhanuse', room: 'ET-316', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot5-fri-6', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'Dr. S. A. Shirsat', room: 'ET-316', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot5-fri-7', subject: 'Library', lecturer: 'Radhika Tekade', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot5-fri-8', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
];

const CSE_IOT_7_SEM_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ciot7-mon-1', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'Prachi A. Bainalwar', room: 'EL-204', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-mon-1b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Gousia Ahmed', room: 'EL-203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-mon-2', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Nilesh U. Sambhe', room: 'EL-302', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-mon-3', subject: 'PE-IV: SPI', lecturer: 'Harsha Tembhekar', room: 'EL-302', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-mon-3b', subject: 'PE-IV: DAI', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-102', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-mon-5', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Dr. Ganesh Yenurkar', room: 'ET-308', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-mon-6', subject: 'Sensor-based IoT and Data Processing', abbreviation: SUBJECT_ABBREVIATIONS['Sensor-based IoT and Data Processing'], lecturer: 'Dr. Sanjay P. Pande', room: 'ET-308', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 'ciot7-tue-1', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Nilesh U. Sambhe, Prajakta Ingale', room: 'IOT Lab 1', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-tue-1b', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Dr. Ganesh Yenurkar, Gousia Ahmed', room: 'IOT Lab 3', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-tue-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-3', subject: 'PE-IV: SPI', lecturer: 'Harsha Tembhekar', room: 'EL-302', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-tue-3b', subject: 'PE-IV: DAI', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-102', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-tue-4', subject: 'Library', lecturer: 'Gousia Ahmed', room: 'N/A', day: 'Tuesday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-tue-5', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-103', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ciot7-tue-6', subject: 'Sensor-based IoT and Data Processing', abbreviation: SUBJECT_ABBREVIATIONS['Sensor-based IoT and Data Processing'], lecturer: 'Dr. Sanjay P. Pande', room: 'EL-103', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Wednesday
    { id: 'ciot7-wed-1', subject: 'Internet of Things', abbreviation: SUBJECT_ABBREVIATIONS['Internet of Things'], lecturer: 'S. Saba, Nirmik Rathod', room: 'IOT Lab 1', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-1b', subject: 'Fuzzy and Evolutionary Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fuzzy and Evolutionary Computing'], lecturer: 'P. V. Gulhane, Dr. Shivkumar Karale', room: 'IOT Lab 3', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-wed-3', subject: 'Internet of Things', abbreviation: SUBJECT_ABBREVIATIONS['Internet of Things'], lecturer: 'S. Saba', room: 'EL-204', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-3b', subject: 'Fuzzy and Evolutionary Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fuzzy and Evolutionary Computing'], lecturer: 'P. V. Gulhane', room: 'EL-102', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-wed-4', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '02:00-03:00', type: 'Practical', duration: 2, color: '#E0E0E0' },

    // Thursday
    { id: 'ciot7-thu-1', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-2', subject: 'PE-IV: SPI', lecturer: 'Harsha Tembhekar', room: 'ET-316', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-thu-2b', subject: 'PE-IV: DAI', lecturer: 'Dr. Prarthana Deshkar', room: 'EL-211', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ciot7-thu-3', subject: 'Internet of Things', abbreviation: SUBJECT_ABBREVIATIONS['Internet of Things'], lecturer: 'S. Saba', room: 'ET-308', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-3b', subject: 'Fuzzy and Evolutionary Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fuzzy and Evolutionary Computing'], lecturer: 'P. V. Gulhane', room: 'ET-316', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-thu-5', subject: 'Blockchain Technology', abbreviation: SUBJECT_ABBREVIATIONS['Blockchain Technology'], lecturer: 'Prachi A. Bainalwar', room: 'AIDS-LAB-02', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-thu-5b', subject: 'Open Source Computing', abbreviation: SUBJECT_ABBREVIATIONS['Open Source Computing'], lecturer: 'Gousia Ahmed', room: 'AIDS-LAB-01', day: 'Thursday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-thu-6', subject: 'Sensor-based IoT and Data Processing', abbreviation: SUBJECT_ABBREVIATIONS['Sensor-based IoT and Data Processing'], lecturer: 'Dr. Sanjay P. Pande', room: 'EL-211', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ciot7-thu-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    
    // Friday
    { id: 'ciot7-fri-1', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Nilesh U. Sambhe, Dr. Gendlal M. Vaidya', room: 'IOT Lab 1', day: 'Friday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-1b', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Dr. Ganesh Yenurkar, S. S. Bhadoria', room: 'IOT Lab 3', day: 'Friday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-2', subject: 'Internet of Things', abbreviation: SUBJECT_ABBREVIATIONS['Internet of Things'], lecturer: 'S. Saba', room: 'ET-308', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-2b', subject: 'Fuzzy and Evolutionary Computing', abbreviation: SUBJECT_ABBREVIATIONS['Fuzzy and Evolutionary Computing'], lecturer: 'P. V. Gulhane', room: 'ET-316', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ciot7-fri-4', subject: 'Blockchain Technology', abbreviation: SUBJECT_ABBREVIATIONS['Blockchain Technology'], lecturer: 'Prachi A. Bainalwar', room: 'AIDS-LAB-02', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-4b', subject: 'Open Source Computing', abbreviation: SUBJECT_ABBREVIATIONS['Open Source Computing'], lecturer: 'Gousia Ahmed', room: 'EL-204', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ciot7-fri-5', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ciot7-fri-6', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-102', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
];

const CT_3_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct3a-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-102', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-mon-2', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-102', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-mon-3', subject: 'Library', lecturer: 'Ashwini Gadwe', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-mon-5', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-mon-6', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Gousia Ahmed,Ashwini Gadwe', room: 'CT-LAB-02', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3a-mon-7', subject: 'Web Technology', abbreviation: SUBJECT_ABBREVIATIONS['Web Technology'], lecturer: 'Sadaf Ansari,Radhika Tekade', room: 'CT-LAB-03', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-4))' },
    
    // Tuesday
    { id: 'ct3a-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-204', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-tue-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-tue-3', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-tue-5', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-tue-6', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Rina Parteki', room: 'EL-102', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-tue-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct3a-wed-1', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '10:00-11:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-wed-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-wed-3', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-wed-5', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-wed-6', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Shivkumar Karale,Ashwini Gadwe', room: 'CT-LAB-02', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3a-wed-7', subject: 'Web Technology', abbreviation: SUBJECT_ABBREVIATIONS['Web Technology'], lecturer: 'Sadaf Ansari,Radhika Tekade', room: 'CT-LAB-03', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-4))' },

    // Thursday
    { id: 'ct3a-thu-1', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-102', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-thu-2', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-thu-4', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Sharayu Sangekar', room: 'EL-102', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-thu-4b', subject: 'Augmented Reality and Virtual Reality', abbreviation: SUBJECT_ABBREVIATIONS['Augmented Reality and Virtual Reality'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-thu-5', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Rina Parteki', room: 'EL-102', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-thu-6', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-102', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    
    // Friday
    { id: 'ct3a-fri-1', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Roshni S. Khedgaokar', room: 'EL-103', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3a-fri-2', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Rina Parteki', room: 'EL-102', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3a-fri-3', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'Ashwini Gadwe', room: 'EL-102', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3a-fri-5', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Sharayu Sangekar', room: 'EL-102', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-fri-5b', subject: 'Augmented Reality and Virtual Reality', abbreviation: SUBJECT_ABBREVIATIONS['Augmented Reality and Virtual Reality'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3a-fri-6', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-102', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3a-fri-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
];

const CT_3_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct3b-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-103', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-mon-2', subject: 'Library', lecturer: 'S. Saba', room: 'N/A', day: 'Monday', time: '11:00-12:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-mon-3', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-103', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-mon-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar', room: 'EL-103', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-mon-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '02:00-03:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-mon-7', subject: 'Library', lecturer: 'Nirmik Rathod', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct3b-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-103', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-tue-2', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: '', room: 'EL-103', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-tue-4', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-tue-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-tue-6', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Shivkumar Karale,Nirmik Rathod', room: 'CT-LAB-02', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-tue-7', subject: 'Web Technology', abbreviation: SUBJECT_ABBREVIATIONS['Web Technology'], lecturer: 'Sadaf Ansari,Priya Kotewar', room: 'CT-LAB-03', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B3','B4'], color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'ct3b-wed-1', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-wed-2', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-wed-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-wed-4', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-wed-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-wed-6', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-wed-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ct3b-thu-1', subject: 'Discrete Mathematics and Graph Theory', abbreviation: SUBJECT_ABBREVIATIONS['Discrete Mathematics and Graph Theory'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct3b-thu-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct3b-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-thu-4', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-thu-5', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Sharayu Sangekar', room: 'EL-102', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-thu-5b', subject: 'Augmented Reality and Virtual Reality', abbreviation: SUBJECT_ABBREVIATIONS['Augmented Reality and Virtual Reality'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-thu-6', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct3b-thu-7', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'ct3b-fri-1', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Gousia Ahmed,Nirmik Rathod', room: 'CT-LAB-02', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['B3','B4'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-1b', subject: 'Web Technology', abbreviation: SUBJECT_ABBREVIATIONS['Web Technology'], lecturer: 'Sadaf Ansari,Priya Kotewar', room: 'CT-LAB-03', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct3b-fri-3', subject: 'Computer Architecture Organization', abbreviation: SUBJECT_ABBREVIATIONS['Computer Architecture Organization'], lecturer: 'Snehal Khalatkar', room: 'EL-103', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-fri-4', subject: 'Software Engineering', abbreviation: SUBJECT_ABBREVIATIONS['Software Engineering'], lecturer: 'Sharayu Sangekar', room: 'EL-102', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-4b', subject: 'Augmented Reality and Virtual Reality', abbreviation: SUBJECT_ABBREVIATIONS['Augmented Reality and Virtual Reality'], lecturer: 'K. P. Khandait', room: 'EL-103', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct3b-fri-5', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: '', room: 'EL-103', day: 'Friday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct3b-fri-6', subject: 'Communicative Logic', abbreviation: SUBJECT_ABBREVIATIONS['Communicative Logic'], lecturer: 'Radhika Tekade', room: 'EL-103', day: 'Friday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
];

const CT_5_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct5a-mon-1', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar', room: 'CT-LAB-04', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-mon-1b', subject: 'JAVA', lecturer: 'Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-01', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-mon-2', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'Priya Kotewar', room: 'EL-203', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-mon-2b', subject: 'Information System & Forensics', abbreviation: SUBJECT_ABBREVIATIONS['Information System & Forensics'], lecturer: 'S. A. Ghurde', room: 'CT-LAB-01', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-mon-3', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-mon-4', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-mon-5', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar', room: 'CT-LAB-04', day: 'Monday', time: '04:00-05:00', type: 'Practical', duration: 1, batches: ['A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-mon-5b', subject: 'JAVA', lecturer: 'Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-01', day: 'Monday', time: '04:00-05:00', type: 'Practical', duration: 1, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },

    // Tuesday
    { id: 'ct5a-tue-1', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-tue-2', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-tue-3', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'Priya Kotewar', room: 'EL-203', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-tue-3b', subject: 'Information System & Forensics', abbreviation: SUBJECT_ABBREVIATIONS['Information System & Forensics'], lecturer: 'S. A. Ghurde', room: 'CT-LAB-01', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 2, color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-tue-5', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-tue-6', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar,Akhil Jajulwar', room: 'CT-LAB-04', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-tue-6b', subject: 'JAVA', lecturer: 'Snehal Khalatkar,Dr. Prarthana Deshkar', room: 'CT-LAB-01', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },

    // Wednesday
    { id: 'ct5a-wed-1', subject: 'Introduction to Cryptography and Protocol', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Cryptography and Protocol'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-wed-2', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-wed-3', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-wed-4', subject: 'MDM:FPP', lecturer: 'S. Saba', room: 'EL-203', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct5a-wed-5', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-wed-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'ct5a-thu-1', subject: 'Introduction to Cryptography and Protocol', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Cryptography and Protocol'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Thursday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-thu-2', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '11:00-12:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-thu-4', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'Priya Kotewar', room: 'CT-LAB-07', day: 'Thursday', time: '12:00-01:00', type: 'Practical', duration: 2, batches: ['A1'], color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-thu-4b', subject: 'Information System & Forensics', abbreviation: SUBJECT_ABBREVIATIONS['Information System & Forensics'], lecturer: 'S. A. Ghurde,Radhika Tekade', room: 'CT-LAB-04', day: 'Thursday', time: '12:00-01:00', type: 'Practical', duration: 2, batches: ['A2'], color: 'hsl(var(--chart-2))' },
    { id: 'ct5a-thu-5', subject: 'LIBRARY', lecturer: 'Rina Parteki', room: 'N/A', day: 'Thursday', time: '02:00-03:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-thu-6', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-thu-7', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Friday
    { id: 'ct5a-fri-1', subject: 'Introduction to Cryptography and Protocol', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Cryptography and Protocol'], lecturer: 'Dr. Gauri M. Dhopavkar', room: 'EL-203', day: 'Friday', time: '09:00-10:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-fri-2', subject: 'Database Management System', abbreviation: SUBJECT_ABBREVIATIONS['Database Management System'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'ct5a-fri-3', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Roshan S. Bhanuse', room: 'EL-203', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct5a-fri-4', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Sports', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-fri-5', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct5a-fri-6', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Dr. Prarthana Deshkar', room: 'EL-203', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-fri-7', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'Dr. Prarthana Deshkar,Rina Parteki', room: 'CT-LAB-02', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },
    { id: 'ct5a-fri-7b', subject: 'Mathematical Foundation for Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Mathematical Foundation for Data Analysis'], lecturer: 'K. P. Khandait,Sharayu Sangekar', room: 'CT-LAB-03', day: 'Friday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-1))' },
];

const CT_7_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct7b-mon-1', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-mon-1b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-mon-1c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-mon-2', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Nirmik Rathod', room: 'AG-0213', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7b-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-mon-4', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-mon-4b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-mon-4c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-mon-5', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-mon-5b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-mon-5c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'EL-211', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-mon-6', subject: 'LIBRARY', lecturer: 'Priya Kotewar', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-mon-7', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct7b-tue-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '10:00-11:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-tue-2', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Nirmik Rathod', room: 'AG-0213', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-tue-4', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-tue-4b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-tue-4c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-tue-5', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-tue-5b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-tue-5c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'AIDS-LAB-01', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-tue-6', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-tue-6b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-tue-6c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'EL-203', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-tue-7', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct7b-wed-1', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.,Akhil Jajulwar', room: 'CT-LAB-04', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7b-wed-1b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar,Priya Kotewar', room: 'CT-LAB-03', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B2'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7b-wed-1c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar,Rina Parteki', room: 'CT-LAB-02', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7b-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7b-wed-3', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-wed-3b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-wed-3c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7b-wed-4', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-wed-4b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-wed-4c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'CT-LAB-03', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7b-wed-5', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-wed-5b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-wed-5c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'CT-LAB-04', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7b-wed-6', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Nirmik Rathod', room: 'AG-0213', day: 'Wednesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
];

const CT_7_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'ct7a-mon-1', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-mon-1b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-mon-1c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-mon-2', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7a-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-mon-4', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-mon-4b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-mon-4c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-mon-5', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-mon-5b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-mon-5c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'EL-211', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-mon-6', subject: 'PROJECT', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-mon-7', subject: 'LIBRARAY', lecturer: 'Akhil Jajulwar', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'ct7a-tue-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '10:00-11:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-tue-2', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'ct7a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-tue-4', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-tue-4b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-tue-4c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-tue-5', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-tue-5b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-tue-5c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'AIDS-LAB-01', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-tue-6', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-tue-6b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-tue-6c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'EL-203', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-tue-7', subject: 'PROJECT', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '04:00-05:00', type: 'Practical', duration: 1, color: '#E0E0E0' },

    // Wednesday
    { id: 'ct7a-wed-1', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.,Akhil Jajulwar', room: 'CT-LAB-04', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7a-wed-1b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar,Priya Kotewar', room: 'CT-LAB-03', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B2'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7a-wed-1c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar,Rina Parteki', room: 'CT-LAB-02', day: 'Wednesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['B1'], color: 'hsl(var(--chart-5))' },
    { id: 'ct7a-wed-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'ct7a-wed-3', subject: 'Cyber Law and Ethics', abbreviation: SUBJECT_ABBREVIATIONS['Cyber Law and Ethics'], lecturer: 'Pooja B.', room: 'AG-0213', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-wed-3b', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Shubhangi S. Shambharkar', room: 'EL-203', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-wed-3c', subject: 'Customer Relationship Management', abbreviation: SUBJECT_ABBREVIATIONS['Customer Relationship Management'], lecturer: 'Dr. Ganesh Yenurkar', room: 'EL-211', day: 'Wednesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'ct7a-wed-4', subject: 'Introduction to Natural Language Processing', abbreviation: SUBJECT_ABBREVIATIONS['Introduction to Natural Language Processing'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'AIDS-LAB-02', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-wed-4b', subject: 'Embedded Systems', abbreviation: SUBJECT_ABBREVIATIONS['Embedded Systems'], lecturer: 'Dr. Sanjay P. Pande', room: 'AG-0213', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-wed-4c', subject: 'Computer Vision', abbreviation: SUBJECT_ABBREVIATIONS['Computer Vision'], lecturer: 'S. S. Bhadoria', room: 'CT-LAB-03', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'ct7a-wed-5', subject: 'Neural Networks and Fuzzy Logic', abbreviation: SUBJECT_ABBREVIATIONS['Neural Networks and Fuzzy Logic'], lecturer: 'P. V. Gulhane', room: 'AG-0213', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-wed-5b', subject: 'Ad-hoc Wireless Network', abbreviation: SUBJECT_ABBREVIATIONS['Ad-hoc Wireless Network'], lecturer: 'Nilesh U. Sambhe', room: 'EL-211', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-wed-5c', subject: 'Data Mining', abbreviation: SUBJECT_ABBREVIATIONS['Data Mining'], lecturer: 'Dr. Piyush Ingole', room: 'CT-LAB-04', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'ct7a-wed-6', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Wednesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'ct7a-thu-1', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '10:00-11:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_3_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids3a-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-302', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-mon-2', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-mon-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-mon-4', subject: 'Library', lecturer: 'Neha Ingole', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-mon-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-mon-6', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-mon-7', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Tuesday
    { id: 'aids3a-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-302', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-tue-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-tue-3', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-tue-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-tue-5', subject: 'Earth Science & Project Management', abbreviation: SUBJECT_ABBREVIATIONS['Earth Science & Project Management'], lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-tue-6', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde,Harsha Tembhekar', room: 'AIDS-LAB-02', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-tue-7', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar,S. Saba', room: 'AIDS-LAB-01', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-4))' },

    // Wednesday
    { id: 'aids3a-wed-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-wed-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-wed-3', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-302', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids3a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-wed-5', subject: 'Earth Science & Project Management', abbreviation: SUBJECT_ABBREVIATIONS['Earth Science & Project Management'], lecturer: 'P. V. Gulhane', room: 'EL-302', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3a-wed-6', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'aids3a-thu-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-thu-2', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar', room: 'EL-302', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-thu-4', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-302', day: 'Thursday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-thu-5', subject: 'Big Data Science', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Science'], lecturer: 'Ashwini Gadwe', room: 'EL-302', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-thu-5b', subject: 'Front End Development', lecturer: 'Nirmik Rathod', room: 'EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-thu-6', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '03:00-04:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'aids3a-fri-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde,Neha Ingole', room: 'AIDS-LAB-02', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-fri-1b', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'Prachi A. Bainalwar,S. Saba', room: 'AIDS-LAB-01', day: 'Friday', time: '09:00-10:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-fri-2', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'S. A. Ghurde', room: 'EL-302', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3a-fri-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3a-fri-4', subject: 'Big Data Science', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Science'], lecturer: 'Ashwini Gadwe', room: 'EL-302', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-fri-4b', subject: 'Front End Development', lecturer: 'Nirmik Rathod', room: 'EL-303', day: 'Friday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3a-fri-5', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '02:00-03:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_3_SEM_B_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids3b-mon-1', subject: 'OE:1', lecturer: '', room: 'EL-303', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-mon-2', subject: 'Library', lecturer: 'S. Saba', room: 'N/A', day: 'Monday', time: '11:00-12:00', type: 'Library', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-mon-3', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-mon-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar', room: 'EL-303', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-mon-6', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'K. P. Khandait,P. V. Gulhane', room: 'AIDS-LAB-02', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-mon-7', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar, S. Saba', room: 'AIDS-LAB-01', day: 'Monday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['B3','B4'], color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'aids3b-tue-1', subject: 'OE:1', lecturer: '', room: 'EL-303', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-tue-2', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'K. P. Khandait,P. V. Gulhane', room: 'AIDS-LAB-02', day: 'Tuesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['B3','B4'], color: 'hsl(var(--chart-5))' },
    { id: 'aids3b-tue-2b', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar, S. Saba', room: 'AIDS-LAB-03', day: 'Tuesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['B1','B2'], color: 'hsl(var(--chart-5))' },
    { id: 'aids3b-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-tue-4', subject: 'Earth Science & Project Management', abbreviation: SUBJECT_ABBREVIATIONS['Earth Science & Project Management'], lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-tue-5', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar', room: 'EL-303', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

    // Wednesday
    { id: 'aids3b-wed-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-wed-2', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-wed-3', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar', room: 'EL-303', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-wed-5', subject: 'Earth Science & Project Management', abbreviation: SUBJECT_ABBREVIATIONS['Earth Science & Project Management'], lecturer: 'A. R. Banubakode', room: 'EL-303', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-wed-6', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },

    // Thursday
    { id: 'aids3b-thu-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-thu-2', subject: 'Fundamentals of Economics & Management', abbreviation: SUBJECT_ABBREVIATIONS['Fundamentals of Economics & Management'], lecturer: 'S. S. Narkhede', room: 'EL-303', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids3b-thu-3', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '12:00-01:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-thu-5', subject: 'Big Data Science', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Science'], lecturer: 'Ashwini Gadwe', room: 'EL-302', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-thu-5b', subject: 'Front End Development', lecturer: 'Nirmik Rathod', room: 'EL-303', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-thu-6', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },

    // Friday
    { id: 'aids3b-fri-1', subject: 'Statistical Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Statistical Data Analysis'], lecturer: 'K. R. Satpute', room: 'EL-102', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids3b-fri-2', subject: 'Linear Algebra', abbreviation: SUBJECT_ABBREVIATIONS['Linear Algebra'], lecturer: 'Neha A. Bele', room: 'EL-303', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids3b-fri-3', subject: 'Data Structures', abbreviation: SUBJECT_ABBREVIATIONS['Data Structures'], lecturer: 'P.V.Barekar', room: 'EL-303', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids3b-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids3b-fri-5', subject: 'Big Data Science', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Science'], lecturer: 'Ashwini Gadwe', room: 'EL-302', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-fri-5b', subject: 'Front End Development', lecturer: 'Nirmik Rathod', room: 'EL-303', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids3b-fri-6', subject: 'SPORTS', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '03:00-04:00', type: 'Sports', duration: 2, color: '#E0E0E0' },
];

const AIDS_5_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids5a-mon-1', subject: 'Computer Networks', abbreviation: SUBJECT_ABBREVIATIONS['Computer Networks'], lecturer: 'Amruta B. Pethe, Reena Parteki', room: 'AIDS-LAB-02', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1'], color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-1b', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Sharayu Kharche, Komal Khandare', room: 'AIDS-LAB-05', day: 'Monday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A2'], color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-2', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-mon-3', subject: 'Computer Networks', abbreviation: SUBJECT_ABBREVIATIONS['Computer Networks'], lecturer: 'Amruta B. Pethe', room: 'EL-204', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-3b', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Sharayu Kharche', room: 'EL-303', day: 'Monday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-mon-4', subject: 'Modeling and Simulation', abbreviation: SUBJECT_ABBREVIATIONS['Modeling and Simulation'], lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-mon-5', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-mon-6', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Dr. Kavita R. Singh', room: 'EL-102', day: 'Monday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },

    // Tuesday
    { id: 'aids5a-tue-1', subject: 'Foundation of Machine Learning', abbreviation: SUBJECT_ABBREVIATIONS['Foundation of Machine Learning'], lecturer: 'Dr. Kavita R. Singh', room: 'EL-102', day: 'Tuesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids5a-tue-2', subject: 'Computer Networks', abbreviation: SUBJECT_ABBREVIATIONS['Computer Networks'], lecturer: 'Amruta B. Pethe', room: 'EL-204', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-tue-2b', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Sharayu Kharche', room: 'EL-303', day: 'Tuesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '12:00-01:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-tue-4', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Tuesday', time: '01:00-02:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-tue-5', subject: 'Modeling and Simulation', abbreviation: SUBJECT_ABBREVIATIONS['Modeling and Simulation'], lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-tue-6', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Tuesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-tue-7', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Tuesday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },

    // Wednesday
    { id: 'aids5a-wed-1', subject: 'HELP DESK', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '09:00-10:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-wed-2', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-wed-3', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale, Komal Khandare', room: 'AIDS-LAB-05', day: 'Wednesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-wed-3b', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'R. S. Khangan, Harsha Tembhekar', room: 'AIDS-LAB-01', day: 'Wednesday', time: '11:00-12:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-wed-5', subject: 'Modeling and Simulation', abbreviation: SUBJECT_ABBREVIATIONS['Modeling and Simulation'], lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-wed-6', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Wednesday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-wed-7', subject: 'LIBRARY', lecturer: 'Harsha Tembhekar', room: 'N/A', day: 'Wednesday', time: '04:00-05:00', type: 'Library', duration: 1, color: '#E0E0E0' },

    // Thursday
    { id: 'aids5a-thu-1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Thursday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-thu-2', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Thursday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-thu-3', subject: 'Computer Networks', abbreviation: SUBJECT_ABBREVIATIONS['Computer Networks'], lecturer: 'Amruta B. Pethe', room: 'EL-204', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-thu-3b', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Sharayu Kharche', room: 'CT-LAB-04', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-thu-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-thu-5', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-thu-6', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'R. S. Khangan', room: 'EL-204', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids5a-thu-7', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Thursday', time: '04:00-05:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },

    // Friday
    { id: 'aids5a-fri-1', subject: 'OE:3 IBP', lecturer: 'Snehal Khalatkar', room: 'EL-204', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids5a-fri-2', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale', room: 'EL-204', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-fri-3', subject: 'Theory of Computation and Formal Systems', abbreviation: SUBJECT_ABBREVIATIONS['Theory of Computation and Formal Systems'], lecturer: 'Sneha A. Sahare', room: 'EL-204', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids5a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids5a-fri-5', subject: 'Artificial Intelligence', abbreviation: SUBJECT_ABBREVIATIONS['Artificial Intelligence'], lecturer: 'Prajakta Ingale, P.V.Barekar', room: 'AIDS-LAB-05', day: 'Friday', time: '02:00-03:00', type: 'Practical', duration: 2, batches: ['A3', 'A4'], color: 'hsl(var(--chart-3))' },
    { id: 'aids5a-fri-5b', subject: 'Design and Analysis of Algorithms', abbreviation: SUBJECT_ABBREVIATIONS['Design and Analysis of Algorithms'], lecturer: 'R. S. Khangan, Harsha Tembhekar', room: 'AIDS-LAB-01', day: 'Friday', time: '02:00-03:00', type: 'Practical', duration: 2, batches: ['A1', 'A2'], color: 'hsl(var(--chart-3))' },
];

const AIDS_7_SEM_A_TIMETABLE: TimetableEntry[] = [
    // Monday
    { id: 'aids7a-mon-1', subject: 'Deep Learning', abbreviation: SUBJECT_ABBREVIATIONS['Deep Learning'], lecturer: 'Dr. S. S. Sherekar', room: 'EL-203', day: 'Monday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-mon-2', subject: 'Big Data Homomorphic Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Homomorphic Cryptography'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-203', day: 'Monday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-mon-3', subject: 'Social Network and Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Social Network and Data Analysis'], lecturer: 'Neha Ingole', room: 'EL-211', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-mon-3b', subject: 'Data Warehousing', abbreviation: SUBJECT_ABBREVIATIONS['Data Warehousing'], lecturer: 'Sadaf Ansari', room: 'EL-204', day: 'Monday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-mon-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-mon-5', subject: 'Data Security', abbreviation: SUBJECT_ABBREVIATIONS['Data Security'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-103', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-mon-5b', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Radhika Tekade', room: 'ET-308', day: 'Monday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-mon-6', subject: 'Distributed System', abbreviation: SUBJECT_ABBREVIATIONS['Distributed System'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-102', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-mon-6b', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Akhil Jajulwar', room: 'EL-303', day: 'Monday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-mon-7', subject: 'Help Desk', lecturer: 'N/A', room: 'N/A', day: 'Monday', time: '04:00-05:00', type: 'Help Desk', duration: 1, color: '#E0E0E0' },

    // Tuesday
    { id: 'aids7a-tue-1', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Dr. S. S. Sherekar, Komal Khandare', room: 'AIDS-LAB-01', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-tue-1b', subject: 'High Performance Computing', abbreviation: SUBJECT_ABBREVIATIONS['High Performance Computing'], lecturer: 'Dr. Sanjay P. Pande, S. A. Ghurde', room: 'AIDS-LAB-05', day: 'Tuesday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-tue-2', subject: 'Social Network and Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Social Network and Data Analysis'], lecturer: 'Neha Ingole', room: 'EL-211', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-tue-2b', subject: 'Data Warehousing', abbreviation: SUBJECT_ABBREVIATIONS['Data Warehousing'], lecturer: 'Sadaf Ansari', room: 'EL-204', day: 'Tuesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-tue-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-tue-4', subject: 'Big Data Homomorphic Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Homomorphic Cryptography'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-211', day: 'Tuesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-tue-5', subject: 'Project', lecturer: 'N/A', room: 'N/A', day: 'Tuesday', time: '03:00-04:00', type: 'Practical', duration: 2, color: '#E0E0E0' },

    // Wednesday
    { id: 'aids7a-wed-1', subject: 'Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Cryptography'], lecturer: 'Hrushikesh Panchbudhe', room: 'AG-0213', day: 'Wednesday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-wed-2', subject: 'Data Security', abbreviation: SUBJECT_ABBREVIATIONS['Data Security'], lecturer: 'Dr. Shivkumar Karale', room: 'AG-0213', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-wed-2b', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Radhika Tekade', room: 'EL-211', day: 'Wednesday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-wed-3', subject: 'Social Network and Data Analysis', abbreviation: SUBJECT_ABBREVIATIONS['Social Network and Data Analysis'], lecturer: 'Neha Ingole', room: 'EL-211', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-wed-3b', subject: 'Data Warehousing', abbreviation: SUBJECT_ABBREVIATIONS['Data Warehousing'], lecturer: 'Sadaf Ansari', room: 'ET-204', day: 'Wednesday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-3))' },
    { id: 'aids7a-wed-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Wednesday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-wed-5', subject: 'Deep Learning', abbreviation: SUBJECT_ABBREVIATIONS['Deep Learning'], lecturer: 'Dr. S. S. Sherekar', room: 'EL-211', day: 'Wednesday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
    { id: 'aids7a-wed-6', subject: 'Deep Learning', abbreviation: SUBJECT_ABBREVIATIONS['Deep Learning'], lecturer: 'Dr. S. S. Sherekar, Charvi S. Suri', room: 'AIDS-LAB-01', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-wed-6b', subject: 'Big Data Homomorphic Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Homomorphic Cryptography'], lecturer: 'Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS-LAB-02', day: 'Wednesday', time: '03:00-04:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-2))' },

    // Thursday
    { id: 'aids7a-thu-1', subject: 'Deep Learning', abbreviation: SUBJECT_ABBREVIATIONS['Deep Learning'], lecturer: 'Dr. S. S. Sherekar, Sadaf Ansari', room: 'AIDS-LAB-01', day: 'Thursday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A3','A4'], color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-thu-1b', subject: 'Big Data Homomorphic Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Homomorphic Cryptography'], lecturer: 'Dr. Gendlal M. Vaidya, Dr. Sanjay P. Pande', room: 'AIDS-LAB-02', day: 'Thursday', time: '10:00-11:00', type: 'Practical', duration: 2, batches: ['A1','A2'], color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-thu-2', subject: 'Distributed System', abbreviation: SUBJECT_ABBREVIATIONS['Distributed System'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-thu-2b', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Akhil Jajulwar', room: 'AG-0213', day: 'Thursday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-thu-3', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-thu-4', subject: 'Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Cryptography'], lecturer: 'Hrushikesh Panchbudhe', room: 'EL-203', day: 'Thursday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-thu-5', subject: 'Big Data Homomorphic Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Big Data Homomorphic Cryptography'], lecturer: 'Dr. Gendlal M. Vaidya', room: 'EL-302', day: 'Thursday', time: '03:00-04:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-2))' },
    { id: 'aids7a-thu-6', subject: 'Sports', lecturer: 'N/A', room: 'N/A', day: 'Thursday', time: '04:00-05:00', type: 'Sports', duration: 1, color: '#E0E0E0' },

    // Friday
    { id: 'aids7a-fri-1', subject: 'Distributed System', abbreviation: SUBJECT_ABBREVIATIONS['Distributed System'], lecturer: 'Dr. Shivkumar Karale', room: 'EL-211', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-fri-1b', subject: 'Cloud Computing', abbreviation: SUBJECT_ABBREVIATIONS['Cloud Computing'], lecturer: 'Akhil Jajulwar', room: 'AG-0213', day: 'Friday', time: '10:00-11:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-fri-2', subject: 'Data Security', abbreviation: SUBJECT_ABBREVIATIONS['Data Security'], lecturer: 'Dr. Shivkumar Karale', room: 'AG-0213', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-fri-2b', subject: 'Optimization Technique', abbreviation: SUBJECT_ABBREVIATIONS['Optimization Technique'], lecturer: 'Radhika Tekade', room: 'EL-211', day: 'Friday', time: '11:00-12:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-4))' },
    { id: 'aids7a-fri-3', subject: 'Cryptography', abbreviation: SUBJECT_ABBREVIATIONS['Cryptography'], lecturer: 'Hrushikesh Panchbudhe', room: 'EL-204', day: 'Friday', time: '12:00-01:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-5))' },
    { id: 'aids7a-fri-4', subject: 'Recess', lecturer: 'N/A', room: 'N/A', day: 'Friday', time: '01:00-02:00', type: 'Recess', duration: 1, color: '#E0E0E0' },
    { id: 'aids7a-fri-5', subject: 'Deep Learning', abbreviation: SUBJECT_ABBREVIATIONS['Deep Learning'], lecturer: 'Dr. S. S. Sherekar', room: 'EL-211', day: 'Friday', time: '02:00-03:00', type: 'Lecture', duration: 1, color: 'hsl(var(--chart-1))' },
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

    
