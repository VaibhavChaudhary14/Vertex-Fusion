'use server';

/**
 * @fileOverview A flow that simulates the GNN-based attack detection and updates the security score in real-time.
 *
 * - getSecurityScore - A function that returns a security score based on the current system state.
 * - SecurityScoreInput - The input type for the getSecurityScore function.
 * - SecurityScoreOutput - The return type for the getSecurityScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecurityScoreInputSchema = z.object({
  isUnderAttack: z
    .boolean()
    .describe('Whether the system is currently under attack.'),
});
export type SecurityScoreInput = z.infer<typeof SecurityScoreInputSchema>;

const SecurityScoreOutputSchema = z.object({
  securityScore: z
    .number()
    .describe(
      'The current security score of the system, ranging from 0 to 100. The score should drop when an attack is detected.'
    ),
  systemState: z
    .enum(['Benign', 'Malicious'])
    .describe('The current state of the system: Benign or Malicious.'),
});
export type SecurityScoreOutput = z.infer<typeof SecurityScoreOutputSchema>;

export async function getSecurityScore(input: SecurityScoreInput): Promise<SecurityScoreOutput> {
  return securityScoreFlow(input);
}

const securityScorePrompt = ai.definePrompt({
  name: 'securityScorePrompt',
  input: {schema: SecurityScoreInputSchema},
  output: {schema: SecurityScoreOutputSchema},
  prompt: `You are a security expert monitoring a cyber-physical power grid.
Based on whether the system is under attack ({{{isUnderAttack}}}), determine the security score and system state.

If the system is under attack, the security score should decrease significantly (e.g., between 20-50), and the system state should be Malicious.
If the system is not under attack, the security score should be high (e.g., between 95-100), and the system state should be Benign.

Return the security score as a number between 0 and 100.
`,
});

const securityScoreFlow = ai.defineFlow(
  {
    name: 'securityScoreFlow',
    inputSchema: SecurityScoreInputSchema,
    outputSchema: SecurityScoreOutputSchema,
  },
  async (input: SecurityScoreInput) => {
    try {
      // Temporarily disable AI call and use fallback
      // const {output} = await securityScorePrompt(input);
      // if (output) {
      //   return output;
      // }
      throw new Error("AI call disabled");
    } catch (e) {
      // Fallback logic
      const isUnderAttack = input.isUnderAttack;
      return {
        systemState: isUnderAttack ? 'Malicious' : 'Benign',
        securityScore: isUnderAttack ? 35 : 95,
      };
    }
  }
);
