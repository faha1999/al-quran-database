import type { Metadata } from 'next';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://al-quran-database.vercel.app';
export const brandName = 'Quran Dev';
export const productName = 'Al-Quran Database';
export const siteTitle = `${productName} by ${brandName}`;
export const defaultDescription =
  'Developer-first Quran API, SDK, search, and database exports for production apps, developer tooling, and Quranic data workflows.';
export const defaultKeywords = [
  'quran api',
  'quran sdk',
  'quran database',
  'al quran database',
  'quran developer platform',
  'quran search api',
  'quran graphql api',
  'quran rest api',
  'quran npm package',
  'quran typescript sdk',
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
  noIndex?: boolean;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FaqEntry = {
  question: string;
  answer: string;
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}

export function fullTitle(title: string) {
  return `${title} | ${siteTitle}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  imagePath = '/opengraph-image',
  noIndex = false,
}: PageMetadataInput): Metadata {
  const mergedKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle(title),
      description,
      url: absoluteUrl(path),
      siteName: siteTitle,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: `${siteTitle} social preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle(title),
      description,
      creator: '@faha1999',
      images: [absoluteUrl(imagePath)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            noarchive: true,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
  };
}

export function serializeJsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandName,
    alternateName: [productName, siteTitle],
    url: siteUrl,
    logo: absoluteUrl('/logo.png'),
    sameAs: [
      'https://github.com/faha1999/al-quran-database',
      'https://www.npmjs.com/package/@faha1999/al-quran-database',
      'https://github.com/faha1999',
    ],
    founder: {
      '@type': 'Person',
      name: 'Kawsar Ahmed Fahad',
      url: 'https://github.com/faha1999',
    },
    areaServed: 'Worldwide',
  };
}

export function createPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kawsar Ahmed Fahad',
    url: 'https://github.com/faha1999',
    sameAs: ['https://github.com/faha1999'],
    worksFor: {
      '@type': 'Organization',
      name: brandName,
    },
  };
}

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: [productName, brandName],
    url: siteUrl,
    description: defaultDescription,
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: productName,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: defaultDescription,
    url: siteUrl,
    downloadUrl: 'https://www.npmjs.com/package/@faha1999/al-quran-database',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: brandName,
    },
  };
}

export function createWebApiSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: `${productName} API`,
    description:
      'Versioned Quran REST and GraphQL API with search, structured metadata, and typed client support.',
    url: absoluteUrl('/docs/api-reference'),
    documentation: absoluteUrl('/docs/api-reference'),
    provider: {
      '@type': 'Organization',
      name: brandName,
      url: siteUrl,
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Developers',
    },
    serviceType: ['REST API', 'GraphQL API'],
  };
}

export function createFaqSchema(faqs: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
