import {
  ayahs,
  ayahsByNumber,
  duas,
  editions,
  editionsByIdentifier,
  extraContext,
  hizbs,
  juzs,
  pages,
  reciters,
  rubs,
  supportedLanguages,
  surahs,
  surahsById,
  surahsByNumber,
  words,
} from './core';
import {
  attachEdition,
  getAyahTextForEdition,
  getEditionSummary,
  paginate,
  resolveAyahs,
  resolveTranslation,
} from './utils';
import {
  normalizeQuery,
  searchDefault,
  searchWithEditionIdentifier,
  searchWithLanguage,
} from './search';
import type {
  AsbabAlNuzulEntry,
  HadithReferenceEntry,
  ResolvedAyah,
  SearchFilters,
  SearchResultAyah,
} from '@/lib/quran-types';

export * from './core';
export * from './utils';
export * from './search';
export * from './validation';
export * from './cache';

/**
 * Get all surahs with optional pagination
 */
export function getAllSurahs(page?: number, limit?: number) {
  if (page && limit) {
    return paginate(surahs, page, limit);
  }
  return { items: surahs, meta: { total: surahs.length } };
}

/**
 * Get surah by ID or Number
 */
export function getSurahById(id: number, identifier?: string) {
  const surah = surahsById.get(id) ?? surahsByNumber.get(id) ?? null;
  if (!surah) return null;

  const surahAyahs = ayahs.filter((ayah) => ayah.surah_id === surah.id);
  return {
    ...surah,
    ayahs: resolveAyahs(surahAyahs, identifier),
  };
}

/**
 * Get all juzs
 */
export function getJuzs() {
  return juzs;
}

/**
 * Get all hizbs
 */
export function getHizbs() {
  return hizbs;
}

/**
 * Get all pages
 */
export function getPages() {
  return pages;
}

/**
 * Get all rubs
 */
export function getRubs() {
  return rubs;
}

/**
 * Get words for a specific ayah
 */
export function getWordsByAyah(ayahId: number) {
  return words.filter((w) => w.ayah_id === ayahId);
}

/**
 * Get a single ayah by ID with optional edition and words
 */
export function getAyah(
  id: number,
  edition?: string,
  includeWords: boolean = false,
): ResolvedAyah | null {
  const ayah = ayahs.find((a) => a.id === id);
  if (!ayah) return null;

  const resolvedAyah: ResolvedAyah = { ...ayah, translation: null };

  if (edition) {
    const content = getAyahTextForEdition(id, edition);
    if (content) {
      resolvedAyah.edition_content = content;
      resolvedAyah.edition = getEditionSummary(editionsByIdentifier.get(edition) ?? null);
    }
  }

  if (!resolvedAyah.edition_content) {
    resolvedAyah.translation = resolveTranslation(id);
  }

  if (includeWords) {
    resolvedAyah.words = getWordsByAyah(id);
  }

  return resolvedAyah;
}

/**
 * Get ayah by global number
 */
export function getAyahByNumber(number: number, identifier?: string) {
  const ayah = ayahsByNumber.get(number) ?? null;
  if (!ayah) return null;
  return attachEdition(ayah, identifier);
}

/**
 * Get all editions
 */
export function getAllEditions() {
  return editions;
}

/**
 * Get searchable text editions
 */
export function getTextEditions() {
  return editions.filter((e) => e.format === 'text');
}

/**
 * Get edition by its unique identifier
 */
export function getEditionByIdentifier(identifier: string) {
  return editionsByIdentifier.get(identifier) ?? null;
}

/**
 * Get juz by ID with its ayahs
 */
export function getJuzById(id: number, identifier?: string) {
  const juz = juzs.find((item) => item.id === id) ?? null;
  if (!juz) return null;
  return { ...juz, ayahs: getAyahsByJuz(id, identifier) };
}

export function getAyahsByJuz(id: number, identifier?: string) {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.juz_id === id),
    identifier,
  );
}

export function getAyahsByHizb(id: number, identifier?: string) {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.hizb_id === id),
    identifier,
  );
}

export function getAyahsByRub(id: number, identifier?: string) {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.rub_id === id),
    identifier,
  );
}

export function getAyahsByPage(id: number, identifier?: string) {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.page === id),
    identifier,
  );
}

export function getHizbById(id: number, identifier?: string) {
  const hizb = hizbs.find((item) => item.id === id) ?? null;
  if (!hizb) return null;
  return { ...hizb, ayahs: getAyahsByHizb(id, identifier) };
}

export function getRubById(id: number, identifier?: string) {
  const rub = rubs.find((item) => item.id === id) ?? null;
  if (!rub) return null;
  return { ...rub, ayahs: getAyahsByRub(id, identifier) };
}

export function getPageById(id: number, identifier?: string) {
  const page = pages.find((item) => item.id === id) ?? null;
  if (!page) return null;
  return { ...page, ayahs: getAyahsByPage(id, identifier) };
}

export function getSupportedLanguagesList() {
  return Array.from(supportedLanguages).sort();
}

/**
 * Main search function with filtering and pagination
 */
export function searchAyahs(query: string, filters: SearchFilters = {}) {
  const normalizedQuery = normalizeQuery(query);
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 50;

  if (!normalizedQuery) {
    return {
      items: [] as SearchResultAyah[],
      meta: {
        total: 0,
        page,
        limit,
        total_pages: 1,
        has_next_page: false,
      },
    };
  }

  let results: SearchResultAyah[];

  if (filters.edition) {
    results = searchWithEditionIdentifier(normalizedQuery, filters.edition);
  } else if (filters.language) {
    results = searchWithLanguage(normalizedQuery, filters.language);
  } else {
    results = searchDefault(normalizedQuery);
  }

  return paginate(results, page, limit);
}

/**
 * Get all reciters
 */
export function getReciters() {
  return reciters;
}

/**
 * Get all duas with optional pagination
 */
export function getDuas(page?: number, limit?: number) {
  if (page && limit) {
    return paginate(duas, page, limit);
  }
  return { items: duas, meta: { total: duas.length } };
}

/**
 * Get asbab al-nuzul and hadith references for an ayah
 */
export function getExtraContextByAyah(ayahId: number) {
  return {
    asbab: extraContext.asbab_al_nuzul.filter((item: AsbabAlNuzulEntry) => item.ayah_id === ayahId),
    hadith: extraContext.hadith_references.filter(
      (item: HadithReferenceEntry) => item.ayah_id === ayahId,
    ),
  };
}
