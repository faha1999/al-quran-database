import editionsData from '@/lib/data/editions.json';
import type { Edition, SearchFilterState } from '@/lib/quran-types';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  label: string;
  options: FilterOption[];
}

export interface QuickLanguageFilter {
  accentClassName: string;
  label: string;
  value: string;
}

const textEditions = (editionsData as Edition[])
  .filter((edition) => edition.format === 'text')
  .sort((left, right) => {
    if (left.language === right.language) {
      return left.identifier.localeCompare(right.identifier);
    }

    return left.language.localeCompare(right.language);
  });

export const quickLanguageFilters: QuickLanguageFilter[] = [
  { label: 'English', value: 'en', accentClassName: 'data-[active=true]:bg-blue-600' },
  { label: 'Bangla', value: 'bn', accentClassName: 'data-[active=true]:bg-emerald-600' },
  { label: 'Arabic Only', value: 'ar', accentClassName: 'data-[active=true]:bg-amber-600' },
  { label: 'All', value: '', accentClassName: 'data-[active=true]:bg-zinc-700' },
];

export function getLanguageOptions(): FilterOption[] {
  return Array.from(new Set(textEditions.map((edition) => edition.language)), (language) => ({
    label: language.toUpperCase(),
    value: language,
  }));
}

export function getEditionGroups(): FilterGroup[] {
  const groups = new Map<string, FilterOption[]>();

  for (const edition of textEditions) {
    const group = groups.get(edition.language) ?? [];
    group.push({
      label: `${edition.identifier} · ${edition.englishName}`,
      value: edition.identifier,
    });
    groups.set(edition.language, group);
  }

  return Array.from(groups.entries()).map(([language, options]) => ({
    label: language.toUpperCase(),
    options,
  }));
}

export function applyEditionFilter(current: SearchFilterState, edition: string): SearchFilterState {
  return {
    edition,
    language: edition ? '' : current.language,
  };
}

export function applyLanguageFilter(
  current: SearchFilterState,
  language: string,
): SearchFilterState {
  return {
    edition: language ? '' : current.edition,
    language,
  };
}
