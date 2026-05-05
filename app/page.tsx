import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Book, Code, Zap, Search } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { createPageMetadata, createSoftwareApplicationSchema } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran API, SDK, Search & Database Exports',
  description:
    'Build with a production-ready Quran API, TypeScript SDK, search engine, and downloadable database exports from Al-Quran Database.',
  path: '/',
  keywords: [
    'quran api',
    'quran sdk',
    'quran database exports',
    'quran graphql api',
    'quran search engine',
    'quran developer platform',
  ],
});

export default function Home() {
  return (
    <>
      <StructuredData data={createSoftwareApplicationSchema()} />
      <main className="flex min-h-screen flex-col items-center justify-between bg-[#0a0a0a] p-10 md:p-24 text-white">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12 lg:mb-0">
          <p className="flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-800/30 lg:p-4">
            v2.0.0 (MVP)
          </p>
          <div className="flex h-auto w-full items-end justify-center bg-transparent lg:static lg:h-auto lg:w-auto lg:bg-none mt-4 lg:mt-0">
            <a
              className="flex place-items-center gap-2 p-0 lg:p-0"
              href="https://github.com/faha1999"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Kawsar Ahmed Fahad
            </a>
          </div>
        </div>

        <div className="relative flex flex-col items-center place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] sm:before:w-[480px] sm:after:w-[240px] z-[1]">
          <Image
            src="/logo.png"
            alt="Quran Dev Logo"
            width={192}
            height={192}
            className="mb-8 h-32 w-32 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] md:h-48 md:w-48"
            priority
          />
          <h1 className="text-center text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            Quran <span className="text-blue-500">Dev</span>
          </h1>
        </div>

        <div className="mt-12 mb-12 lg:mb-0 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
          <Link
            href="/docs"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Docs{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Find in-depth information about Quran API features and endpoints.
            </p>
          </Link>

          <Link
            href="/api/surahs"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              API{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Explore the clean, RESTful API endpoints for Surahs and Ayahs.
            </p>
          </Link>

          <Link
            href="/examples"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Examples{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Discover real-world examples and boilerplates to get started quickly.
            </p>
          </Link>

          <Link
            href="/search"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Search{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
              Experience the high-performance keyword search powered by FlexSearch.
            </p>
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Book className="mb-4 h-10 w-10 text-blue-500" />
            <h3 className="mb-2 text-xl font-bold">Complete Dataset</h3>
            <p className="text-sm text-gray-400">
              All 114 surahs, 6,236 ayahs, and 134 editions available via JSON API.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Zap className="mb-4 h-10 w-10 text-yellow-500" />
            <h3 className="mb-2 text-xl font-bold">Edge Ready</h3>
            <p className="text-sm text-gray-400">Optimized for static delivery on GitHub Pages.</p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Code className="mb-4 h-10 w-10 text-green-500" />
            <h3 className="mb-2 text-xl font-bold">Clean API</h3>
            <p className="text-sm text-gray-400">
              Consistent JSON responses and proper HTTP codes.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Search className="mb-4 h-10 w-10 text-purple-500" />
            <h3 className="mb-2 text-xl font-bold">Fast Search</h3>
            <p className="text-sm text-gray-400">
              Instant keyword search with Arabic default plus multi-edition filters.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
