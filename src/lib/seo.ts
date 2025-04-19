// src/lib/seo.ts
import type { Metadata } from 'next'

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate metadata for a specific page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.jpg',
  noIndex = false
}: PageSEOProps): Metadata {
  // Base URL for production
  const baseUrl = 'https://ismatsamadov.com';
  
  // Ensure path starts with a slash
  const pagePath = path.startsWith('/') ? path : `/${path}`;
  
  // Full URL for this page
  const url = `${baseUrl}${pagePath}`;
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ismat Samadov | Analyst & Engineer',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    keywords: [
      'Ismat Samadov',
      'Data Analyst',
      'Machine Learning Engineer',
      'AI Engineer',
      'Fraud Detection',
      'Business Intelligence',
      'Data Science',
      'Azerbaijan',
      'Python Developer',
      'SQL Expert',
      'Financial Analytics',
    ],
    authors: [{ name: 'Ismat Samadov' }],
    creator: 'Ismat Samadov',
    publisher: 'Ismat Samadov',
  };
}

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  title: {
    template: '%s | Ismat Samadov',
    default: 'Ismat Samadov | Analyst & Engineer',
  },
  description: 'Professional portfolio of Ismat Samadov, an Analyst & Engineer specializing in machine learning, predictive modeling, and full-stack development.',
  metadataBase: new URL('https://ismatsamadov.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ismat Samadov | Analyst & Engineer',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add verification IDs when you have them
    // google: 'google-site-verification-id',
    // yandex: 'yandex-verification-id',
  },
};
