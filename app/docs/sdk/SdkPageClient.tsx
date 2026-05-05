'use client';

import DocsLayout from '@/components/DocsLayout';
import { motion } from 'framer-motion';
import { BookOpen, Code, Package, Radio, Shield, Terminal, Zap } from 'lucide-react';

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

const publicExports = [
  '`QuranDevSDK` class',
  '`quran` singleton instance',
  '`QuranApiOptions`',
  '`GraphqlRequest`',
  '`MetaPayload`',
  'public entity and response types from `quran-types`',
];

export default function SdkPageClient() {
  return (
    <DocsLayout>
      <div className="space-y-12">
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
            Verified JS/TS client for versioned REST and GraphQL. Package is ESM-only, targets Node
            18+, and uses native fetch.
          </motion.p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
              <Package className="h-6 w-6 text-blue-500" />
              Install
            </h2>
            <pre className="overflow-x-auto rounded-2xl border border-zinc-800/60 bg-black/40 p-5 text-sm text-zinc-300">
              <code>npm install @faha1999/al-quran-database</code>
            </pre>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Use inside browser apps, Next.js servers, edge runtimes, or Node services with native
              fetch.
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
              <Shield className="h-6 w-6 text-emerald-500" />
              Defaults
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
              <p>
                `baseUrl` defaults to empty string. This makes same-origin calls, useful when app
                and API deploy together.
              </p>
              <p>`apiVersion` defaults to `v1`.</p>
              <p>REST helpers throw on non-2xx responses or unsuccessful API envelopes.</p>
              <p>GraphQL helper throws when HTTP fails or response contains `errors`.</p>
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Zap className="h-6 w-6 text-amber-500" />
            Configuration
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Hosted API</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`import { QuranDevSDK } from '@faha1999/al-quran-database';

const quran = new QuranDevSDK({
  baseUrl: 'https://al-quran-database.vercel.app',
  apiVersion: 'v1',
});`}</code>
              </pre>
            </article>

            <article className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-8">
              <h3 className="mb-4 text-lg font-bold text-zinc-200">Same-Origin App</h3>
              <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
                <code>{`import { quran } from '@faha1999/al-quran-database';

const surah = await quran.getSurah(1);
console.log(surah.name_en);`}</code>
              </pre>
            </article>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            <Code className="h-6 w-6 text-indigo-400" />
            Usage
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
              <h3 className="mb-4 text-lg font-bold text-zinc-200">
                Ayah with words and knowledge
              </h3>
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
      ayah(id: $id, includeWords: true) {
        text
        knowledge {
          themes
        }
      }
    }
  \`,
  variables: { id: 1 },
});`}</code>
              </pre>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8">
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
              <Radio className="h-6 w-6 text-sky-400" />
              Method Coverage
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

        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-900/10 p-8">
          <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
            <Terminal className="h-6 w-6 text-blue-400" />
            Error Handling
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-zinc-800/50 bg-black/40 p-5 text-xs leading-relaxed text-zinc-400">
            <code>{`try {
  await quran.getSurah(999999);
} catch (error) {
  console.error(error);
  // REST: "Quran API error: 404 Not Found" or envelope error text
}

try {
  await quran.graphql({ query: 'query { nope }' });
} catch (error) {
  console.error(error);
  // GraphQL: first error message from response
}`}</code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
}
