import { statSync } from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import { getDatasetMetadata, getKnowledgeCoverage } from '@/lib/data-loader';
import DatabaseDocsClient from '@/components/DatabaseDocsClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran Database Exports for SQLite & PostgreSQL',
  description:
    'Download and inspect SQLite and PostgreSQL exports of Al-Quran Database, including schema coverage, file sizes, and knowledge-layer structure.',
  path: '/docs/database',
  keywords: [
    'quran sqlite database',
    'quran postgresql database',
    'quran database export',
    'quran sql dump',
    'quran dataset download',
  ],
});

function getPublicFileSize(fileName: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', fileName);
    return `${(statSync(filePath).size / (1024 * 1024)).toFixed(1)} MB`;
  } catch {
    return 'Build first';
  }
}

export default function DatabaseDocsPage() {
  const metadata = getDatasetMetadata();
  const knowledge = getKnowledgeCoverage();

  const exportCards = [
    {
      title: 'SQLite Export',
      href: '/quran_indexed.sqlite',
      description: 'Portable file for local apps, edge reads, test fixtures, and offline bundles.',
      badge: getPublicFileSize('quran_indexed.sqlite'),
    },
    {
      title: 'PostgreSQL Export',
      href: '/quran_postgres.sql',
      description:
        'Transactional schema + data dump with foreign keys, indexes, and normalized enrichment tables.',
      badge: getPublicFileSize('quran_postgres.sql'),
    },
  ];

  const schemaAreas = [
    'Core canon: surahs, ayahs, words, editions',
    'Reading divisions: juzs, hizbs, rubs, pages + normalized join tables',
    'Context: duas, asbab al-nuzul, hadith references, surah profiles',
    'Knowledge layer: themes, cross references, scientific notes, fiqh notes, linguistic notes, misinterpretations, FAQs, research refs',
  ];

  return (
    <DocsLayout>
      <DatabaseDocsClient
        metadata={metadata}
        knowledge={knowledge}
        exportCards={exportCards}
        schemaAreas={schemaAreas}
      />
    </DocsLayout>
  );
}
