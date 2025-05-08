// src/components/RelatedProjects.tsx
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  slug: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
}

interface RelatedProjectsProps {
  currentProjectSlug: string
  currentProjectTags: string[]
  allProjects: Project[]
  maxProjects?: number
}

const RelatedProjects = ({ 
  currentProjectSlug,
  currentProjectTags,
  allProjects,
  maxProjects = 3
}: RelatedProjectsProps) => {
  // Filter out current project
  const otherProjects = allProjects.filter(
    project => project.slug !== currentProjectSlug
  )
  
  // Find projects with matching tags
  const relatedProjects = otherProjects
    .map(project => {
      // Count matching tags
      const matchingTags = project.tags.filter(
        tag => currentProjectTags.includes(tag)
      )
      
      return {
        ...project,
        matchScore: matchingTags.length
      }
    })
    .filter(project => project.matchScore > 0) // Only include projects with at least one matching tag
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by number of matching tags
    .slice(0, maxProjects) // Limit to max number of projects
  
  if (relatedProjects.length === 0) {
    return null
  }
  
  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
      
      <div className="grid gap-6 md:grid-cols-3">
        {relatedProjects.map(project => (
          <Link 
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProjects