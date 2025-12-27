import { createGroqClient, FAST_MODEL } from './groq-client';

// Intelligent search detection using AI
export async function needsSearch(query: string, apiKey?: string): Promise<boolean> {
  // Quick keyword check first (fast path)
  const quickCheck = hasSearchKeywords(query);
  if (!quickCheck) {
    return false; // Definitely doesn't need search
  }
  
  // Use AI to intelligently determine if search is needed
  try {
    const groq = createGroqClient(apiKey);
    
    const systemPrompt = `You are a search necessity detector. Analyze the user's query and determine if it requires current/real-time information from the web.

Return "YES" if the query needs web search for:
- Current events, news, or recent happenings
- Real-time data (weather, stocks, sports scores, etc.)
- Information that changes frequently or may have been updated by now
- Queries about "latest", "current", "today", "recent" events
- Questions about specific dates in 2024 or 2025
- Live data or statistics

Return "NO" if the query:
- Asks about general knowledge or concepts
- Is about historical facts (before 2024)
- Requests explanations or how-to information
- Is about programming, math, science fundamentals
- Can be answered with existing knowledge

Respond with ONLY "YES" or "NO".`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      model: FAST_MODEL, // Use fast model for quick detection
      temperature: 0.1,
      max_tokens: 10,
    });

    const response = completion.choices[0]?.message?.content?.trim().toUpperCase();
    return response === 'YES';
  } catch (error) {
    console.error('Search detection error:', error);
    // Fallback to keyword-based detection on error
    return quickCheck;
  }
}

// Fast keyword-based check (used as pre-filter)
function hasSearchKeywords(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  
  const searchKeywords = [
    // Time-based
    'latest', 'current', 'today', 'now', 'recent', 'this week', 'this month', 'this year',
    'yesterday', 'tomorrow', 'upcoming',
    
    // News and events
    'news', 'update', 'what happened', 'breaking', 'announcement',
    
    // Real-time data
    'weather', 'temperature', 'forecast', 'climate',
    'stock', 'price', 'market', 'trading',
    'score', 'game', 'match', 'tournament', 'championship',
    
    // Current years
    '2024', '2025',
    
    // Question patterns
    'what is happening', 'what\'s new', 'any news', 'predict', 'forecast', 'prediction'
  ];
  
  return searchKeywords.some(keyword => lowerQuery.includes(keyword));
}

