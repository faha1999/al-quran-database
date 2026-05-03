import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsSurahs() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Surahs API</h1>
          <p className="text-gray-400 text-lg">
            Access metadata for all 114 surahs or full ayah payloads for one surah.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">List All Surahs</h2>
          <p className="text-gray-400">
            Returns a list of all surahs with optional pagination via `page` and `limit`.
          </p>
          <ApiPreview endpoint="/api/surahs?page=1&limit=10" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Surah by ID</h2>
          <p className="text-gray-400">
            Returns detailed information about a specific surah, including ayahs with default `translation`.
          </p>
          <ApiPreview endpoint="/api/surahs/1" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Surah with Edition Text</h2>
          <p className="text-gray-400">
            Add `edition` to include `edition_content` and the selected edition metadata on each ayah.
          </p>
          <ApiPreview endpoint="/api/surahs/1?edition=en.sahih" />
        </section>
      </div>
    </DocsLayout>
  );
}
