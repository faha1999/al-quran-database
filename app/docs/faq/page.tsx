import DocsLayout from '@/components/DocsLayout';
import { getKnowledgeFaqs } from '@/lib/data-loader';

export default function FaqPage() {
  const faqs = getKnowledgeFaqs();

  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">FAQ</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Product, dataset, conversion, and interpretation policy questions from one canonical
            knowledge file.
          </p>
        </section>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-[1.5rem] border border-zinc-800 bg-zinc-950/70 p-6"
            >
              <h2 className="text-xl font-semibold text-cyan-300">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
