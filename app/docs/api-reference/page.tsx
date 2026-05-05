import DocsLayout from '@/components/DocsLayout';

const endpoints = [
  {
    method: 'GET',
    path: '/surahs',
    description: 'Get all 114 Surahs. Supports optional page and limit query params.',
  },
  {
    method: 'GET',
    path: '/surahs/[id]',
    description: 'Get one Surah by ID or number. Supports optional edition query param.',
  },
  {
    method: 'GET',
    path: '/ayahs/[id]',
    description:
      'Get one Ayah by global number (1-6236). Supports optional edition and include_words params, plus context and knowledge hydration.',
  },
  {
    method: 'GET',
    path: '/juz/[id]',
    description: 'Get one juz by ID (1-30), including derived ayah and page ranges.',
  },
  {
    method: 'GET',
    path: '/hizb/[id]',
    description: 'Get one hizb by ID (1-60), containing all ayahs in that division.',
  },
  {
    method: 'GET',
    path: '/rub/[id]',
    description: 'Get one Rub (Quarter) by ID (1-480).',
  },
  {
    method: 'GET',
    path: '/pages/[id]',
    description: 'Get ayahs for a specific Mushaf page (1-604).',
  },
  {
    method: 'GET',
    path: '/words?ayah_id=[id]',
    description: 'Get word-by-word breakdown (Arabic tokens) for a specific ayah.',
  },
  {
    method: 'GET',
    path: '/reciters',
    description: 'Get list of available reciters for audio streaming references.',
  },
  {
    method: 'GET',
    path: '/duas',
    description: 'Get all supplications (Duas) extracted from the Quran. Supports pagination.',
  },
  {
    method: 'GET',
    path: '/knowledge/[id]',
    description:
      'Get curated knowledge entry for an ayah: themes, cross refs, legal/scientific/linguistic notes, and misinterpretation guidance.',
  },
  {
    method: 'GET',
    path: '/faqs',
    description: 'Get canonical FAQ entries stored in the knowledge layer.',
  },
  {
    method: 'GET',
    path: '/meta',
    description:
      'Get dataset metadata, source hash, canonical counts, and knowledge coverage summary.',
  },
  {
    method: 'GET',
    path: '/search?q=[query]',
    description: 'Search ayahs. Supports edition, language, page, and limit query params.',
  },
];

export default function ApiReference() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-gray-400 text-lg">
            Core endpoints stay simple. Filters open up multi-edition JSON data without changing the
            default response shape.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-3 text-xl font-bold">Query Rules</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>`edition` and `language` cannot be used together on search.</li>
              <li>`page` and `limit` must be positive integers.</li>
              <li>Unknown editions or languages return HTTP `400`.</li>
              <li>Knowledge routes return `404` when entry coverage does not exist yet.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-3 text-xl font-bold">Default Text</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Arabic source stays in `ayahs.text`.</li>
              <li>Default translation stays `en.sahih` in `translation`.</li>
              <li>Optional `edition_content` appears when an edition filter is used.</li>
              <li>Optional `knowledge` appears when curated coverage exists for an ayah.</li>
            </ul>
          </div>
        </section>

        <div className="grid gap-6">
          {endpoints.map((endpoint) => (
            <div
              key={endpoint.path}
              className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded border border-blue-500/20">
                  {endpoint.method}
                </span>
                <code className="text-gray-200 font-mono">{endpoint.path}</code>
              </div>
              <p className="text-gray-400 text-sm">{endpoint.description}</p>
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Example Response
                </h4>
                <pre className="bg-black/50 p-4 rounded-lg text-xs text-gray-400 overflow-x-auto">
                  {`// Success Response
{
  "success": true,
  "data": { ... },
  "meta": { ... }
}

// Error Response
{
  "success": false,
  "error": "Error message description"
}`}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
