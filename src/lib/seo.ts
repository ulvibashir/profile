// src/lib/seo.ts
import type { Metadata } from 'next'

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  alternateLanguages?: Record<string, string>; // Add support for hreflang
}

/**
 * Generate metadata for a specific page
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.jpg',
  noIndex = false,
  alternateLanguages
}: PageSEOProps): Metadata {
  // Base URL for production
  const baseUrl = 'https://ismat.pro';
  
  // Ensure path starts with a slash
  const pagePath = path.startsWith('/') ? path : `/${path}`;
  
  // Full URL for this page
  const url = `${baseUrl}${pagePath}`;
  
  // Construct alternates with language versions
  const alternates: Record<string, unknown> = {
    canonical: url,
  };
  
  // Add language alternates if provided
  if (alternateLanguages) {
    const languages: Record<string, string> = {};
    Object.entries(alternateLanguages).forEach(([lang, langPath]) => {
      languages[lang] = `${baseUrl}${langPath}`;
    });
    alternates.languages = languages;
  }
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates,
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
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
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
      'Predictive Analytics',
      'Azure ML',
      'Baku Analytics Professional',
    ],
    authors: [{ name: 'Ismat Samadov' }],
    creator: 'Ismat Samadov',
    publisher: 'Ismat Samadov',
    category: 'Technology',
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
  description: 'Professional portfolio of Ismat Samadov, an Analyst & Engineer specializing in machine learning, predictive modeling, and full-stack development in Azerbaijan.',
  metadataBase: new URL('https://ismat.pro'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ismat Samadov | Analyst & Engineer',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Ismat Samadov - Analyst & Engineer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
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
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0070f3',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add verification IDs when you have them
    // google: 'google-site-verification-id',
    // yandex: 'yandex-verification-id',
  },
  alternates: {
    canonical: 'https://ismat.pro',
    types: {
      'application/rss+xml': 'https://ismat.pro/feed.xml',
    },
  },
  // Rich results structured data
  other: {
    'format-detection': 'telephone=no',
  },
};

// Schema.org structured data for a person
export const generatePersonSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ismat Samadov',
    description: 'Data and Fraud Analytics Professional with expertise in machine learning, predictive modeling, and full-stack development',
    url: 'https://ismat.pro',
    jobTitle: 'Fraud Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Kapital Bank',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Azerbaijan State University of Economics',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Mingachevir State University',
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Oracle Database SQL Certified Associate',
      credentialCategory: 'Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Oracle',
      },
    },
    sameAs: [
      'https://github.com/Ismat-Samadov',
      'https://huggingface.co/IsmatS',
      'https://www.kaggle.com/ismetsemedov',
      'https://www.hackerrank.com/profile/IsmatSamadov',
      'https://medium.com/@ismatsamadov',
      'https://leetcode.com/u/ismetsemedov/'
    ],
    knowsAbout: [
      'Data Analysis',
      'Machine Learning',
      'Fraud Detection',
      'Business Intelligence',
      'Python Programming',
      'SQL',
      'Predictive Modeling',
    ],
    email: 'mailto:ismetsemedov@gmail.com',
  };
};