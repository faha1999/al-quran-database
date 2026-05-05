import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import StructuredData from '@/components/StructuredData';
import {
  brandName,
  createOrganizationSchema,
  createPersonSchema,
  createWebsiteSchema,
  defaultDescription,
  productName,
  siteTitle,
  siteUrl,
} from '@/lib/seo';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: defaultDescription,
  applicationName: productName,
  authors: [{ name: 'Kawsar Ahmed Fahad', url: 'https://github.com/faha1999' }],
  creator: 'Kawsar Ahmed Fahad',
  publisher: brandName,
  category: 'developer tools',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    'quran api',
    'quran sdk',
    'quran database',
    'quran graphql api',
    'quran rest api',
    'typescript quran sdk',
  ],
  openGraph: {
    title: siteTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteTitle} social preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: defaultDescription,
    creator: '@faha1999',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchemas = [createOrganizationSchema(), createPersonSchema(), createWebsiteSchema()];

  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData data={rootSchemas} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
