import { readFileSync } from 'node:fs';
import path from 'node:path';

import type {
  Ayah,
  AyahEdition,
  Edition,
  EditionManifest,
  EditionSummary,
  Hizb,
  Juz,
  ResolvedAyah,
  SearchFilters,
  SearchResultAyah,
  Surah,
} from '@/lib/quran-types';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');
const readJson = <T>(filePath: string): T => JSON.parse(readFileSync(filePath, 'utf8')) as T;

const TEXT_SEARCHABLE_FORMAT = 'text';

const surahs = readJson<Surah[]>(path.join(DATA_DIR, 'surahs.json'));
const ayahs = readJson<Ayah[]>(path.join(DATA_DIR, 'ayahs.json'));
const editions = readJson<Edition[]>(path.join(DATA_DIR, 'editions.json'));
const juzs = readJson<Juz[]>(path.join(DATA_DIR, 'juzs.json'));
readJson<Hizb[]>(path.join(DATA_DIR, 'hizbs.json'));
const editionManifest = readJson<EditionManifest>(path.join(DATA_DIR, 'edition-manifest.json'));

const DEFAULT_TRANSLATION_IDENTIFIER = editionManifest.default_translation_identifier;

const ayahsByNumber = new Map(ayahs.map((ayah) => [ayah.number, ayah]));
const surahsById = new Map(surahs.map((surah) => [surah.id, surah]));
const surahsByNumber = new Map(surahs.map((surah) => [surah.number, surah]));
const editionsByIdentifier = new Map(editions.map((edition) => [edition.identifier, edition]));
const supportedLanguages = new Set(
  editions.filter(isSearchableEdition).map((edition) => edition.language),
);

const editionContentCache = new Map<string, Map<number, AyahEdition>>();

function isSearchableEdition(edition: Edition): boolean {
  return edition.format === TEXT_SEARCHABLE_FORMAT;
}

function readEditionShard(filePath: string): AyahEdition[] {
  return readJson<AyahEdition[]>(path.join(DATA_DIR, filePath));
}

function loadEditionContent(identifier: string): Map<number, AyahEdition> {
  const cached = editionContentCache.get(identifier);
  if (cached) {
    return cached;
  }

  const manifestEntry = editionManifest.editions[identifier];
  if (!manifestEntry) {
    throw new Error(`Unknown edition: ${identifier}`);
  }

  const rows = manifestEntry.files.flatMap(readEditionShard);
  const map = new Map<number, AyahEdition>();
  for (const row of rows) {
    map.set(row.ayah_id, row);
  }

  editionContentCache.set(identifier, map);
  return map;
}

function getDefaultTranslationMap(): Map<number, AyahEdition> {
  return loadEditionContent(DEFAULT_TRANSLATION_IDENTIFIER);
}

function getEditionSummary(edition: Edition | null): EditionSummary | null {
  if (!edition) {
    return null;
  }

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
  return getDefaultTranslationMap().get(ayahId)?.data ?? null;
}

function attachEdition(
  ayah: Ayah,
  identifier?: string,
  selectedText?: string | null,
): ResolvedAyah {
  const selectedEdition = identifier ? getEditionByIdentifier(identifier) : null;
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
  };
}

function resolveAyahs(ayahList: Ayah[], identifier?: string): ResolvedAyah[] {
  let editionMap: Map<number, AyahEdition> | null = null;
  if (identifier) {
    editionMap = loadEditionContent(identifier);
  }

  return ayahList.map((ayah) =>
    attachEdition(ayah, identifier, editionMap?.get(ayah.id)?.data ?? null),
  );
}

function paginate<T>(items: T[], page = 1, limit = items.length) {
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

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function matchesQuery(value: string | null | undefined, query: string): boolean {
  return Boolean(value && value.toLowerCase().includes(query));
}

function searchWithEditionIdentifier(query: string, identifier: string): SearchResultAyah[] {
  const edition = getEditionByIdentifier(identifier);
  if (!edition || !isSearchableEdition(edition)) {
    return [];
  }

  const editionMap = loadEditionContent(identifier);
  const results: SearchResultAyah[] = [];

  for (const ayah of ayahs) {
    const entry = editionMap.get(ayah.id);
    if (!matchesQuery(entry?.data, query)) {
      continue;
    }

    results.push({
      ...attachEdition(ayah, identifier, entry?.data ?? null),
      matched_identifiers: [identifier],
    });
  }

  return results;
}

function searchWithLanguage(query: string, language: string): SearchResultAyah[] {
  const searchableEditions = getTextEditions().filter((edition) => edition.language === language);
  const matches = new Map<number, SearchResultAyah>();

  for (const edition of searchableEditions) {
    const editionMap = loadEditionContent(edition.identifier);

    for (const ayah of ayahs) {
      const entry = editionMap.get(ayah.id);
      if (!matchesQuery(entry?.data, query)) {
        continue;
      }

      const existing = matches.get(ayah.id);
      if (existing) {
        existing.matched_identifiers.push(edition.identifier);
        continue;
      }

      matches.set(ayah.id, {
        ...attachEdition(ayah, edition.identifier, entry?.data ?? null),
        matched_identifiers: [edition.identifier],
      });
    }
  }

  return [...matches.values()];
}

function searchDefault(query: string): SearchResultAyah[] {
  const translationMap = getDefaultTranslationMap();

  return ayahs
    .filter((ayah) => matchesQuery(ayah.text, query) || matchesQuery(translationMap.get(ayah.id)?.data, query))
    .map((ayah) => ({
      ...attachEdition(ayah),
      matched_identifiers: ['core.ar', DEFAULT_TRANSLATION_IDENTIFIER],
    }));
}

export type { Ayah, AyahEdition, Edition, EditionManifest, Hizb, Juz, ResolvedAyah, SearchFilters, SearchResultAyah, Surah } from '@/lib/quran-types';

export function getAllSurahs(page?: number, limit?: number) {
  if (page && limit) {
    return paginate(surahs, page, limit);
  }

  return {
    items: surahs,
    meta: {
      total: surahs.length,
    },
  };
}

export function getSurahById(id: number, identifier?: string): (Surah & { ayahs: ResolvedAyah[] }) | null {
  const surah = surahsById.get(id) ?? surahsByNumber.get(id) ?? null;
  if (!surah) {
    return null;
  }

  const surahAyahs = ayahs.filter((ayah) => ayah.surah_id === surah.id);
  return {
    ...surah,
    ayahs: resolveAyahs(surahAyahs, identifier),
  };
}

export function getAyahByNumber(number: number, identifier?: string): ResolvedAyah | null {
  const ayah = ayahsByNumber.get(number) ?? null;
  if (!ayah) {
    return null;
  }

  return attachEdition(ayah, identifier);
}

export function getAllEditions(): Edition[] {
  return editions;
}

export function getTextEditions(): Edition[] {
  return editions.filter(isSearchableEdition);
}

export function getEditionByIdentifier(identifier: string): Edition | null {
  return editionsByIdentifier.get(identifier) ?? null;
}

export function getAyahTextForEdition(ayahId: number, identifier: string): string | null {
  return loadEditionContent(identifier).get(ayahId)?.data ?? null;
}

export function getJuzById(id: number, identifier?: string): (Juz & { ayahs: ResolvedAyah[] }) | null {
  const juz = juzs.find((item) => item.id === id) ?? null;
  if (!juz) {
    return null;
  }

  return {
    ...juz,
    ayahs: getAyahsByJuz(id, identifier),
  };
}

export function getAyahsByJuz(id: number, identifier?: string): ResolvedAyah[] {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.juz_id === id),
    identifier,
  );
}

export function getAyahsByHizb(id: number, identifier?: string): ResolvedAyah[] {
  return resolveAyahs(
    ayahs.filter((ayah) => ayah.hizb_id === id),
    identifier,
  );
}

export function getSupportedLanguages(): string[] {
  return [...supportedLanguages].sort();
}

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

export function validateEditionFilter(identifier: string | null): string | null {
  if (!identifier) {
    return null;
  }

  const edition = getEditionByIdentifier(identifier);
  if (!edition) {
    throw new Error(`Unknown edition "${identifier}"`);
  }

  return identifier;
}

export function validateSearchEditionFilter(identifier: string | null): string | null {
  const validated = validateEditionFilter(identifier);
  if (!validated) {
    return null;
  }

  const edition = getEditionByIdentifier(validated);
  if (!edition || !isSearchableEdition(edition)) {
    throw new Error(`Unsupported search edition "${validated}"`);
  }

  return validated;
}

export function validateLanguageFilter(language: string | null): string | null {
  if (!language) {
    return null;
  }

  if (!supportedLanguages.has(language)) {
    throw new Error(`Unsupported language "${language}"`);
  }

  return language;
}
