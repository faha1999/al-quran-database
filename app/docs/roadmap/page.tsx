import DocsLayout from '@/components/DocsLayout';

const roadmap = [
  'Publish standalone NPM SDK package with stable exports and semver release notes.',
  'Broaden e2e coverage across examples, docs navigation, and edge-case filters.',
  'Ship richer data exploration: thematic tags, tafsir browsing, verse comparison.',
  'Add deployment target secrets and enable automated CD for production docs/API hosting.',
];

export default function RoadmapPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Roadmap</h1>
          <p className="max-w-3xl text-lg leading-8 text-zinc-400">
            Current release locks core architecture, shared API responses, reusable filter system,
            test matrix, and contributor workflow. Next phase expands packaging, observability, and
            richer study tooling.
          </p>
        </section>

        <section className="grid gap-4">
          {roadmap.map((item, index) => (
            <article key={item} className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Phase 0{index + 1}
              </p>
              <p className="text-base leading-7 text-zinc-200">{item}</p>
            </article>
          ))}
        </section>
      </div>
    </DocsLayout>
  );
}
