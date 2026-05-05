'use client';

import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';
import { motion } from 'framer-motion';
import { FileText, Database, Info } from 'lucide-react';

export default function DocsAyahs() {
  return (
    <DocsLayout>
      <div className="space-y-16 pb-20">
        <section className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            Ayahs API
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Deep access to individual Ayahs, word-by-word breakdowns, and scholarly metadata from the knowledge layer.
          </motion.p>
        </section>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
               <FileText className="w-6 h-6 text-blue-400" />
               Get Ayah by Global ID
            </h2>
            <p className="text-sm text-zinc-500">
              Fetch a specific Ayah using its absolute ID (1-6236). Supports translation and knowledge hydration.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
               <ApiPreview endpoint="/api/v1/ayahs/1?include_words=true" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
               <Database className="w-6 h-6 text-emerald-400" />
               Word-by-Word
            </h2>
            <p className="text-sm text-zinc-500">
              Get the linguistic breakdown (Arabic tokens) for every word in a specific Ayah.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
               <ApiPreview endpoint="/api/v1/words?ayah_id=1" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
               <Info className="w-6 h-6 text-indigo-400" />
               Knowledge Entry
            </h2>
            <p className="text-sm text-zinc-500">
              Retrieve curated thematic tags, cross-references, and scholarly notes for an Ayah.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
               <ApiPreview endpoint="/api/v1/knowledge/1" />
            </div>
          </section>
        </div>
      </div>
    </DocsLayout>
  );
}
