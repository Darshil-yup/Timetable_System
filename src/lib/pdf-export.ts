
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { TimetableEntry } from './types';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];

interface AutoTableDoc extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

const generateGridDataForPdf = (entries: TimetableEntry[], isMasterView: boolean) => {
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

    return grid;
};


export const exportTimetableToPDF = (
    entries: TimetableEntry[], 
    title: string, 
    isMasterView = false
) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a3'
    }) as AutoTableDoc;

    const grid = generateGridDataForPdf(entries, isMasterView);
    
    doc.setFontSize(18);
    doc.text(title, 40, 40);

    const body: (string | { content: string, colSpan: number })[][] = [];

    for (let i = 1; i < grid.length; i++) { // Skip header row
        const rowData = grid[i];
        const newRow: (string | { content: string, colSpan: number })[] = [rowData[0] || '']; // Day
        for (let j = 1; j < rowData.length; j++) {
            if (rowData[j] === "MERGED") {
                continue;
            }

            let colSpan = 1;
            while (j + colSpan < rowData.length && rowData[j + colSpan] === "MERGED") {
                colSpan++;
            }
            
            newRow.push({
                content: rowData[j] || '',
                colSpan: colSpan,
            });
        }
        body.push(newRow);
    }
    
    doc.autoTable({
        head: [grid[0]],
        body: body,
        startY: 60,
        theme: 'grid',
        styles: {
            font: 'helvetica',
            fontSize: 9,
            cellPadding: 8,
            valign: 'middle',
            halign: 'center',
            minCellHeight: 40
        },
        headStyles: {
            fillColor: [22, 163, 74],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 10,
        },
        didParseCell: (data) => {
            if (data.cell.raw && typeof data.cell.raw === 'object' && 'colSpan' in data.cell.raw) {
                data.cell.colSpan = (data.cell.raw as any).colSpan;
            }
        }
    });

    doc.save(`${title.replace(/ /g, '-')}.pdf`);
};
