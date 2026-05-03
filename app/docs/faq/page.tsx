import DocsLayout from '@/components/DocsLayout';

const faqs = [
  {
    question: 'Is the API free to use?',
    answer: 'Yes, the Quran Developer Platform is open-source and free to use. No API key is required for the MVP.',
  },
  {
    question: 'Where does the data come from?',
    answer: 'The data is sourced from established open-source Quranic databases and verified for accuracy.',
  },
  {
    question: 'Can I contribute more translations?',
    answer: 'Absolutely! We encourage contributions. Please check our GitHub repository for the data structure.',
  },
  {
    question: 'Is there a rate limit?',
    answer: 'Currently, we implement a basic rate limit of 100 requests per minute per IP to prevent abuse.',
  },
];

export default function FaqPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-bold mb-4">FAQ</h1>
          <p className="text-gray-400 text-lg">
            Frequently asked questions about the Quran Developer Platform.
          </p>
        </section>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
              <h3 className="text-xl font-bold mb-2 text-blue-400">{faq.question}</h3>
              <p className="text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
