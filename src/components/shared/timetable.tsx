
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimetableEntry, SpecialClassType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Book, MapPin, Users, FlaskConical, Clock, Library, HelpCircle, Dumbbell, Coffee } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00"];
const SPECIAL_TYPES: SpecialClassType[] = ['Recess', 'Library', 'Help Desk', 'Sports'];

const SpecialCard = React.memo(({ entry }: { entry: TimetableEntry }) => {
    const ICONS: Record<SpecialClassType, React.ReactNode> = {
        'Recess': <Coffee className="h-8 w-8 text-muted-foreground" />,
        'Library': <Library className="h-8 w-8 text-muted-foreground" />,
        'Help Desk': <HelpCircle className="h-8 w-8 text-muted-foreground" />,
        'Sports': <Dumbbell className="h-8 w-8 text-muted-foreground" />,
    }
    const icon = ICONS[entry.type as SpecialClassType] || <Book className="h-8 w-8 text-muted-foreground" />;

    return (
        <div className="h-full w-full rounded-lg bg-muted/80 flex flex-col items-center justify-center p-2 gap-2">
            {icon}
            <span className="font-semibold text-sm text-muted-foreground tracking-wider">{entry.subject}</span>
        </div>
    );
});
SpecialCard.displayName = 'SpecialCard';

const ClassCard = React.memo(({ entry, isEditMode, onEdit, isHighlighted }: {
  entry: TimetableEntry;
  isEditMode?: boolean;
  onEdit?: (entry: TimetableEntry) => void;
  isHighlighted?: boolean;
}) => {
  const cardStyle = {
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
    if (isEditMode && onEdit) {
      onEdit(entry);
    }
  };

  if (SPECIAL_TYPES.includes(entry.type as SpecialClassType)) {
      return <SpecialCard entry={entry} />;
  }

  return (
    <Card
      className={cn(
        "h-full w-full hover:shadow-lg transition-shadow duration-300 flex flex-col relative",
        isEditMode && "cursor-pointer hover:border-primary",
        isHighlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
      style={cardStyle}
      onClick={handleEditClick}
    >
      <CardHeader className="p-2 md:p-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2" style={titleStyle}>
          {entry.type === 'Practical' ? <FlaskConical className="h-4 w-4 shrink-0" /> : <Book className="h-4 w-4 shrink-0" />}
          <span className="truncate">{entry.subject}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 md:p-3 text-xs text-foreground/80 space-y-1 flex-grow overflow-hidden">
        <div className="flex items-start gap-2">
          <Clock className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle} />
          <span>{entry.time}</span>
        </div>
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
            <span className="truncate">Batches: {entry.batches.join(', ')}</span>
          </div>
        )}
      </CardContent>
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
}

export const Timetable = React.forwardRef<HTMLDivElement, TimetableProps>(({ entries, isEditMode, onEdit, highlightedLecturer }, ref) => {
   if (!entries || entries.length === 0) {
    return (
       <div ref={ref} className="flex flex-col items-center justify-center h-64 border rounded-lg bg-card text-card-foreground shadow-sm">
          <p className="text-muted-foreground">No classes scheduled for this view.</p>
        </div>
    )
  }

  return (
    <div ref={ref} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto">
      <div
        className="grid relative"
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

        {/* Day Headers and Grid Background */}
        {DAYS.map((day, dayIndex) => (
          <React.Fragment key={day}>
            <div
              className="p-2 text-sm font-semibold text-muted-foreground border-r border-b flex items-center justify-center sticky left-0 bg-muted/50 z-10"
              style={{ gridRow: dayIndex + 2, gridColumn: 1 }}
            >
              {day}
            </div>
             {TIME_SLOTS.map((time, timeIndex) => (
                <div
                  key={`${day}-${time}`}
                  className="border-r border-b"
                  style={{ gridRow: dayIndex + 2, gridColumn: timeIndex + 2 }}
                ></div>
              ))}
          </React.Fragment>
        ))}

        {/* Timetable Entries */}
        {entries.map((entry) => {
          const dayIndex = DAYS.indexOf(entry.day);
          const timeIndex = TIME_SLOTS.findIndex(slot => slot.startsWith(entry.time.split('-')[0]));
          
          if (dayIndex === -1 || timeIndex === -1) {
            return null;
          }

          return (
            <div
              key={entry.id}
              className="p-1"
              style={{
                gridRow: dayIndex + 2,
                gridColumn: `${timeIndex + 2} / span ${entry.duration || 1}`,
              }}
            >
               <ClassCard 
                  entry={entry} 
                  isEditMode={isEditMode} 
                  onEdit={onEdit} 
                  isHighlighted={highlightedLecturer ? entry.lecturer.includes(highlightedLecturer) : false} 
                />
            </div>
          );
        })}
      </div>
    </div>
  )
});
Timetable.displayName = 'Timetable';

    