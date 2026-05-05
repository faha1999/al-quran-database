export interface Surah {
  id: number;
  number: number;
  name_ar: string;
  name_en: string;
  name_en_translation: string;
  type: string;
}

export interface Ayah {
  id: number;
  number: number;
  text: string;
  number_in_surah: number;
  page: number;
  surah_id: number;
  hizb_id: number;
  rub_id: number;
  juz_id: number;
  sajda: boolean;
  words?: Word[];
}

export interface Word {
  id: number;
  ayah_id: number;
  text: string;
  position: number;
  surah_id: number;
  number_in_surah: number;
  root: string | null;
  morphology: string | null;
}

export interface Edition {
  id: number;
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface AyahEdition {
  ayah_id: number;
  data: string;
  is_audio: boolean;
}

export interface Reciter {
  id: number;
  name: string;
  identifier: string;
  type: string;
  bitrate: string;
}

export interface Dua {
  ayah_id: number;
  surah_id: number;
  ayah_number: number;
  text: string;
}

export interface AsbabAlNuzulEntry {
  ayah_id: number;
  surah_id: number;
  content: string;
  source: string;
}

export interface HadithReferenceEntry {
  ayah_id: number;
  surah_id: number;
  hadith: string;
  source: string;
}

export interface ExtraContext {
  asbab_al_nuzul: AsbabAlNuzulEntry[];
  hadith_references: HadithReferenceEntry[];
}

export interface Page {
  id: number;
  ayah_count: number;
  start_ayah_number: number;
  end_ayah_number: number;
  start_page: number;
  end_page: number;
  surah_ids: number[];
}

export interface Rub {
  id: number;
  ayah_count: number;
  start_ayah_number: number;
  end_ayah_number: number;
  start_page: number;
  end_page: number;
  surah_ids: number[];
}

export interface Juz {
  id: number;
  ayah_count: number;
  start_ayah_number: number;
  end_ayah_number: number;
  start_page: number;
  end_page: number;
  surah_ids: number[];
}

export interface Hizb {
  id: number;
  ayah_count: number;
  start_ayah_number: number;
  end_ayah_number: number;
  start_page: number;
  end_page: number;
  surah_ids: number[];
}

export interface EditionManifestEntry {
  edition_id: number;
  language: string;
  type: string;
  format: string;
  row_count: number;
  files: string[];
}

export interface EditionManifest {
  default_translation_identifier: string;
  editions: Record<string, EditionManifestEntry>;
}

export interface EditionSummary {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface ResolvedAyah extends Ayah {
  translation: string | null;
  edition_content?: string | null;
  edition?: EditionSummary | null;
}

export interface SearchFilters {
  edition?: string;
  language?: string;
  limit?: number;
  page?: number;
}

export interface SearchResultAyah extends ResolvedAyah {
  matched_identifiers: string[];
}

export interface SearchFilterState {
  edition: string;
  language: string;
}
