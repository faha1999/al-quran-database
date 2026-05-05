import type { Metadata } from 'next';
import DocsAyahsClient from './DocsAyahsClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Ayahs API Documentation',
  description:
    'Access ayah-level Quran data, word-by-word payloads, and knowledge entries with the Al-Quran Database API.',
  path: '/docs/ayahs',
  keywords: [
    'ayah api',
    'quran verse api',
    'word by word quran api',
    'quran ayah documentation',
    'quran knowledge api',
  ],
});

export default function DocsAyahs() {
  return <DocsAyahsClient />;
}
