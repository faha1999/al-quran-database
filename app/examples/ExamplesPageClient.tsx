'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, GitBranch, Loader2, Package, Shield } from 'lucide-react';

import type { Surah } from '@/lib/quran-types';
import {
  isHostedApiDisabledHost,
  localDevBaseUrl,
  npmPackageUrl,
  repositoryUrl,
} from '@/lib/site-config';

interface SurahsResponse {
  success: boolean;
  data: Surah[];
}

export default function ExamplesPageClient() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHostedSite, setIsHostedSite] = useState(false);

  useEffect(() => {
    const hosted = isHostedApiDisabledHost(window.location.hostname);
    setIsHostedSite(hosted);

    if (hosted) {
      setLoading(false);
      return;
    }

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
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-6 text-white sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-4xl space-y-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <section>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
            <Shield className="h-4 w-4" />
            Local and Self-Hosted Examples
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Integration Examples</h1>
          <p className="max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
            Use these examples when you run the project locally or deploy your own copy. The
            official hosted domain keeps the API private for now.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div>
              <p className="text-sm font-semibold text-white">Clone the repository</p>
              <p className="mt-1 text-sm text-zinc-400">Run the full API locally with `npm run dev`.</p>
            </div>
            <GitBranch className="h-5 w-5 text-zinc-500" />
          </a>
          <a
            href={npmPackageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div>
              <p className="text-sm font-semibold text-white">Install the SDK</p>
              <p className="mt-1 text-sm text-zinc-400">Point the client at your local or hosted base URL.</p>
            </div>
            <Package className="h-5 w-5 text-zinc-500" />
          </a>
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
              <p className="text-sm text-gray-400">
                {isHostedSite
                  ? 'Hosted API calls are disabled here. Run the repository locally or self-host it to try this demo.'
                  : 'Fetching first 10 surahs from your current deployment...'}
              </p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              ) : isHostedSite ? (
                <div className="rounded-2xl border border-dashed border-zinc-700 bg-black/20 p-6 text-sm leading-7 text-zinc-400">
                  Start the app locally and revisit this page to run the live API demo against your
                  own instance. The request path stays the same, but the runtime must be yours.
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
            {`const API_BASE_URL = process.env.NEXT_PUBLIC_QURAN_API_BASE_URL ?? '${localDevBaseUrl}';

async function getSurahs() {
  const res = await fetch(\`\${API_BASE_URL}/api/v1/surahs\`);
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
