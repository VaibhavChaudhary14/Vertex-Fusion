'use server';

/**
 * @fileOverview Classifies the system state as 'Benign' or 'Malicious' based on a security score.
 *
 * - classifySystemState - A function that classifies the system state.
 * - ClassifySystemStateInput - The input type for the classifySystemState function.
 * - ClassifySystemStateOutput - The return type for the classifySystemState function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifySystemStateInputSchema = z.object({
  securityScore: z
    .number()
    .describe('The current security score of the system (0-100).'),
});
export type ClassifySystemStateInput = z.infer<typeof ClassifySystemStateInputSchema>;

const ClassifySystemStateOutputSchema = z.object({
  systemState: z
    .enum(['Benign', 'Malicious'])
    .describe('The classification of the system state.'),
  confidence: z.number().describe('The confidence level (0-1) of the classification.'),
});
export type ClassifySystemStateOutput = z.infer<typeof ClassifySystemStateOutputSchema>;

export async function classifySystemState(
  input: ClassifySystemStateInput
): Promise<ClassifySystemStateOutput> {
  return classifySystemStateFlow(input);
}

const classifySystemStatePrompt = ai.definePrompt({
  name: 'classifySystemStatePrompt',
  input: {schema: ClassifySystemStateInputSchema},
  output: {schema: ClassifySystemStateOutputSchema},
  prompt: `You are a security expert analyzing the state of a cyber-physical system.

  Based on the provided security score (0-100), classify the system state as either 'Benign' or 'Malicious'. Also provide a confidence score (0-1) for your classification.

  A score closer to 100 indicates a benign state, while a score closer to 0 indicates a malicious state. Use your best judgement to determine the threshold. A score above 80 is likely 'Benign'. A score below 50 is likely 'Malicious'.

  Security Score: {{{securityScore}}}
  `,
});

const classifySystemStateFlow = ai.defineFlow(
  {
    name: 'classifySystemStateFlow',
    inputSchema: ClassifySystemStateInputSchema,
    outputSchema: ClassifySystemStateOutputSchema,
  },
  async (input: ClassifySystemStateInput) => {
    try {
      // Temporarily disable AI call and use fallback
      // const {output} = await classifySystemStatePrompt(input);
      // if (output) {
      //   return output;
      // }
      throw new Error("AI call disabled");
    } catch (e) {
      const isMalicious = input.securityScore < 60;
      return {
        systemState: isMalicious ? 'Malicious' : 'Benign',
        confidence: isMalicious ? 0.92 : 0.98,
      };
    }
  }
);
