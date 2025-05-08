// src/components/EnhancedStructuredData.tsx
export function PersonStructuredData() {
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ismat Samadov',
      description: 'Machine Learning Engineer & Analytics Professional specializing in deep learning, NLP, computer vision, and predictive analytics',
      url: 'https://ismat.pro',
      image: 'https://ismat.pro/images/ismat-samadov.jpg', // Add a professional photo
      jobTitle: 'Machine Learning Engineer',
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
        }
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
        'https://www.linkedin.com/in/ismat-samadov/' // Add LinkedIn
      ],
      knowsAbout: [
        'Machine Learning',
        'Deep Learning',
        'Natural Language Processing',
        'Computer Vision',
        'SQL Development',
        'Database Optimization'
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baku',
        addressRegion: 'Baku',
        addressCountry: 'Azerbaijan'
      }
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