'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, Loader2, Search as SearchIcon } from 'lucide-react';

import editionsData from '@/lib/data/editions.json';
import type { Edition, SearchResultAyah } from '@/lib/quran-types';

interface SearchMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page: boolean;
  edition?: string | null;
  language?: string | null;
}

interface SearchResponse {
  success: boolean;
  data: SearchResultAyah[];
  meta?: SearchMeta;
  error?: string;
}

const textEditions = (editionsData as Edition[])
  .filter((edition) => edition.format === 'text')
  .sort((a, b) => {
    if (a.language === b.language) {
      return a.identifier.localeCompare(b.identifier);
    }

    return a.language.localeCompare(b.language);
  });

const languages = [...new Set(textEditions.map((edition) => edition.language))];
const editionsByLanguage = languages.map((language) => ({
  language,
  editions: textEditions.filter((edition) => edition.language === language),
}));

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [edition, setEdition] = useState('');
  const [language, setLanguage] = useState('');
  const [results, setResults] = useState<SearchResultAyah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<SearchMeta | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({ q: query.trim() });
    if (edition) {
      params.set('edition', edition);
    }
    if (language) {
      params.set('language', language);
    }

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = (await res.json()) as SearchResponse;
      if (!data.success) {
        setResults([]);
        setMeta(null);
        setError(data.error ?? 'Search failed');
      } else {
        setResults(data.data);
        setMeta(data.meta ?? null);
      }
    } catch {
      setResults([]);
      setMeta(null);
      setError('Search failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <Link href="/" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">Search Quran</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Search Arabic plus default English fast. Open advanced filters when you want one edition or one language.
          </p>
        </section>

        <section className="space-y-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="group relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={'Search for "patience", "mercy", or "knowledge"...'}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-12 py-4 text-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold transition-colors hover:bg-blue-500 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </button>
            </div>

            <details className="rounded-2xl border border-zinc-800 bg-zinc-900/30">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-zinc-200">
                Advanced Filters
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </summary>
              <div className="grid gap-4 border-t border-zinc-800 px-5 py-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Edition</span>
                  <select
                    value={edition}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEdition(value);
                      if (value) {
                        setLanguage('');
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <option value="">Default Arabic + en.sahih</option>
                    {editionsByLanguage.map((group) => (
                      <optgroup key={group.language} label={group.language}>
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
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Language</span>
                  <select
                    value={language}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLanguage(value);
                      if (value) {
                        setEdition('');
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <option value="">No language filter</option>
                    {languages.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </details>
          </form>

          {meta ? (
            <div className="flex flex-wrap gap-3 text-xs text-zinc-400">
              <span className="rounded-full border border-zinc-700 px-3 py-1">
                {meta.total} results
              </span>
              {meta.edition ? (
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300">
                  Edition: {meta.edition}
                </span>
              ) : null}
              {meta.language ? (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  Language: {meta.language}
                </span>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="space-y-6">
          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((result) => (
                <article
                  key={result.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded bg-blue-500/10 px-2 py-1 text-xs font-mono text-blue-500">
                      Ayah {result.number} (Surah {result.surah_id}:{result.number_in_surah})
                    </span>
                    <span className="text-xs text-zinc-500">
                      Match: {result.matched_identifiers.join(', ')}
                    </span>
                  </div>

                  <p className="mb-4 text-right text-xl leading-relaxed">
                    {result.text}
                  </p>

                  <p className="text-sm italic leading-relaxed text-zinc-300">
                    {result.edition_content ?? result.translation ?? 'No text available'}
                  </p>

                  {result.edition ? (
                    <p className="mt-3 text-xs text-zinc-500">
                      Showing edition text from {result.edition.identifier} ({result.edition.englishName})
                    </p>
                  ) : (
                    <p className="mt-3 text-xs text-zinc-500">
                      Showing default translation from en.sahih
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : query && !loading && !error ? (
            <div className="rounded-3xl border border-dashed border-zinc-800/50 bg-zinc-900/20 py-20 text-center">
              <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
