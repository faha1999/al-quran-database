'use client';

import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import {
  applyEditionFilter,
  applyLanguageFilter,
  getEditionGroups,
  getLanguageOptions,
} from '@/lib/search-filters';
import type { SearchFilterState } from '@/lib/quran-types';
import { FilterSelect } from '@/components/search/FilterSelect';

interface AdvancedFiltersProps {
  edition: string;
  setEdition: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

export function AdvancedFilters({
  edition,
  setEdition,
  language,
  setLanguage,
}: AdvancedFiltersProps) {
  const currentFilters = useMemo<SearchFilterState>(
    () => ({ edition, language }),
    [edition, language],
  );
  const editionGroups = useMemo(() => getEditionGroups(), []);
  const languageOptions = useMemo(() => getLanguageOptions(), []);

  const updateFilters = (next: SearchFilterState) => {
    setEdition(next.edition);
    setLanguage(next.language);
  };

  const handleEditionChange = (value: string) => {
    updateFilters(applyEditionFilter(currentFilters, value));
  };

  const handleLanguageChange = (value: string) => {
    updateFilters(applyLanguageFilter(currentFilters, value));
  };

  return (
    <details className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 transition-all">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800/50">
        Advanced Edition Filters
        <ChevronDown className="h-4 w-4 text-zinc-500" />
      </summary>
      <div className="grid gap-6 border-t border-zinc-800 bg-black/40 px-6 py-6 md:grid-cols-2">
        <FilterSelect
          id="edition"
          label="Search specific edition"
          value={edition}
          placeholder="Default (Arabic + Sahih International)"
          groups={editionGroups}
          onChange={handleEditionChange}
        />

        <FilterSelect
          id="language"
          label="Language filter"
          value={language}
          placeholder="All Languages"
          options={languageOptions}
          onChange={handleLanguageChange}
        />
      </div>
    </details>
  );
}
