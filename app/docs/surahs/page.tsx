import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsSurahs() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Surahs API</h1>
          <p className="text-gray-400 text-lg">
            Access metadata and content for all 114 Surahs of the Quran.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">List All Surahs</h2>
          <p className="text-gray-400">
            Returns a list of all Surahs with their basic information.
          </p>
          <ApiPreview endpoint="/api/surahs" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Surah by ID</h2>
          <p className="text-gray-400">
            Returns detailed information about a specific Surah, including all its Ayahs.
          </p>
          <ApiPreview endpoint="/api/surahs/1" />
        </section>
      </div>
    </DocsLayout>
  );
}
