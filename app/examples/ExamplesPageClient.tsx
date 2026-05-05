'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';

import type { Surah } from '@/lib/quran-types';

interface SurahsResponse {
  success: boolean;
  data: Surah[];
}

export default function ExamplesPageClient() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/surahs')
      .then((res) => res.json() as Promise<SurahsResponse>)
      .then((data) => {
        if (data.success) {
          setSurahs(data.data.slice(0, 10));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-6 md:p-12 text-white">
      <div className="mx-auto max-w-4xl space-y-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section>
          <h1 className="mb-4 text-4xl font-bold">Live Examples</h1>
          <p className="text-lg text-gray-400">
            See the Quran API in action with these live demonstrations.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-2xl font-bold">Surah List Demo</h2>
            <code className="w-fit rounded bg-blue-500/10 px-2 py-1 text-[10px] text-blue-400">
              GET /api/surahs
            </code>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-sm text-gray-400">Fetching first 10 surahs...</p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {surahs.map((surah) => (
                    <div
                      key={surah.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-4 transition-colors hover:bg-zinc-800"
                    >
                      <div>
                        <p className="text-xs text-gray-500">Surah {surah.number}</p>
                        <h3 className="font-bold">{surah.name_en}</h3>
                        <p className="text-xs text-gray-400">{surah.name_en_translation}</p>
                      </div>
                      <span className="text-xl font-arabic">{surah.name_ar}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Code Example (Next.js)</h2>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-sm text-gray-300">
            {`async function getSurahs() {
  const res = await fetch('https://al-quran-database.vercel.app/api/v1/surahs');
  const data = await res.json();
  
  if (data.success) {
    return data.data;
  }
  return [];
}`}
          </pre>
        </section>
      </div>
    </div>
  );
}
