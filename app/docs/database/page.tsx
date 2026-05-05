import { statSync } from 'node:fs';
import path from 'node:path';
import DocsLayout from '@/components/DocsLayout';
import { getDatasetMetadata, getKnowledgeCoverage } from '@/lib/data-loader';
import DatabaseDocsClient from '@/components/DatabaseDocsClient';

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
