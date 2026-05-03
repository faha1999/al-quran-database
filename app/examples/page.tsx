'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';

import type { Surah } from '@/lib/quran-types';

interface SurahsResponse {
  success: boolean;
  data: Surah[];
}

export default function ExamplesPage() {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <section>
          <h1 className="text-4xl font-bold mb-4">Live Examples</h1>
          <p className="text-gray-400 text-lg">
            See the Quran API in action with these live demonstrations.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Surah List Demo</h2>
            <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">GET /api/surahs</code>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
              <p className="text-sm text-gray-400">Fetching first 10 surahs...</p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {surahs.map((surah) => (
                    <div key={surah.id} className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 flex justify-between items-center hover:bg-zinc-800 transition-colors">
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
          <pre className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-sm overflow-x-auto text-gray-300">
{`async function getSurahs() {
  const res = await fetch('https://quran-dev.vercel.app/api/surahs');
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
