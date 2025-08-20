
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { TimetableEntry } from "@/lib/types";
import { User, Book, MapPin, Users, FlaskConical, Clock, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

type ClassDetailsDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    entries: TimetableEntry[];
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-3">
        <div className="text-muted-foreground mt-0.5">{icon}</div>
        <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    </div>
);

export function ClassDetailsDialog({ 
    isOpen, 
    onOpenChange, 
    entries
}: ClassDetailsDialogProps) {

  const title = entries.length > 1 ? "Parallel Class Details" : "Class Details";
  const description = entries.length > 1 
    ? "The following classes are scheduled in the same time slot."
    : `Details for ${entries[0]?.subject}.`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-2">
            {entries.map((entry, index) => (
                <div key={entry.id}>
                    <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            {entry.type === 'Practical' 
                                ? <FlaskConical className="h-5 w-5 text-primary" /> 
                                : <Book className="h-5 w-5 text-primary" />}
                            <h4 className="font-semibold text-lg text-primary">{entry.subject}</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem icon={<User />} label="Lecturer(s)" value={entry.lecturer || 'N/A'} />
                            <DetailItem icon={<MapPin />} label="Room/Lab" value={entry.room || 'N/A'} />
                            <DetailItem icon={<Calendar />} label="Day" value={entry.day} />
                            <DetailItem icon={<Clock />} label="Time" value={`${entry.time} (${entry.duration || 1}hr)`} />
                        </div>
                        {entry.batches && entry.batches.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Users className="text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Batches</span>
                                </div>
                                <div className="flex flex-wrap gap-2 pl-6">
                                    {entry.batches.map(batch => (
                                        <Badge key={batch} variant="secondary">{batch}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {index < entries.length - 1 && <Separator className="my-6" />}
                </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
ClassDetailsDialog.displayName = "ClassDetailsDialog";
