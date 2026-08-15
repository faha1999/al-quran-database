# `@faha1999/al-quran-database`

[![npm version](https://img.shields.io/npm/v/@faha1999/al-quran-database)](https://www.npmjs.com/package/@faha1999/al-quran-database)
[![npm downloads](https://img.shields.io/npm/dm/@faha1999/al-quran-database)](https://www.npmjs.com/package/@faha1999/al-quran-database)
[![License](https://img.shields.io/npm/l/@faha1999/al-quran-database)](https://github.com/faha1999/al-quran-database/blob/main/LICENSE)

Complete Quran dataset with TypeScript SDK — works offline with no server required.
Includes 134 translations, word-by-word data, a scholarly knowledge base, and a REST + GraphQL SDK.

## Install

```bash
npm install @faha1999/al-quran-database
```

## Zero-setup usage (offline, no server)

```ts
import { getSurah, getAyah, searchAyahs } from '@faha1999/al-quran-database';

// Works immediately — no running server, no network, no .env file
const fatiha = getSurah(1);
// → { id: 1, name_en: 'Al-Faatiha', ayahs: [...7 ayahs with translations...] }

const ayah = getAyah(1, 'en.sahih');
// → { text: 'بِسْمِ ٱللَّهِ ...', translation: 'In the name of Allah...' }

const results = searchAyahs('mercy');
// → { items: [...], meta: { total: 50, page: 1, ... } }
```

### Bundled editions (available offline)

```ts
import { BUNDLED_EDITION_IDENTIFIERS } from '@faha1999/al-quran-database';
// → ['en.sahih', 'quran-simple-clean', 'en.yusufali', 'quran-uthmani']

const surah = getSurah(2, 'quran-uthmani'); // full Uthmani Arabic
const surah = getSurah(2, 'en.sahih'); // Sahih International English
```

All 134 other editions are available via CDN or the self-hosted REST API.

## Local data functions reference

```ts
import {
  // Surahs
  getSurah,
  getAllSurahs,
  // Ayahs
  getAyah,
  getAyahByNumber,
  // Divisions
  getJuzById,
  getHizbById,
  getRubById,
  getPageById,
  getJuzs,
  getHizbs,
  getRubs,
  getPages,
  // Editions
  getAllEditions,
  getTextEditions,
  getEditionByIdentifier,
  // Content
  getReciters,
  getDuas,
  // Knowledge base
  getKnowledgeByAyah,
  getSurahProfile,
  getKnowledgeFaqs,
  getKnowledgeCoverage,
  // Research
  getResearchReferences,
  // Meta
  getDatasetMetadata,
  getSupportedLanguagesList,
  // Search
  searchAyahs,
  // Raw data arrays
  surahs,
  ayahs,
  editions,
  juzs,
  hizbs,
  rubs,
  pages,
  reciters,
  duas,
  knowledgeBase,
  datasetMetadata,
  extraContext,
  // Utilities
  BUNDLED_EDITION_IDENTIFIERS,
  DEFAULT_TRANSLATION_IDENTIFIER,
  paginate,
  loadEditionContent,
} from '@faha1999/al-quran-database';
```

## CDN access (no install needed)

All bundled files are available on jsDelivr instantly after publish:

```
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/surahs.json
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/ayahs.json
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/ayah-editions/en.sahih.json
```

## Self-hosted REST + GraphQL API

For all 134 editions or advanced features, run the full platform:

```ts
import { QuranDevSDK } from '@faha1999/al-quran-database';

const sdk = new QuranDevSDK({ baseUrl: 'http://localhost:3000' });
const surah = await sdk.getSurah(2, 'ur.maududi'); // any of 134 editions
const hits = await sdk.search('mercy', { language: 'en' });
```

### `QuranDevSDK` API

- `getSurahs(page?, limit?)`
- `getSurah(id, edition?)`
- `getAyah(id, edition?, includeWords?)`
- `search(query, filters?)`
- `getJuz(id, edition?)`
- `getHizb(id, edition?)`
- `getRub(id, edition?)`
- `getPage(id, edition?)`
- `getWords(ayahId)`
- `getDuas(page?, limit?)`
- `getReciters()`
- `getFaqs()`
- `getKnowledge(ayahId)`
- `getMeta()`
- `getResearchReferences()`
- `graphql({ query, variables? })`

### GraphQL example

```ts
const data = await sdk.graphql<{
  meta: { dataset: { counts: { ayahs: number } } };
}>({
  query: `query Meta { meta { dataset { counts { ayahs } } } }`,
});
console.log(data.meta.dataset.counts.ayahs); // → 6236
```

## Default behavior

- Local functions work with zero config — data is bundled in the package.
- `QuranDevSDK` `baseUrl` defaults to same-origin (for browser apps deployed alongside the API).
- `apiVersion` defaults to `v1`.
- Package is ESM-only, targets Node.js 18+.
- REST helpers throw on non-2xx or unsuccessful API envelopes.

## Links

- Docs: [https://al-quran-database.vercel.app/docs/sdk](https://al-quran-database.vercel.app/docs/sdk)
- API reference: [https://al-quran-database.vercel.app/docs/api-reference](https://al-quran-database.vercel.app/docs/api-reference)
- Repository: [https://github.com/faha1999/al-quran-database](https://github.com/faha1999/al-quran-database)
- npm: [https://www.npmjs.com/package/@faha1999/al-quran-database](https://www.npmjs.com/package/@faha1999/al-quran-database)
- CHANGELOG: [https://github.com/faha1999/al-quran-database/blob/main/CHANGELOG.md](https://github.com/faha1999/al-quran-database/blob/main/CHANGELOG.md)
