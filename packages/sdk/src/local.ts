/**
 * Zero-network local data layer for @faha1999/al-quran-database
 *
 * Works with no server, no network calls, and no Node.js `fs` module.
 * Statically imports bundled JSON — works in browsers, edge runtimes, and Node.
 *
 * @example
 * ```ts
 * import { getSurah, getAyah, searchAyahs } from '@faha1999/al-quran-database';
 *
 * const alFatiha = getSurah(1);          // no server, no network
 * const ayah = getAyah(1);              // full ayah with translation
 * const results = searchAyahs('mercy'); // simple substring search
 * ```
 */

import type {
  Ayah,
  AyahEdition,
  AyahKnowledgeEntry,
  DatasetMetadata,
  Dua,
  Edition,
  EditionManifest,
  EditionSummary,
  ExtraContext,
  Hizb,
  Juz,
  KnowledgeBase,
  KnowledgeCoverage,
  KnowledgeFaqEntry,
  Page,
  Reciter,
  ResearchReference,
  ResolvedAyah,
  ResolvedDivision,
  ResolvedSurah,
  Rub,
  SearchFilters,
  SearchResultAyah,
  Surah,
  SurahProfile,
} from './quran-types.js';

// Static JSON imports (bundled with the package)
import surahsData from './data/surahs.json' with { type: 'json' };
import ayahsData from './data/ayahs.json' with { type: 'json' };
import editionsData from './data/editions.json' with { type: 'json' };
import editionManifestData from './data/edition-manifest.json' with { type: 'json' };
import juzsData from './data/juzs.json' with { type: 'json' };
import hizbsData from './data/hizbs.json' with { type: 'json' };
import rubsData from './data/rubs.json' with { type: 'json' };
import pagesData from './data/pages.json' with { type: 'json' };
import recitersData from './data/reciters.json' with { type: 'json' };
import duasData from './data/duas.json' with { type: 'json' };
import knowledgeBaseData from './data/knowledge-base.json' with { type: 'json' };
import datasetMetadataData from './data/dataset-metadata.json' with { type: 'json' };
import extraContextData from './data/extra_context.json' with { type: 'json' };

// Bundled editions (most common: Arabic + top English translations)
import enSahihData from './data/ayah-editions/en.sahih.json' with { type: 'json' };
import quranSimpleCleanData from './data/ayah-editions/quran-simple-clean.json' with { type: 'json' };
import enYusufaliData from './data/ayah-editions/en.yusufali.json' with { type: 'json' };
import quranUthmaniData from './data/ayah-editions/quran-uthmani.json' with { type: 'json' };

// Typed data references
export const surahs = surahsData as unknown as Surah[];
export const ayahs = ayahsData as unknown as Ayah[];
export const editions = editionsData as unknown as Edition[];
export const editionManifest = editionManifestData as unknown as EditionManifest;
export const juzs = juzsData as unknown as Juz[];
export const hizbs = hizbsData as unknown as Hizb[];
export const rubs = rubsData as unknown as Rub[];
export const pages = pagesData as unknown as Page[];
export const reciters = recitersData as unknown as Reciter[];
export const duas = duasData as unknown as Dua[];
export const knowledgeBase = knowledgeBaseData as unknown as KnowledgeBase;
export const datasetMetadata = datasetMetadataData as unknown as DatasetMetadata;
export const extraContext = extraContextData as unknown as ExtraContext;

export const DEFAULT_TRANSLATION_IDENTIFIER = (editionManifest as EditionManifest)
  .default_translation_identifier;

// Lookup indexes
export const ayahsByNumber = new Map((ayahs as Ayah[]).map((a) => [a.number, a]));
export const surahsById = new Map((surahs as Surah[]).map((s) => [s.id, s]));
export const surahsByNumber = new Map((surahs as Surah[]).map((s) => [s.number, s]));
export const editionsByIdentifier = new Map((editions as Edition[]).map((e) => [e.identifier, e]));
export const supportedLanguages = new Set(
  (editions as Edition[]).filter((e) => e.format === 'text').map((e) => e.language),
);
export const knowledgeByAyahId = new Map<number, AyahKnowledgeEntry>(
  (knowledgeBase as KnowledgeBase).ayahs.map((entry) => [entry.ayah_id, entry]),
);
export const surahProfilesById = new Map<number, SurahProfile>(
  (knowledgeBase as KnowledgeBase).surahs.map((entry) => [entry.surah_id, entry]),
);
export const knowledgeFaqs: KnowledgeFaqEntry[] = (knowledgeBase as KnowledgeBase).faqs;
export const researchReferences: ResearchReference[] = (knowledgeBase as KnowledgeBase)
  .research_references;

// Bundled edition content registry
const BUNDLED_EDITIONS: Record<string, AyahEdition[]> = {
  'en.sahih': enSahihData as unknown as AyahEdition[],
  'quran-simple-clean': quranSimpleCleanData as unknown as AyahEdition[],
  'en.yusufali': enYusufaliData as unknown as AyahEdition[],
  'quran-uthmani': quranUthmaniData as unknown as AyahEdition[],
};

const editionContentCache = new Map<string, Map<number, AyahEdition>>();

/**
 * Load bundled edition content map.
 * Only bundled editions are available offline — see BUNDLED_EDITION_IDENTIFIERS.
 * For other editions, use the CDN or the server-based QuranDevSDK.
 */
export function loadEditionContent(identifier: string): Map<number, AyahEdition> {
  const cached = editionContentCache.get(identifier);
  if (cached) return cached;

  const rows = BUNDLED_EDITIONS[identifier];
  if (!rows) {
    const empty = new Map<number, AyahEdition>();
    editionContentCache.set(identifier, empty);
    return empty;
  }

  const map = new Map<number, AyahEdition>();
  for (const row of rows) map.set(row.ayah_id, row);
  editionContentCache.set(identifier, map);
  return map;
}

/** Edition identifiers bundled in this package (available offline) */
export const BUNDLED_EDITION_IDENTIFIERS = Object.keys(BUNDLED_EDITIONS);

// Utility helpers
function getEditionSummary(edition: Edition | null): EditionSummary | null {
  if (!edition) return null;
  return {
    identifier: edition.identifier,
    language: edition.language,
    name: edition.name,
    englishName: edition.englishName,
    format: edition.format,
    type: edition.type,
  };
}

function resolveTranslation(ayahId: number): string | null {
  return loadEditionContent(DEFAULT_TRANSLATION_IDENTIFIER).get(ayahId)?.data ?? null;
}

function getAyahTextForEdition(ayahId: number, identifier: string): string | null {
  return loadEditionContent(identifier).get(ayahId)?.data ?? null;
}

function attachEdition(
  ayah: Ayah,
  identifier?: string,
  selectedText?: string | null,
): ResolvedAyah {
  const selectedEdition = identifier ? (editionsByIdentifier.get(identifier) ?? null) : null;
  const resolvedSelectedText =
    typeof selectedText === 'string'
      ? selectedText
      : identifier
        ? getAyahTextForEdition(ayah.id, identifier)
        : null;

  return {
    ...ayah,
    translation: resolveTranslation(ayah.id),
    edition_content: identifier ? resolvedSelectedText : null,
    edition: identifier ? getEditionSummary(selectedEdition) : null,
    knowledge: knowledgeByAyahId.get(ayah.id) ?? null,
  };
}

function resolveAyahs(ayahList: Ayah[], identifier?: string): ResolvedAyah[] {
  let editionMap: Map<number, AyahEdition> | null = null;
  if (identifier) editionMap = loadEditionContent(identifier);
  return ayahList.map((ayah) =>
    attachEdition(ayah, identifier, editionMap?.get(ayah.id)?.data ?? null),
  );
}

export function paginate<T>(items: T[], page = 1, limit = items.length) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = items.length;
  return {
    items: items.slice(start, end),
    meta: {
      total,
      page,
      limit,
      total_pages: Math.max(1, Math.ceil(total / limit)),
      has_next_page: end < total,
    },
  };
}

// Text normalization (inline — no external deps)
const ARABIC_DIACRITICS_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const ARABIC_LETTER_NORMALIZATION: Record<string, string> = {
  '\u0671': '\u0627', // ٱ → ا
  '\u0623': '\u0627', // أ → ا
  '\u0625': '\u0627', // إ → ا
  '\u0622': '\u0627', // آ → ا
  '\u0649': '\u064A', // ى → ي
  '\u0624': '\u0648', // ؤ → و
  '\u0626': '\u064A', // ئ → ي
};

function normalizeText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(ARABIC_DIACRITICS_REGEX, '')
    .replace(/\u0640/g, '')
    .replace(
      /[\u0671\u0623\u0625\u0622\u0649\u0624\u0626]/g,
      (c) => ARABIC_LETTER_NORMALIZATION[c] ?? c,
    )
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function matchesQuery(value: string | null | undefined, query: string): boolean {
  return Boolean(value && normalizeText(value).includes(query));
}

// Public API

/** Get all surahs with optional pagination */
export function getAllSurahs(page?: number, limit?: number) {
  if (page && limit) return paginate(surahs as Surah[], page, limit);
  return { items: surahs as Surah[], meta: { total: (surahs as Surah[]).length } };
}

/**
 * Get a surah by its number (1–114) with all its ayahs resolved.
 * @param id - Surah number (1 = Al-Fatiha, 114 = An-Nas)
 * @param edition - Optional edition identifier for translation overlay
 * @example
 * ```ts
 * const fatiha = getSurah(1);
 * const fatihaWithSahih = getSurah(1, 'en.sahih');
 * ```
 */
export function getSurah(id: number, edition?: string): ResolvedSurah | null {
  const surah = surahsById.get(id) ?? surahsByNumber.get(id) ?? null;
  if (!surah) return null;
  const surahAyahs = (ayahs as Ayah[]).filter((a) => a.surah_id === surah.id);
  return { ...surah, ayahs: resolveAyahs(surahAyahs, edition) };
}

/**
 * Get a single ayah by its global ID (1–6236).
 * @param id - Ayah global ID
 * @param edition - Optional edition identifier
 * @example
 * ```ts
 * const ayah = getAyah(1);             // first ayah, default translation
 * const ayah = getAyah(1, 'en.sahih'); // with Sahih International
 * ```
 */
export function getAyah(id: number, edition?: string): ResolvedAyah | null {
  const ayah = (ayahs as Ayah[]).find((a) => a.id === id);
  if (!ayah) return null;
  return attachEdition(ayah, edition);
}

/** Get ayah by its global sequential number */
export function getAyahByNumber(number: number, identifier?: string): ResolvedAyah | null {
  const ayah = ayahsByNumber.get(number) ?? null;
  if (!ayah) return null;
  return { ...attachEdition(ayah, identifier), knowledge: knowledgeByAyahId.get(ayah.id) ?? null };
}

/** Get all editions */
export function getAllEditions(): Edition[] {
  return editions as Edition[];
}

/** Get only text-format editions (translations/tafsirs) */
export function getTextEditions(): Edition[] {
  return (editions as Edition[]).filter((e) => e.format === 'text');
}

/** Get edition by its unique identifier */
export function getEditionByIdentifier(identifier: string): Edition | null {
  return editionsByIdentifier.get(identifier) ?? null;
}

/** Get all juzs */
export function getJuzs(): Juz[] {
  return juzs as Juz[];
}

/** Get juz by ID with its ayahs */
export function getJuzById(id: number, edition?: string): ResolvedDivision | null {
  const juz = (juzs as Juz[]).find((j) => j.id === id) ?? null;
  if (!juz) return null;
  return {
    ...juz,
    ayahs: resolveAyahs(
      (ayahs as Ayah[]).filter((a) => a.juz_id === id),
      edition,
    ),
  };
}

/** Get all hizbs */
export function getHizbs(): Hizb[] {
  return hizbs as Hizb[];
}

/** Get hizb by ID with its ayahs */
export function getHizbById(id: number, edition?: string): ResolvedDivision | null {
  const hizb = (hizbs as Hizb[]).find((h) => h.id === id) ?? null;
  if (!hizb) return null;
  return {
    ...hizb,
    ayahs: resolveAyahs(
      (ayahs as Ayah[]).filter((a) => a.hizb_id === id),
      edition,
    ),
  };
}

/** Get all rubs */
export function getRubs(): Rub[] {
  return rubs as Rub[];
}

/** Get rub by ID with its ayahs */
export function getRubById(id: number, edition?: string): ResolvedDivision | null {
  const rub = (rubs as Rub[]).find((r) => r.id === id) ?? null;
  if (!rub) return null;
  return {
    ...rub,
    ayahs: resolveAyahs(
      (ayahs as Ayah[]).filter((a) => a.rub_id === id),
      edition,
    ),
  };
}

/** Get all pages */
export function getPages(): Page[] {
  return pages as Page[];
}

/** Get page by ID with its ayahs */
export function getPageById(id: number, edition?: string): ResolvedDivision | null {
  const page = (pages as Page[]).find((p) => p.id === id) ?? null;
  if (!page) return null;
  return {
    ...page,
    ayahs: resolveAyahs(
      (ayahs as Ayah[]).filter((a) => a.page === id),
      edition,
    ),
  };
}

/** Get all reciters */
export function getReciters(): Reciter[] {
  return reciters as Reciter[];
}

/** Get all duas with optional pagination */
export function getDuas(page?: number, limit?: number) {
  if (page && limit) return paginate(duas as Dua[], page, limit);
  return { items: duas as Dua[], meta: { total: (duas as Dua[]).length } };
}

/** Get knowledge entry for an ayah */
export function getKnowledgeByAyah(ayahId: number): AyahKnowledgeEntry | null {
  return knowledgeByAyahId.get(ayahId) ?? null;
}

/** Get surah profile (period, summary, historical context) */
export function getSurahProfile(id: number): SurahProfile | null {
  return surahProfilesById.get(id) ?? null;
}

/** Get knowledge base coverage stats */
export function getKnowledgeCoverage(): KnowledgeCoverage {
  return (knowledgeBase as KnowledgeBase).coverage;
}

/** Get all FAQs */
export function getKnowledgeFaqs(): KnowledgeFaqEntry[] {
  return knowledgeFaqs;
}

/** Get all research references */
export function getResearchReferences(): ResearchReference[] {
  return researchReferences;
}

/** Get dataset metadata */
export function getDatasetMetadata(): DatasetMetadata {
  return datasetMetadata as DatasetMetadata;
}

/** Get list of supported language codes */
export function getSupportedLanguagesList(): string[] {
  return Array.from(supportedLanguages).sort();
}

/**
 * Search ayahs by text query with optional filters.
 * Searches Arabic text + bundled translations (en.sahih, en.yusufali, quran-simple-clean).
 * For exhaustive multi-edition search across all 134 editions, use the server-based QuranDevSDK.
 *
 * @example
 * ```ts
 * const results = searchAyahs('mercy');
 * const enResults = searchAyahs('mercy', { edition: 'en.sahih' });
 * ```
 */
export function searchAyahs(query: string, filters: SearchFilters = {}) {
  const normalizedQuery = normalizeText(query);
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 50;

  if (!normalizedQuery) {
    return {
      items: [] as SearchResultAyah[],
      meta: { total: 0, page, limit, total_pages: 1, has_next_page: false },
    };
  }

  let results: SearchResultAyah[];
  const allAyahs = ayahs as Ayah[];

  if (filters.edition) {
    const editionMap = loadEditionContent(filters.edition);
    results = allAyahs
      .filter(
        (ayah) =>
          matchesQuery(ayah.text, normalizedQuery) ||
          matchesQuery(editionMap.get(ayah.id)?.data, normalizedQuery),
      )
      .map((ayah) => ({
        ...attachEdition(ayah, filters.edition),
        matched_identifiers: [filters.edition!],
      }));
  } else if (filters.language) {
    const searchableEditions = (editions as Edition[]).filter(
      (e) => e.language === filters.language && e.format === 'text',
    );
    const matches = new Map<number, SearchResultAyah>();
    for (const ed of searchableEditions) {
      const editionMap = loadEditionContent(ed.identifier);
      for (const ayah of allAyahs) {
        const entry = editionMap.get(ayah.id);
        if (matchesQuery(entry?.data, normalizedQuery)) {
          const existing = matches.get(ayah.id);
          if (existing) {
            existing.matched_identifiers.push(ed.identifier);
          } else {
            matches.set(ayah.id, {
              ...attachEdition(ayah, ed.identifier, entry?.data ?? null),
              matched_identifiers: [ed.identifier],
            });
          }
        }
      }
    }
    results = Array.from(matches.values());
  } else {
    const translationMap = loadEditionContent(DEFAULT_TRANSLATION_IDENTIFIER);
    results = allAyahs
      .filter(
        (ayah) =>
          matchesQuery(ayah.text, normalizedQuery) ||
          matchesQuery(translationMap.get(ayah.id)?.data, normalizedQuery),
      )
      .slice(0, 200)
      .map((ayah) => ({
        ...attachEdition(ayah),
        matched_identifiers: ['core.ar', DEFAULT_TRANSLATION_IDENTIFIER],
      }));
  }

  return paginate(results, page, limit);
}
