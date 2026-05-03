import DocsLayout from '@/components/DocsLayout';
import ApiPreview from '@/components/ApiPreview';

export default function DocsJuz() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="mb-4 text-4xl font-bold">Juz API</h1>
          <p className="text-lg text-gray-400">
            Read one juz with structural metadata plus resolved ayah content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Get Juz by ID</h2>
          <p className="text-gray-400">
            Returns juz metadata, ayah range, page range, and ayahs for one juz.
          </p>
          <ApiPreview endpoint="/api/juz/1?edition=en.sahih" />
        </section>
      </div>
    </DocsLayout>
  );
}
