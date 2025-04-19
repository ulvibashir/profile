// src/components/StructuredData.tsx
import { generatePersonSchema } from '@/lib/seo'

export function PersonStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generatePersonSchema())
      }}
    />
  )
}

// For your projects, you can add this component:
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
      url: 'https://ismatsamadov.com'
    },
    programmingLanguage: {
      '@type': 'ComputerLanguage',
      name: 'Python, TypeScript, SQL'
    },
    codeRepository: url,
    codeSampleType: 'full',
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
