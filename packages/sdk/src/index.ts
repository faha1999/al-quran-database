// Server-based SDK (requires a running backend)
export { QuranDevSDK, quran } from './sdk.js';
export type { GraphqlRequest, MetaPayload, QuranApiOptions } from './sdk.js';

// Zero-network local data layer (works offline, no server needed)
export {
  // Data access functions
  getSurah,
  getAyah,
  getAyahByNumber,
  getAllSurahs,
  getAllEditions,
  getTextEditions,
  getEditionByIdentifier,
  getJuzs,
  getJuzById,
  getHizbs,
  getHizbById,
  getRubs,
  getRubById,
  getPages,
  getPageById,
  getReciters,
  getDuas,
  getKnowledgeByAyah,
  getSurahProfile,
  getKnowledgeCoverage,
  getKnowledgeFaqs,
  getResearchReferences,
  getDatasetMetadata,
  getSupportedLanguagesList,
  searchAyahs,
  // Utilities
  paginate,
  loadEditionContent,
  BUNDLED_EDITION_IDENTIFIERS,
  DEFAULT_TRANSLATION_IDENTIFIER,
  // Raw data exports
  surahs,
  ayahs,
  editions,
  editionManifest,
  juzs,
  hizbs,
  rubs,
  pages,
  reciters,
  duas,
  knowledgeBase,
  datasetMetadata,
  extraContext,
  // Lookup maps
  ayahsByNumber,
  surahsById,
  surahsByNumber,
  editionsByIdentifier,
  supportedLanguages,
  knowledgeByAyahId,
  surahProfilesById,
  knowledgeFaqs,
  researchReferences,
} from './local.js';

// All TypeScript types
export type * from './quran-types.js';
