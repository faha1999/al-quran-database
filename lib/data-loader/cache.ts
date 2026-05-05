import { readFileSync } from 'node:fs';
import { AyahEdition } from '@/lib/quran-types';
import { editionManifest, getJsonPath } from './core';

const editionContentCache = new Map<string, Map<number, AyahEdition>>();

function readJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, 'utf8')) as T;
}

export function loadEditionContent(identifier: string): Map<number, AyahEdition> {
  const cached = editionContentCache.get(identifier);
  if (cached) {
    return cached;
  }

  const manifestEntry = editionManifest.editions[identifier];
  if (!manifestEntry) {
    throw new Error(`Unknown edition: ${identifier}`);
  }

  const rows = manifestEntry.files.flatMap((file) => readJson<AyahEdition[]>(getJsonPath(file)));
  const map = new Map<number, AyahEdition>();
  for (const row of rows) {
    map.set(row.ayah_id, row);
  }

  editionContentCache.set(identifier, map);
  return map;
}

export function clearEditionCache() {
  editionContentCache.clear();
}
