# Quran Developer Platform

[![npm version](https://img.shields.io/npm/v/@faha1999/al-quran-database)](https://www.npmjs.com/package/@faha1999/al-quran-database)
[![npm downloads](https://img.shields.io/npm/dm/@faha1999/al-quran-database)](https://www.npmjs.com/package/@faha1999/al-quran-database)
[![GitHub stars](https://img.shields.io/github/stars/faha1999/al-quran-database)](https://github.com/faha1999/al-quran-database)
[![License](https://img.shields.io/npm/l/@faha1999/al-quran-database)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/faha1999/al-quran-database/ci.yml?label=CI)](https://github.com/faha1999/al-quran-database/actions)

Developer-first Quran dataset and API platform. Strict TypeScript, full offline support, REST + GraphQL API, 134 translations, word-by-word data, and a per-ayah scholarly knowledge base.

## Zero-setup quick start

```bash
npm install @faha1999/al-quran-database
```

```ts
import { getSurah, getAyah, searchAyahs } from '@faha1999/al-quran-database';

// No server. No network. No .env file. Works immediately.
const fatiha = getSurah(1);
// → { id: 1, name_en: 'Al-Faatiha', ayahs: [...7 resolved ayahs...] }

const ayah = getAyah(1, 'en.sahih');
// → { text: 'بِسْمِ ٱللَّهِ ...', translation: 'In the name of Allah...' }

const results = searchAyahs('mercy');
// → { items: [...], meta: { total: 50, ... } }
```

The package ships its own data — **no running server required**. Four editions are bundled for instant offline use: `en.sahih`, `en.yusufali`, `quran-simple-clean`, and `quran-uthmani`. All 134 other editions are available via CDN (see [CDN access](#cdn-access-via-jsdelivr) below).

## What makes this different

| Feature | This package | `quran-json` | `quran-meta` | `@quranjs/api` |
|---|---|---|---|---|
| Works offline (no server) | ✅ | ✅ | ✅ | ❌ needs their API |
| TypeScript types | ✅ full | ❌ | ✅ | ✅ |
| 134 translations / editions | ✅ | partial | ❌ | partial |
| Word-by-word morphology | ✅ | ❌ | ❌ | ❌ |
| Per-ayah knowledge base | ✅ | ❌ | ❌ | ❌ |
| GraphQL API | ✅ | ❌ | ❌ | ❌ |
| SQL (PostgreSQL + SQLite) export | ✅ | ❌ | ❌ | ❌ |
| REST API (self-host or local) | ✅ | ❌ | ❌ | ❌ |

## Local data functions (offline, zero-dependency)

All functions below work with no network or server:

```ts
import {
  getSurah,          // surah + all resolved ayahs
  getAyah,           // single ayah with translation + knowledge
  getAyahByNumber,   // ayah by global number (1–6236)
  getAllSurahs,       // all 114 surahs (paginatable)
  getJuzById,        // juz with its ayahs
  getHizbById,       // hizb with its ayahs
  getRubById,        // rub with its ayahs
  getPageById,       // Mushaf page with its ayahs
  searchAyahs,       // full-text search (Arabic + translations)
  getReciters,       // reciter list
  getDuas,           // duas from Quran
  getKnowledgeByAyah,  // per-ayah scholarly entry
  getKnowledgeFaqs,    // FAQ knowledge base
  getDatasetMetadata,  // dataset provenance info
  // Raw data
  surahs, ayahs, editions, juzs, hizbs, rubs, pages,
  BUNDLED_EDITION_IDENTIFIERS,  // ['en.sahih', 'en.yusufali', ...]
} from '@faha1999/al-quran-database';
```

### Bundled editions (available offline)

```ts
import { BUNDLED_EDITION_IDENTIFIERS, getSurah } from '@faha1999/al-quran-database';
console.log(BUNDLED_EDITION_IDENTIFIERS);
// → ['en.sahih', 'quran-simple-clean', 'en.yusufali', 'quran-uthmani']

const surahWithArabic = getSurah(2, 'quran-uthmani');
const surahWithEnglish = getSurah(2, 'en.sahih');
```

## CDN access via jsDelivr

Served directly from the GitHub repository via jsDelivr — no signup, no config, CORS enabled, globally cached:

```
Base URL: https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@{tag}/{path}
```

```html
<!-- Fetch in JS -->
const res = await fetch('https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/surahs.json');
const surahs = await res.json();
```

Available data files on CDN:

| CDN path | Description |
|---|---|
| `lib/data/surahs.json` | All 114 surahs |
| `lib/data/ayahs.json` | All 6236 ayahs |
| `lib/data/editions.json` | All 134 editions metadata |
| `lib/data/juzs.json` | 30 juz divisions |
| `lib/data/hizbs.json` | 60 hizb divisions |
| `lib/data/rubs.json` | Rub divisions |
| `lib/data/pages.json` | Mushaf pages |
| `lib/data/knowledge-base.json` | Scholarly knowledge entries |
| `lib/data/duas.json` | Duas from the Quran |
| `lib/data/reciters.json` | Reciter metadata |
| `lib/data/ayah-editions/en.sahih.json` | Sahih International (English) |
| `lib/data/ayah-editions/en.yusufali.json` | Yusuf Ali (English) |
| `lib/data/ayah-editions/quran-uthmani.json` | Uthmani Arabic text |
| `lib/data/ayah-editions/quran-simple-clean.json` | Clean Arabic (no diacritics) |

Pin to a specific release tag (e.g. `@v2.2.0`) for production. Use `@main` for the latest commit.


## Self-hosted REST + GraphQL API

For applications that need all 134 editions, advanced search, or real-time features, run the full platform locally or deploy it yourself:

```bash
git clone https://github.com/faha1999/al-quran-database
npm install
npm run dev
```

```ts
import { QuranDevSDK } from '@faha1999/al-quran-database';

const sdk = new QuranDevSDK({ baseUrl: 'http://localhost:3000' });
const result = await sdk.getSurah(2, 'ur.maududi');  // any of 134 editions
const search = await sdk.search('mercy', { language: 'ur' });
```

Open locally:

- Docs: [http://localhost:3000/docs](http://localhost:3000/docs)
- Search UI: [http://localhost:3000/search](http://localhost:3000/search)
- REST example: [http://localhost:3000/api/v1/search?q=mercy&language=en](http://localhost:3000/api/v1/search?q=mercy&language=en)
- GraphQL: `POST /api/v1/graphql`

## What ships

- Zero-dependency offline data layer with 20+ typed functions
- Clean REST API for surahs, ayahs, juz, hizb, rub, pages, words, duas, reciters, and search
- Versioned REST under `/api/v1/*` plus legacy `/api/*` aliases
- GraphQL endpoint for flexible multi-entity queries
- Sharded JSON architecture for fast local reads and edge-friendly deployment
- Canonical JSON-first workflow: `quran.sql` stays local, committed data lives in `lib/data/*`
- Deterministic SQL → JSON verification with source SHA-256 metadata
- Normalized PostgreSQL + SQLite exports including knowledge/context tables
- Optional Redis cache layer with in-memory fallback for hot API routes
- Publishable JS/TS SDK: `@faha1999/al-quran-database`
- Search UI with composable edition and language filters
- SQL conversion, migration, export, validation, and performance scripts

## Stack

- Next.js 16 · React 19 · TypeScript strict mode
- Tailwind CSS v4 · FlexSearch · Vitest · Playwright · ESLint + Prettier

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run verify:sdk
```

Data pipeline:

```bash
npm run data:convert
npm run data:verify -- --check-determinism
npm run data:export
npm run data:migrate
npm run data:seed
npm run data:bench
```

## Canonical data model

- `quran.sql` is local-only and ignored by Git (source dump too large for repo workflows).
- `lib/data/*` is the committed source-of-truth.
- `scripts/convert_quran_sql.py` derives JSON, sharded edition payloads, groupings, and metadata.
- `scripts/verify_quran_data.py` proves row counts, shard integrity, and deterministic rebuilds.
- `scripts/export_sql.py` regenerates downloadable PostgreSQL and SQLite artifacts.

## API platform notes

- Versioned REST lives under `/api/v1/*`.
- Legacy `/api/*` aliases remain for backward compatibility.
- Official hosted domain `al-quran-database.vercel.app` is a docs/showcase site only — API
  traffic is disabled. Use local or self-hosted deployments for runtime access.
- GraphQL supports composing `surah`, `ayah`, `search`, `faqs`, `knowledge`, and `meta`.
- Search accepts either `edition` or `language`; sending both returns a validation error.
- Set `REDIS_URL` to enable shared cache. Without it, in-memory cache still accelerates hot reads.

## Docs

- Product docs UI: [`app/docs/*`](./app/docs)
- SDK package source: [`packages/sdk`](./packages/sdk)
- Repo docs: [`docs/api-reference.md`](./docs/api-reference.md), [`docs/sdk-guide.md`](./docs/sdk-guide.md),
  [`docs/architecture.md`](./docs/architecture.md), [`docs/frontend-guide.md`](./docs/frontend-guide.md)
- Live docs: [https://al-quran-database.vercel.app/docs](https://al-quran-database.vercel.app/docs)

## Quality gates

- All API routes return `{ success, data?, error?, meta? }`
- Shared route helpers centralize validation and error logging
- CI runs format check, lint, typecheck, unit/integration tests, SDK build/pack, e2e smoke tests, build
- PR template + CODEOWNERS support review discipline before merge

## SDK release automation

- SDK npm releases are published from `main` by GitHub Actions.
- Qualifying `main` branch changes auto-bump the next patch version from the npm registry state.
- Current public exports: `QuranDevSDK`, `quran`, `getSurah`, `getAyah`, `searchAyahs`,
  and all local data functions — plus all TypeScript types.

## Support this project

If this project saves you time or powers your app, consider [sponsoring on GitHub](https://github.com/sponsors/faha1999). Every star and share also helps new developers discover it. ⭐

## Links

- Repository: [https://github.com/faha1999/al-quran-database](https://github.com/faha1999/al-quran-database)
- npm: [https://www.npmjs.com/package/@faha1999/al-quran-database](https://www.npmjs.com/package/@faha1999/al-quran-database)
- Docs: [https://al-quran-database.vercel.app/docs](https://al-quran-database.vercel.app/docs)
- CHANGELOG: [CHANGELOG.md](./CHANGELOG.md)

## License

MIT. See [`LICENSE`](./LICENSE).
