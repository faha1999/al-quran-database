'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { BookOpen, Code, Database, Package, Radio, Shield, Terminal, Wifi, WifiOff, Zap } from 'lucide-react';
import { localDevBaseUrl, npmPackageName, selfHostPlaceholderUrl } from '@/lib/site-config';

const localFunctions = [
  'getSurah(id, edition?)',
  'getAyah(id, edition?)',
  'getAyahByNumber(number, edition?)',
  'getAllSurahs(page?, limit?)',
  'getJuzById(id, edition?)',
  'getHizbById(id, edition?)',
  'getRubById(id, edition?)',
  'getPageById(id, edition?)',
  'searchAyahs(query, filters?)',
  'getReciters()',
  'getDuas(page?, limit?)',
  'getKnowledgeByAyah(ayahId)',
  'getSurahProfile(id)',
  'getKnowledgeFaqs()',
  'getResearchReferences()',
  'getDatasetMetadata()',
  'getAllEditions()',
  'getSupportedLanguagesList()',
];

const sdkMethods = [
  'getSurahs(page?, limit?)',
  'getSurah(id, edition?)',
  'getAyah(id, edition?, includeWords?)',
  'search(query, { edition?, language?, page?, limit? })',
  'getJuz(id, edition?)',
  'getHizb(id, edition?)',
  'getRub(id, edition?)',
  'getPage(id, edition?)',
  'getWords(ayahId)',
  'getDuas(page?, limit?)',
  'getReciters()',
  'getFaqs()',
  'getKnowledge(ayahId)',
  'getMeta()',
  'getResearchReferences()',
  'graphql({ query, variables? })',
];

const bundledEditions = [
  { id: 'en.sahih', label: 'Sahih International', lang: 'English' },
  { id: 'en.yusufali', label: 'Yusuf Ali', lang: 'English' },
  { id: 'quran-simple-clean', label: 'Simple Arabic (no diacritics)', lang: 'Arabic' },
  { id: 'quran-uthmani', label: 'Full Uthmani', lang: 'Arabic' },
];

const publicExports = [
  '`getSurah`, `getAyah`, `searchAyahs` + 15 more local functions',
  '`surahs`, `ayahs`, `editions`, `juzs` + all raw data arrays',
  '`BUNDLED_EDITION_IDENTIFIERS`, `DEFAULT_TRANSLATION_IDENTIFIER`',
  '`QuranDevSDK` class (server-based SDK)',
  '`quran` singleton instance',
  '`QuranApiOptions`, `GraphqlRequest`, `MetaPayload`',
  'All TypeScript entity and response types',
];

export default function SdkPageClient() {
  return (
    <DocsLayout>
      <div className="space-y-14">
        {/* Hero */}
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            SDK Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Complete Quran dataset with TypeScript SDK — works offline with no server. Also includes
            a REST + GraphQL SDK for self-hosted deployments with all 134 editions.
          </motion.p>
        </section>

        {/* Install + Offline badge */}
        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
              <Package className="h-6 w-6 text-blue-500" />
              Install
            </h2>
            <pre className="overflow-x-auto rounded-2xl border border-zinc-800/60 bg-black/40 p-5 text-sm text-zinc-300">
              <code>{`npm install ${npmPackageName}`}</code>
            </pre>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Works in browsers, edge runtimes, and Node 18+. ESM-only. Zero runtime dependencies.
            </p>
          </article>

          <article className="rounded-3xl border border-emerald-900/40 bg-emerald-950/10 p-8 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
              <WifiOff className="h-6 w-6 text-emerald-400" />
              Works Offline
            </h2>
            <div className="space-y-2 text-sm leading-relaxed text-zinc-400">
              <p>
                Data is{' '}
                <strong className="text-zinc-200">bundled in the package</strong>. No server, no
                network call, no <code className="text-emerald-400">.env</code> file needed.
              </p>
              <p>Four editions ship ready for offline use — see Bundled Editions below.</p>
              <p>All 134 other editions available via jsDelivr CDN or self-hosted REST API.</p>
            </div>
          </article>
        </section>

        {/* Zero-setup quick start */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Zap className="h-6 w-6 text-amber-400" />
            Zero-setup quick start
          </h2>
          <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
            <h3 className="mb-4 text-lg font-bold text-zinc-200">
              No server. No network. Works immediately.
            </h3>
            <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-300">
              <code>{`import { getSurah, getAyah, searchAyahs } from '${npmPackageName}';

// All of these work with no running server, no network call, no .env file

const fatiha = getSurah(1);
// → { id: 1, name_en: 'Al-Faatiha', ayahs: [...7 resolved ayahs...] }

const withSahih = getSurah(1, 'en.sahih');
// → same, but ayahs include Sahih International translation

const ayah = getAyah(1, 'en.sahih');
// → { text: 'بِسْمِ ٱللَّهِ ...', translation: 'In the name of Allah...' }

const results = searchAyahs('mercy');
// → { items: [...], meta: { total: 50, page: 1, ... } }`}</code>
            </pre>
          </article>
        </section>

        {/* Bundled editions */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Database className="h-6 w-6 text-violet-400" />
            Bundled Editions (offline)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {bundledEditions.map((ed) => (
              <article
                key={ed.id}
                className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                  <BookOpen className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-200">{ed.label}</p>
                  <code className="text-xs text-violet-300">{ed.id}</code>
                  <p className="mt-1 text-xs text-zinc-500">{ed.lang}</p>
                </div>
              </article>
            ))}
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
            <code>{`import { BUNDLED_EDITION_IDENTIFIERS } from '${npmPackageName}';
console.log(BUNDLED_EDITION_IDENTIFIERS);
// → ['en.sahih', 'quran-simple-clean', 'en.yusufali', 'quran-uthmani']`}</code>
          </pre>
        </section>

        {/* Local functions reference */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Radio className="h-6 w-6 text-sky-400" />
            Local Functions (18 offline-ready exports)
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {localFunctions.map((fn) => (
              <code
                key={fn}
                className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-xs text-zinc-300"
              >
                {fn}
              </code>
            ))}
          </div>
        </section>

        {/* CDN */}
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-indigo-900/10 p-8 space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Wifi className="h-6 w-6 text-indigo-400" />
            CDN Access via jsDelivr (GitHub)
          </h2>
          <p className="text-sm text-zinc-400">
            All data files are served from jsDelivr via the GitHub repository — no extra config, free, global CDN, CORS enabled.
          </p>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
            <code>{`// Base URL format:
// https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@{tag}/{path}

// Surah list (pinned v2.2.0)
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/surahs.json

// All 6236 ayahs
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/ayahs.json

// Bundled Sahih translation
https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/ayah-editions/en.sahih.json

// Fetch example:
const res = await fetch('https://cdn.jsdelivr.net/gh/faha1999/al-quran-database@v2.2.0/lib/data/surahs.json');
const surahs = await res.json();`}</code>
          </pre>
        </section>

        {/* Server SDK section */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Zap className="h-6 w-6 text-amber-500" />
            Server SDK — All 134 Editions
          </h2>
          <p className="text-sm text-zinc-400">
            For all 134 translations, word-by-word morphology, or real-time search — run the full
            platform locally or self-hosted.
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Local Development</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`import { QuranDevSDK } from '${npmPackageName}';

const quran = new QuranDevSDK({
  baseUrl: '${localDevBaseUrl}',
  apiVersion: 'v1',
});`}</code>
              </pre>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Self-Hosted API</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`import { QuranDevSDK } from '${npmPackageName}';

const quran = new QuranDevSDK({
  baseUrl: '${selfHostPlaceholderUrl}',
});

// Any of 134 editions
const surah = await quran.getSurah(1, 'ur.maududi');`}</code>
              </pre>
            </article>
          </div>
        </section>

        {/* Server SDK usage */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Code className="h-6 w-6 text-indigo-400" />
            Server SDK Usage
          </h2>
          <div className="grid gap-6">
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Surah + translation</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`const surah = await quran.getSurah(1, 'en.sahih');
console.log(surah.name_ar);
console.log(surah.ayahs[0]?.translation);`}</code>
              </pre>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Ranked search</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`const { data: results, meta } = await quran.search('mercy', {
  language: 'en',
  limit: 5,
});
console.log(meta.total);
console.log(results[0]?.matched_identifiers);`}</code>
              </pre>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Ayah with words and knowledge</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`const ayah = await quran.getAyah(1, 'en.sahih', true);
const knowledge = await quran.getKnowledge(1);

console.log(ayah.words?.[0]?.text);
console.log(knowledge.themes);`}</code>
              </pre>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">GraphQL</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`const data = await quran.graphql<{
  ayah: { text: string; knowledge: { themes: string[] } | null } | null;
}>({
  query: \`
    query GetAyah($id: Int!) {
      ayah(id: $id) {
        text
        knowledge { themes }
      }
    }
  \`,
  variables: { id: 1 },
});`}</code>
              </pre>
            </article>
          </div>
        </section>

        {/* Method coverage + exports */}
        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8">
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
              <Radio className="h-6 w-6 text-sky-400" />
              QuranDevSDK Methods
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {sdkMethods.map((method) => (
                <code
                  key={method}
                  className="rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-xs text-zinc-300"
                >
                  {method}
                </code>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8">
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
              <BookOpen className="h-6 w-6 text-fuchsia-400" />
              Public Exports
            </h2>
            <div className="space-y-3 text-sm text-zinc-400">
              {publicExports.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </section>

        {/* Error handling */}
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-900/10 p-8">
          <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
            <Terminal className="h-6 w-6 text-blue-400" />
            Error Handling
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
            <code>{`// Local functions return null for not-found (no throws):
const surah = getSurah(999); // → null
const ayah = getAyah(99999); // → null

// Server SDK throws on errors:
try {
  await quran.getSurah(999999);
} catch (error) {
  // "Quran API error: 404 Not Found" or envelope error text
}

try {
  await quran.graphql({ query: 'query { nope }' });
} catch (error) {
  // First error message from GraphQL response
}`}</code>
          </pre>
        </section>

        {/* Defaults */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8">
          <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
            <Shield className="h-6 w-6 text-emerald-500" />
            Defaults
          </h2>
          <div className="grid gap-4 text-sm leading-relaxed text-zinc-400 sm:grid-cols-2">
            <p>Local functions work with zero config — data is bundled in the package.</p>
            <p>
              <code className="text-zinc-300">QuranDevSDK</code>{' '}
              <code className="text-zinc-300">baseUrl</code> defaults to{' '}
              <code className="text-emerald-400">&apos;&apos;</code> (same-origin).
            </p>
            <p>
              <code className="text-zinc-300">apiVersion</code> defaults to{' '}
              <code className="text-emerald-400">v1</code>.
            </p>
            <p>Package is ESM-only, targets Node.js 18+.</p>
            <p>REST helpers throw on non-2xx responses or failed API envelopes.</p>
            <p>
              GraphQL helper throws on HTTP failures or{' '}
              <code className="text-zinc-300">errors</code> in response.
            </p>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
