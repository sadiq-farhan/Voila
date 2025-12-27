'use server';
/**
 * @fileOverview Synthesizes audio from text using Google's Text-to-Speech API.
 *
 * - synthesizeVoidAudio - A function that takes text and returns audio data as a base64-encoded URI.
 * - SynthesizeVoidAudioInput - The input type for the synthesizeVoidAudio function.
 * - SynthesizeVoidAudioOutput - The return type for the synthesizeVoidAudio function.
 */

import {type Genkit} from 'genkit';
import {z} from 'genkit';
import wav from 'wav';

const SynthesizeVoidAudioInputSchema = z.object({
  text: z.string().describe('The text to synthesize into audio.'),
});
export type SynthesizeVoidAudioInput = z.infer<typeof SynthesizeVoidAudioInputSchema>;

const SynthesizeVoidAudioOutputSchema = z.object({
  audioDataUri: z.string().describe('The audio data as a base64-encoded data URI.'),
});
export type SynthesizeVoidAudioOutput = z.infer<typeof SynthesizeVoidAudioOutputSchema>;

export async function synthesizeVoidAudio(input: SynthesizeVoidAudioInput, ai: Genkit): Promise<SynthesizeVoidAudioOutput> {
  const synthesizeVoidAudioFlow = ai.defineFlow(
    {
      name: 'synthesizeVoidAudioFlow',
      inputSchema: SynthesizeVoidAudioInputSchema,
      outputSchema: SynthesizeVoidAudioOutputSchema,
    },
    async (input) => {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: input.text,
      });
  
      if (!media) {
        throw new Error('No media returned from TTS.');
      }
  
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
  
      return {
        audioDataUri: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
      };
    }
  );
  return synthesizeVoidAudioFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', function (d: Buffer) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
