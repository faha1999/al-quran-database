import { Ayah, SearchResultAyah } from '@/lib/quran-types';
import { advancedSearch } from '../search-engine';
import { ayahs, DEFAULT_TRANSLATION_IDENTIFIER, editionsByIdentifier } from './core';
import { loadEditionContent } from './cache';
import { attachEdition } from './utils';

export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

export function matchesQuery(value: string | null | undefined, query: string): boolean {
  return Boolean(value && value.toLowerCase().includes(query));
}

export function searchWithEditionIdentifier(query: string, identifier: string): SearchResultAyah[] {
  const edition = editionsByIdentifier.get(identifier);
  if (!edition || edition.format !== 'text') return [];

  const editionMap = loadEditionContent(identifier);
  const results: SearchResultAyah[] = [];

  for (const ayah of ayahs) {
    const entry = editionMap.get(ayah.id);
    if (matchesQuery(entry?.data, query)) {
      results.push({
        ...attachEdition(ayah, identifier, entry?.data ?? null),
        matched_identifiers: [identifier],
      });
    }
  }

  return results;
}

export function searchWithLanguage(query: string, language: string): SearchResultAyah[] {
  const searchableEditions = Array.from(editionsByIdentifier.values()).filter(
    (e) => e.language === language && e.format === 'text',
  );
  const matches = new Map<number, SearchResultAyah>();

  for (const edition of searchableEditions) {
    const editionMap = loadEditionContent(edition.identifier);
    for (const ayah of ayahs) {
      const entry = editionMap.get(ayah.id);
      if (matchesQuery(entry?.data, query)) {
        const existing = matches.get(ayah.id);
        if (existing) {
          existing.matched_identifiers.push(edition.identifier);
        } else {
          matches.set(ayah.id, {
            ...attachEdition(ayah, edition.identifier, entry?.data ?? null),
            matched_identifiers: [edition.identifier],
          });
        }
      }
    }
  }

  return [...matches.values()];
}

export function searchDefault(query: string): SearchResultAyah[] {
  const ayahIds = advancedSearch(query);

  if (ayahIds.length === 0) {
    const translationMap = loadEditionContent(DEFAULT_TRANSLATION_IDENTIFIER);
    return ayahs
      .filter(
        (ayah) =>
          matchesQuery(ayah.text, query) || matchesQuery(translationMap.get(ayah.id)?.data, query),
      )
      .slice(0, 50)
      .map((ayah) => ({
        ...attachEdition(ayah),
        matched_identifiers: ['core.ar', DEFAULT_TRANSLATION_IDENTIFIER],
      }));
  }

  return ayahIds
    .map((id) => ayahs.find((a) => a.id === id))
    .filter((a): a is Ayah => !!a)
    .map((ayah) => ({
      ...attachEdition(ayah),
      matched_identifiers: ['flexsearch'],
    }));
}
