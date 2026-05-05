import type { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import {
  editions,
  getKnowledgeCoverage,
  getResearchReferences,
  getSurahProfile,
} from '@/lib/data-loader';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran Knowledge Data Expansion Model',
  description:
    'Explore how Al-Quran Database expands canonical ayah data with research references, thematic tags, transliterations, tafsir, and knowledge layers.',
  path: '/docs/data-expansion',
  keywords: [
    'quran data expansion',
    'quran knowledge graph',
    'quran tafsir data',
    'quran research references',
    'quran metadata layers',
  ],
});

const implementedItems = [
  'More translations',
  'Tafsir data',
  'Audio recitation references',
  'Transliteration',
  'Asbab al-nuzul',
  'Hadith references',
  'Dua extraction',
  'Scientific-reference notes',
  'Legal-ruling notes',
  'Linguistic analysis',
  'Cross references between ayahs',
  'Historical context for surahs/ayahs',
  'Thematic tags',
  'Misinterpreted ayah notes',
  'FAQ entries',
  'Scholarly article references',
];

export default function DataExpansion() {
  const coverage = getKnowledgeCoverage();
  const translationCount = editions.filter((entry) => entry.type === 'translation').length;
  const tafsirCount = editions.filter((entry) => entry.type === 'tafsir').length;
  const transliterationCount = editions.filter((entry) => entry.type === 'transliteration').length;
  const audioCount = editions.filter((entry) => entry.format === 'audio').length;
  const sampleSurahProfile = getSurahProfile(2);
  const researchReferences = getResearchReferences();

  const stats = [
    { label: 'Translations', value: translationCount },
    { label: 'Tafsir editions', value: tafsirCount },
    { label: 'Audio editions', value: audioCount },
    { label: 'Transliterations', value: transliterationCount },
    { label: 'Knowledge entries', value: coverage.ayah_entries },
    { label: 'Research refs', value: researchReferences.length },
  ];

  return (
    <DocsLayout>
      <div className="space-y-10">
        <section className="rounded-[2rem] border border-emerald-500/15 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,rgba(9,17,28,0.96),rgba(7,11,18,0.98))] p-8">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Data Expansion
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Canon text plus expandable knowledge graph.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300">
            Platform now supports linguistic, devotional, legal, interpretive, and research layers
            on top of canonical ayah data. Some layers have full coverage. Scholarly layers ship as
            curated starter datasets with normalized schema ready for expansion.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-5"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6">
            <h2 className="text-2xl font-semibold">Implemented Categories</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {implementedItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6">
            <h2 className="text-2xl font-semibold">Starter Historical Profile</h2>
            {sampleSurahProfile ? (
              <div className="mt-5 space-y-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Surah 2 • {sampleSurahProfile.period}
                </p>
                <p className="text-lg text-zinc-100">{sampleSurahProfile.summary}</p>
                <p className="text-sm leading-6 text-zinc-400">
                  {sampleSurahProfile.historical_context}
                </p>
              </div>
            ) : null}
          </article>
        </section>

        <section className="rounded-[1.75rem] border border-zinc-800 bg-zinc-950/70 p-6">
          <h2 className="text-2xl font-semibold">Expansion Rules</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <p className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-400">
              Editions stay sharded by identifier for repo safety and edge-friendly loading.
            </p>
            <p className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-400">
              Knowledge entries stay explicit and source-aware. No silent inference stored as fact.
            </p>
            <p className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 text-sm leading-6 text-zinc-400">
              New scholarly categories should land in canonical JSON first, then flow into SQL
              exports and docs automatically.
            </p>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
