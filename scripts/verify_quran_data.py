from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from quran_sql_common import DEFAULT_TRANSLATION_IDENTIFIER, HARD_FILE_LIMIT_BYTES, iter_table_rows

QURAN_TABLES = ("surahs", "ayahs", "editions", "ayah_edition")


def load_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def sql_counts(sql_path: Path) -> dict[str, object]:
    counts = {
        "surahs": 0,
        "ayahs": 0,
        "editions": 0,
        "ayah_edition": 0,
        "edition_row_counts": {},
        "en_sahih_ayah_ids": set(),
    }
    edition_id_to_identifier: dict[int, str] = {}
    pending_ayah_rows: list[tuple[int, int]] = []

    for table, row in iter_table_rows(sql_path, QURAN_TABLES):
        if table == "surahs":
            counts["surahs"] += 1
        elif table == "ayahs":
            counts["ayahs"] += 1
        elif table == "editions":
            counts["editions"] += 1
            edition_id = int(row[0])
            identifier = str(row[1])
            edition_id_to_identifier[edition_id] = identifier
        elif table == "ayah_edition":
            counts["ayah_edition"] += 1
            pending_ayah_rows.append((int(row[1]), int(row[2])))

    for ayah_id, edition_id in pending_ayah_rows:
        identifier = edition_id_to_identifier[edition_id]
        edition_row_counts = counts["edition_row_counts"]
        edition_row_counts[identifier] = edition_row_counts.get(identifier, 0) + 1
        if identifier == DEFAULT_TRANSLATION_IDENTIFIER:
            counts["en_sahih_ayah_ids"].add(ayah_id)

    return counts


def generated_counts(output_dir: Path) -> dict[str, object]:
    surahs = load_json(output_dir / "surahs.json")
    ayahs = load_json(output_dir / "ayahs.json")
    editions = load_json(output_dir / "editions.json")
    juzs = load_json(output_dir / "juzs.json")
    hizbs = load_json(output_dir / "hizbs.json")
    manifest = load_json(output_dir / "edition-manifest.json")

    ayah_ids = {int(ayah["id"]) for ayah in ayahs}
    edition_ids = {int(edition["id"]) for edition in editions}
    editions_by_identifier = {edition["identifier"]: edition for edition in editions}

    emitted_rows = 0
    sahih_ayah_ids: set[int] = set()

    for identifier, entry in manifest["editions"].items():
        edition = editions_by_identifier[identifier]
        if int(entry["edition_id"]) != int(edition["id"]):
            raise AssertionError(f"Manifest edition id mismatch for {identifier}")

        file_rows = 0
        for relative_file in entry["files"]:
            file_path = output_dir / relative_file
            if not file_path.exists():
                raise AssertionError(f"Missing edition shard {relative_file}")
            if file_path.stat().st_size > HARD_FILE_LIMIT_BYTES:
                raise AssertionError(f"Edition shard too large: {relative_file}")

            rows = load_json(file_path)
            file_rows += len(rows)
            for row in rows:
                ayah_id = int(row["ayah_id"])
                if ayah_id not in ayah_ids:
                    raise AssertionError(f"Unknown ayah_id {ayah_id} in {relative_file}")
                if identifier == DEFAULT_TRANSLATION_IDENTIFIER:
                    sahih_ayah_ids.add(ayah_id)

        if file_rows != int(entry["row_count"]):
            raise AssertionError(f"Manifest row count mismatch for {identifier}")
        emitted_rows += file_rows

    if len(juzs) != len({int(ayah["juz_id"]) for ayah in ayahs}):
        raise AssertionError("Derived juz count mismatch")
    if len(hizbs) != len({int(ayah["hizb_id"]) for ayah in ayahs}):
        raise AssertionError("Derived hizb count mismatch")

    return {
        "surahs": len(surahs),
        "ayahs": len(ayahs),
        "editions": len(editions),
        "ayah_edition": emitted_rows,
        "en_sahih_ayah_ids": sahih_ayah_ids,
        "manifest": manifest,
        "ayah_ids": ayah_ids,
        "edition_ids": edition_ids,
    }


def hash_tree(root: Path) -> dict[str, str]:
    hashes: dict[str, str] = {}
    for path in sorted(root.rglob("*")):
        if path.is_dir():
            continue
        relative_path = str(path.relative_to(root))
        hashes[relative_path] = hashlib.sha256(path.read_bytes()).hexdigest()
    return hashes


def verify_determinism(sql_path: Path, output_dir: Path) -> None:
    temp_root = Path(tempfile.mkdtemp(prefix="quran-json-verify-"))
    try:
        temp_output = temp_root / "data"
        subprocess.run(
            [sys.executable, "scripts/convert_quran_sql.py", "--sql-path", str(sql_path), "--output-dir", str(temp_output)],
            check=True,
        )
        current_hashes = hash_tree(output_dir)
        regenerated_hashes = hash_tree(temp_output)
        if current_hashes != regenerated_hashes:
            raise AssertionError("Generated data is not deterministic")
    finally:
        shutil.rmtree(temp_root, ignore_errors=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Verify generated Quran JSON data.")
    parser.add_argument("--sql-path", default="quran.sql")
    parser.add_argument("--output-dir", default="lib/data")
    parser.add_argument("--check-determinism", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    sql_path = Path(args.sql_path)
    output_dir = Path(args.output_dir)

    expected = sql_counts(sql_path)
    actual = generated_counts(output_dir)

    assert actual["surahs"] == 114 == expected["surahs"]
    assert actual["ayahs"] == 6236 == expected["ayahs"]
    assert actual["editions"] == 134 == expected["editions"]
    assert len(actual["en_sahih_ayah_ids"]) == actual["ayahs"] == len(expected["en_sahih_ayah_ids"])

    manifest_editions = actual["manifest"]["editions"]
    for identifier, row_count in expected["edition_row_counts"].items():
        manifest_entry = manifest_editions.get(identifier)
        if not manifest_entry:
            raise AssertionError(f"Missing manifest entry for {identifier}")
        if int(manifest_entry["row_count"]) != row_count:
            raise AssertionError(f"Edition row count mismatch for {identifier}")

    if sum(int(entry["row_count"]) for entry in manifest_editions.values()) != int(expected["ayah_edition"]):
        raise AssertionError("Total ayah_edition row count mismatch")

    if args.check_determinism:
        verify_determinism(sql_path, output_dir)

    print(
        json.dumps(
            {
                "surahs": actual["surahs"],
                "ayahs": actual["ayahs"],
                "editions": actual["editions"],
                "ayah_edition_rows": sum(int(entry["row_count"]) for entry in manifest_editions.values()),
                "deterministic": bool(args.check_determinism),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
