// src/components/BlogStructuredData.tsx
interface BlogArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  author: string;
  authorUrl: string;
  tags: string[];
}

export function BlogArticleStructuredData({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  author,
  authorUrl,
  tags
}: BlogArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: authorUrl
    },
    publisher: {
      '@type': 'Person',
      name: author,
      url: authorUrl
    },
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: tags.join(', '),
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

// And for a blog list page:
export function BlogListStructuredData({
  url,
  title,
  description
}: {
  url: string;
  title: string;
  description: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url,
    name: title,
    description: description,
    publisher: {
      '@type': 'Person',
      name: 'Ismat Samadov',
      url: 'https://ismatsamadov.com'
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