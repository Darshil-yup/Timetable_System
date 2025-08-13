
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useTimetableData } from '@/hooks/use-timetable-data';
import { useTimetables } from '@/context/TimetableContext';
import { TimetableSelector } from '@/components/admin/timetable-selector';
import { Skeleton } from '@/components/ui/skeleton';
import { LabView } from '@/components/admin/lab-view';
import { useToast } from '@/hooks/use-toast';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function LabsPage() {
    const { timetables: timetableMetadatas, loading: metadataLoading, mutate: mutateMetadatas } = useTimetableData();
    const { setActiveTimetable } = useTimetables();
    const { toast } = useToast();

    const [selectedTimetableId, setSelectedTimetableId] = useState('');
    const { timetable: activeTimetableData, loading: timetableLoading } = useTimetableData(selectedTimetableId);

    useEffect(() => {
        if (activeTimetableData) {
            setActiveTimetable(activeTimetableData);
        }
    }, [activeTimetableData, setActiveTimetable]);

    useEffect(() => {
        if (!metadataLoading && timetableMetadatas && timetableMetadatas.length > 0 && !selectedTimetableId) {
            setSelectedTimetableId(timetableMetadatas[0].id);
        }
    }, [timetableMetadatas, metadataLoading, selectedTimetableId]);

    const handleSelectTimetable = useCallback((id: string) => {
        setSelectedTimetableId(id);
    }, []);
    
    const handleCreateTimetable = async (name: string, year: string): Promise<string | null> => {
        toast({ title: 'Read-only View', description: 'Please go to the Master Timetable to create timetables.', variant: 'default' });
        return null;
    };
    
    const handleDeleteTimetable = async (id: string) => {
        try {
          const timetableToDelete = timetableMetadatas?.find(t => t.id === id);
          if (!timetableToDelete) return;
          await deleteDoc(doc(db, "timetables", id));
          toast({ title: "Timetable Deleted", description: `The timetable for "${timetableToDelete.name}" has been deleted.`, variant: "destructive" });
          
          const updatedMetadatas = timetableMetadatas?.filter(t => t.id !== id) || [];
          mutateMetadatas(updatedMetadatas, false);

          if (updatedMetadatas.length > 0) {
              setSelectedTimetableId(updatedMetadatas[0].id);
          } else {
              setSelectedTimetableId('');
          }
        } catch (error) {
          console.error("Error deleting timetable: ", error);
           toast({ title: 'Error Deleting Timetable', description: 'There was a problem deleting the timetable.', variant: 'destructive' });
           mutateMetadatas();
        }
    };


    if (metadataLoading) {
        return (
            <div className="container mx-auto p-8 space-y-8">
                <Skeleton className="h-10 w-full max-w-lg ml-auto" />
                <Skeleton className="h-[600px] w-full" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-8">
            <TimetableSelector
                timetables={timetableMetadatas || []}
                selectedTimetableId={selectedTimetableId}
                onSelectTimetable={handleSelectTimetable}
                onCreateTimetable={handleCreateTimetable}
                onDeleteTimetable={handleDeleteTimetable}
                isReadOnly
            />
            <LabView 
                activeTimetable={activeTimetableData} 
                isLoading={timetableLoading}
            />
        </div>
    );
}

    