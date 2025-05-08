// src/app/projects/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'

// The only way to definitively address this issue is to keep the component simple
export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  // Define project data directly (temporary solution)
  const projectData = {
    'ihealth': {
      title: 'iHealth - Healthcare Analytics Platform',
      description: 'Healthcare analytics platform with ML-powered patient outcome prediction and personalized health recommendations',
      content: `
        <h2>Project Overview</h2>
        <p>iHealth is a comprehensive healthcare analytics platform designed to leverage machine learning for predictive healthcare outcomes.</p>
        
        <h2>Technical Implementation</h2>
        <p>The platform was built using Next.js, React, PostgreSQL, and Python ML libraries.</p>
      `,
      imageUrl: '/projects/ihealth.jpg',
      github: 'https://github.com/Ismat-Samadov/ihealth',
      url: 'https://www.ihealth.ink/',
      tags: ['ML Applications', 'Healthcare', 'Predictive Analytics'],
      technologies: ['Python', 'TensorFlow', 'React', 'Next.js', 'PostgreSQL'],
      datasets: ['Healthcare Data']
    },
    'trackio': {
      title: 'Trackio - AI Project Management',
      description: 'Project management tool with AI capabilities',
      content: `
        <h2>Project Overview</h2>
        <p>Trackio helps teams manage projects more efficiently.</p>
        
        <h2>Technical Details</h2>
        <p>Built with modern technologies.</p>
      `,
      imageUrl: '/projects/trackio.jpg',
      github: 'https://github.com/Ismat-Samadov/trackio',
      url: 'https://www.trackio.art/',
      tags: ['Project Management', 'AI Solutions'],
      technologies: ['React', 'Node.js'],
      datasets: ['Project Data']
    }
  };

  // Get slug from params
  const { slug } = params;
  
  // Get project data
  const project = projectData[slug as keyof typeof projectData];
  
  // If project doesn't exist, show not found page
  if (!project) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-8">The project you are looking for does not exist.</p>
          <Link 
            href="/projects"
            className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              href="/projects"
              className="inline-flex items-center text-primary hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              Back to Projects
            </Link>
          </div>
          
          {/* Project Title */}
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Project Image */}
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          
          {/* Project Content */}
          <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.content }} />
          
          {/* Project Links */}
          <div className="flex gap-4 mb-12">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors"
            >
              View on GitHub
            </a>
            
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Visit Live Site
            </a>
          </div>
          
          {/* Technologies and Datasets */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <h2 className="text-xl font-bold mb-4">Datasets</h2>
            <div className="flex flex-wrap gap-2">
              {project.datasets.map((dataset) => (
                <span 
                  key={dataset} 
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                >
                  {dataset}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}