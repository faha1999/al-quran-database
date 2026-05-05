from __future__ import annotations

import json
import shutil
from pathlib import Path

DATA_DIR = Path("lib/data")
SAMPLE_DIR = Path("lib/data/sample")


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload):
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)


def create_sample_data(num_surahs: int = 3):
    print(f"Creating sample data with first {num_surahs} surahs...")
    SAMPLE_DIR.mkdir(parents=True, exist_ok=True)

    surahs = load_json(DATA_DIR / "surahs.json")
    ayahs = load_json(DATA_DIR / "ayahs.json")
    words = load_json(DATA_DIR / "words.json")
    duas = load_json(DATA_DIR / "duas.json")
    extra_context = load_json(DATA_DIR / "extra_context.json")
    knowledge = load_json(DATA_DIR / "knowledge-base.json")

    sample_surahs = surahs[:num_surahs]
    sample_surah_ids = {int(item["id"]) for item in sample_surahs}
    sample_ayahs = [ayah for ayah in ayahs if int(ayah["surah_id"]) in sample_surah_ids]
    sample_ayah_ids = {int(item["id"]) for item in sample_ayahs}
    sample_words = [word for word in words if int(word["ayah_id"]) in sample_ayah_ids]

    write_json(SAMPLE_DIR / "surahs.json", sample_surahs)
    write_json(SAMPLE_DIR / "ayahs.json", sample_ayahs)
    write_json(SAMPLE_DIR / "words.json", sample_words)
    write_json(SAMPLE_DIR / "duas.json", [dua for dua in duas if int(dua["ayah_id"]) in sample_ayah_ids])
    write_json(
        SAMPLE_DIR / "extra_context.json",
        {
            "asbab_al_nuzul": [
                item for item in extra_context.get("asbab_al_nuzul", []) if int(item["ayah_id"]) in sample_ayah_ids
            ],
            "hadith_references": [
                item for item in extra_context.get("hadith_references", []) if int(item["ayah_id"]) in sample_ayah_ids
            ],
        },
    )
    write_json(
        SAMPLE_DIR / "knowledge-base.json",
        {
            **knowledge,
            "ayahs": [item for item in knowledge.get("ayahs", []) if int(item["ayah_id"]) in sample_ayah_ids],
            "surahs": [item for item in knowledge.get("surahs", []) if int(item["surah_id"]) in sample_surah_ids],
        },
    )

    copy_files = [
        "editions.json",
        "reciters.json",
        "edition-manifest.json",
        "dataset-metadata.json",
        "juzs.json",
        "hizbs.json",
        "rubs.json",
        "pages.json",
    ]
    for name in copy_files:
        source = DATA_DIR / name
        if source.exists():
            shutil.copy(source, SAMPLE_DIR / name)

    print(f"Sample data created at {SAMPLE_DIR}")
    print(f"Surahs: {len(sample_surahs)}")
    print(f"Ayahs: {len(sample_ayahs)}")
    print(f"Words: {len(sample_words)}")


if __name__ == "__main__":
    create_sample_data()
