import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsSearch() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Search API</h1>
          <p className="text-gray-400 text-lg">
            High-performance keyword search across the entire Quran.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Keyword Search</h2>
          <p className="text-gray-400">
            Find Ayahs matching a specific term or phrase.
          </p>
          <ApiPreview endpoint="/api/search?q=patience" />
        </section>
      </div>
    </DocsLayout>
  );
}
