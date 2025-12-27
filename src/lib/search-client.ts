import { tavily } from '@tavily/core';

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  query: string;
}

// Simple in-memory cache to reduce API calls
const searchCache = new Map<string, { results: SearchResult[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function searchWeb(query: string): Promise<SearchResponse> {
  const apiKey = process.env.TAVILY_API_KEY || process.env.NEXT_PUBLIC_TAVILY_API_KEY;
  
  if (!apiKey) {
    console.warn('Tavily API key not found. Search functionality disabled.');
    return { results: [], query };
  }
  
  // Check cache
  const cached = searchCache.get(query);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { results: cached.results, query };
  }
  
  try {
    const tvly = tavily({ apiKey });
    
    const response = await tvly.search(query, {
      maxResults: 5,
      searchDepth: 'basic',
      includeAnswer: false,
      includeRawContent: false,
    });
    
    const results: SearchResult[] = response.results.map((r: any) => ({
      title: r.title || '',
      url: r.url || '',
      content: r.content || '',
      score: r.score || 0,
    }));
    
    // Cache results
    searchCache.set(query, { results, timestamp: Date.now() });
    
    return { results, query };
  } catch (error) {
    console.error('Search error:', error);
    return { results: [], query };
  }
}

// Format search results for LLM context
export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return '';
  }
  
  return results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.content}\nSource: ${r.url}`)
    .join('\n\n');
}
