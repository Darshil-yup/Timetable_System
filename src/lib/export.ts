
import * as XLSX from 'xlsx';
import type { TimetableEntry } from './types';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

export const generateGridData = (entries: TimetableEntry[], isMasterView: boolean): (string | null)[][] => {
    const header = ["Day/Time", ...TIME_SLOTS];
    const grid: (string | null)[][] = [
      header,
      ...DAYS.map(day => [day, ...Array(TIME_SLOTS.length).fill(null)])
    ];
    
    const placedEntries = new Set<string>();

    entries.forEach(entry => {
        if (placedEntries.has(entry.id)) return;

        const dayIndex = DAYS.indexOf(entry.day);
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
        if (dayIndex === -1 || timeIndex === -1) return;

        const duration = entry.duration || 1;
        
        // Find all entries in the same time slot to group them (for parallel classes)
        const group = entries.filter(e => 
          e.day === entry.day && 
          e.time === entry.time &&
          (e.duration || 1) === duration
        );
        
        const cellContent = group.map(g => {
            const subject = g.type === 'Practical' ? `LAB: ${g.subject}` : g.subject;
            const room = g.room;
            const lecturer = isMasterView ? g.lecturer : undefined;
            const batches = g.batches?.join(', ');
            return [subject, lecturer, room, batches].filter(Boolean).join('\n');
        }).join('\n---\n');
        
        if (grid[dayIndex + 1][timeIndex + 1] === null) {
            grid[dayIndex + 1][timeIndex + 1] = cellContent;
            group.forEach(g => placedEntries.add(g.id));

            for (let i = 1; i < duration; i++) {
                if (timeIndex + 1 + i < grid[0].length) {
                    grid[dayIndex + 1][timeIndex + 1 + i] = "MERGED";
                }
            }
        }
    });

    return grid.map(row => row.map(cell => cell === "MERGED" ? "" : cell));
};

export const handleExportXLSX = (entries: TimetableEntry[], filename: string, isMasterView: boolean) => {
    const grid = generateGridData(entries, isMasterView);
    const worksheet = XLSX.utils.aoa_to_sheet(grid);

    const columnWidths = [ { wch: 15 }, ...TIME_SLOTS.map(() => ({ wch: 25 })) ];
    worksheet['!cols'] = columnWidths;

    for (let C = 0; C < grid[0].length; ++C) {
        const cellAddress = XLSX.utils.encode_cell({c: C, r: 0});
        if(worksheet[cellAddress]) {
            worksheet[cellAddress].s = { font: { bold: true }, alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
        }
    }
    
    for(let R = 1; R < grid.length; ++R) {
        for(let C = 0; C < grid[R].length; ++C) {
            const cellAddress = XLSX.utils.encode_cell({c: C, r: R});
            if(worksheet[cellAddress]) {
                 worksheet[cellAddress].s = { alignment: { wrapText: true, vertical: 'top', horizontal: 'center' } };
            }
        }
    }

    worksheet['!merges'] = [];
    const placedMerges = new Set<string>();
    entries.forEach(entry => {
        const dayIndex = DAYS.indexOf(entry.day) + 1;
        const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0])) + 1;
        const mergeKey = `${dayIndex}-${timeIndex}`;
        
        if (dayIndex > 0 && timeIndex > 0 && entry.duration && entry.duration > 1) {
            if (!placedMerges.has(mergeKey)) {
                worksheet['!merges']?.push({ s: { r: dayIndex, c: timeIndex }, e: { r: dayIndex, c: timeIndex + entry.duration - 1 } });
                placedMerges.add(mergeKey);
            }
        }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const handleExportCSV = (entries: TimetableEntry[], filename: string, isMasterView: boolean) => {
    const grid = generateGridData(entries, isMasterView);
    const csvContent = grid.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
