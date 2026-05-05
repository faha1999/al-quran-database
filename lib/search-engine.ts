import { Document } from 'flexsearch';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Ayah, AyahEdition, EditionManifest } from './quran-types';
import { logger } from './logger';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');
const readJson = <T>(filePath: string): T => JSON.parse(readFileSync(filePath, 'utf8')) as T;

// Load core data for indexing
const ayahs = readJson<Ayah[]>(path.join(DATA_DIR, 'ayahs.json'));
const editionManifest = readJson<EditionManifest>(path.join(DATA_DIR, 'edition-manifest.json'));
const defaultTranslationIdentifier = editionManifest.default_translation_identifier;

// Load default translation content
const defaultTranslationFiles = editionManifest.editions[defaultTranslationIdentifier].files;
const defaultTranslationData = defaultTranslationFiles.flatMap((file) =>
  readJson<AyahEdition[]>(path.join(DATA_DIR, file)),
);

const translationMap = new Map(defaultTranslationData.map((item) => [item.ayah_id, item.data]));

interface SearchDoc {
  id: number;
  text: string;
  translation: string;
  surah_id: number;
  ayah_number: number;
  [key: string]: string | number;
}

// Create FlexSearch Document Index
const index = new Document<SearchDoc>({
  document: {
    id: 'id',
    index: ['text', 'translation'],
    store: ['id', 'surah_id', 'ayah_number'],
  },
  tokenize: 'full',
  context: true,
  cache: true,
});

// Initialize Index
logger.debug('Initializing search index');
ayahs.forEach((ayah) => {
  index.add({
    id: ayah.id,
    text: ayah.text,
    translation: translationMap.get(ayah.id) || '',
    surah_id: ayah.surah_id,
    ayah_number: ayah.number_in_surah,
  });
});
logger.debug('Search index ready', { totalAyahs: ayahs.length });

interface SearchResult {
  id: number;
  doc: SearchDoc;
}

export function advancedSearch(query: string, limit: number = 20) {
  const results = index.search(query, {
    limit,
    enrich: true,
    suggest: true,
  });

  const mergedResults = new Map<number, SearchDoc>();

  results.forEach((fieldResult) => {
    fieldResult.result.forEach((item: unknown) => {
      const searchResult = item as SearchResult;
      const doc = searchResult.doc;
      const docId = searchResult.id;

      if (!mergedResults.has(docId)) {
        mergedResults.set(docId, doc);
      }
    });
  });

  return Array.from(mergedResults.keys());
}
