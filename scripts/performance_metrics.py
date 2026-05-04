import json
import time
import sqlite3
from pathlib import Path

DATA_DIR = Path("lib/data")
SQLITE_FILE = Path("public/quran_indexed.sqlite")

def benchmark_json_loading():
    print("--- JSON Loading Benchmark ---")
    files = ["ayahs.json", "words.json", "surahs.json"]
    for filename in files:
        path = DATA_DIR / filename
        if not path.exists():
            continue
        
        start_time = time.perf_counter()
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        end_time = time.perf_counter()
        
        size_mb = path.stat().st_size / (1024 * 1024)
        print(f"File: {filename:15} | Size: {size_mb:6.2f} MB | Time: {(end_time - start_time)*1000:8.2f} ms")

def benchmark_sqlite_queries():
    if not SQLITE_FILE.exists():
        print("\nSQLite file not found. Run export_sql.py first.")
        return

    print("\n--- SQLite Query Benchmark ---")
    conn = sqlite3.connect(SQLITE_FILE)
    cursor = conn.cursor()

    queries = [
        ("Fetch Surah 1", "SELECT * FROM surahs WHERE id = 1"),
        ("Fetch all Ayahs for Surah 2", "SELECT * FROM ayahs WHERE surah_id = 2"),
        ("Count total words", "SELECT COUNT(*) FROM words"),
        ("Join Ayah with Surah (limit 50)", "SELECT a.text, s.name_en FROM ayahs a JOIN surahs s ON a.surah_id = s.id LIMIT 50"),
        ("Search words by root (k-t-b)", "SELECT text FROM words WHERE root = 'كتب'"),
    ]

    for label, sql in queries:
        start_time = time.perf_counter()
        cursor.execute(sql)
        results = cursor.fetchall()
        end_time = time.perf_counter()
        
        print(f"Query: {label:35} | Results: {len(results):6} | Time: {(end_time - start_time)*1000:8.2f} ms")

    conn.close()

if __name__ == "__main__":
    benchmark_json_loading()
    benchmark_sqlite_queries()
