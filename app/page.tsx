import Image from "next/image";
import Link from "next/link";
import { Book, Code, Zap, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#0a0a0a] text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-gradient-to-b from-zinc-900 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-zinc-800/30 lg:p-4">
          v1.0.0 (MVP)
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Kawsar Ahmed Fahad
          </a>
        </div>
      </div>

      <div className="relative flex flex-col items-center place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[1]">
        <Image
          src="/logo.png"
          alt="Quran Dev Logo"
          width={192}
          height={192}
          className="mb-8 h-32 w-32 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] md:h-48 md:w-48"
          priority
        />
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-center">
          Quran <span className="text-blue-500">Dev</span>
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4 mt-12">
        <Link
          href="/docs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Quran API features and endpoints.
          </p>
        </Link>

        <Link
          href="/api/surahs"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            API{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore the clean, RESTful API endpoints for Surahs and Ayahs.
          </p>
        </Link>

        <Link
          href="/examples"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Examples{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover real-world examples and boilerplates to get started quickly.
          </p>
        </Link>

        <Link
          href="/search"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Search{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Experience the high-performance keyword search powered by FlexSearch.
          </p>
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <Book className="w-10 h-10 mb-4 text-blue-500" />
          <h3 className="text-xl font-bold mb-2">Complete Dataset</h3>
          <p className="text-gray-400 text-sm">All 114 surahs, 6,236 ayahs, and 134 editions available via JSON API.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <Zap className="w-10 h-10 mb-4 text-yellow-500" />
          <h3 className="text-xl font-bold mb-2">Edge Ready</h3>
          <p className="text-gray-400 text-sm">Optimized for static delivery on GitHub Pages.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <Code className="w-10 h-10 mb-4 text-green-500" />
          <h3 className="text-xl font-bold mb-2">Clean API</h3>
          <p className="text-gray-400 text-sm">Consistent JSON responses and proper HTTP codes.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <Search className="w-10 h-10 mb-4 text-purple-500" />
          <h3 className="text-xl font-bold mb-2">Fast Search</h3>
          <p className="text-gray-400 text-sm">Instant keyword search with Arabic default plus multi-edition filters.</p>
        </div>
      </div>
    </main>
  );
}
