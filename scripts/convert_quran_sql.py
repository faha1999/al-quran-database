from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from quran_sql_common import (
    DEFAULT_TRANSLATION_IDENTIFIER,
    HARD_FILE_LIMIT_BYTES,
    TEXT_FILE_LIMIT_BYTES,
    iter_table_rows,
    json_bytes,
    sorted_unique,
    write_json,
)

QURAN_TABLES = ("surahs", "ayahs", "editions", "ayah_edition")


def build_surah(row: list[object]) -> dict[str, object]:
    return {
        "id": int(row[0]),
        "number": int(row[1]),
        "name_ar": row[2],
        "name_en": row[3],
        "name_en_translation": row[4],
        "type": row[5],
    }


def build_ayah(row: list[object]) -> dict[str, object]:
    rub_id = int(row[6])
    return {
        "id": int(row[0]),
        "number": int(row[1]),
        "text": row[2],
        "number_in_surah": int(row[3]),
        "page": int(row[4]),
        "surah_id": int(row[5]),
        "rub_id": rub_id,
        "hizb_id": ((rub_id - 1) // 4) + 1,
        "juz_id": int(row[7]),
        "sajda": bool(int(row[8])),
    }


def build_edition(row: list[object]) -> dict[str, object]:
    return {
        "id": int(row[0]),
        "identifier": row[1],
        "language": row[2],
        "name": row[3],
        "englishName": row[4],
        "format": row[5],
        "type": row[6],
    }


def derive_groups(ayahs: list[dict[str, object]], key: str) -> list[dict[str, object]]:
    groups: dict[int, dict[str, object]] = {}
    for ayah in ayahs:
        group_id = int(ayah[key])
        current = groups.setdefault(
            group_id,
            {
                "id": group_id,
                "ayah_count": 0,
                "start_ayah_number": int(ayah["number"]),
                "end_ayah_number": int(ayah["number"]),
                "start_page": int(ayah["page"]),
                "end_page": int(ayah["page"]),
                "surah_ids": [],
            },
        )
        current["ayah_count"] = int(current["ayah_count"]) + 1
        current["start_ayah_number"] = min(int(current["start_ayah_number"]), int(ayah["number"]))
        current["end_ayah_number"] = max(int(current["end_ayah_number"]), int(ayah["number"]))
        current["start_page"] = min(int(current["start_page"]), int(ayah["page"]))
        current["end_page"] = max(int(current["end_page"]), int(ayah["page"]))
        current["surah_ids"].append(int(ayah["surah_id"]))

    derived = []
    for group_id in sorted(groups):
        group = groups[group_id]
        group["surah_ids"] = sorted_unique(group["surah_ids"])
        derived.append(group)

    return derived


def stage_core_data(sql_path: Path, stage_dir: Path) -> tuple[list[dict[str, object]], list[dict[str, object]], list[dict[str, object]]]:
    surahs: list[dict[str, object]] = []
    ayahs: list[dict[str, object]] = []
    editions: list[dict[str, object]] = []

    for table, row in iter_table_rows(sql_path, QURAN_TABLES):
        if table == "surahs":
            surahs.append(build_surah(row))
        elif table == "ayahs":
            ayahs.append(build_ayah(row))
        elif table == "editions":
            editions.append(build_edition(row))

    surahs.sort(key=lambda item: int(item["id"]))
    ayahs.sort(key=lambda item: int(item["id"]))
    editions.sort(key=lambda item: int(item["id"]))

    write_json(stage_dir / "surahs.json", surahs)
    write_json(stage_dir / "ayahs.json", ayahs)
    write_json(stage_dir / "editions.json", editions, pretty=True)
    write_json(stage_dir / "juzs.json", derive_groups(ayahs, "juz_id"), pretty=True)
    write_json(stage_dir / "hizbs.json", derive_groups(ayahs, "hizb_id"), pretty=True)
    write_json(stage_dir / "rubs.json", derive_groups(ayahs, "rub_id"), pretty=True)
    write_json(stage_dir / "pages.json", derive_groups(ayahs, "page"), pretty=True)

    return surahs, ayahs, editions


def stage_edition_lines(sql_path: Path, stage_dir: Path, editions: list[dict[str, object]]) -> dict[str, int]:
    editions_by_id = {int(edition["id"]): edition for edition in editions}
    lines_dir = stage_dir / "_edition_lines"
    lines_dir.mkdir(parents=True, exist_ok=True)

    row_counts: dict[str, int] = {}
    handles: dict[str, object] = {}

    try:
        for _, row in iter_table_rows(sql_path, ("ayah_edition",)):
            ayah_id = int(row[1])
            edition_id = int(row[2])
            edition = editions_by_id[edition_id]
            identifier = str(edition["identifier"])
            record = {
                "ayah_id": ayah_id,
                "data": row[3] or "",
                "is_audio": bool(int(row[4])),
            }

            if identifier not in handles:
                handles[identifier] = (lines_dir / f"{identifier}.ndjson").open("w", encoding="utf-8")
                row_counts[identifier] = 0

            handles[identifier].write(json.dumps(record, ensure_ascii=False, separators=(",", ":")))
            handles[identifier].write("\n")
            row_counts[identifier] += 1
    finally:
        for handle in handles.values():
            handle.close()

    return row_counts


def write_edition_payloads(stage_dir: Path, editions: list[dict[str, object]], row_counts: dict[str, int]) -> None:
    lines_dir = stage_dir / "_edition_lines"
    output_dir = stage_dir / "ayah-editions"
    output_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "default_translation_identifier": DEFAULT_TRANSLATION_IDENTIFIER,
        "editions": {},
    }

    for edition in sorted(editions, key=lambda item: str(item["identifier"])):
        identifier = str(edition["identifier"])
        edition_row_count = row_counts.get(identifier, 0)
        files: list[str] = []
        source_path = lines_dir / f"{identifier}.ndjson"

        if source_path.exists():
            with source_path.open("r", encoding="utf-8") as handle:
                records = [json.loads(line) for line in handle]
        else:
            records = []

        serialized = json_bytes(records)
        if len(serialized) <= TEXT_FILE_LIMIT_BYTES:
            file_name = f"ayah-editions/{identifier}.json"
            output_path = stage_dir / file_name
            write_json(output_path, records)
            if output_path.stat().st_size > HARD_FILE_LIMIT_BYTES:
                raise RuntimeError(f"{file_name} exceeds hard file size limit")
            files.append(file_name)
        else:
            for shard_index, start in enumerate(range(0, len(records), 500), start=1):
                shard_records = records[start : start + 500]
                file_name = f"ayah-editions/{identifier}.part-{shard_index}.json"
                output_path = stage_dir / file_name
                write_json(output_path, shard_records)
                if output_path.stat().st_size > HARD_FILE_LIMIT_BYTES:
                    raise RuntimeError(f"{file_name} exceeds hard file size limit")
                files.append(file_name)

        manifest["editions"][identifier] = {
            "edition_id": int(edition["id"]),
            "language": edition["language"],
            "type": edition["type"],
            "format": edition["format"],
            "row_count": edition_row_count,
            "files": files,
        }

    write_json(stage_dir / "edition-manifest.json", manifest, pretty=True)
    shutil.rmtree(lines_dir, ignore_errors=True)


def compute_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def write_dataset_metadata(stage_dir: Path, sql_path: Path, counts: dict[str, int]) -> None:
    metadata = {
        "source": {
            "sql_path": str(sql_path),
            "sha256": compute_sha256(sql_path),
            "size_bytes": sql_path.stat().st_size,
        },
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "counts": counts,
    }
    write_json(stage_dir / "dataset-metadata.json", metadata, pretty=True)


def publish_stage(stage_dir: Path, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    stale_paths = (
        "surahs.json",
        "ayahs.json",
        "editions.json",
        "juzs.json",
        "hizbs.json",
        "rubs.json",
        "pages.json",
        "edition-manifest.json",
        "dataset-metadata.json",
        "ayah-editions",
    )

    for relative_path in stale_paths:
        target = output_dir / relative_path
        if target.is_dir():
            shutil.rmtree(target, ignore_errors=True)
        elif target.exists():
            target.unlink()

    for path in stage_dir.iterdir():
        shutil.move(str(path), output_dir / path.name)


def convert(sql_path: Path, output_dir: Path) -> None:
    stage_root = Path(tempfile.mkdtemp(prefix="quran-json-"))
    stage_dir = stage_root / "data"
    stage_dir.mkdir(parents=True, exist_ok=True)

    try:
        surahs, ayahs, editions = stage_core_data(sql_path, stage_dir)
        row_counts = stage_edition_lines(sql_path, stage_dir, editions)
        write_edition_payloads(stage_dir, editions, row_counts)
        write_dataset_metadata(
            stage_dir,
            sql_path,
            {
                "surahs": len(surahs),
                "ayahs": len(ayahs),
                "editions": len(editions),
                "juzs": len(derive_groups(ayahs, "juz_id")),
                "hizbs": len(derive_groups(ayahs, "hizb_id")),
                "rubs": len(derive_groups(ayahs, "rub_id")),
                "pages": len(derive_groups(ayahs, "page")),
            },
        )
        publish_stage(stage_dir, output_dir)
    finally:
        shutil.rmtree(stage_root, ignore_errors=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Convert quran.sql into normalized JSON files.")
    parser.add_argument("--sql-path", default="quran.sql")
    parser.add_argument("--output-dir", default="lib/data")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    convert(Path(args.sql_path), Path(args.output_dir))


if __name__ == "__main__":
    main()
