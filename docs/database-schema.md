# Database Schema

The Al-Quran Database provides relational SQL exports for PostgreSQL and SQLite. The schema is optimized for analytical queries and cross-referenced with scholarly metadata.

## Core Tables

### `surahs`

Primary metadata for the 114 Surahs.

- `id`: Internal ID (1-114).
- `number`: Surah number.
- `name_ar`: Arabic name.
- `name_en`: Transliterated English name.
- `name_en_translation`: English translation of the name.
- `type`: Revelation type (Meccan/Medinan).

### `ayahs`

The central table linking text, divisions, and metadata.

- `id`: Absolute ayah ID (1-6236).
- `number`: Ayah number within the Surah.
- `text`: Uthmani Arabic text.
- `surah_id`: FK to `surahs`.
- `page`: FK to `pages`.
- `juz_id`, `hizb_id`, `rub_id`: FKs to respective division tables.
- `sajda`: Boolean indicating if a prostration is required.

### `words`

Linguistic breakdown for every word in the Quran.

- `ayah_id`: FK to `ayahs`.
- `text`: Arabic word text.
- `position`: Position within the ayah.
- `root`: Linguistic root (if available).
- `morphology`: Morphological breakdown (if available).

## Divisions (Juz, Hizb, Rub, Page)

Tables `juzs`, `hizbs`, `rubs`, and `pages` share a common structure:

- `id`: Identifier.
- `ayah_count`: Number of ayahs in the division.
- `start_ayah_number`, `end_ayah_number`: Range of absolute ayah IDs.
- `start_page`, `end_page`: Range of Mushaf pages.

## Scholarly Metadata (Knowledge Layer)

- `surah_profiles`: Historical context and summaries for each Surah.
- `ayah_themes`: Thematic tags for ayahs.
- `ayah_cross_references`: Links between related ayahs with relationship descriptions.
- `ayah_scientific_references`: Scientific notes and references.
- `ayah_legal_rulings`: Fiqh rulings derived from or related to the ayah.
- `ayah_linguistic_notes`: Deep linguistic analysis for specific tokens.
- `ayah_misinterpretations`: Clarifications for common misconceptions.

## Indexes

The following indexes are pre-applied to the SQL exports to ensure fast lookups:

- `idx_ayahs_surah`, `idx_ayahs_page`, `idx_ayahs_juz`
- `idx_words_ayah`, `idx_words_root`
- `idx_theme_ayah`, `idx_cross_ayah`, `idx_science_ayah`

## Data Pipeline

The canonical source for this schema is the JSON files in `lib/data/`. The SQL exports are generated using `scripts/export_sql.py`.

## Diagram Status

No ERD or schema diagram artifact is currently committed. The generated PostgreSQL and SQLite exports are documented here, but visual schema documentation remains a pending task.
