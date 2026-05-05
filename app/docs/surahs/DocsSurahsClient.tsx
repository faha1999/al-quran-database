'use client';

import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';
import { motion } from 'framer-motion';
import { List, Hash, BookOpen } from 'lucide-react';

export default function DocsSurahsClient() {
  return (
    <DocsLayout>
      <div className="space-y-16 pb-20">
        <section className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight md:text-5xl"
          >
            Surahs API
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >
            Access metadata for all 114 Surahs or fetch full Ayah payloads for a specific chapter.
          </motion.p>
        </section>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <List className="h-6 w-6 text-blue-400" />
              List All Surahs
            </h2>
            <p className="text-sm text-zinc-500">
              Returns a paginated list of all Surahs including Arabic names, translations, and
              revelation types.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/surahs?page=1&limit=10" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Hash className="h-6 w-6 text-indigo-400" />
              Get Surah by ID
            </h2>
            <p className="text-sm text-zinc-500">
              Fetch detailed information about a specific Surah, including all its Ayahs with the
              default translation.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/surahs/1" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <BookOpen className="h-6 w-6 text-emerald-400" />
              With Custom Edition
            </h2>
            <p className="text-sm text-zinc-500">
              Optionally include a specific translation edition in the response.
            </p>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/10 p-2 backdrop-blur-sm">
              <ApiPreview endpoint="/api/v1/surahs/1?edition=en.sahih" />
            </div>
          </section>
        </div>
      </div>
    </DocsLayout>
  );
}
