import { Ayah, AyahEdition, Edition, EditionSummary, ResolvedAyah } from '@/lib/quran-types';
import { DEFAULT_TRANSLATION_IDENTIFIER, editionsByIdentifier, knowledgeByAyahId } from './core';
import { loadEditionContent } from './cache';

export function paginate<T>(items: T[], page = 1, limit = items.length) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = items.length;

  return {
    items: items.slice(start, end),
    meta: {
      total,
      page,
      limit,
      total_pages: Math.max(1, Math.ceil(total / limit)),
      has_next_page: end < total,
    },
  };
}

export function getEditionSummary(edition: Edition | null): EditionSummary | null {
  if (!edition) return null;
  return {
    identifier: edition.identifier,
    language: edition.language,
    name: edition.name,
    englishName: edition.englishName,
    format: edition.format,
    type: edition.type,
  };
}

export function resolveTranslation(ayahId: number): string | null {
  return loadEditionContent(DEFAULT_TRANSLATION_IDENTIFIER).get(ayahId)?.data ?? null;
}

export function getAyahTextForEdition(ayahId: number, identifier: string): string | null {
  return loadEditionContent(identifier).get(ayahId)?.data ?? null;
}

export function attachEdition(
  ayah: Ayah,
  identifier?: string,
  selectedText?: string | null,
): ResolvedAyah {
  const selectedEdition = identifier ? (editionsByIdentifier.get(identifier) ?? null) : null;
  const resolvedSelectedText =
    typeof selectedText === 'string'
      ? selectedText
      : identifier
        ? getAyahTextForEdition(ayah.id, identifier)
        : null;

  return {
    ...ayah,
    translation: resolveTranslation(ayah.id),
    edition_content: identifier ? resolvedSelectedText : null,
    edition: identifier ? getEditionSummary(selectedEdition) : null,
    knowledge: knowledgeByAyahId.get(ayah.id) ?? null,
  };
}

export function resolveAyahs(ayahList: Ayah[], identifier?: string): ResolvedAyah[] {
  let editionMap: Map<number, AyahEdition> | null = null;
  if (identifier) {
    editionMap = loadEditionContent(identifier);
  }

  return ayahList.map((ayah) =>
    attachEdition(ayah, identifier, editionMap?.get(ayah.id)?.data ?? null),
  );
}
