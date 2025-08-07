import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScheduleEntry } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Book, MapPin, Users, FlaskConical, Pencil } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

type TimetableProps = {
  entries: ScheduleEntry[];
  view: 'admin' | 'lecturer';
  isEditMode?: boolean;
  onEdit?: (entry: ScheduleEntry) => void;
};

export function Timetable({ entries, view, isEditMode = false, onEdit = () => {} }: TimetableProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto">
      <div 
        className="grid relative"
        style={{
            gridTemplateColumns: 'minmax(80px, auto) repeat(6, minmax(140px, 1fr))',
            gridTemplateRows: `auto repeat(${TIME_SLOTS.length}, minmax(100px, auto))`
        }}
      >
        {/* Empty corner */}
        <div className="p-2 border-r border-b font-semibold bg-muted/50 sticky top-0 left-0 z-20"></div>

        {/* Day Headers */}
        {DAYS.map((day) => (
          <div key={day} className="p-3 text-center border-r border-b font-bold text-foreground bg-muted/50 sticky top-0 z-10">
            {day}
          </div>
        ))}

        {/* Time Slots and Grid Background */}
        {TIME_SLOTS.map((time, timeIndex) => (
          <React.Fragment key={time}>
            <div 
              className="p-2 text-center text-sm font-semibold text-muted-foreground border-r border-b flex items-center justify-center sticky left-0 bg-muted/50 z-10"
              style={{ gridRow: timeIndex + 2, gridColumn: 1 }}
            >
              {time}
            </div>
            {DAYS.map((day, dayIndex) => (
              <div 
                key={`${day}-${time}`} 
                className="border-r border-b"
                style={{ gridRow: timeIndex + 2, gridColumn: dayIndex + 2 }}
              ></div>
            ))}
          </React.Fragment>
        ))}


        {/* Schedule Entries */}
        {entries.map((entry) => {
          const dayIndex = DAYS.indexOf(entry.day);
          const timeIndex = TIME_SLOTS.indexOf(entry.time);
          const duration = entry.duration || 1;

          if (dayIndex === -1 || timeIndex === -1) {
            return null;
          }

          const cardStyle = {
            backgroundColor: entry.color ? `${entry.color}1A` : 'hsl(var(--primary-light))', // Use color with opacity
            borderColor: entry.color || 'hsl(var(--primary))',
          };
          
          const titleStyle = {
             color: entry.color || 'hsl(var(--primary))',
          }

          const iconStyle = {
             color: entry.color ? `${entry.color}CC` : 'hsl(var(--primary-light))',
          }

          return (
            <div
              key={entry.id}
              className="p-1"
              style={{
                gridColumnStart: dayIndex + 2,
                gridRowStart: timeIndex + 2,
                gridRowEnd: `span ${duration}`,
              }}
              onClick={() => isEditMode && onEdit(entry)}
            >
                <Card 
                  className={cn(
                    "h-full w-full hover:shadow-lg transition-shadow duration-300 flex flex-col relative",
                    isEditMode && "cursor-pointer hover:border-primary"
                  )}
                  style={cardStyle}
                >
                  <CardHeader className="p-2">
                    <CardTitle className="text-sm font-bold flex items-center gap-2" style={titleStyle}>
                      {entry.type === 'Practical' ? <FlaskConical className="h-4 w-4 shrink-0" /> : <Book className="h-4 w-4 shrink-0" />}
                      <span>{entry.subject}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 text-xs text-foreground/80 space-y-1 flex-grow">
                    {view === 'admin' && (
                      <div className="flex items-start gap-2">
                        <User className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle}/>
                        <span>{entry.lecturer}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle}/>
                      <span>Room: {entry.room}</span>
                    </div>
                    {entry.batches && entry.batches.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="h-3 w-3 shrink-0 mt-0.5" style={iconStyle}/>
                        <span>Batches: {entry.batches.join(', ')}</span>
                      </div>
                    )}
                  </CardContent>
                   {isEditMode && (
                      <div className="absolute top-1 right-1 p-1 bg-background/80 rounded-full">
                          <Pencil className="h-4 w-4 text-primary" />
                      </div>
                    )}
                </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
