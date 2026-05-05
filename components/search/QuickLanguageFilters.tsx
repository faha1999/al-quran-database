'use client';

import { quickLanguageFilters } from '@/lib/search-filters';

interface QuickLanguageFiltersProps {
  activeLanguage: string;
  onSelect: (language: string) => void;
}

export function QuickLanguageFilters({ activeLanguage, onSelect }: QuickLanguageFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        Quick Filters:
      </span>
      {quickLanguageFilters.map((filter) => {
        const isActive = activeLanguage === filter.value;

        return (
          <button
            key={filter.label}
            type="button"
            data-active={isActive}
            onClick={() => onSelect(filter.value)}
            className={`rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-medium transition-all hover:border-zinc-700 data-[active=true]:border-transparent data-[active=true]:text-white ${filter.accentClassName}`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
