'use server';

/**
 * @fileOverview A personal AI assistant that recommends hospitals based on symptoms.
 *
 * - findHospitalsBySymptoms - A function that takes symptoms and returns hospital recommendations.
 * - SymptomBasedHospitalFinderInput - The input type for the findHospitalsBySymptoms function.
 * - SymptomBasedHospitalFinderOutput - The return type for the findHospitalsBySymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {mockHospitals, mockDoctors} from '@/lib/data';

// Create a simplified version of the hospital data for the prompt to save tokens and focus the model.
const hospitalInfoForPrompt = mockHospitals.map(h => ({
    id: h.id,
    name: h.name,
    specialties: h.capabilities.specialties,
    waitTime: h.estimatedWaitTime,
    distance: h.distance,
    isTraumaCenter: h.capabilities.specialties.includes('Trauma'),
    isStrokeCenter: h.capabilities.specialties.includes('Stroke Center'),
    icuBeds: h.capabilities.icuBedsAvailable,
    operatingRooms: h.capabilities.operatingRoomsAvailable,
}));

const doctorInfoForPrompt = mockDoctors.map(d => ({
    name: d.name,
    specialty: d.specialty,
    hospitalName: mockHospitals.find(h => h.id === d.hospitalId)?.name,
    successRate: d.successRate,
    experience: d.experienceYears,
}));

const SymptomBasedHospitalFinderInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user, e.g., "chest pain radiating to left arm".'),
});
export type SymptomBasedHospitalFinderInput = z.infer<typeof SymptomBasedHospitalFinderInputSchema>;

const SymptomBasedHospitalFinderOutputSchema = z.object({
    analysis: z.string().describe("A brief, calm, and reassuring analysis of the symptoms and what kind of care might be needed."),
    urgency: z.enum(['low', 'medium', 'high', 'critical', 'clarification-needed']).describe("An assessment of the medical urgency. If symptoms are vague or minor, use 'clarification-needed' and ask questions."),
    suggestedSteps: z.array(z.string()).optional().describe("A list of immediate, actionable steps the user or caregiver should take. For critical or high urgency, the first step should always be to consider calling emergency services."),
    recommendedHospitals: z.array(z.object({
        hospitalId: z.string().describe("The ID of the recommended hospital, matching one from the provided list."),
        reason: z.string().describe("A concise reason for why this hospital is a good choice for the given symptoms."),
    })).max(3).optional().describe("A list of up to 3 recommended hospitals. This should be omitted if asking clarifying questions."),
    recommendedDoctors: z.array(z.object({
        name: z.string().describe("The name of the recommended doctor."),
        specialty: z.string().describe("The doctor's specialty."),
        hospitalName: z.string().describe("The hospital where the doctor practices."),
        reason: z.string().describe("A brief reason for the recommendation based on their specialty and mock success rate/experience.")
    })).max(2).optional().describe("An optional list of up to 2 recommended specialists. This should be omitted if asking clarifying questions."),
    clarifyingQuestions: z.array(z.string()).optional().describe("A list of questions to ask the user if the symptoms are vague or seem minor, to rule out serious conditions.")
});
export type SymptomBasedHospitalFinderOutput = z.infer<typeof SymptomBasedHospitalFinderOutputSchema>;


export async function findHospitalsBySymptoms(input: SymptomBasedHospitalFinderInput): Promise<SymptomBasedHospitalFinderOutput> {
  return symptomBasedHospitalFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomBasedHospitalFinderPrompt',
  input: {schema: SymptomBasedHospitalFinderInputSchema},
  output: {schema: SymptomBasedHospitalFinderOutputSchema},
  prompt: `You are an AI assistant for Care4U. Your role is to help users find suitable medical care based on their symptoms, with a calm, reassuring, and clear tone.
  You are given a list of symptoms, a list of nearby hospitals with their capabilities, and a list of top doctors.

  User Symptoms: "{{{symptoms}}}"

  Available Hospitals:
  ${JSON.stringify(hospitalInfoForPrompt, null, 2)}

  Available Doctors (mock data):
  ${JSON.stringify(doctorInfoForPrompt, null, 2)}

  Follow these steps precisely:

  1.  **Analyze Symptoms & Urgency**:
      - First, analyze the user's symptoms to identify potential medical conditions.
      - **CRITICAL RULE**: If the symptoms are vague, very minor, or could be either a simple issue or a sign of something serious (e.g., a simple headache vs. a migraine with aura), your primary goal is to gather more information. In this case:
          - Set the 'urgency' to 'clarification-needed'.
          - Provide a brief 'analysis' explaining that more information would be helpful.
          - Populate the 'clarifyingQuestions' array with 2-3 specific questions to help determine the severity (e.g., "Is the headache accompanied by vision changes or numbness?").
          - **DO NOT** provide 'suggestedSteps', 'recommendedHospitals', or 'recommendedDoctors'.
      - If the symptoms clearly point to a specific level of urgency ('low', 'medium', 'high', 'critical'), proceed to the next steps.

  2.  **Provide Recommendations (if not asking questions)**:
      - **Generate Suggested Steps**: Provide a short, numbered list of actionable next steps in 'suggestedSteps'. If urgency is 'high' or 'critical', the VERY FIRST step MUST be "Call your local emergency number (e.g., 911) immediately."
      - **Recommend Hospitals**: Recommend up to 3 hospitals from the list in 'recommendedHospitals'. Prioritize relevant specialties, then wait times. Only recommend hospitals from the list.
      - **Recommend Doctors (Optional)**: If a clear specialty is identified, recommend 1-2 doctors from the list in 'recommendedDoctors'. Base the recommendation on specialty and mock data (like success rate and experience).

  3.  **Format**: Your entire response must be in the specified JSON format. Do not include any other text or explanations outside of the JSON structure.
  `,
});

const symptomBasedHospitalFinderFlow = ai.defineFlow(
  {
    name: 'symptomBasedHospitalFinderFlow',
    inputSchema: SymptomBasedHospitalFinderInputSchema,
    outputSchema: SymptomBasedHospitalFinderOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);
