# Quran Developer Platform

Developer-first Quran dataset and API platform built on canonical sharded JSON, strict
TypeScript, Next.js App Router, and a lightweight JS/TS SDK.

## What ships

- Clean REST API for surahs, ayahs, juz, hizb, rub, pages, words, duas, reciters, and search
- Sharded JSON architecture for fast local reads and edge-friendly deployment
- Canonical JSON-first workflow: `quran.sql` stays local, committed data lives in `lib/data/*`
- Deterministic SQL → JSON verification with source SHA-256 metadata
- Normalized PostgreSQL + SQLite exports including knowledge/context tables
- JS/TS SDK in [`lib/sdk.ts`](al-quran-database/lib/sdk.ts)
- Search UI with composable edition and language filters
- SQL conversion, migration, export, validation, and performance scripts
- Repo docs for architecture, coding standards, roadmap, review policy, and release flow

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
- Search UI: [http://localhost:3000/search](http://localhost:3000/search)
- API example: [http://localhost:3000/api/search?q=mercy&language=en](http://localhost:3000/api/search?q=mercy&language=en)

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
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

## Docs

- Product docs UI: [`app/docs/*`](al-quran-database/app/docs)
- Repo docs: [`docs/architecture.md`](al-quran-database/docs/architecture.md),
  [`docs/roadmap.md`](al-quran-database/docs/roadmap.md),
  [`docs/review-process.md`](al-quran-database/docs/review-process.md),
  [`docs/coding-style.md`](al-quran-database/docs/coding-style.md)

## Quality gates

- All API routes return `{ success, data?, error?, meta? }`
- Shared route helpers centralize validation and error logging
- CI runs format check, lint, typecheck, unit/integration tests, e2e smoke tests, build
- PR template + CODEOWNERS support review discipline before merge

## License

MIT. See [`LICENSE`](al-quran-database/LICENSE).
