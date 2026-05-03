import DocsLayout from '@/components/DocsLayout';
import { Terminal } from 'lucide-react';

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-gray-400 text-lg">
            Welcome to the Quran Developer Platform. This platform provides a set of RESTful APIs to access Quranic data easily.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Start</h2>
          <p className="text-gray-400">
            You can start making requests to the API immediately. No API key is required for the MVP version.
          </p>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-mono">Terminal</span>
            </div>
            <pre className="bg-black p-4 rounded-md overflow-x-auto">
              <code className="text-blue-400">
                curl https://quran-dev.vercel.app/api/surahs
              </code>
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Base URL</h2>
          <p className="text-gray-400">
            The base URL for all API endpoints is:
          </p>
          <code className="bg-zinc-800 px-3 py-1 rounded text-blue-400">
            /api
          </code>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Response Format</h2>
          <p className="text-gray-400">
            All responses are returned in JSON format with a consistent structure:
          </p>
          <pre className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-sm text-gray-300">
{`{
  "success": true,
  "data": [...],
  "meta": {
    "total": 114
  }
}`}
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
}
