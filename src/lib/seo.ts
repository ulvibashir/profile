// src/lib/seo.ts
import type { Metadata } from 'next'

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  alternateLanguages?: Record<string, string>;
  keywords?: string[];
  author?: string;
  datePublished?: string;
  dateModified?: string;
  contentType?: 'BlogPosting' | 'TechArticle' | 'SoftwareSourceCode' | 'WebSite' | 'WebPage';
  section?: string;
  articleTags?: string[];
  isAmp?: boolean;
}

/**
 * Generate comprehensive metadata for a specific page with enhanced SEO attributes
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage = '/og-image.jpg',
  noIndex = false,
  alternateLanguages,
  keywords = [],
  author = 'Ismat Samadov',
  datePublished,
  dateModified,
  contentType = 'WebPage',
  section = 'Technology',
  articleTags = [],
  isAmp = false
}: PageSEOProps): Metadata {
  // Base URL for production
  const baseUrl = 'https://ismat.pro';
  
  // Ensure path starts with a slash
  const pagePath = path.startsWith('/') ? path : `/${path}`;
  
  // Full URL for this page
  const url = `${baseUrl}${pagePath}`;
  
  // Merge default and custom keywords
  const defaultKeywords = [
    'Ismat Samadov',
    'Machine Learning Engineer',
    'Data Scientist',
    'SQL Developer',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Predictive Analytics',
    'TensorFlow',
    'PyTorch',
    'Python Developer',
    'ML Operations',
    'Data Engineering',
    'Big Data Analytics',
    'Machine Learning Models',
    'Azerbaijan Tech',
    'Baku Developer'
  ];
  
  const mergedKeywords = [...new Set([...defaultKeywords, ...keywords])];
  
  // Construct alternates with language versions
  const alternates: Record<string, unknown> = {
    canonical: url,
  };
  
  // Add AMP version if specified
  if (isAmp) {
    alternates.amphtml = `${url}?amp=1`;
  }
  
  // Add language alternates if provided
  if (alternateLanguages) {
    const languages: Record<string, string> = {};
    Object.entries(alternateLanguages).forEach(([lang, langPath]) => {
      languages[lang] = `${baseUrl}${langPath}`;
    });
    alternates.languages = languages;
  }
  
  // Prepare OpenGraph data
  const openGraphData: Record<string, unknown> = {
    title,
    description,
    url,
    siteName: 'Ismat Samadov | Machine Learning Engineer',
    locale: 'en_US',
    type: contentType === 'BlogPosting' || contentType === 'TechArticle' ? 'article' : 'website',
    images: [{
      url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
      width: 1200,
      height: 630,
      alt: title,
    }],
  };
  
  // Add article-specific OpenGraph metadata
  if (contentType === 'BlogPosting' || contentType === 'TechArticle') {
    if (datePublished) {
      openGraphData.publishedTime = datePublished;
    }
    
    if (dateModified) {
      openGraphData.modifiedTime = dateModified;
    }
    
    if (articleTags.length > 0) {
      openGraphData.tags = articleTags;
    }
    
    openGraphData.authors = [author];
    openGraphData.section = section;
  }
  
  // Build metadata object
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates,
    openGraph: openGraphData,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
      creator: '@IsmatSamadov',
      site: '@IsmatSamadov',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    keywords: mergedKeywords,
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    publisher: author,
    category: section,
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    appLinks: {
      ios: {
        url: `https://ismat.pro${pagePath}`,
        app_store_id: 'app-id',
      },
      android: {
        package: 'com.ismat.pro',
        url: `https://ismat.pro${pagePath}`,
      },
    },
    archives: ['https://ismat.pro/archives'],
    assets: ['https://ismat.pro/assets'],
    bookmarks: ['https://ismat.pro/bookmarks'],
    other: {
      'format-detection': 'telephone=no',
      'revisit-after': '7 days',
      'msapplication-TileColor': '#0070f3',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#0070f3',
    },
  };
}

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  title: {
    template: '%s | Ulvi Bashirov',
    default: 'Ulvi Bashirov | iOS Engineer & Instructor',
  },
  description: 'Professional portfolio of Ulvi Bashirov, a Senior iOS Engineer specializing in Swift, UIKit, and scalable fintech app development',
  metadataBase: new URL('https://www.ulvi-bashirov.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ulvi Bashirov | iOS Engineer & Instructor',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Ulvi Bashirov | iOS Engineer & Instructor',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
    creator: '@@ulvibashir',
    site: '@ulvibashir',
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
    google: 'google-site-verification-id', 
    yandex: 'yandex-verification-id', 
    // bing: 'msvalidate.01:verification-id', 
  },
  alternates: {
    canonical: 'https://ismat.pro',
    types: {
      'application/rss+xml': 'https://ismat.pro/feed.xml',
      'application/atom+xml': 'https://ismat.pro/atom.xml',
    },
    languages: {
      'en-US': 'https://ismat.pro',
      'az-AZ': 'https://ismat.pro/az',
      'ru-RU': 'https://ismat.pro/ru',
    },
  },
  archives: ['https://ismat.pro/archives'],
  assets: ['https://ismat.pro/assets'],
  bookmarks: ['https://ismat.pro/bookmarks'],
  category: 'Technology',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  other: {
    'format-detection': 'telephone=no',
    'revisit-after': '7 days',
    'msapplication-TileColor': '#0070f3',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0070f3',
  },
};

/**
 * Generate Schema.org structured data for a person
 */
export const generatePersonSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ismat Samadov',
    description: 'Machine Learning Engineer & Analytics Professional specializing in deep learning, NLP, computer vision, and predictive analytics',
    url: 'https://ismat.pro',
    image: 'https://ismat.pro/images/ismat-samadov.jpg', // Add your profile photo
    jobTitle: 'Machine Learning Engineer',
    gender: 'Male',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Baku',
      addressRegion: 'Baku',
      addressCountry: 'Azerbaijan'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Kapital Bank',
      url: 'https://kapitalbank.az'
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Azerbaijan State University of Economics',
        url: 'https://unec.edu.az/'
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Mingachevir State University',
        url: 'https://mdu.edu.az/'
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Oracle Database SQL Certified Associate',
        credentialCategory: 'Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Oracle',
          url: 'https://www.oracle.com'
        },
        validFor: 'Lifetime',
        dateCreated: '2022-05'
      }
    ],
    sameAs: [
      'https://github.com/Ismat-Samadov',
      'https://huggingface.co/IsmatS',
      'https://www.kaggle.com/ismetsemedov',
      'https://www.hackerrank.com/profile/IsmatSamadov',
      'https://medium.com/@ismatsamadov',
      'https://leetcode.com/u/ismetsemedov/',
      'https://www.linkedin.com/in/ismat-samadov/'
    ],
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Time Series Analysis',
      'Python Programming',
      'TensorFlow',
      'PyTorch',
      'Feature Engineering',
      'ML Operations',
      'SQL Development',
      'Database Optimization',
      'ETL Processes',
      'Data Analytics',
      'Predictive Modeling'
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en'
      },
      {
        '@type': 'Language',
        name: 'Azerbaijani',
        alternateName: 'az'
      },
      {
        '@type': 'Language',
        name: 'Russian',
        alternateName: 'ru'
      }
    ],
    email: 'mailto:ismetsemedov@gmail.com',
    telephone: '+994-XXX-XXX-XXXX'  // Add your phone if you want it public
  };
};

/**
 * Generate Schema.org structured data for a software project
 */
export const generateProjectSchema = (
  name: string,
  description: string,
  url: string,
  repoUrl: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  programmingLanguages: string[],
  keywords: string[],
  author: string = 'Ismat Samadov'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    url,
    image: imageUrl.startsWith('http') ? imageUrl : `https://ismat.pro${imageUrl}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://ismat.pro'
    },
    programmingLanguage: programmingLanguages.join(', '),
    keywords: keywords.join(', '),
    codeRepository: repoUrl,
    codeSampleType: 'full',
    runtimePlatform: 'Web',
    targetProduct: {
      '@type': 'SoftwareApplication',
      name,
      applicationCategory: 'DataApplication',
      operatingSystem: 'Web'
    }
  };
};

/**
 * Generate Schema.org structured data for a blog post
 */
export const generateBlogPostSchema = (
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  author: string = 'Ismat Samadov',
  keywords: string[] = [],
  articleBody: string = ''
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: title,
    description,
    image: imageUrl.startsWith('http') ? imageUrl : `https://ismat.pro${imageUrl}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://ismat.pro'
    },
    publisher: {
      '@type': 'Organization',
      name: author,
      logo: {
        '@type': 'ImageObject',
        url: 'https://ismat.pro/logo.png',
        width: 600,
        height: 60
      }
    },
    keywords: keywords.join(', '),
    articleBody: articleBody.substring(0, 5000), // Limit to 5000 chars
    wordCount: articleBody.split(/\s+/).length,
    inLanguage: 'en-US'
  };
};

/**
 * Generate Schema.org structured data for website
 */
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ismat Samadov | Machine Learning Engineer & Analytics Professional',
    alternateName: 'Ismat Samadov Portfolio',
    url: 'https://ismat.pro',
    description: 'Professional portfolio of Ismat Samadov, a Machine Learning Engineer specializing in deep learning, NLP, computer vision, and predictive analytics',
    inLanguage: ['en-US', 'az-AZ', 'ru-RU'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ismat.pro/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Person',
      name: 'Ismat Samadov',
      url: 'https://ismat.pro'
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: 'Ismat Samadov'
    }
  };
};

/**
 * Generate breadcrumb schema for structured data
 */
export const generateBreadcrumbSchema = (
  items: Array<{name: string, url: string}>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

/**
 * Generate FAQ schema for structured data
 */
export const generateFAQSchema = (
  questions: Array<{question: string, answer: string}>
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };
};