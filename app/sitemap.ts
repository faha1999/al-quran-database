import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/docs', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/docs/api-reference', priority: 0.95, changeFrequency: 'weekly' as const },
  { path: '/docs/sdk', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/docs/database', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/docs/architecture', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/docs/search', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/docs/ayahs', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/docs/surahs', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/docs/juz', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/docs/data-expansion', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/docs/frontend', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/docs/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/docs/roadmap', priority: 0.65, changeFrequency: 'monthly' as const },
  { path: '/search', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/examples', priority: 0.65, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
