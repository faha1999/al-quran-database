import DocsLayout from '@/components/DocsLayout';

const layers = [
  {
    title: 'Data layer',
    body: 'Sharded JSON under `lib/data/*`, cached edition loaders, SQL export and verification scripts.',
  },
  {
    title: 'Domain layer',
    body: '`lib/data-loader/*` resolves surahs, ayahs, search, pagination, validation, translations.',
  },
  {
    title: 'API layer',
    body: '`app/api/*` routes use shared response helpers for consistent success/error contracts.',
  },
  {
    title: 'Frontend layer',
    body: 'Docs, landing, examples, and search UI consume same typed contracts exposed by API + SDK.',
  },
];

export default function ArchitecturePage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Architecture</h1>
          <p className="max-w-3xl text-lg leading-8 text-zinc-400">
            Repo now follows clearer separation: data ingestion and storage, domain resolution,
            transport contracts, UI composition, and release automation.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {layers.map((layer) => (
            <article
              key={layer.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h2 className="mb-3 text-xl font-semibold">{layer.title}</h2>
              <p className="text-sm leading-6 text-zinc-400">{layer.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Runtime Flow</h2>
          <pre className="overflow-x-auto rounded-2xl bg-black/40 p-5 text-sm text-zinc-300">
            <code>{`request
  -> route validation
  -> domain resolver (lib/data-loader)
  -> edition cache / search index
  -> normalized response helper
  -> frontend / SDK consumer`}</code>
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
}
