import type { Metadata } from 'next';
import RoadmapPageClient from './RoadmapPageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Quran Developer Platform Roadmap',
  description:
    'Follow the Al-Quran Database roadmap across search, SDK, API, scaling, and future platform capabilities for developers.',
  path: '/docs/roadmap',
  keywords: [
    'quran api roadmap',
    'quran developer platform roadmap',
    'quran sdk roadmap',
    'quran search roadmap',
    'al quran database future plans',
  ],
});

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}
