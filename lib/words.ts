// Curated word lists for the typing test
// Mix of common words, short words, and some longer ones for variety

export const WORDS_COMMON = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
  'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
  'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
  'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
  'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
  'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
  'any', 'these', 'give', 'day', 'most', 'us', 'between', 'need', 'large',
  'often', 'hand', 'high', 'place', 'hold', 'turn', 'right', 'such',
  'here', 'tell', 'small', 'found', 'still', 'move', 'live', 'call',
  'keep', 'world', 'real', 'life', 'few', 'north', 'open', 'seem', 'many',
  'show', 'feel', 'carry', 'ten', 'talk', 'point', 'end', 'put', 'run',
  'read', 'next', 'stop', 'hard', 'been', 'did', 'does', 'long', 'were',
  'same', 'left', 'asked', 'go', 'play', 'away', 'both', 'own', 'those',
  'game', 'set', 'side', 'city', 'near', 'night', 'home', 'light', 'hot',
  'fast', 'cold', 'dark', 'rock', 'fire', 'door', 'road', 'line', 'free',
  'type', 'test', 'word', 'code', 'data', 'link', 'path', 'sort', 'list',
  'file', 'user', 'page', 'form', 'view', 'site', 'part', 'half', 'else',
  'able', 'love', 'plan', 'case', 'base', 'note', 'idea', 'head', 'best',
  'team', 'care', 'help', 'body', 'kind', 'once', 'true', 'sure', 'mind',
  'face', 'each', 'much', 'must', 'very', 'past', 'draw', 'stay', 'lead',
];

// Generate a shuffled list of N words
export function generateWords(count: number): string[] {
  const pool = [...WORDS_COMMON];
  const result: string[] = [];
  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // Fill result, cycling through pool if needed
  while (result.length < count) {
    result.push(...pool.slice(0, Math.min(pool.length, count - result.length)));
  }
  return result;
}
