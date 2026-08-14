# Roadmap

## Phase 1: Intelligent Search & AI (Completed ✅)

- **Ranked Search (FlexSearch)**: Implemented ranked, fuzzy-matched keyword search.
- **Advanced Filtering**: Support for language, edition, and sharded loading.
- **Text Normalization**: Multi-stage Arabic and Latin text normalization for consistent results.

## Phase 2: Rich Content & Media (In Progress 🚧)

- **Word-by-Word Breakdown**: Linguistic data (Arabic tokens) for every word in the Quran.
- **Advanced Divisions**: Mapping for Juz, Hizb, Rub, and Mushaf Pages.
- **Tafsir & Transliteration**: Support for major Tafsirs and transliterations in multiple languages.
- **Audio Integration**: (Pending) Integration of reciter stream URLs.

## Phase 3: Developer Ecosystem & Tools (Completed ✅)

- **JS/TS Developer SDK**: Full-featured SDK for easy API consumption.
- **Zero-setup local data layer**: `getSurah`, `getAyah`, `searchAyahs` and 20+ functions work offline with no server — data bundled in the npm package.
- **Bundled editions**: `en.sahih`, `en.yusufali`, `quran-simple-clean`, `quran-uthmani` ship with the package for instant offline access.
- **jsDelivr/unpkg CDN**: All bundled JSON auto-served from CDN on every publish.
- **Relational SQL Exports**: Pre-indexed PostgreSQL and SQLite database downloads.
- **Sharded Data Pipeline**: Python-based pipeline for processing large datasets.

## Phase 4: Production Readiness (Completed ✅)

- **GraphQL API**: Flexible typed query layer for multi-entity queries.
- **Multi-Level Caching**: Redis-backed L2 cache with in-memory L1 fallback.
- **Versioned REST API**: Stable `/api/v1/*` surface with legacy support.
- **Knowledge Base**: Deep scholarly metadata per-ayah (themes, cross-refs, scientific notes, etc.).
- **Centralized Logging**: Structured logging with severity levels.

## Phase 5: Growth & Distribution (Completed ✅)

- **npm SDK published**: `@faha1999/al-quran-database` live on npm.
- **README overhaul**: Badges, working zero-setup example, CDN section, comparison table.
- **GitHub Sponsors**: FUNDING.yml added — sponsor button live on the repo.
- **Code of Conduct**: Contributor Covenant v2.1 added.
- **Issue templates**: Structured GitHub forms for bug reports and good-first-issue tasks.
- **CHANGELOG**: Keep-a-Changelog format, updated on each release.
- **Light contribution path**: Docs/example PRs no longer require the full quality gate.

## Phase 6: Future Enhancements

1. **Semantic Search**: Vector-based "meaning" search using embeddings.
2. **Interactive Playground**: Swagger/Postman-style UI in the docs.
3. **Quran CLI**: Command-line tool for developers.
4. **Docker Setup**: Containerized deployment for self-hosted instances.
5. **All 134 editions bundled in CDN shards**: Lazy-load any edition by identifier from CDN with a simple fetch helper.
6. **awesome-list listings**: Submissions to `awesome-Islam`, `Awesome-Muslims`, `awesome-islam`.

