'use client';

import { ChevronDown } from 'lucide-react';
import editionsData from '@/lib/data/editions.json';
import type { Edition } from '@/lib/quran-types';
import { useMemo } from 'react';

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
  const { languages, editionsByLanguage } = useMemo(() => {
    const textEditions = (editionsData as Edition[])
      .filter((ed) => ed.format === 'text')
      .sort((a, b) => {
        if (a.language === b.language) {
          return a.identifier.localeCompare(b.identifier);
        }
        return a.language.localeCompare(b.language);
      });

    const langs = [...new Set(textEditions.map((ed) => ed.language))];
    const editionsByLang = langs.map((lang) => ({
      language: lang,
      editions: textEditions.filter((ed) => ed.language === lang),
    }));

    return { languages: langs, editionsByLanguage: editionsByLang };
  }, []);

  return (
    <details className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30 transition-all">
      <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-sm font-semibold text-zinc-200 transition-colors hover:bg-zinc-800/50">
        Advanced Edition Filters
        <ChevronDown className="h-4 w-4 text-zinc-500" />
      </summary>
      <div className="grid gap-6 border-t border-zinc-800 bg-black/40 px-6 py-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Search specific edition
          </span>
          <select
            value={edition}
            onChange={(e) => {
              const value = e.target.value;
              setEdition(value);
              if (value) {
                setLanguage('');
              }
            }}
            className="w-full appearance-none rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="">Default (Arabic + Sahih International)</option>
            {editionsByLanguage.map((group) => (
              <optgroup key={group.language} label={group.language.toUpperCase()}>
                {group.editions.map((item) => (
                  <option key={item.identifier} value={item.identifier}>
                    {item.identifier} · {item.englishName}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Language filter
          </span>
          <select
            value={language}
            onChange={(e) => {
              const value = e.target.value;
              setLanguage(value);
              if (value) {
                setEdition('');
              }
            }}
            className="w-full appearance-none rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="">All Languages</option>
            {languages.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
    </details>
  );
}
