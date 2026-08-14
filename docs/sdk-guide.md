# SDK Guide

`@faha1999/al-quran-database` — complete Quran dataset with TypeScript SDK.
Works offline with no server. Also includes a REST + GraphQL SDK for full-platform access.

## Install

```bash
npm install @faha1999/al-quran-database
```

---

## Zero-setup local data layer (no server required)

The package ships its own data. These functions work immediately after install — no running server,
no network calls, no `.env` file. Works in browsers, edge runtimes, and Node.js.

```ts
import { getSurah, getAyah, searchAyahs } from '@faha1999/al-quran-database';

const fatiha = getSurah(1);
// → { id: 1, name_en: 'Al-Faatiha', ayahs: [...7 resolved ayahs...] }

const ayah = getAyah(1, 'en.sahih');
// → { text: 'بِسْمِ ٱللَّهِ ...', translation: 'In the name of Allah...' }

const results = searchAyahs('mercy');
// → { items: [...], meta: { total: 50, page: 1, ... } }
```

### Bundled editions (offline, no CDN needed)

```ts
import { BUNDLED_EDITION_IDENTIFIERS } from '@faha1999/al-quran-database';
// → ['en.sahih', 'quran-simple-clean', 'en.yusufali', 'quran-uthmani']

const arabicSurah = getSurah(2, 'quran-uthmani');   // full Uthmani Arabic
const englishSurah = getSurah(2, 'en.sahih');        // Sahih International
```

### Local data functions reference

| Function | Description |
|---|---|
| `getSurah(id, edition?)` | Surah + all resolved ayahs |
| `getAyah(id, edition?)` | Single ayah with translation + knowledge |
| `getAyahByNumber(number, edition?)` | Ayah by global sequential number (1–6236) |
| `getAllSurahs(page?, limit?)` | All 114 surahs, paginatable |
| `getJuzById(id, edition?)` | Juz with its ayahs |
| `getHizbById(id, edition?)` | Hizb with its ayahs |
| `getRubById(id, edition?)` | Rub with its ayahs |
| `getPageById(id, edition?)` | Mushaf page with its ayahs |
| `searchAyahs(query, filters?)` | Full-text search (Arabic + bundled translations) |
| `getReciters()` | Reciter list |
| `getDuas(page?, limit?)` | Duas extracted from the Quran |
| `getKnowledgeByAyah(ayahId)` | Scholarly knowledge entry |
| `getSurahProfile(id)` | Surah period, summary, historical context |
| `getKnowledgeFaqs()` | FAQ knowledge base entries |
| `getResearchReferences()` | Research references |
| `getDatasetMetadata()` | Dataset provenance info |
| `getAllEditions()` | All 134 editions |
| `getSupportedLanguagesList()` | Supported language codes |

### Raw data exports

```ts
import {
  surahs, ayahs, editions, juzs, hizbs, rubs, pages,
  reciters, duas, knowledgeBase, datasetMetadata, extraContext,
  ayahsByNumber, surahsById, editionsByIdentifier,
} from '@faha1999/al-quran-database';
```

### CDN access via jsDelivr

All bundled JSON is automatically served from jsDelivr after each publish — no extra config:

```
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/surahs.json
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/ayah-editions/en.sahih.json
```

---

## REST + GraphQL SDK (requires running server)

For all 134 editions, advanced search, or real-time features, use `QuranDevSDK` against a local
or self-hosted instance.

### Local development

```ts
import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({
  baseUrl: 'http://localhost:3000',
  apiVersion: 'v1',
});
```

### Self-hosted production

```ts
const quran = new QuranDevSDK({
  baseUrl: 'https://your-domain.example',
});

const surah = await quran.getSurah(1, 'ur.maududi'); // any of 134 editions
```

### Same-origin (browser app deployed alongside the API)

```ts
import { quran } from '@faha1999/al-quran-database';

const ayah = await quran.getAyah(1, 'en.sahih', true);
console.log(ayah.words?.[0]?.text);
```

---

## QuranDevSDK method reference

| Method | Description |
|---|---|
| `getSurahs(page?, limit?)` | List all surahs with pagination |
| `getSurah(id, edition?)` | Surah with resolved ayahs |
| `getAyah(id, edition?, includeWords?)` | Ayah with optional words |
| `search(query, filters?)` | FlexSearch-ranked full-text search |
| `getJuz(id, edition?)` | Juz with its ayahs |
| `getHizb(id, edition?)` | Hizb with its ayahs |
| `getRub(id, edition?)` | Rub with its ayahs |
| `getPage(id, edition?)` | Mushaf page with its ayahs |
| `getWords(ayahId)` | Word-by-word breakdown |
| `getDuas(page?, limit?)` | Duas with pagination |
| `getReciters()` | Reciter metadata |
| `getFaqs()` | FAQ knowledge base |
| `getKnowledge(ayahId)` | Scholarly per-ayah entry |
| `getMeta()` | Dataset and knowledge base metadata |
| `getResearchReferences()` | Research references via GraphQL |
| `graphql({ query, variables? })` | Custom GraphQL query |

---

## GraphQL example

```ts
const data = await quran.graphql<{
  ayah: { text: string; knowledge: { themes: string[] } | null } | null;
}>({
  query: `
    query GetAyah($id: Int!) {
      ayah(id: $id) {
        text
        knowledge { themes }
      }
    }
  `,
  variables: { id: 1 },
});
```

---

## Error handling

```ts
try {
  await quran.getSurah(999999);
} catch (error) {
  // REST: "Quran API error: 404 Not Found" or envelope error text
}

// Local functions return null for not-found (no throws):
const surah = getSurah(999); // → null
```

---

## Default behavior

- Local functions: work with zero config — data is bundled in the package.
- `QuranDevSDK` `baseUrl`: defaults to `''` (same-origin).
- `apiVersion`: defaults to `v1`.
- Package is ESM-only, targets Node.js 18+.
- REST helpers throw on non-2xx or failed API envelopes.
- GraphQL helper throws on HTTP failures or `errors` in response.

---

## Public exports

- `QuranDevSDK` — server-based SDK class
- `quran` — singleton `QuranDevSDK` instance
- `getSurah`, `getAyah`, `searchAyahs` + all local functions
- `surahs`, `ayahs`, `editions` + all raw data arrays
- `BUNDLED_EDITION_IDENTIFIERS`, `DEFAULT_TRANSLATION_IDENTIFIER`
- `QuranApiOptions`, `GraphqlRequest`, `MetaPayload`
- All TypeScript entity and response types
