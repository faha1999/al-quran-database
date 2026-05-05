import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsSearch() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Search API</h1>
          <p className="text-gray-400 text-lg">
            Search defaults to Arabic core text plus `en.sahih`. Optional filters narrow search to
            one edition or one language.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Default Search</h2>
          <p className="text-gray-400">
            Finds ayahs matching a specific term in Arabic text or the default English translation.
          </p>
          <ApiPreview endpoint="/api/search?q=patience" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Search One Edition</h2>
          <p className="text-gray-400">Limit matching to one text edition by identifier.</p>
          <ApiPreview endpoint="/api/search?q=allah&edition=en.yusufali" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Search One Language</h2>
          <p className="text-gray-400">
            Search all text editions for one language. Results are deduped by ayah ID.
          </p>
          <ApiPreview endpoint="/api/search?q=allah&language=en" />
        </section>
      </div>
    </DocsLayout>
  );
}
