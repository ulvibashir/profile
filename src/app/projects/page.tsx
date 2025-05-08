// src/app/projects/page.tsx
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'

// Generate page metadata
export const metadata: Metadata = generatePageMetadata({
  title: 'Projects Portfolio',
  description: 'Portfolio of machine learning, AI, and data analysis projects by Ismat Samadov, showcasing work in predictive modeling, fraud detection, and business intelligence.',
  path: '/projects',
});

// Define the project data
const projectsData = [
  {
    id: 'ihealth',
    title: 'iHealth - Healthcare Analytics Platform',
    description: 'Healthcare analytics platform with ML-powered patient outcome prediction and personalized health recommendations',
    imageUrl: '/projects/ihealth.jpg',
    github: 'https://github.com/Ismat-Samadov/ihealth',
    url: 'https://www.ihealth.ink/',
    tags: ['ML Applications', 'Healthcare', 'Predictive Analytics']
  },
  {
    id: 'trackio',
    title: 'Trackio - AI Project Management',
    description: 'AI-enhanced project management tool with automated task prioritization and resource optimization algorithms',
    imageUrl: '/projects/trackio.jpg',
    github: 'https://github.com/Ismat-Samadov/trackio',
    url: 'https://www.trackio.art/',
    tags: ['Machine Learning', 'Process Optimization', 'AI Solutions']
  },
  {
    id: 'jobry',
    title: 'Jobry - AI Job Recommendation Engine',
    description: 'Smart job recommendation system leveraging machine learning to match job seekers with relevant opportunities based on skills and preferences',
    imageUrl: '/projects/jobry.jpg',
    github: 'https://github.com/Ismat-Samadov/jobry',
    url: 'https://www.jobry.io/',
    tags: ['NLP', 'Recommendation Systems', 'Career Analytics']
  },
  {
    id: 'myfrog',
    title: 'MyFrog - Financial Forecasting Tool',
    description: 'AI-driven financial forecasting system for small businesses, providing predictive analytics for cash flow and revenue planning',
    imageUrl: '/projects/myfrog.jpg',
    github: 'https://github.com/Ismat-Samadov/myfrog',
    url: 'https://www.myfrog.me/',
    tags: ['Financial Modeling', 'Predictive Analytics', 'AI Applications']
  }
];

export default function ProjectsPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-primary text-center">Projects Portfolio</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            A showcase of my machine learning projects, covering healthcare analytics, process optimization,
            financial forecasting, and intelligent recommendation systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-56 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3">{project.title}</h2>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
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
          
          {/* Call to action section */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in Collaboration?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to apply 
              machine learning to solve complex problems.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}