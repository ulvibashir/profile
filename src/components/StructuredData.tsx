// src/components/StructuredData.tsx
export function PersonStructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ismat Samadov',
    description: 'Machine Learning Engineer & Analytics Professional specializing in deep learning, NLP, computer vision, and predictive analytics',
    url: 'https://ismat.pro',
    jobTitle: 'Machine Learning Engineer',
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
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Time Series Analysis',
      'Predictive Analytics',
      'Neural Networks',
      'TensorFlow',
      'PyTorch',
      'Feature Engineering',
      'ML Operations',
    ],
    email: 'mailto:ismetsemedov@gmail.com',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema)
      }}
    />
  );
}

// Project structured data component
interface ProjectStructuredDataProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  author: string;
}

export function ProjectStructuredData({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  author
}: ProjectStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: description,
    url: url,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://ismat.pro'
    },
    programmingLanguage: {
      '@type': 'ComputerLanguage',
      name: 'Python, TensorFlow, PyTorch'
    },
    codeRepository: url,
    codeSampleType: 'full',
    applicationCategory: 'Machine Learning',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

// Website structured data
export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ismat Samadov | Machine Learning Engineer & Analytics Professional',
    url: 'https://ismat.pro',
    description: 'Professional portfolio of Ismat Samadov, a Machine Learning Engineer specializing in deep learning, NLP, computer vision, and predictive analytics',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ismat.pro/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}