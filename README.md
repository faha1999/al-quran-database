# Quran Developer Platform

Developer-first Quran dataset and API platform built on canonical sharded JSON, strict
TypeScript, Next.js App Router, and a lightweight JS/TS SDK.

## What ships

- Clean REST API for surahs, ayahs, juz, hizb, rub, pages, words, duas, reciters, and search
- Versioned REST under `/api/v1/*` plus legacy `/api/*` aliases
- GraphQL endpoint for flexible multi-entity queries
- Sharded JSON architecture for fast local reads and edge-friendly deployment
- Canonical JSON-first workflow: `quran.sql` stays local, committed data lives in `lib/data/*`
- Deterministic SQL → JSON verification with source SHA-256 metadata
- Normalized PostgreSQL + SQLite exports including knowledge/context tables
- Optional Redis cache layer with in-memory fallback for hot API routes
- Publishable JS/TS SDK package: `@faha1999/al-quran-database`
- Search UI with composable edition and language filters
- SQL conversion, migration, export, validation, and performance scripts
- Repo docs for architecture, coding standards, roadmap, review policy, and release flow
- Next.js docs pages for getting started, API reference, SDK usage, database exports, frontend guidance, and data expansion

## Stack

- Next.js 16
- React 19
- TypeScript strict mode
- Tailwind CSS v4
- FlexSearch
- Vitest
- Playwright
- ESLint + Prettier

## Local setup

```bash
npm install
npm run dev
```

Open:

- Docs: [http://localhost:3000/docs](http://localhost:3000/docs)
- SDK guide: [http://localhost:3000/docs/sdk](http://localhost:3000/docs/sdk)
- API reference: [http://localhost:3000/docs/api-reference](http://localhost:3000/docs/api-reference)
- Database exports: [http://localhost:3000/docs/database](http://localhost:3000/docs/database)
- Search UI: [http://localhost:3000/search](http://localhost:3000/search)
- REST example: [http://localhost:3000/api/v1/search?q=mercy&language=en](http://localhost:3000/api/v1/search?q=mercy&language=en)
- GraphQL example: `POST /api/v1/graphql`

SDK package:

```bash
npm install @faha1999/al-quran-database
```

Package source lives in [`packages/sdk`](./packages/sdk).

Hosted SDK setup:

```ts
import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({
  baseUrl: 'https://al-quran-database.vercel.app',
  apiVersion: 'v1',
});
```

Same-origin setup:

```ts
import { quran } from '@faha1999/al-quran-database';

const ayah = await quran.getAyah(1, 'en.sahih', true);
```

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

- `quran.sql` is local-only and ignored by Git because source dump is too large for healthy repo
  workflows.
- `lib/data/*` is committed source-of-truth.
- `scripts/convert_quran_sql.py` derives JSON, sharded edition payloads, pages/juz/hizb/rub
  groupings, and dataset metadata.
- `scripts/verify_quran_data.py` proves row counts, shard integrity, and deterministic rebuilds.
- `scripts/export_sql.py` regenerates downloadable PostgreSQL and SQLite artifacts from committed
  JSON.

## API platform notes

- Versioned REST lives under `/api/v1/*`.
- Legacy `/api/*` aliases remain for backward compatibility during migration.
- GraphQL endpoint supports composing `surah`, `ayah`, `search`, `faqs`, `knowledge`, and `meta`
  in one request.
- Preferred GraphQL write path is `POST /api/v1/graphql`. Legacy `/api/graphql` alias remains.
- GraphQL `GET /api/v1/graphql?query=...` is also supported for quick debugging and cached reads.
- Search accepts either `edition` or `language`; sending both returns validation error.
- Set `REDIS_URL` to enable shared cache. Without it, in-memory cache still accelerates hot reads.

## Docs

- Product docs UI: [`app/docs/*`](./app/docs)
- SDK package source: [`packages/sdk`](./packages/sdk)
- Repo docs: [`docs/api-reference.md`](./docs/api-reference.md), [`docs/sdk-guide.md`](./docs/sdk-guide.md),
  [`docs/architecture.md`](./docs/architecture.md), [`docs/frontend-guide.md`](./docs/frontend-guide.md),
  [`docs/roadmap.md`](./docs/roadmap.md)
- Live docs: [https://al-quran-database.vercel.app/docs](https://al-quran-database.vercel.app/docs)
- Live SDK docs: [https://al-quran-database.vercel.app/docs/sdk](https://al-quran-database.vercel.app/docs/sdk)

## Quality gates

- All API routes return `{ success, data?, error?, meta? }`
- Shared route helpers centralize validation and error logging
- CI runs format check, lint, typecheck, unit/integration tests, SDK build/pack, e2e smoke tests, build
- PR template + CODEOWNERS support review discipline before merge

## SDK release automation

- SDK npm releases are published from `main` by GitHub Actions.
- Qualifying SDK-related changes auto-bump the next patch version from the npm registry state.
- Current public exports: `QuranDevSDK`, `quran`, `QuranApiOptions`, `GraphqlRequest`,
  `MetaPayload`, and public entity/response types from `packages/sdk/src/quran-types.ts`.

## License

MIT. See [`LICENSE`](./LICENSE).
