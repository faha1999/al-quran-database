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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <Link href="/" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section className="space-y-4 text-center">
          <h1 className="text-5xl font-bold tracking-tighter md:text-6xl">
            Search <span className="text-blue-500">Quran</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            High-performance search powered by <span className="text-white font-mono text-sm bg-zinc-800 px-1.5 py-0.5 rounded">FlexSearch</span>. 
            Ranked results for Arabic and Translations.
          </p>
        </section>

        <section className="space-y-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="group relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={'Search for "patience", "mercy", or "knowledge"...'}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 px-12 py-5 text-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-2xl"
              />
              <SearchIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500" />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mr-2">Quick Filters:</span>
              <button 
                type="button"
                onClick={() => { setLanguage('en'); setEdition(''); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'}`}
              >
                English
              </button>
              <button 
                type="button"
                onClick={() => { setLanguage('bn'); setEdition(''); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${language === 'bn' ? 'bg-green-600 text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'}`}
              >
                Bangla
              </button>
              <button 
                type="button"
                onClick={() => { setLanguage('ar'); setEdition(''); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${language === 'ar' ? 'bg-amber-600 text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'}`}
              >
                Arabic Only
              </button>
              <button 
                type="button"
                onClick={() => { setLanguage(''); setEdition(''); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${!language && !edition ? 'bg-zinc-700 text-white' : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'}`}
              >
                All
              </button>
            </div>

            <details className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-sm font-semibold text-zinc-200 hover:bg-zinc-800/50 transition-colors">
                Advanced Edition Filters
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </summary>
              <div className="grid gap-6 border-t border-zinc-800 px-6 py-6 md:grid-cols-2 bg-black/40">
                <label className="space-y-2">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Search specific edition</span>
                  <select
                    value={edition}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEdition(value);
                      if (value) {
                        setLanguage('');
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none"
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
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Language filter</span>
                  <select
                    value={language}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLanguage(value);
                      if (value) {
                        setEdition('');
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none"
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
          </form>

          {meta ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-3 text-xs text-zinc-400">
                <span className="rounded-full border border-zinc-700 px-3 py-1 bg-zinc-900">
                  {meta.total} matches found
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
              
              <button 
                onClick={() => {
                  const params = new URLSearchParams({ q: query });
                  if (edition) params.set('edition', edition);
                  if (language) params.set('language', language);
                  copyToClipboard(`${window.location.origin}/api/search?${params.toString()}`);
                }}
                className="text-[10px] uppercase tracking-wider text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                Copy API Endpoint
              </button>
            </div>
          ) : null}
        </section>

        <section className="space-y-6">
          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              {error}
            </div>
          ) : null}

          {results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((result) => (
                <article
                  key={result.id}
                  className="group rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
                >
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-sm font-bold text-blue-500">
                        {result.surah_id}:{result.number_in_surah}
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Ayah {result.number}</p>
                        <p className="text-xs text-zinc-600">Global ID: {result.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {result.matched_identifiers.map(id => (
                        <span key={id} className="rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[10px] font-mono text-zinc-400 group-hover:border-zinc-700 transition-colors">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mb-8 text-right font-arabic text-3xl leading-[2.2] text-zinc-100" dir="rtl">
                    {result.text}
                  </p>

                  <div className="relative rounded-2xl bg-black/30 p-6 border border-zinc-800/50">
                    <p className="text-lg leading-relaxed text-zinc-300">
                      {result.edition_content ?? result.translation ?? 'No text available'}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800/50 pt-4">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                        {result.edition ? (
                          <>Edition: <span className="text-blue-400">{result.edition.identifier}</span> ({result.edition.englishName})</>
                        ) : (
                          <>Default Translation: <span className="text-zinc-300">Sahih International</span></>
                        )}
                      </p>
                      
                      <Link 
                        href={`/api/ayahs/${result.id}`}
                        className="text-[10px] uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        View JSON Data
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : query && !loading && !error ? (
            <div className="rounded-3xl border border-dashed border-zinc-800/50 bg-zinc-900/10 py-32 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-zinc-700">
                <SearchIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-zinc-400">No results found</h3>
              <p className="text-zinc-600">Try searching for different keywords or check your filters.</p>
            </div>
          ) : !query && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { q: "patience", t: "Patience (Sabr)" },
                  { q: "knowledge", t: "Knowledge ('Ilm)" },
                  { q: "paradise", t: "Paradise (Jannah)" }
                ].map(item => (
                  <button 
                    key={item.q}
                    onClick={() => { setQuery(item.q); }}
                    className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-blue-500/30 transition-all text-center group"
                  >
                    <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Try searching</p>
                    <p className="text-lg font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{item.t}</p>
                  </button>
                ))}
             </div>
          )}
        </section>
      </div>
    </div>
  );
}
