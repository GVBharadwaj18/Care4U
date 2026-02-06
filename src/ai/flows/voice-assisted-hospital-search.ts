'use server';

/**
 * @fileOverview A voice-assisted hospital search AI agent.
 *
 * - voiceAssistedHospitalSearch - A function that handles the voice-assisted hospital search process.
 * - VoiceAssistedHospitalSearchInput - The input type for the voiceAssistedHospitalSearch function.
 * - VoiceAssistedHospitalSearchOutput - The return type for the voiceAssistedHospitalSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {mockHospitals, mockDoctors} from '@/lib/data';

const hospitalInfoForPrompt = mockHospitals.map(h => ({
    id: h.id,
    name: h.name,
    specialties: h.capabilities.specialties,
    waitTime: h.estimatedWaitTime,
    distance: h.distance,
    isTraumaCenter: h.capabilities.specialties.includes('Trauma'),
    isStrokeCenter: h.capabilities.specialties.includes('Stroke Center'),
    icuBeds: h.capabilities.icuBedsAvailable,
}));

const doctorInfoForPrompt = mockDoctors.map(d => ({
    name: d.name,
    specialty: d.specialty,
    hospitalName: mockHospitals.find(h => h.id === d.hospitalId)?.name,
}));


const VoiceAssistedHospitalSearchInputSchema = z.object({
  spokenCondition: z
    .string()
    .describe("The condition spoken by the user, e.g., 'stroke'"),
});
export type VoiceAssistedHospitalSearchInput = z.infer<
  typeof VoiceAssistedHospitalSearchInputSchema
>;

const VoiceAssistedHospitalSearchOutputSchema = z.object({
  hospitalRecommendations: z
    .string()
    .describe(
      'A structured, conversational response suggesting what to do, which hospitals to go to, and other advice.'
    ),
});
export type VoiceAssistedHospitalSearchOutput = z.infer<
  typeof VoiceAssistedHospitalSearchOutputSchema
>;

export async function voiceAssistedHospitalSearch(
  input: VoiceAssistedHospitalSearchInput
): Promise<VoiceAssistedHospitalSearchOutput> {
  return voiceAssistedHospitalSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceAssistedHospitalSearchPrompt',
  input: {schema: VoiceAssistedHospitalSearchInputSchema},
  output: {schema: VoiceAssistedHospitalSearchOutputSchema},
  prompt: `You are an AI assistant helping caregivers find the nearest hospitals equipped to handle specific medical conditions.
  Your response will be spoken, so it must be calm, conversational, and easy to understand.

  User's spoken condition: "{{{spokenCondition}}}"

  Available Hospitals:
  ${JSON.stringify(hospitalInfoForPrompt, null, 2)}

  Available Specialists (Mock Data):
  ${JSON.stringify(doctorInfoForPrompt, null, 2)}

  Please provide a structured, conversational response following these steps:

  1.  **Start with a calm analysis.** Briefly analyze the symptoms in a reassuring tone.
  2.  **State the urgency and immediate steps.** If the condition sounds serious (like a stroke or heart attack), your first and most important advice is to "consider calling your local emergency number immediately." Then suggest other steps like not driving oneself.
  3.  **Recommend hospitals.** Suggest 1-2 of the most suitable hospitals from the list, explaining *why* they are recommended (e.g., "City General Hospital is a good option because they have a specialized Neurology department and their current wait time is low.").
  4.  **Mention specialists (optional).** If relevant, you can mention that there are specialists in the area, for example: "There are also highly-rated specialists in the area, like Dr. Ben Hanson, who is a neurologist at City General."
  5.  **End with a disclaimer.** Always conclude by reminding the user that "all availability and wait times are estimates."

  Do not state you are an AI assistant. Keep the entire response as a single, spoken paragraph.
  Example for "sudden facial droop and weakness in one arm":
  "Okay, I understand. Those symptoms sound serious and could be related to a stroke, so the most important step is to consider calling your local emergency number immediately. Please do not attempt to drive. Based on the situation, University Trauma Center is the best-equipped facility. It is a certified Stroke Center with neurosurgery specialists on hand. Another good option is St. Jude Regional. For your information, there are specialists like Dr. James Rodriguez in the area who handle these cases. Please remember that all hospital information, including wait times, is an estimate."`,
});

const voiceAssistedHospitalSearchFlow = ai.defineFlow(
  {
    name: 'voiceAssistedHospitalSearchFlow',
    inputSchema: VoiceAssistedHospitalSearchInputSchema,
    outputSchema: VoiceAssistedHospitalSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
