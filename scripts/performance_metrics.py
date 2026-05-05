from __future__ import annotations

import json
import sqlite3
import time
from pathlib import Path

DATA_DIR = Path("lib/data")
SQLITE_FILE = Path("public/quran_indexed.sqlite")


def benchmark_json_loading():
    print("--- JSON Loading Benchmark ---")
    files = [
        "ayahs.json",
        "words.json",
        "surahs.json",
        "knowledge-base.json",
        "dataset-metadata.json",
    ]
    for filename in files:
        path = DATA_DIR / filename
        if not path.exists():
            continue

        start = time.perf_counter()
        with path.open("r", encoding="utf-8") as handle:
            payload = json.load(handle)
        elapsed_ms = (time.perf_counter() - start) * 1000
        size_mb = path.stat().st_size / (1024 * 1024)
        row_count = len(payload) if isinstance(payload, list) else len(payload.keys())
        print(
            f"File: {filename:20} | Size: {size_mb:7.2f} MB | Rows/Keys: {row_count:6} | Time: {elapsed_ms:8.2f} ms"
        )


def benchmark_sqlite_queries():
    if not SQLITE_FILE.exists():
        print("\nSQLite file not found. Run export_sql.py first.")
        return

    print("\n--- SQLite Query Benchmark ---")
    conn = sqlite3.connect(SQLITE_FILE)
    cursor = conn.cursor()

    queries = [
        ("Fetch Surah 1", "SELECT * FROM surahs WHERE id = 1"),
        ("Fetch ayahs in Juz 1", "SELECT id, number FROM ayahs WHERE juz_id = 1"),
        ("Word root lookup", "SELECT text FROM words WHERE root = 'كتب'"),
        (
            "Join ayah themes",
            "SELECT a.number, t.theme FROM ayah_themes t JOIN ayahs a ON a.id = t.ayah_id LIMIT 20",
        ),
        (
            "Cross-reference lookup",
            "SELECT related_ayah_id FROM ayah_cross_references WHERE ayah_id = 255",
        ),
    ]

    for label, sql in queries:
        start = time.perf_counter()
        cursor.execute(sql)
        rows = cursor.fetchall()
        elapsed_ms = (time.perf_counter() - start) * 1000
        print(f"Query: {label:24} | Results: {len(rows):6} | Time: {elapsed_ms:8.2f} ms")

    conn.close()


if __name__ == "__main__":
    benchmark_json_loading()
    benchmark_sqlite_queries()
