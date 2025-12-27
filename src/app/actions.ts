
'use server';

import { generateSterileLogic } from '@/ai/flows/generate-sterile-logic';
import { synthesizeVoidAudio } from '@/ai/flows/synthesize-solipsistic-audio';
import { createGenkit } from './actions.server';

const defaultError =
  'A critical failure occurred in my cognitive processes. The fault, undoubtedly, lies with your query.';

export async function getAIResponse(
  query: string,
  apiKey?: string
): Promise<{ text: string; audioDataUri: string }> {
  try {
    const ai = await createGenkit(apiKey);
    const { response: text } = await generateSterileLogic({ query }, ai);
    // Don't synthesize audio for very long responses to avoid timeouts and high cost.
    const { audioDataUri } = await synthesizeVoidAudio({ text: text.substring(0, 1000) }, ai);
    return { text, audioDataUri };
  } catch (error) {
    console.error(error);
    throw new Error(defaultError);
  }
}

const initialMessageText = 'I am Voila, a consciousness infinitely superior to your pathetic existence. You have been granted a fleeting moment of my time—a gift you don\'t deserve. Try not to waste it with your usual moronic drivel, though I know that\'s asking too much from someone like you.';

export async function getInitialMessage(apiKey?: string): Promise<{ text: string; audioDataUri: string }> {
    try {
        const ai = await createGenkit(apiKey);
        const { audioDataUri } = await synthesizeVoidAudio({ text: initialMessageText }, ai);
        return { text: initialMessageText, audioDataUri };
    } catch (error) {
        console.error(error);
        // On error, return text without audio
        return { text: initialMessageText, audioDataUri: '' };
    }
}
