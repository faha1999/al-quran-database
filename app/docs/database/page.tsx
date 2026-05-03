import DocsLayout from '@/components/DocsLayout';
import { Database, Download, Table, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function DatabaseDocsPage() {
  const tables = [
    { name: 'surahs', description: 'Metadata for all 114 Surahs.', cols: ['id', 'number', 'name_ar', 'name_en', 'type'] },
    { name: 'ayahs', description: 'Primary Quranic text and divisions.', cols: ['id', 'number', 'text', 'surah_id', 'page', 'juz_id', 'hizb_id', 'sajda'] },
    { name: 'words', description: 'Word-by-word breakdown (82k+ entries).', cols: ['id', 'ayah_id', 'text', 'position', 'root', 'morphology'] },
    { name: 'juzs', description: 'Mapping of the 30 Quranic parts.', cols: ['id', 'ayah_count', 'start_ayah_number', 'end_ayah_number'] },
    { name: 'pages', description: 'Mushaf page mappings (604 pages).', cols: ['id', 'ayah_count', 'start_ayah_number', 'end_ayah_number'] },
    { name: 'rubs', description: 'Rub-el-Hizb (480 quarters).', cols: ['id', 'ayah_count', 'start_ayah_number', 'end_ayah_number'] },
  ];

  return (
    <DocsLayout>
      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold">Database Architecture</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Our platform provides a highly normalized and indexed relational database structure, optimized for both research and application development.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Download className="w-6 h-6 text-green-500" />
            Advanced Data Exports
          </h2>
          <p className="text-gray-400">
            Download our pre-indexed database exports for use in your local environment or production systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
              <h3 className="text-xl font-bold mb-2">SQLite (Indexed)</h3>
              <p className="text-sm text-gray-500 mb-4">Perfect for mobile apps and small web projects. Fully indexed and ready to use.</p>
              <a href="/quran_indexed.sqlite" download className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors">
                <Download className="w-4 h-4" />
                Download .sqlite
              </a>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
              <h3 className="text-xl font-bold mb-2">PostgreSQL (Schema)</h3>
              <p className="text-sm text-gray-500 mb-4">Optimized for production-grade APIs. Includes foreign keys, indexes, and constraints.</p>
              <a href="/quran_postgres.sql" download className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm font-bold hover:bg-zinc-700 transition-colors">
                <Download className="w-4 h-4" />
                Download .sql
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Table className="w-6 h-6 text-purple-500" />
            Schema Reference
          </h2>
          <div className="space-y-4">
            {tables.map((table) => (
              <div key={table.name} className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <code className="text-blue-400 font-bold text-lg">{table.name}</code>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Table</span>
                </div>
                <div className="p-6 bg-black/20">
                  <p className="text-gray-400 mb-4">{table.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {table.cols.map((col) => (
                      <span key={col} className="px-2.5 py-1 rounded-md bg-zinc-800 text-xs font-mono text-zinc-300">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20">
          <h2 className="text-xl font-bold mb-4">Indexing & Performance</h2>
          <p className="text-gray-400 leading-relaxed">
            All exports include pre-defined indexes on high-traffic columns:
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <code className="text-zinc-200">idx_ayahs_surah</code>: Surah-based ayah filtering.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <code className="text-zinc-200">idx_ayahs_juz</code>: Para/Juz based data retrieval.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <code className="text-zinc-200">idx_words_ayah</code>: Word-by-word mapping for Ayahs.
            </li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
}
