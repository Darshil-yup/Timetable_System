
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimetableEntry, SpecialClassType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Book, MapPin, Users, FlaskConical, Library, HelpCircle, Dumbbell, Coffee } from "lucide-react";
import { ScrollArea } from '@/components/ui/scroll-area';

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

const SpecialCardContent = React.memo(({ entry }: { entry: TimetableEntry }) => {
    const ICONS: Record<SpecialClassType, React.ReactNode> = {
        'Recess': <Coffee className="h-8 w-8 text-muted-foreground" />,
        'Library': <Library className="h-8 w-8 text-muted-foreground" />,
        'Help Desk': <HelpCircle className="h-8 w-8 text-muted-foreground" />,
        'Sports': <Dumbbell className="h-8 w-8 text-muted-foreground" />,
    }
    const icon = ICONS[entry.type as SpecialClassType] || <Book className="h-8 w-8 text-muted-foreground" />;

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-2 gap-2">
            {icon}
            <span className="font-semibold text-sm text-muted-foreground tracking-wider">{entry.subject}</span>
        </div>
    );
});
SpecialCardContent.displayName = 'SpecialCardContent';

const ClassCard = React.memo(({ entry, isEditMode, onEdit, isHighlighted, isConflicting, onClick }: {
  entry: TimetableEntry;
  isEditMode?: boolean;
  onEdit?: (entry: TimetableEntry) => void;
  isHighlighted?: boolean;
  isConflicting?: boolean;
  onClick?: () => void;
}) => {
  const isSpecial = SPECIAL_TYPES.includes(entry.type as SpecialClassType);

  const cardStyle = isSpecial ? {
    backgroundColor: 'hsl(var(--muted))'
  } : {
    backgroundColor: entry.color ? `${entry.color}1A` : 'hsl(var(--card))',
    borderColor: entry.color || 'hsl(var(--border))',
  };

  const titleStyle = {
    color: entry.color || 'hsl(var(--primary))',
  }

  const iconStyle = {
    color: entry.color ? `${entry.color}CC` : 'hsl(var(--muted-foreground))',
  }

  const handleEditClick = () => {
    if (onClick) {
        onClick();
    } else if (isEditMode && onEdit) {
      onEdit(entry);
    }
  };
  
  const subjectPrefix = entry.type === 'Practical' && !entry.subject.toLowerCase().startsWith('lab:') ? 'LAB: ' : '';


  const cardContent = isSpecial ? (
    <SpecialCardContent entry={entry} />
  ) : (
    <>
      <CardHeader className="p-2 md:p-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2" style={titleStyle}>
          {entry.type === 'Practical' ? <FlaskConical className="h-4 w-4 shrink-0" /> : <Book className="h-4 w-4 shrink-0" />}
          <span className="truncate">{subjectPrefix}{entry.subject}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 md:p-3 text-xs text-foreground/80 space-y-1 flex-grow overflow-hidden">
        <div className="flex items-start gap-2">
          <User className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle} />
          <span className="truncate">{entry.lecturer}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle} />
          <span className="truncate">Room: {entry.room}</span>
        </div>
        {entry.batches && entry.batches.length > 0 && (
          <div className="flex items-start gap-2">
            <Users className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle} />
            <span className="truncate">Batches: {Array.isArray(entry.batches) ? entry.batches.join(', ') : entry.batches}</span>
          </div>
        )}
      </CardContent>
    </>
  );

  return (
    <Card
      className={cn(
        "h-full w-full hover:shadow-lg transition-shadow duration-300 flex flex-col relative",
        isEditMode && "cursor-pointer hover:border-primary",
        isHighlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        isConflicting && isEditMode && "ring-2 ring-destructive ring-offset-2 ring-offset-background",
        isSpecial && "bg-muted/80"
      )}
      style={cardStyle}
      onClick={handleEditClick}
    >
        {cardContent}
    </Card>
  );
});
ClassCard.displayName = 'ClassCard';

interface TimetableProps {
    entries: TimetableEntry[];
    view: 'admin' | 'lecturer';
    isEditMode?: boolean;
    onEdit?: (entry: TimetableEntry) => void;
    highlightedLecturer?: string;
    conflictingIds?: Set<string>;
}

export const Timetable = React.memo(React.forwardRef<HTMLDivElement, TimetableProps>(({ entries, isEditMode, onEdit, highlightedLecturer, conflictingIds = new Set() }, ref) => {
   if (!entries || entries.length === 0) {
    return (
       <div ref={ref} className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground">No classes scheduled for this view.</p>
        </div>
    )
  }

  const gridData: (TimetableEntry | TimetableEntry[])[][] = DAYS.map(() => Array(TIME_SLOTS.length).fill(null));
  const placedEntries = new Set<string>();

  entries.forEach(entry => {
    if (placedEntries.has(entry.id)) return;

    const dayIndex = DAYS.indexOf(entry.day);
    const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
    
    if (dayIndex === -1 || timeIndex === -1) return;

    const key = `${entry.day}-${entry.time}`;
    const group = entries.filter(e => e.day === entry.day && e.time === entry.time);

    if (gridData[dayIndex][timeIndex] === null) {
      gridData[dayIndex][timeIndex] = group.length > 1 ? group : entry;
    }

    const duration = entry.duration || 1;
    for (let i = 0; i < duration; i++) {
        const currentSlotIndex = timeIndex + i;
        if (currentSlotIndex < TIME_SLOTS.length) {
            const currentKey = `${entry.day}-${TIME_SLOTS[currentSlotIndex]}`;
            const entriesInSlot = entries.filter(e => e.day === entry.day && e.time === TIME_SLOTS[currentSlotIndex]);
            entriesInSlot.forEach(e => placedEntries.add(e.id));
        }
    }
  });


  return (
    <div ref={ref} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `minmax(100px, auto) repeat(${TIME_SLOTS.length}, minmax(150px, 1fr))`,
          gridTemplateRows: `auto repeat(${DAYS.length}, minmax(130px, auto))`
        }}
      >
        {/* Empty corner */}
        <div className="p-2 border-r border-b font-semibold bg-muted/50 sticky top-0 left-0 z-20"></div>

        {/* Time Headers */}
        {TIME_SLOTS.map((time) => (
             <div key={time} className="p-3 text-center border-r border-b font-bold text-foreground bg-muted/50 sticky top-0 z-10">
                {time}
            </div>
        ))}

        {/* Day Headers and Grid Cells */}
        {DAYS.map((day, dayIndex) => (
          <React.Fragment key={day}>
            <div
              className="p-2 text-sm font-semibold text-muted-foreground border-r border-b flex items-center justify-center sticky left-0 bg-muted/50 z-10"
              style={{ gridRow: dayIndex + 2, gridColumn: 1 }}
            >
              {day}
            </div>
             {gridData[dayIndex].map((cellData, timeIndex) => {
                if (!cellData) {
                    return (
                        <div
                            key={`${day}-${timeIndex}`}
                            className="border-r border-b"
                            style={{ gridRow: dayIndex + 2, gridColumn: timeIndex + 2 }}
                        />
                    );
                }
                
                if (Array.isArray(cellData)) { // Grouped entries
                    const group = cellData;
                    const duration = Math.max(...group.map(e => e.duration || 1));
                    const combinedEntry: TimetableEntry = {
                        id: group.map(e => e.id).join('/'),
                        subject: group.map(e => e.subject).join(' / '),
                        lecturer: group.map(e => e.lecturer).join(' / '),
                        room: group.map(e => e.room).join(' / '),
                        day: group[0].day,
                        time: group[0].time,
                        type: group[0].type, // Assuming same type for combined view
                        duration,
                        batches: group.map(e => e.batches?.join(', ')).join(' / '),
                        color: group[0].color,
                    };
                    const isConflicting = group.some(e => conflictingIds.has(e.id));
                     const isHighlighted = highlightedLecturer ? group.some(e => e.lecturer.includes(highlightedLecturer)) : false;

                    return (
                        <div
                            key={combinedEntry.id}
                            className="border-r border-b p-1 relative"
                            style={{
                                gridRow: `${dayIndex + 2}`,
                                gridColumn: `${timeIndex + 2} / span ${duration}`,
                            }}
                        >
                          <ClassCard
                            entry={combinedEntry}
                            isEditMode={isEditMode}
                            onEdit={isEditMode ? () => onEdit?.(group[0]) : undefined} // open first one
                            onClick={isEditMode ? () => onEdit?.(group[0]) : undefined}
                            isHighlighted={isHighlighted}
                            isConflicting={isConflicting}
                          />
                        </div>
                    )
                }
                
                // Single entry
                const entry = cellData as TimetableEntry;
                return (
                    <div
                      key={entry.id}
                      className="border-r border-b p-1 relative"
                      style={{
                        gridRow: `${dayIndex + 2}`,
                        gridColumn: `${timeIndex + 2} / span ${entry.duration || 1}`,
                      }}
                    >
                      <ClassCard
                        entry={entry}
                        isEditMode={isEditMode}
                        onEdit={onEdit}
                        isHighlighted={highlightedLecturer ? entry.lecturer.includes(highlightedLecturer) : false}
                        isConflicting={conflictingIds.has(entry.id)}
                      />
                    </div>
                )
             })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}));
Timetable.displayName = 'Timetable';
