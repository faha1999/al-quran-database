from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Iterable, Iterator, Sequence

INSERT_RE = re.compile(r"^INSERT INTO `(?P<table>[^`]+)`")
TEXT_FILE_LIMIT_BYTES = 90 * 1024 * 1024
HARD_FILE_LIMIT_BYTES = 95 * 1024 * 1024
DEFAULT_TRANSLATION_IDENTIFIER = "en.sahih"


def unescape_sql_string(value: str) -> str:
    result: list[str] = []
    index = 0
    replacements = {
        "0": "\0",
        "b": "\b",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "Z": "\x1a",
        "'": "'",
        '"': '"',
        "\\": "\\",
    }

    while index < len(value):
        char = value[index]
        if char == "\\" and index + 1 < len(value):
            next_char = value[index + 1]
            result.append(replacements.get(next_char, next_char))
            index += 2
            continue

        result.append(char)
        index += 1

    return "".join(result).lstrip("\ufeff")


def coerce_sql_value(token: str) -> Any:
    normalized = token.strip()
    if normalized.upper() == "NULL":
        return None

    if normalized.startswith("'") and normalized.endswith("'"):
        return unescape_sql_string(normalized[1:-1])

    try:
        return int(normalized)
    except ValueError:
        return normalized


def split_sql_values(row: str) -> list[Any]:
    values: list[str] = []
    current: list[str] = []
    in_string = False
    escaped = False

    for char in row:
        if in_string:
            current.append(char)
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == "'":
                in_string = False
            continue

        if char == "'":
            in_string = True
            current.append(char)
        elif char == ",":
            values.append("".join(current).strip())
            current = []
        else:
            current.append(char)

    values.append("".join(current).strip())
    return [coerce_sql_value(value) for value in values]


def extract_inline_rows(chunk: str) -> list[str]:
    rows: list[str] = []
    current: list[str] = []
    depth = 0
    in_string = False
    escaped = False

    for char in chunk:
        if in_string:
            current.append(char)
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == "'":
                in_string = False
            continue

        if char == "'":
            in_string = True
            current.append(char)
        elif char == "(":
            depth += 1
            current.append(char)
        elif char == ")":
            depth -= 1
            current.append(char)
            if depth == 0:
                row = "".join(current).strip()
                if row:
                    rows.append(row)
                current = []
        elif depth > 0:
            current.append(char)

    return rows


def iter_table_rows(sql_path: Path, wanted_tables: Sequence[str]) -> Iterator[tuple[str, list[Any]]]:
    wanted = set(wanted_tables)
    current_table: str | None = None

    with sql_path.open("r", encoding="utf-8") as sql_file:
        for raw_line in sql_file:
            line = raw_line.rstrip("\n")
            insert_match = INSERT_RE.match(line)
            if insert_match:
                table = insert_match.group("table")
                current_table = table if table in wanted else None
                if current_table and "VALUES" in line:
                    inline_rows = extract_inline_rows(line.split("VALUES", 1)[1])
                    for row in inline_rows:
                        yield current_table, split_sql_values(row[1:-1])
                    if inline_rows and line.rstrip().endswith(";"):
                        current_table = None
                continue

            if not current_table:
                continue

            stripped = line.strip()
            if not stripped:
                continue

            if stripped.startswith("("):
                row = stripped.rstrip(",;")
                if row.startswith("(") and row.endswith(")"):
                    yield current_table, split_sql_values(row[1:-1])
                if stripped.endswith(";"):
                    current_table = None
            elif stripped == "UNLOCK TABLES;":
                current_table = None


def json_bytes(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode("utf-8")


def write_json(path: Path, value: Any, *, pretty: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        if pretty:
            json.dump(value, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
        else:
            json.dump(value, handle, ensure_ascii=False, separators=(",", ":"))


def sorted_unique(values: Iterable[int]) -> list[int]:
    return sorted(set(values))
