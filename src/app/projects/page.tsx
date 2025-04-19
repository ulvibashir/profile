// src/app/projects/page.tsx
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { WebsiteStructuredData } from '@/components/StructuredData'
import Link from 'next/link'

// Define project data
const projectsData = {
  'ihealth': {
    title: 'iHealth - Healthcare Analytics Platform',
    description: 'Healthcare analytics platform with ML-powered patient outcome prediction and personalized health recommendations',
    content: 'Detailed content about the iHealth project...',
    imageUrl: '/projects/ihealth.jpg',
    github: 'https://github.com/Ismat-Samadov/ihealth',
    url: 'https://www.ihealth.ink/',
    datePublished: '2024-01-15',
    dateModified: '2024-03-20',
    tags: ['ML Applications', 'Healthcare', 'Predictive Analytics']
  },
  'trackio': {
    title: 'Trackio - AI Project Management',
    description: 'AI-enhanced project management tool with automated task prioritization and resource optimization algorithms',
    content: 'Detailed content about the Trackio project...',
    imageUrl: '/projects/trackio.jpg',
    github: 'https://github.com/Ismat-Samadov/trackio',
    url: 'https://www.trackio.art/',
    datePublished: '2023-11-10',
    dateModified: '2024-02-18',
    tags: ['Machine Learning', 'Process Optimization', 'AI Solutions']
  },
  // Add other projects here
};

// Generate metadata for the projects page
export const metadata: Metadata = generatePageMetadata({
  title: 'Projects Portfolio',
  description: 'Portfolio of machine learning, AI, and data analysis projects by Ismat Samadov, showcasing work in predictive modeling, fraud detection, and business intelligence.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <WebsiteStructuredData />
          
          <h1 className="text-3xl font-bold mb-10 text-primary text-center">Projects Portfolio</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(projectsData).map(([slug, project]) => (
              <div key={slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3">{project.title}</h2>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gray-800 text-white py-2 px-3 rounded-md hover:bg-gray-900 transition-colors text-sm"
                    >
                      GitHub
                    </a>
                    
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-primary text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      View Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
