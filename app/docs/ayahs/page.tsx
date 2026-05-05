import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsAyahs() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Ayahs API</h1>
          <p className="text-gray-400 text-lg">
            Access specific ayahs by global number and optionally project one edition onto the
            response.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Ayah by Number</h2>
          <p className="text-gray-400">Returns a specific ayah by its global number (1-6236).</p>
          <ApiPreview endpoint="/api/ayahs/1" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Ayah with Edition</h2>
          <p className="text-gray-400">
            Add `edition` to receive one selected edition in `edition_content`.
          </p>
          <ApiPreview endpoint="/api/ayahs/1?edition=en.sahih" />
        </section>
      </div>
    </DocsLayout>
  );
}
