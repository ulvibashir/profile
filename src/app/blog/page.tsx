// src/app/blog/page.tsx
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import Link from 'next/link'
import Image from 'next/image'

// Define TypeScript interfaces for better type safety
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  author?: string;
  authorImage?: string;
  coverImage?: string;
  tags: string[];
  featured?: boolean;
}

// Sample blog data - you'll replace this with actual data from your CMS or database
const blogPosts: BlogPost[] = [
  {
    slug: 'machine-learning-in-finance',
    title: 'Applying Machine Learning in Financial Prediction Models',
    excerpt: 'How ML algorithms can provide accurate predictions for financial markets and risk assessment. Learn about key techniques used in quantitative finance.',
    date: '2025-04-01',
    readTime: '8 min read',
    author: 'Ismat Samadov',
    authorImage: '/images/ismat-samadov.jpg',
    coverImage: '/blog/ml-finance.jpg',
    tags: ['Machine Learning', 'Finance', 'Predictive Analytics'],
    featured: true
  },
  {
    slug: 'optimizing-sql-queries',
    title: 'Advanced SQL Optimization Techniques for Big Data',
    excerpt: 'Performance tuning strategies for complex SQL queries when dealing with large datasets. Discover how to improve query execution time by over 80%.',
    date: '2025-03-15',
    readTime: '6 min read',
    author: 'Ismat Samadov',
    authorImage: '/images/ismat-samadov.jpg',
    coverImage: '/blog/sql-optimization.jpg',
    tags: ['SQL', 'Database', 'Performance']
  },
  {
    slug: 'nlp-for-fraud-detection',
    title: 'Using NLP for Financial Fraud Detection Systems',
    excerpt: 'How natural language processing can identify suspicious patterns in transaction descriptions and communication to detect potential fraud.',
    date: '2025-02-28',
    readTime: '7 min read',
    author: 'Ismat Samadov',
    authorImage: '/images/ismat-samadov.jpg',
    coverImage: '/blog/nlp-fraud.jpg',
    tags: ['NLP', 'Fraud Detection', 'Security', 'Financial Systems']
  },
  {
    slug: 'explainable-ai-banking',
    title: 'Explainable AI: Making ML Models Transparent for Banking Compliance',
    excerpt: 'How to develop machine learning models that are both powerful and explainable to meet regulatory requirements in the banking sector.',
    date: '2025-02-10',
    readTime: '9 min read',
    author: 'Ismat Samadov',
    authorImage: '/images/ismat-samadov.jpg',
    coverImage: '/blog/xai-banking.jpg',
    tags: ['Explainable AI', 'Banking', 'Compliance', 'Machine Learning']
  }
]

// Function to format dates in a more readable way
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate page metadata
export const metadata: Metadata = generatePageMetadata({
  title: 'Machine Learning & SQL Development Blog',
  description: 'Insights, tutorials and case studies on machine learning applications, SQL development, and data analysis from Ismat Samadov.',
  path: '/blog',
  keywords: [
    'Machine Learning Blog', 
    'SQL Development', 
    'Data Analysis', 
    'AI Tutorials', 
    'Finance ML', 
    'Database Optimization'
  ],
  contentType: 'BlogPosting'
});

export default function BlogPage() {
  // Extract featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  // Generate structured data for the blog list
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Machine Learning & SQL Development Blog',
    description: 'Insights, tutorials and case studies on machine learning applications, SQL development, and data analysis.',
    url: 'https://ismat.pro/blog',
    author: {
      '@type': 'Person',
      name: 'Ismat Samadov',
      url: 'https://ismat.pro'
    },
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Ismat Samadov'
      },
      url: `https://ismat.pro/blog/${post.slug}`
    }))
  };
  
  return (
    <>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-primary text-center">ML & SQL Development Blog</h1>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Practical insights and tutorials on machine learning, SQL optimization, 
              and data analysis for developers and data scientists.
            </p>
            
            {/* Featured posts section */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Articles</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative h-48 w-full">
                          {post.coverImage ? (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                              <span className="text-primary font-medium">Machine Learning Blog</span>
                            </div>
                          )}
                          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded text-xs font-medium">
                            Featured
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-sm text-gray-500 flex items-center">
                            {formatDate(post.date)}
                            {post.readTime && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{post.readTime}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-700 mb-4">{post.excerpt}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                          
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-primary hover:text-blue-700 transition-colors"
                          >
                            Read more
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
            
            {/* Regular posts section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">All Articles</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {regularPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-40 w-full">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center">
                            <span className="text-primary font-medium">Machine Learning Blog</span>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-500 flex items-center">
                          {formatDate(post.date)}
                          {post.readTime && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{post.readTime}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <h2 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-700 mb-3 text-sm line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm text-primary hover:text-blue-700 transition-colors"
                      >
                        Read article
                        <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            
            {/* Newsletter subscription */}
            <section className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Subscribe to ML & SQL Insights</h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Get the latest articles on machine learning, SQL optimization, and data analysis 
                  delivered directly to your inbox.
                </p>
                
                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </section>
            
            {/* Topics section */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse by Topic</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Machine Learning', 'SQL', 'Data Analysis', 'Predictive Analytics', 'NLP', 'Computer Vision', 'Banking & Finance', 'Big Data'].map((topic) => (
                  <Link 
                    key={topic}
                    href={`/blog/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow hover:text-primary"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}