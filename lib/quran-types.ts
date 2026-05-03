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
  juz_id: number;
  sajda: boolean;
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
