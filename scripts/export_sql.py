from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def build_export_rows(data_dir: Path) -> dict[str, list[dict[str, Any]]]:
    surahs = load_json(data_dir / "surahs.json")
    ayahs = load_json(data_dir / "ayahs.json")
    words = load_json(data_dir / "words.json")
    juzs = load_json(data_dir / "juzs.json")
    hizbs = load_json(data_dir / "hizbs.json")
    rubs = load_json(data_dir / "rubs.json")
    pages = load_json(data_dir / "pages.json")
    editions = load_json(data_dir / "editions.json")
    reciters = load_json(data_dir / "reciters.json")
    duas = load_json(data_dir / "duas.json")
    extra_context = load_json(data_dir / "extra_context.json")
    knowledge = load_json(data_dir / "knowledge-base.json")
    metadata = load_json(data_dir / "dataset-metadata.json")

    def group_surah_links(group_rows: list[dict[str, Any]], key_name: str):
        links: list[dict[str, int]] = []
        for group in group_rows:
            for surah_id in group.get("surah_ids", []):
                links.append({key_name: int(group["id"]), "surah_id": int(surah_id)})
        return links

    ayah_themes: list[dict[str, Any]] = []
    ayah_cross_refs: list[dict[str, Any]] = []
    ayah_scientific_refs: list[dict[str, Any]] = []
    ayah_legal_rulings: list[dict[str, Any]] = []
    ayah_linguistic_notes: list[dict[str, Any]] = []
    ayah_misinterpretations: list[dict[str, Any]] = []

    for entry in knowledge["ayahs"]:
        ayah_id = int(entry["ayah_id"])
        for index, theme in enumerate(entry.get("themes", []), start=1):
            ayah_themes.append({"id": len(ayah_themes) + 1, "ayah_id": ayah_id, "position": index, "theme": theme})
        for item in entry.get("cross_references", []):
            ayah_cross_refs.append(
                {
                    "id": len(ayah_cross_refs) + 1,
                    "ayah_id": ayah_id,
                    "related_ayah_id": int(item["ayah_id"]),
                    "relationship": item["relationship"],
                }
            )
        for item in entry.get("scientific_references", []):
            ayah_scientific_refs.append(
                {
                    "id": len(ayah_scientific_refs) + 1,
                    "ayah_id": ayah_id,
                    "title": item["title"],
                    "summary": item["summary"],
                    "caution": item.get("caution"),
                    "references_json": json.dumps(item.get("references", []), ensure_ascii=False),
                }
            )
        for item in entry.get("legal_rulings", []):
            ayah_legal_rulings.append(
                {
                    "id": len(ayah_legal_rulings) + 1,
                    "ayah_id": ayah_id,
                    "scope": item["scope"],
                    "summary": item["summary"],
                    "evidence_json": json.dumps(item.get("evidence", []), ensure_ascii=False),
                }
            )
        for item in entry.get("linguistic_notes", []):
            ayah_linguistic_notes.append(
                {
                    "id": len(ayah_linguistic_notes) + 1,
                    "ayah_id": ayah_id,
                    "token": item["token"],
                    "root": item.get("root"),
                    "morphology": item.get("morphology"),
                    "note": item["note"],
                }
            )
        for item in entry.get("misinterpretation_notes", []):
            ayah_misinterpretations.append(
                {
                    "id": len(ayah_misinterpretations) + 1,
                    "ayah_id": ayah_id,
                    "claim": item["claim"],
                    "clarification": item["clarification"],
                }
            )

    surah_profiles = [
        {
            "surah_id": int(entry["surah_id"]),
            "period": entry["period"],
            "summary": entry["summary"],
            "historical_context": entry["historical_context"],
        }
        for entry in knowledge["surahs"]
    ]

    faq_entries = [
        {"id": int(entry["id"]), "question": entry["question"], "answer": entry["answer"]}
        for entry in knowledge["faqs"]
    ]

    research_references = [
        {
            "id": int(entry["id"]),
            "title": entry["title"],
            "author": entry["author"],
            "type": entry["type"],
            "url": entry["url"],
        }
        for entry in knowledge["research_references"]
    ]

    dataset_metadata_rows = [
        {
            "id": 1,
            "sql_path": metadata["source"]["sql_path"],
            "source_sha256": metadata["source"]["sha256"],
            "source_size_bytes": int(metadata["source"]["size_bytes"]),
            "generated_at": metadata["generated_at"],
        }
    ]

    return {
        "surahs": surahs,
        "ayahs": ayahs,
        "words": words,
        "juzs": [{k: v for k, v in row.items() if k != "surah_ids"} for row in juzs],
        "hizbs": [{k: v for k, v in row.items() if k != "surah_ids"} for row in hizbs],
        "rubs": [{k: v for k, v in row.items() if k != "surah_ids"} for row in rubs],
        "pages": [{k: v for k, v in row.items() if k != "surah_ids"} for row in pages],
        "juz_surahs": group_surah_links(juzs, "juz_id"),
        "hizb_surahs": group_surah_links(hizbs, "hizb_id"),
        "rub_surahs": group_surah_links(rubs, "rub_id"),
        "page_surahs": group_surah_links(pages, "page_id"),
        "editions": editions,
        "reciters": reciters,
        "duas": duas,
        "asbab_al_nuzul": [
            {
                "id": index,
                "ayah_id": int(item["ayah_id"]),
                "surah_id": int(item["surah_id"]),
                "content": item["content"],
                "source": item["source"],
            }
            for index, item in enumerate(extra_context.get("asbab_al_nuzul", []), start=1)
        ],
        "hadith_references": [
            {
                "id": index,
                "ayah_id": int(item["ayah_id"]),
                "surah_id": int(item["surah_id"]),
                "hadith": item["hadith"],
                "source": item["source"],
            }
            for index, item in enumerate(extra_context.get("hadith_references", []), start=1)
        ],
        "surah_profiles": surah_profiles,
        "faq_entries": faq_entries,
        "research_references": research_references,
        "ayah_themes": ayah_themes,
        "ayah_cross_references": ayah_cross_refs,
        "ayah_scientific_references": ayah_scientific_refs,
        "ayah_legal_rulings": ayah_legal_rulings,
        "ayah_linguistic_notes": ayah_linguistic_notes,
        "ayah_misinterpretations": ayah_misinterpretations,
        "dataset_metadata": dataset_metadata_rows,
    }


POSTGRES_SCHEMA = [
    """CREATE TABLE IF NOT EXISTS dataset_metadata (
  id INTEGER PRIMARY KEY,
  sql_path TEXT NOT NULL,
  source_sha256 TEXT NOT NULL,
  source_size_bytes BIGINT NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS surahs (
  id INTEGER PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_en_translation TEXT NOT NULL,
  type TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS juzs (
  id INTEGER PRIMARY KEY,
  ayah_count INTEGER NOT NULL,
  start_ayah_number INTEGER NOT NULL,
  end_ayah_number INTEGER NOT NULL,
  start_page INTEGER NOT NULL,
  end_page INTEGER NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS hizbs (
  id INTEGER PRIMARY KEY,
  ayah_count INTEGER NOT NULL,
  start_ayah_number INTEGER NOT NULL,
  end_ayah_number INTEGER NOT NULL,
  start_page INTEGER NOT NULL,
  end_page INTEGER NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS rubs (
  id INTEGER PRIMARY KEY,
  ayah_count INTEGER NOT NULL,
  start_ayah_number INTEGER NOT NULL,
  end_ayah_number INTEGER NOT NULL,
  start_page INTEGER NOT NULL,
  end_page INTEGER NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY,
  ayah_count INTEGER NOT NULL,
  start_ayah_number INTEGER NOT NULL,
  end_ayah_number INTEGER NOT NULL,
  start_page INTEGER NOT NULL,
  end_page INTEGER NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayahs (
  id INTEGER PRIMARY KEY,
  number INTEGER UNIQUE NOT NULL,
  text TEXT NOT NULL,
  number_in_surah INTEGER NOT NULL,
  page INTEGER NOT NULL REFERENCES pages(id),
  surah_id INTEGER NOT NULL REFERENCES surahs(id),
  hizb_id INTEGER NOT NULL REFERENCES hizbs(id),
  rub_id INTEGER NOT NULL REFERENCES rubs(id),
  juz_id INTEGER NOT NULL REFERENCES juzs(id),
  sajda BOOLEAN NOT NULL DEFAULT FALSE
);""",
    """CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  position INTEGER NOT NULL,
  surah_id INTEGER NOT NULL REFERENCES surahs(id),
  number_in_surah INTEGER NOT NULL,
  root TEXT,
  morphology TEXT
);""",
    """CREATE TABLE IF NOT EXISTS editions (
  id INTEGER PRIMARY KEY,
  identifier TEXT UNIQUE NOT NULL,
  language TEXT NOT NULL,
  name TEXT NOT NULL,
  englishName TEXT NOT NULL,
  format TEXT NOT NULL,
  type TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS reciters (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  identifier TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  bitrate TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS duas (
  ayah_id INTEGER PRIMARY KEY REFERENCES ayahs(id),
  surah_id INTEGER NOT NULL REFERENCES surahs(id),
  ayah_number INTEGER NOT NULL,
  text TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS asbab_al_nuzul (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id),
  content TEXT NOT NULL,
  source TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS hadith_references (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id),
  hadith TEXT NOT NULL,
  source TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS surah_profiles (
  surah_id INTEGER PRIMARY KEY REFERENCES surahs(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  summary TEXT NOT NULL,
  historical_context TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS faq_entries (
  id INTEGER PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS research_references (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_themes (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  theme TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_cross_references (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  related_ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_scientific_references (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  caution TEXT,
  references_json JSONB NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_legal_rulings (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  scope TEXT NOT NULL,
  summary TEXT NOT NULL,
  evidence_json JSONB NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_linguistic_notes (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  root TEXT,
  morphology TEXT,
  note TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS ayah_misinterpretations (
  id INTEGER PRIMARY KEY,
  ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE,
  claim TEXT NOT NULL,
  clarification TEXT NOT NULL
);""",
    """CREATE TABLE IF NOT EXISTS juz_surahs (
  juz_id INTEGER NOT NULL REFERENCES juzs(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE,
  PRIMARY KEY (juz_id, surah_id)
);""",
    """CREATE TABLE IF NOT EXISTS hizb_surahs (
  hizb_id INTEGER NOT NULL REFERENCES hizbs(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE,
  PRIMARY KEY (hizb_id, surah_id)
);""",
    """CREATE TABLE IF NOT EXISTS rub_surahs (
  rub_id INTEGER NOT NULL REFERENCES rubs(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE,
  PRIMARY KEY (rub_id, surah_id)
);""",
    """CREATE TABLE IF NOT EXISTS page_surahs (
  page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE,
  PRIMARY KEY (page_id, surah_id)
);""",
]

POSTGRES_INDEXES = [
    "CREATE INDEX IF NOT EXISTS idx_ayahs_surah ON ayahs(surah_id);",
    "CREATE INDEX IF NOT EXISTS idx_ayahs_juz ON ayahs(juz_id);",
    "CREATE INDEX IF NOT EXISTS idx_ayahs_hizb ON ayahs(hizb_id);",
    "CREATE INDEX IF NOT EXISTS idx_ayahs_rub ON ayahs(rub_id);",
    "CREATE INDEX IF NOT EXISTS idx_ayahs_page ON ayahs(page);",
    "CREATE INDEX IF NOT EXISTS idx_words_ayah ON words(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_words_surah ON words(surah_id);",
    "CREATE INDEX IF NOT EXISTS idx_words_root ON words(root);",
    "CREATE INDEX IF NOT EXISTS idx_duas_surah ON duas(surah_id);",
    "CREATE INDEX IF NOT EXISTS idx_asbab_ayah ON asbab_al_nuzul(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_hadith_ayah ON hadith_references(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_theme_ayah ON ayah_themes(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_theme_name ON ayah_themes(theme);",
    "CREATE INDEX IF NOT EXISTS idx_cross_ayah ON ayah_cross_references(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_science_ayah ON ayah_scientific_references(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_legal_ayah ON ayah_legal_rulings(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_linguistics_ayah ON ayah_linguistic_notes(ayah_id);",
    "CREATE INDEX IF NOT EXISTS idx_misread_ayah ON ayah_misinterpretations(ayah_id);",
]


def sql_literal(value: Any) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "TRUE" if value else "FALSE"
    if isinstance(value, (int, float)):
        return str(value)
    return "'" + str(value).replace("'", "''") + "'"


def write_postgres_inserts(handle, table: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    columns = list(rows[0].keys())
    handle.write(f"INSERT INTO {table} ({', '.join(columns)}) VALUES\n")
    for index, row in enumerate(rows):
        values = ", ".join(sql_literal(row[column]) for column in columns)
        suffix = "," if index < len(rows) - 1 else ";"
        handle.write(f"  ({values}){suffix}\n")
    handle.write("\n")


def generate_postgres_sql(data_dir: Path, output_path: Path):
    export_rows = build_export_rows(data_dir)

    with output_path.open("w", encoding="utf-8") as handle:
        handle.write("-- Quran Database Export (PostgreSQL)\n")
        handle.write("-- Generated by Quran Developer Platform\n\n")
        handle.write("BEGIN;\n\n")

        for statement in POSTGRES_SCHEMA:
            handle.write(statement + "\n\n")

        ordered_tables = [
            "dataset_metadata",
            "surahs",
            "juzs",
            "hizbs",
            "rubs",
            "pages",
            "ayahs",
            "words",
            "editions",
            "reciters",
            "duas",
            "asbab_al_nuzul",
            "hadith_references",
            "surah_profiles",
            "faq_entries",
            "research_references",
            "ayah_themes",
            "ayah_cross_references",
            "ayah_scientific_references",
            "ayah_legal_rulings",
            "ayah_linguistic_notes",
            "ayah_misinterpretations",
            "juz_surahs",
            "hizb_surahs",
            "rub_surahs",
            "page_surahs",
        ]

        for table in ordered_tables:
            write_postgres_inserts(handle, table, export_rows[table])

        for statement in POSTGRES_INDEXES:
            handle.write(statement + "\n")

        handle.write("\nCOMMIT;\n")

    print(f"Generated PostgreSQL export at {output_path}")


SQLITE_SCHEMA = [
    "PRAGMA foreign_keys = ON",
    "PRAGMA synchronous = OFF",
    "PRAGMA journal_mode = MEMORY",
    "CREATE TABLE dataset_metadata (id INTEGER PRIMARY KEY, sql_path TEXT NOT NULL, source_sha256 TEXT NOT NULL, source_size_bytes INTEGER NOT NULL, generated_at TEXT NOT NULL)",
    "CREATE TABLE surahs (id INTEGER PRIMARY KEY, number INTEGER UNIQUE NOT NULL, name_ar TEXT NOT NULL, name_en TEXT NOT NULL, name_en_translation TEXT NOT NULL, type TEXT NOT NULL)",
    "CREATE TABLE juzs (id INTEGER PRIMARY KEY, ayah_count INTEGER NOT NULL, start_ayah_number INTEGER NOT NULL, end_ayah_number INTEGER NOT NULL, start_page INTEGER NOT NULL, end_page INTEGER NOT NULL)",
    "CREATE TABLE hizbs (id INTEGER PRIMARY KEY, ayah_count INTEGER NOT NULL, start_ayah_number INTEGER NOT NULL, end_ayah_number INTEGER NOT NULL, start_page INTEGER NOT NULL, end_page INTEGER NOT NULL)",
    "CREATE TABLE rubs (id INTEGER PRIMARY KEY, ayah_count INTEGER NOT NULL, start_ayah_number INTEGER NOT NULL, end_ayah_number INTEGER NOT NULL, start_page INTEGER NOT NULL, end_page INTEGER NOT NULL)",
    "CREATE TABLE pages (id INTEGER PRIMARY KEY, ayah_count INTEGER NOT NULL, start_ayah_number INTEGER NOT NULL, end_ayah_number INTEGER NOT NULL, start_page INTEGER NOT NULL, end_page INTEGER NOT NULL)",
    "CREATE TABLE ayahs (id INTEGER PRIMARY KEY, number INTEGER UNIQUE NOT NULL, text TEXT NOT NULL, number_in_surah INTEGER NOT NULL, page INTEGER NOT NULL REFERENCES pages(id), surah_id INTEGER NOT NULL REFERENCES surahs(id), hizb_id INTEGER NOT NULL REFERENCES hizbs(id), rub_id INTEGER NOT NULL REFERENCES rubs(id), juz_id INTEGER NOT NULL REFERENCES juzs(id), sajda INTEGER NOT NULL DEFAULT 0)",
    "CREATE TABLE words (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, text TEXT NOT NULL, position INTEGER NOT NULL, surah_id INTEGER NOT NULL REFERENCES surahs(id), number_in_surah INTEGER NOT NULL, root TEXT, morphology TEXT)",
    "CREATE TABLE editions (id INTEGER PRIMARY KEY, identifier TEXT UNIQUE NOT NULL, language TEXT NOT NULL, name TEXT NOT NULL, englishName TEXT NOT NULL, format TEXT NOT NULL, type TEXT NOT NULL)",
    "CREATE TABLE reciters (id INTEGER PRIMARY KEY, name TEXT NOT NULL, identifier TEXT UNIQUE NOT NULL, type TEXT NOT NULL, bitrate TEXT NOT NULL)",
    "CREATE TABLE duas (ayah_id INTEGER PRIMARY KEY REFERENCES ayahs(id), surah_id INTEGER NOT NULL REFERENCES surahs(id), ayah_number INTEGER NOT NULL, text TEXT NOT NULL)",
    "CREATE TABLE asbab_al_nuzul (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id), content TEXT NOT NULL, source TEXT NOT NULL)",
    "CREATE TABLE hadith_references (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id), hadith TEXT NOT NULL, source TEXT NOT NULL)",
    "CREATE TABLE surah_profiles (surah_id INTEGER PRIMARY KEY REFERENCES surahs(id) ON DELETE CASCADE, period TEXT NOT NULL, summary TEXT NOT NULL, historical_context TEXT NOT NULL)",
    "CREATE TABLE faq_entries (id INTEGER PRIMARY KEY, question TEXT NOT NULL, answer TEXT NOT NULL)",
    "CREATE TABLE research_references (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, type TEXT NOT NULL, url TEXT NOT NULL)",
    "CREATE TABLE ayah_themes (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, position INTEGER NOT NULL, theme TEXT NOT NULL)",
    "CREATE TABLE ayah_cross_references (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, related_ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, relationship TEXT NOT NULL)",
    "CREATE TABLE ayah_scientific_references (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, title TEXT NOT NULL, summary TEXT NOT NULL, caution TEXT, references_json TEXT NOT NULL)",
    "CREATE TABLE ayah_legal_rulings (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, scope TEXT NOT NULL, summary TEXT NOT NULL, evidence_json TEXT NOT NULL)",
    "CREATE TABLE ayah_linguistic_notes (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, token TEXT NOT NULL, root TEXT, morphology TEXT, note TEXT NOT NULL)",
    "CREATE TABLE ayah_misinterpretations (id INTEGER PRIMARY KEY, ayah_id INTEGER NOT NULL REFERENCES ayahs(id) ON DELETE CASCADE, claim TEXT NOT NULL, clarification TEXT NOT NULL)",
    "CREATE TABLE juz_surahs (juz_id INTEGER NOT NULL REFERENCES juzs(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE, PRIMARY KEY (juz_id, surah_id))",
    "CREATE TABLE hizb_surahs (hizb_id INTEGER NOT NULL REFERENCES hizbs(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE, PRIMARY KEY (hizb_id, surah_id))",
    "CREATE TABLE rub_surahs (rub_id INTEGER NOT NULL REFERENCES rubs(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE, PRIMARY KEY (rub_id, surah_id))",
    "CREATE TABLE page_surahs (page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE, surah_id INTEGER NOT NULL REFERENCES surahs(id) ON DELETE CASCADE, PRIMARY KEY (page_id, surah_id))",
]

SQLITE_INDEXES = [
    "CREATE INDEX idx_ayahs_surah ON ayahs(surah_id)",
    "CREATE INDEX idx_ayahs_juz ON ayahs(juz_id)",
    "CREATE INDEX idx_ayahs_hizb ON ayahs(hizb_id)",
    "CREATE INDEX idx_ayahs_rub ON ayahs(rub_id)",
    "CREATE INDEX idx_ayahs_page ON ayahs(page)",
    "CREATE INDEX idx_words_ayah ON words(ayah_id)",
    "CREATE INDEX idx_words_surah ON words(surah_id)",
    "CREATE INDEX idx_words_root ON words(root)",
    "CREATE INDEX idx_duas_surah ON duas(surah_id)",
    "CREATE INDEX idx_asbab_ayah ON asbab_al_nuzul(ayah_id)",
    "CREATE INDEX idx_hadith_ayah ON hadith_references(ayah_id)",
    "CREATE INDEX idx_theme_ayah ON ayah_themes(ayah_id)",
    "CREATE INDEX idx_theme_name ON ayah_themes(theme)",
    "CREATE INDEX idx_cross_ayah ON ayah_cross_references(ayah_id)",
    "CREATE INDEX idx_science_ayah ON ayah_scientific_references(ayah_id)",
    "CREATE INDEX idx_legal_ayah ON ayah_legal_rulings(ayah_id)",
    "CREATE INDEX idx_linguistics_ayah ON ayah_linguistic_notes(ayah_id)",
    "CREATE INDEX idx_misread_ayah ON ayah_misinterpretations(ayah_id)",
]


def insert_batch(cursor: sqlite3.Cursor, table: str, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    columns = list(rows[0].keys())
    placeholders = ", ".join(["?"] * len(columns))
    sql = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})"
    payload = [tuple(row[column] for column in columns) for row in rows]
    cursor.executemany(sql, payload)


def generate_sqlite(data_dir: Path, output_path: Path):
    export_rows = build_export_rows(data_dir)

    if output_path.exists():
        output_path.unlink()

    conn = sqlite3.connect(output_path)
    cursor = conn.cursor()

    for statement in SQLITE_SCHEMA[:3]:
        cursor.execute(statement)
    cursor.execute("BEGIN TRANSACTION")
    for statement in SQLITE_SCHEMA[3:]:
        cursor.execute(statement)

    ordered_tables = [
        "dataset_metadata",
        "surahs",
        "juzs",
        "hizbs",
        "rubs",
        "pages",
        "ayahs",
        "words",
        "editions",
        "reciters",
        "duas",
        "asbab_al_nuzul",
        "hadith_references",
        "surah_profiles",
        "faq_entries",
        "research_references",
        "ayah_themes",
        "ayah_cross_references",
        "ayah_scientific_references",
        "ayah_legal_rulings",
        "ayah_linguistic_notes",
        "ayah_misinterpretations",
        "juz_surahs",
        "hizb_surahs",
        "rub_surahs",
        "page_surahs",
    ]

    for table in ordered_tables:
        insert_batch(cursor, table, export_rows[table])

    for statement in SQLITE_INDEXES:
        cursor.execute(statement)

    conn.commit()
    conn.close()
    print(f"Generated SQLite export at {output_path}")


if __name__ == "__main__":
    data_dir = Path("lib/data")
    generate_postgres_sql(data_dir, Path("public/quran_postgres.sql"))
    generate_sqlite(data_dir, Path("public/quran_indexed.sqlite"))
