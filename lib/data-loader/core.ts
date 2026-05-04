import { readFileSync } from 'node:fs';
import path from 'node:path';
import type {
  Ayah,
  Edition,
  EditionManifest,
  Hizb,
  Juz,
  Page,
  Rub,
  Surah,
  Word,
} from '@/lib/quran-types';

const DATA_DIR = path.join(process.cwd(), 'lib', 'data');
const readJson = <T>(filePath: string): T => JSON.parse(readFileSync(filePath, 'utf8')) as T;

export const surahs = readJson<Surah[]>(path.join(DATA_DIR, 'surahs.json'));
export const ayahs = readJson<Ayah[]>(path.join(DATA_DIR, 'ayahs.json'));
export const editions = readJson<Edition[]>(path.join(DATA_DIR, 'editions.json'));
export const juzs = readJson<Juz[]>(path.join(DATA_DIR, 'juzs.json'));
export const hizbs = readJson<Hizb[]>(path.join(DATA_DIR, 'hizbs.json'));
export const rubs = readJson<Rub[]>(path.join(DATA_DIR, 'rubs.json'));
export const pages = readJson<Page[]>(path.join(DATA_DIR, 'pages.json'));
export const words = readJson<Word[]>(path.join(DATA_DIR, 'words.json'));
export const editionManifest = readJson<EditionManifest>(path.join(DATA_DIR, 'edition-manifest.json'));
export const reciters = readJson<any[]>(path.join(DATA_DIR, 'reciters.json'));
export const duas = readJson<any[]>(path.join(DATA_DIR, 'duas.json'));
export const extraContext = readJson<any>(path.join(DATA_DIR, 'extra_context.json'));

export const DEFAULT_TRANSLATION_IDENTIFIER = editionManifest.default_translation_identifier;

export const ayahsByNumber = new Map(ayahs.map((ayah) => [ayah.number, ayah]));
export const surahsById = new Map(surahs.map((surah) => [surah.id, surah]));
export const surahsByNumber = new Map(surahs.map((surah) => [surah.number, surah]));
export const editionsByIdentifier = new Map(editions.map((edition) => [edition.identifier, edition]));
export const supportedLanguages = new Set(
  editions.filter((e) => e.format === 'text').map((edition) => edition.language),
);

export function getJsonPath(filePath: string): string {
  return path.join(DATA_DIR, filePath);
}
