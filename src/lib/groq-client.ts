import Groq from 'groq-sdk';

// Cache Groq instances to avoid recreating them
const groqInstances = new Map<string, Groq>();

export function createGroqClient(apiKey?: string): Groq {
  const key = apiKey || process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
  
  if (!key) {
    throw new Error('Groq API key is required. Please set GROQ_API_KEY environment variable or provide your own key.');
  }
  
  // Validate key format
  if (!key.startsWith('gsk_')) {
    console.error('[Groq Client] Invalid API key format. Groq keys should start with "gsk_"');
    throw new Error('Invalid Groq API key format');
  }
  
  // Create fresh instance with trimmed key
  const groq = new Groq({
    apiKey: key.trim(),
  });
  
  return groq;
}

export const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
export const FAST_MODEL = 'llama-3.1-8b-instant';
