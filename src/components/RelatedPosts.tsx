// src/components/RelatedPosts.tsx
import Link from 'next/link'

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

export function RelatedPosts({ 
  currentPostSlug, 
  posts, 
  maxPosts = 3
}: {
  currentPostSlug: string;
  posts: Post[];
  maxPosts?: number;
}) {
  // Filter out current post and find related posts
  const relatedPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, maxPosts);
    
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold mb-4">Related Articles</h3>
      <ul className="space-y-4">
        {relatedPosts.map(post => (
          <li key={post.slug}>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600">{post.excerpt.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}