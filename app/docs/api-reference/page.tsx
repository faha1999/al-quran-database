import DocsLayout from '@/components/DocsLayout';

const endpoints = [
  {
    method: 'GET',
    path: '/surahs',
    description: 'Get a list of all 114 Surahs.',
  },
  {
    method: 'GET',
    path: '/surahs/[id]',
    description: 'Get details of a specific Surah by its ID (1-114), including all its Ayahs.',
  },
  {
    method: 'GET',
    path: '/ayahs/[id]',
    description: 'Get a specific Ayah by its global number (1-6236).',
  },
  {
    method: 'GET',
    path: '/search?q=[query]',
    description: 'Search for Ayahs containing a specific keyword.',
  },
];

export default function ApiReference() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-gray-400 text-lg">
            Detailed information about all available endpoints.
          </p>
        </section>

        <div className="grid gap-6">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded border border-blue-500/20">
                  {endpoint.method}
                </span>
                <code className="text-gray-200 font-mono">{endpoint.path}</code>
              </div>
              <p className="text-gray-400 text-sm">
                {endpoint.description}
              </p>
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Example Response</h4>
                <pre className="bg-black/50 p-4 rounded-lg text-xs text-gray-400 overflow-x-auto">
{`{
  "success": true,
  "data": { ... }
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
