
'use server';
/**
 * @fileOverview An AI flow for generating a complete, conflict-free weekly timetable.
 *
 * - generateTimetable - A function that handles the timetable generation process.
 * - GenerateTimetableInput - The input type for the generateTimetable function.
 * - GenerateTimetableOutput - The return type for the generateTimetable function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { TimetableEntry } from '@/lib/types';

const SubjectInputSchema = z.object({
  name: z.string().describe('The name of the subject.'),
  lecturesPerWeek: z.number().describe('The number of 1-hour lecture sessions required per week.'),
  practicalsPerWeek: z.number().describe('The number of 2-hour practical sessions required per week.'),
  lecturers: z.array(z.string()).describe('A list of lecturers qualified to teach this subject.'),
  batches: z.array(z.string()).optional().describe('The student batches for practicals (e.g., ["A1", "A2"]). Only needed if practicalsPerWeek > 0.'),
});

const GenerateTimetableInputSchema = z.object({
  subjects: z.array(SubjectInputSchema).describe('The list of subjects to be scheduled.'),
  availableClassrooms: z.array(z.string()).describe('A list of available classroom codes.'),
  availableLabs: z.array(z.string()).describe('A list of available lab codes.'),
});
export type GenerateTimetableInput = z.infer<typeof GenerateTimetableInputSchema>;

const TimetableEntrySchema = z.object({
    id: z.string(),
    subject: z.string(),
    lecturer: z.string(),
    room: z.string(),
    day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
    time: z.string(),
    type: z.enum(['Lecture', 'Practical', 'Recess', 'Library', 'Help Desk', 'Sports']),
    duration: z.number().optional(),
    batches: z.array(z.string()).optional(),
    color: z.string().optional(),
});

const GenerateTimetableOutputSchema = z.object({
    timetable: z.array(TimetableEntrySchema).describe("The generated list of timetable entries.")
});
export type GenerateTimetableOutput = {
    timetable: Omit<TimetableEntry, 'id' | 'color'>[];
}

export async function generateTimetable(input: GenerateTimetableInput): Promise<GenerateTimetableOutput> {
  const result = await generateTimetableFlow(input);
  // Ensure the output matches the application's type, even if the Zod schema is slightly different
  return result as GenerateTimetableOutput;
}

const prompt = ai.definePrompt({
  name: 'generateTimetablePrompt',
  input: { schema: GenerateTimetableInputSchema },
  output: { schema: GenerateTimetableOutputSchema },
  prompt: `You are an expert academic scheduler tasked with creating a conflict-free weekly timetable for a college department.

You will be given a list of subjects with their weekly requirements for lectures and practicals, the lecturers who can teach them, and the available classrooms and labs.

Your task is to generate a complete timetable from Monday to Saturday, between 9:00 AM and 5:00 PM.

**Constraints and Rules:**
1.  **Time Slots**: Lectures are 1 hour long. Practicals are 2 hours long.
    - Available 1-hour slots start at: 09:00, 10:00, 11:00, 12:00, 14:00, 15:00, 16:00.
    - The 13:00-14:00 slot is reserved for Recess.
2.  **Scheduling**:
    - Schedule all required lectures and practicals for every subject.
    - For practicals, assign them to a lab from the 'availableLabs' list and specify the batches involved.
    - For lectures, assign them to a classroom from the 'availableClassrooms' list.
3.  **Conflict Resolution (CRITICAL)**:
    - **Lecturer Conflict**: A lecturer cannot be assigned to more than one class at the same time.
    - **Room/Lab Conflict**: A classroom or lab cannot be used for more than one class at the same time.
    - **Batch Conflict**: A student batch cannot be in a lecture and a practical simultaneously.
4.  **Recess**: Add a 'Recess' from 13:00-14:00 every day from Monday to Saturday. For Recess, set subject='Recess', type='Recess', duration=1, lecturer='N/A', and room='N/A'.
5.  **Output Format**:
    - The final output must be a JSON object with a single key "timetable", which is an array of all scheduled class objects.
    - Each class object must conform to the TimetableEntry schema.
    - The 'time' field must be in 'HH:00-HH:00' format (e.g., '09:00-10:00').
    - Generate a unique 'id' for each entry (e.g., 'c1', 'c2', ...).

**Input Data:**
- Subjects: {{{json subjects}}}
- Classrooms: {{{json availableClassrooms}}}
- Labs: {{{json availableLabs}}}

Generate the timetable now.`,
});

const generateTimetableFlow = ai.defineFlow(
  {
    name: 'generateTimetableFlow',
    inputSchema: GenerateTimetableInputSchema,
    outputSchema: GenerateTimetableOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate timetable from AI prompt.");
    }
    return output;
  }
);
