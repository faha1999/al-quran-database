'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search as SearchIcon, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=\${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (error) {
      console.error('Search failed', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter">Search Quran</h1>
          <p className="text-gray-400 text-lg">
            High-performance keyword search across all translations.
          </p>
        </section>

        <section>
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for 'patience', 'mercy', 'knowledge'..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>
        </section>

        <section className="space-y-6">
          {results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((result) => (
                <div key={result.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
                      Ayah {result.number} (Surah {result.surah_id}:{result.number_in_surah})
                    </span>
                  </div>
                  <p className="text-xl font-arabic text-right mb-4 leading-relaxed">
                    {result.text}
                  </p>
                  {/* For MVP we only have Arabic text in the primary dataset, 
                      In a full version we would show translation here too */}
                </div>
              ))}
            </div>
          ) : query && !loading ? (
            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-800/50 border-dashed">
              <p className="text-gray-500">No results found for "{query}"</p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
