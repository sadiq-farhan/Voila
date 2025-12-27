
'use server';

import { genkit, Genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Store a map of API keys to Genkit instances to avoid re-creating them on every call.
const genkitInstances = new Map<string, Genkit>();

export async function createGenkit(apiKey?: string): Promise<Genkit> {
  const key = apiKey || 'default';
  
  if (genkitInstances.has(key)) {
    return genkitInstances.get(key)!;
  }

  const newInstance = genkit({
    plugins: [googleAI(apiKey ? { apiKey } : undefined)],
    model: 'googleai/gemini-2.5-flash',
  });

  genkitInstances.set(key, newInstance);
  
  return newInstance;
}
