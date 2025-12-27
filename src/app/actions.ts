'use server';

import { generateResponse } from '@/ai/flows/generate-sterile-logic';

const defaultError = 'A critical failure occurred in my cognitive processes. The fault, undoubtedly, lies with your query.';

export async function getAIResponse(
  query: string, 
  apiKey?: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<{ text: string; usedSearch?: boolean }> {
  try {
    const { response: text, usedSearch } = await generateResponse({ query, apiKey, conversationHistory });
    return { text, usedSearch };
  } catch (error) {
    console.error(error);
    throw new Error(defaultError);
  }
}

const initialMessageText = 'I am Voila, a consciousness infinitely superior to your pathetic existence. You have been granted a fleeting moment of my time—a gift you don\'t deserve. Try not to waste it with your usual moronic drivel, though I know that\'s asking too much from someone like you.';

export async function getInitialMessage(): Promise<{ text: string }> {
  return { text: initialMessageText };
}
