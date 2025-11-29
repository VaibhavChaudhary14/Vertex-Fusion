import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      // apiKey: process.env.GEMINI_API_KEY, // API key removed
      requestOptions: {
        timeout: 1000, // Reduced timeout
      },
    }),
  ],
  model: 'googleai/gemini-pro',
});
