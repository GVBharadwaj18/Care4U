'use server';

/**
 * @fileOverview This file defines the adaptive voice interface flow for Care4U.
 *
 * The flow personalizes voice assistant responses based on user history and medical conditions.
 * Exports:
 *   - `adaptiveVoiceInterface`: The main function to trigger the voice assistant flow.
 *   - `AdaptiveVoiceInterfaceInput`: The input type for the `adaptiveVoiceInterface` function.
 *   - `AdaptiveVoiceInterfaceOutput`: The output type for the `adaptiveVoiceInterface` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveVoiceInterfaceInputSchema = z.object({
  query: z.string().describe('The user query or voice input.'),
  userId: z.string().describe('The ID of the user making the request.'),
});
export type AdaptiveVoiceInterfaceInput = z.infer<typeof AdaptiveVoiceInterfaceInputSchema>;

const AdaptiveVoiceInterfaceOutputSchema = z.object({
  response: z.string().describe('The personalized response from the voice assistant.'),
});
export type AdaptiveVoiceInterfaceOutput = z.infer<typeof AdaptiveVoiceInterfaceOutputSchema>;

export async function adaptiveVoiceInterface(input: AdaptiveVoiceInterfaceInput): Promise<AdaptiveVoiceInterfaceOutput> {
  return adaptiveVoiceInterfaceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveVoiceInterfacePrompt',
  input: {schema: AdaptiveVoiceInterfaceInputSchema},
  output: {schema: AdaptiveVoiceInterfaceOutputSchema},
  prompt: `You are an adaptive voice assistant for Care4U, designed to provide personalized support during medical emergencies.

You have access to the user's medical history and past interactions to provide tailored responses.

User ID: {{{userId}}}
Query: {{{query}}}

Response:`, // Placeholder - implement actual adaptive logic here (e.g., fetch user data)
});

const adaptiveVoiceInterfaceFlow = ai.defineFlow(
  {
    name: 'adaptiveVoiceInterfaceFlow',
    inputSchema: AdaptiveVoiceInterfaceInputSchema,
    outputSchema: AdaptiveVoiceInterfaceOutputSchema,
  },
  async input => {
    // TODO: Implement logic to fetch user medical history and past interactions
    // and adapt the prompt based on this information.
    const {output} = await prompt(input);
    return output!;
  }
);
