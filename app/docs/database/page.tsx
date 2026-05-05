import DocsLayout from '@/components/DocsLayout';
import { Database, Download, Table, RefreshCw, Zap, Server, ShieldCheck } from 'lucide-react';

export default function DatabaseDocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-16 pb-20">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold tracking-tight">Database Architecture</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Our platform provides a highly normalized and indexed relational database structure,
            optimized for both research and production-grade application development.
          </p>
        </section>

        {/* Schema Diagram */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Table className="w-6 h-6 text-purple-500" />
            Entity Relationship Diagram
          </h2>
          <div className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 font-mono text-xs overflow-x-auto">
            <pre className="text-zinc-400">
              {`erDiagram
    SURAHS ||--o{ AYAHS : "contains"
    SURAHS ||--o{ WORDS : "contains"
    AYAHS ||--o{ WORDS : "broken down into"
    JUZS ||--o{ AYAHS : "divides"
    PAGES ||--o{ AYAHS : "maps to"
    RUBS ||--o{ AYAHS : "quarters"

    SURAHS {
        int id PK
        int number UK
        string name_ar
        string name_en
        string name_en_translation
    }
    AYAHS {
        int id PK
        int number UK
        string text
        int surah_id FK
        int juz_id FK
        int page FK
        bool sajda
    }
    WORDS {
        int id PK
        int ayah_id FK
        string text
        string root
        string morphology
    }`}
            </pre>
          </div>
        </section>

        {/* Exports */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Download className="w-6 h-6 text-green-500" />
            Standard Data Exports
          </h2>
          <p className="text-gray-400">
            Download our pre-indexed database exports. All files include proper foreign key
            constraints and optimization indexes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all group">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                SQLite (Production Ready)
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Perfect for mobile apps and edge deployments. Pre-indexed with PRAGMA optimization.
              </p>
              <a
                href="/quran_indexed.sqlite"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download .sqlite
              </a>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all group">
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                PostgreSQL (Schema & Data)
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Optimized for server-side APIs. Includes full transaction blocks and SERIAL primary
                keys.
              </p>
              <a
                href="/quran_postgres.sql"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm font-bold hover:bg-zinc-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download .sql
              </a>
            </div>
          </div>
        </section>

        {/* Maintenance & Scripts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-orange-500" />
            Maintenance & Seeding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-zinc-500" />
                Database Migrations
              </h3>
              <p className="text-sm text-gray-400">
                Manage data schema versions using our migration toolkit. Ensures consistency across
                JSON and SQL formats.
              </p>
              <code className="block p-3 rounded-lg bg-black border border-zinc-800 text-xs text-blue-400">
                python3 scripts/migrate_db.py
              </code>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Sample Data Seeding
              </h3>
              <p className="text-sm text-gray-400">
                Generate a lightweight subset of the database (first 3 Surahs) for rapid development
                and testing.
              </p>
              <code className="block p-3 rounded-lg bg-black border border-zinc-800 text-xs text-green-400">
                python3 scripts/seed_data.py
              </code>
            </div>
          </div>
        </section>

        {/* Replication & Scaling */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Server className="w-6 h-6 text-red-500" />
            Scaling & Replication
          </h2>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-200">Edge Replication</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  For global low-latency, use <strong>Turso</strong> to replicate the SQLite
                  database across 30+ regions.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-200">Read Replicas</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The PostgreSQL export is optimized for <strong>Primary-Replica</strong> setups.
                  Direct high-traffic search queries to read replicas.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-200">Horizontal Scaling</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Use connection poolers like <strong>PgBouncer</strong> to handle thousands of
                  concurrent API requests efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold">Indexing & Performance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                All exports include optimized indexes for high-traffic query patterns. We benchmark
                every build against the following metrics:
              </p>
              <ul className="space-y-3 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>
                    Surah/Ayah Lookup: <strong>&lt; 1ms</strong>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>
                    Full Word Search: <strong>&lt; 5ms</strong>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>
                    JSON Cold Load: <strong>~200ms</strong>
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Benchmark Command
              </h4>
              <code className="text-[10px] text-blue-300">
                python3 scripts/performance_metrics.py
              </code>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
