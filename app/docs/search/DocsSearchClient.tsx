'use client';

import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';
import { motion } from 'framer-motion';
import { Search, Zap, Globe, Cpu } from 'lucide-react';

export default function DocsSearchClient() {
  return (
    <DocsLayout>
      <div className="space-y-16 pb-20">
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            Search Engine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            High-performance, ranked full-text search powered by FlexSearch. Optimized for Arabic
            linguistics and multi-language discovery.
          </motion.p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Cpu className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="mb-3 text-xl font-bold">FlexSearch Integration</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              We use an in-memory FlexSearch document index with{' '}
              <code>tokenize: &quot;full&quot;</code> and <code>context: true</code>. This allows
              for partial word matching and proximity-based ranking, resolving most queries in under{' '}
              <strong>10ms</strong>.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-xl">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Globe className="h-5 w-5 text-emerald-400" />
            </div>
            <h2 className="mb-3 text-xl font-bold">Linguistic Normalization</h2>
            <p className="text-sm leading-relaxed text-zinc-500">
              Arabic text undergoes multi-stage normalization: diacritics removal, letter
              simplification (Alif/Hamza standardization), and punctuation stripping to ensure
              consistent discovery.
            </p>
          </div>
        </section>

        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-amber-400" />
              <h2 className="text-2xl font-bold">Standard Query</h2>
            </div>
            <p className="text-sm text-zinc-500">
              Searches across Arabic core text and the default English (Sahih International)
              translation.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/search?q=patience" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Search className="h-6 w-6 text-indigo-400" />
              Edition Filtering
            </h2>
            <p className="text-sm text-zinc-500">
              Narrow your search to a specific translation edition by passing its identifier.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/search?q=allah&edition=en.yusufali" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Globe className="h-6 w-6 text-blue-400" />
              Language Filtering
            </h2>
            <p className="text-sm text-zinc-500">
              Search all available editions within a specific language. Results are automatically
              deduped by Ayah ID.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/search?q=rahman&language=en" />
            </div>
          </section>
        </div>
      </div>
    </DocsLayout>
  );
}
