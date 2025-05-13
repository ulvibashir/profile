// src/components/StructuredData.tsx
export function PersonStructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ulvi Bashirov',
    description: 'Senior iOS Engineer specializing in Swift, UIKit, SwiftUI, and scalable fintech app development',
    url: 'https://ulvi.dev',
    jobTitle: 'Senior iOS Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Birbank',
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
      'https://github.com/ulvibashir',
      'https://www.hackerrank.com/profile/ubashirov',
      'https://leetcode.com/u/ulvibashir/',
      'https://www.linkedin.com/in/ulvibashir/'
    ],
    knowsAbout: [
      'iOS Development',
      'Swift',
      'UIKit',
      'SwiftUI',
      'Xcode',
      'MVVM',
      'VIPER',
      'Clean Architecture',
      'Agile',
      'Scrum',
      'Mobile Application Development'
    ],
    email: 'mailto:ulvi@bashirov.dev',
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
    name: 'Ulvi Bashirov | iOS Engineer & Instructor',
    url: 'https://ismat.pro',
    description: 'Professional portfolio of Ulvi Bashirov, a Senior iOS Engineer specializing in Swift, UIKit, and scalable fintech app development',
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

// Add this to src/components/StructuredData.tsx
export function MachineLearningSoftwareSchema({ 
  projectName, 
  description, 
  repositoryUrl, 
  technologies,
  datasets,
  accuracy
}: {
  projectName: string;
  description: string;
  repositoryUrl: string;
  technologies: string[];
  datasets: string[];
  accuracy: number;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: projectName,
    description: description,
    codeRepository: repositoryUrl,
    programmingLanguage: technologies,
    author: {
      '@type': 'Person',
      name: 'Ismat Samadov',
      url: 'https://ismat.pro'
    },
    keywords: [...technologies, ...datasets, 'machine learning', 'AI', 'data analysis'],
    applicationCategory: 'Machine Learning',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Model Accuracy',
        value: `${accuracy}%`
      },
      {
        '@type': 'PropertyValue',
        name: 'Datasets Used',
        value: datasets.join(', ')
      }
    ]
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