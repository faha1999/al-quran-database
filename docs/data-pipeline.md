# Data Pipeline

The Al-Quran Database uses a robust, deterministic Python-based pipeline to process raw SQL data into optimized JSON artifacts and relational exports.

## Pipeline Overview

1. **Extraction**: Raw data is extracted from the canonical `quran.sql` file.
2. **Transformation**: Data is normalized, sharded, and cross-referenced.
3. **Verification**: Cryptographic hashes and row counts are verified to ensure integrity.
4. **Distribution**: Optimized JSON files and SQL exports (SQLite/PostgreSQL) are generated for production use.

## Core Scripts

### `convert_quran_sql.py`

The primary conversion script that transforms `quran.sql` into JSON.

- **Normalized Outputs**: Generates `surahs.json`, `ayahs.json`, and division maps (`juzs.json`, etc.).
- **Data Sharding**: Large translation datasets are split into smaller shards (e.g., `ayah-editions/en.sahih.part-1.json`) to optimize memory usage.
- **Manifest Generation**: Creates `edition-manifest.json` to help the loaders locate specific data shards.

### `verify_quran_data.py`

Ensures the generated JSON matches the source SQL.

- **Integrity Checks**: Validates row counts for Surahs, Ayahs, and Editions.
- **Determinism Check**: (Optional) Re-runs the conversion in a temporary directory and compares file hashes to ensure the process is 100% reproducible.
- **Schema Validation**: Ensures all `ayah_id` and `surah_id` references are valid within the generated dataset.

### `export_sql.py`

Generates production-ready relational database files.

- **PostgreSQL**: Produces `public/quran_postgres.sql` with full schema, foreign keys, and indexes.
- **SQLite**: Produces `public/quran_indexed.sqlite` for local or edge deployment.
- **Enrichment**: Merges core Quran text with scholarly metadata from the knowledge base.

### `performance_metrics.py`

Benchmarks the data loading and search performance.

- Benchmarks JSON loading time for core committed dataset files.
- Benchmarks representative SQLite queries against generated relational exports.
- Helps validate export usefulness and hot-path dataset read cost.

## Data Integrity & Hashing

The `dataset-metadata.json` file stores the SHA-256 hash of the source `quran.sql` and the generation timestamp. This allows for clear provenance and version tracking of the dataset.

## How to Run the Pipeline

```bash
# Convert SQL to JSON
npm run data:convert

# Verify data integrity
npm run data:verify

# Generate SQL exports
npm run data:export
```
