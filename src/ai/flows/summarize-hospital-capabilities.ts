'use server';
/**
 * @fileOverview Summarizes the key capabilities of a hospital.
 *
 * - summarizeHospitalCapabilities - A function that summarizes hospital capabilities.
 * - SummarizeHospitalCapabilitiesInput - The input type for the summarizeHospitalCapabilities function.
 * - SummarizeHospitalCapabilitiesOutput - The return type for the summarizeHospitalCapabilities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHospitalCapabilitiesInputSchema = z.object({
  hospitalName: z.string().describe('The name of the hospital.'),
  availableBeds: z.number().describe('The number of available beds in the hospital.'),
  icuBeds: z.number().describe('The number of available ICU beds in the hospital.'),
  specialties: z.array(z.string()).describe('A list of medical specialties available at the hospital.'),
  hasHelicopterLandingPad: z.boolean().describe('Whether the hospital has a helicopter landing pad.'),
});
export type SummarizeHospitalCapabilitiesInput = z.infer<typeof SummarizeHospitalCapabilitiesInputSchema>;

const SummarizeHospitalCapabilitiesOutputSchema = z.object({
  summary: z.string().describe('A summary of the hospital capabilities.'),
});
export type SummarizeHospitalCapabilitiesOutput = z.infer<typeof SummarizeHospitalCapabilitiesOutputSchema>;

export async function summarizeHospitalCapabilities(input: SummarizeHospitalCapabilitiesInput): Promise<SummarizeHospitalCapabilitiesOutput> {
  return summarizeHospitalCapabilitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHospitalCapabilitiesPrompt',
  input: {schema: SummarizeHospitalCapabilitiesInputSchema},
  output: {schema: SummarizeHospitalCapabilitiesOutputSchema},
  prompt: `Summarize the key capabilities of {{hospitalName}} for emergency care, focusing on available resources and specialties.

  Available Beds: {{availableBeds}}
  ICU Beds: {{icuBeds}}
  Specialties: {{#each specialties}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Helicopter Landing Pad: {{#if hasHelicopterLandingPad}}Yes{{else}}No{{/if}}
  `,
});

const summarizeHospitalCapabilitiesFlow = ai.defineFlow(
  {
    name: 'summarizeHospitalCapabilitiesFlow',
    inputSchema: SummarizeHospitalCapabilitiesInputSchema,
    outputSchema: SummarizeHospitalCapabilitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
