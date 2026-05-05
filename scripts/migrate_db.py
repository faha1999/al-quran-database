from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

DATA_DIR = Path("lib/data")
VERSION_FILE = DATA_DIR / "version.json"


def get_current_version() -> int:
    if not VERSION_FILE.exists():
        return 0
    with VERSION_FILE.open("r", encoding="utf-8") as handle:
        return int(json.load(handle).get("version", 0))


def set_current_version(version: int) -> None:
    with VERSION_FILE.open("w", encoding="utf-8") as handle:
        json.dump(
            {
                "version": version,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            },
            handle,
            indent=2,
        )


def ensure_required_files() -> None:
    required = [
        "surahs.json",
        "ayahs.json",
        "editions.json",
        "juzs.json",
        "hizbs.json",
        "rubs.json",
        "pages.json",
        "words.json",
        "duas.json",
        "extra_context.json",
        "knowledge-base.json",
        "edition-manifest.json",
        "dataset-metadata.json",
    ]
    missing = [name for name in required if not (DATA_DIR / name).exists()]
    if missing:
        raise FileNotFoundError(f"Missing required data files: {', '.join(missing)}")


def migrate_to_v1() -> None:
    print("v1: validating canonical JSON file set")
    ensure_required_files()


def migrate_to_v2() -> None:
    print("v2: regenerating dataset metadata from local quran.sql")
    subprocess.run([sys.executable, "scripts/convert_quran_sql.py"], check=True)


def migrate_to_v3() -> None:
    print("v3: rebuilding relational exports")
    subprocess.run([sys.executable, "scripts/export_sql.py"], check=True)


MIGRATIONS = {
    1: migrate_to_v1,
    2: migrate_to_v2,
    3: migrate_to_v3,
}


def run_migrations() -> None:
    current = get_current_version()
    target = max(MIGRATIONS)

    if current >= target:
        print(f"Database is up to date (version {current})")
        return

    print(f"Current version: {current}. Target version: {target}")
    for version in range(current + 1, target + 1):
        MIGRATIONS[version]()
        set_current_version(version)
        print(f"Successfully migrated to v{version}")


if __name__ == "__main__":
    run_migrations()
