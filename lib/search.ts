import { Index } from 'flexsearch';
import ayahsData from './data/ayahs.json';

let index: Index | null = null;

export function getSearchIndex() {
  if (index) return index;

  index = new Index({
    tokenize: 'forward',
    cache: true,
  });

  console.log('Building search index...');
  ayahsData.forEach((ayah) => {
    index?.add(ayah.number, ayah.text);
  });
  console.log('Search index built.');

  return index;
}

export function searchAyahsWithFlex(query: string) {
  const searchIndex = getSearchIndex();
  const results = searchIndex.search(query, { limit: 50 });
  
  // Results are IDs (ayah numbers in our case)
  return results.map(id => ayahsData.find(a => a.number === id)).filter(Boolean);
}
