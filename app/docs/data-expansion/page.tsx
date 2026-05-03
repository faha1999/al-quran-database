import DocsLayout from '@/components/DocsLayout';

export default function DataExpansion() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">Data Expansion</h1>
          <p className="text-gray-400 text-lg">
            We have expanded the platform's dataset to include diverse linguistic and scholarly resources, moving beyond simple text to a multi-dimensional Quranic knowledge base.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Linguistic Diversity</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Added 10+ new high-fidelity translations across major languages including Urdu (Maududi), French (Hamidullah), Turkish (Diyanet), Indonesian, Russian (Kuliev), and Spanish (Asad).
            </p>
          </div>
          <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Classical Tafsir</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Integrated classical exegesis (Tafsir) data including <strong>Tafsir Jalalayn</strong> and <strong>Tafsir Al-Qurtubi</strong> in Arabic, providing deep scholarly context for every verse.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Audio & Recitations</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Added metadata and streaming references for world-renowned reciters such as Abdul Basit, Alafasy, Husary, and Minshawi.
            </p>
          </div>
          <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">Supplications (Duas)</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Extracted over <strong>450 Quranic Duas</strong> (starting with Rabbana/Rabbi), making it easy to build dedicated prayer and spiritual apps.
            </p>
          </div>
        </section>

        <section className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Contextual Metadata</h2>
          <p className="text-gray-400 mb-6">
            Every verse now supports optional hydration of extra context, including <strong>Asbab al-Nuzul</strong> (Reasons for Revelation) and <strong>Hadith References</strong>.
          </p>
          <pre className="bg-black/50 p-6 rounded-xl text-xs text-gray-300 overflow-x-auto border border-white/5">
{`// Example: Fetching Ayah with Words and Context
const ayah = await quran.getAyah(255, { 
  include_words: true,
  include_context: true 
});

console.log(ayah.asbab); // Reasons for revelation
console.log(ayah.hadith); // Related Prophetic narrations`}
          </pre>
        </section>
      </div>
    </DocsLayout>
  );
}
