# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.0] — 2026-08-14

### Added

- **Zero-network local data layer** — `getSurah`, `getAyah`, `searchAyahs`, and 20+ more
  data functions now work directly from bundled JSON with no server, no `fetch`, and no runtime
  dependencies. Works in browsers, edge runtimes, and Node.js environments.

  ```ts
  import { getSurah, getAyah, searchAyahs } from '@faha1999/al-quran-database';

  const fatiha = getSurah(1);           // no server, no network call
  const ayah = getAyah(1, 'en.sahih'); // with bundled Sahih International
  const hits = searchAyahs('mercy');   // offline full-text search
  ```

- **Bundled editions** — four editions now ship inside the package for instant offline access:
  - `en.sahih` — Sahih International (English)
  - `en.yusufali` — Yusuf Ali (English)
  - `quran-simple-clean` — Clean Arabic text (diacritics stripped)
  - `quran-uthmani` — Full Uthmani Arabic text

- **jsDelivr / unpkg CDN support** — all bundled data is automatically available via CDN
  from the moment a new version is published (no extra setup):
  ```
  https://cdn.jsdelivr.net/npm/@faha1999/al-quran-database@2.1.0/src/data/surahs.json
  ```

- **Raw data exports** — `surahs`, `ayahs`, `editions`, `juzs`, `hizbs`, `rubs`, `pages`,
  `reciters`, `duas`, `knowledgeBase`, `datasetMetadata`, `extraContext` are all exported
  directly for consumers who want the raw arrays or Maps.

- **`BUNDLED_EDITION_IDENTIFIERS`** — exported constant listing all editions available offline.

- **`CODE_OF_CONDUCT.md`** — Contributor Covenant v2.1 added to the repository.

- **GitHub Sponsors** — `.github/FUNDING.yml` added; sponsor button now appears on the repo.

- **Issue templates** — structured GitHub issue forms for bug reports and good-first-issue tasks.

- **Light contribution path** — documented in `CONTRIBUTING.md`; docs/example/typo PRs skip the
  full quality gate to lower the barrier for first-time contributors.

### Changed

- `packages/sdk/package.json` — description updated to reflect offline capability;
  expanded keywords for better npm discoverability (`quran-data`, `quran-offline`,
  `islamic-data`, `offline`, `zero-dependency`, `standalone`, `word-by-word`, `tafsir`, etc.).

- `packages/sdk/tsconfig.json` — target upgraded from ES2020 to ES2022; `resolveJsonModule`
  enabled.

- `packages/sdk/package.json` `"files"` — added `src/data/` so bundled JSON ships with the
  published package.

### Fixed

- None in this release.

---

## [2.0.3] — 2026-05-05

Initial public releases of the scoped SDK package on npm.
REST + GraphQL API platform, search UI, and SDK client published.

---

[2.1.0]: https://github.com/faha1999/al-quran-database/compare/v2.0.3...v2.1.0
[2.0.3]: https://github.com/faha1999/al-quran-database/releases/tag/v2.0.3
