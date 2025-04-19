// src/app/projects/[slug]/page.tsx
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ProjectStructuredData } from '@/components/StructuredData'
import { notFound } from 'next/navigation'

// Define the project data (you could move this to a database or CMS later)
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

type Params = {
  params: {
    slug: string;
  };
};

// Generate metadata for each project page
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;
  const project = projectsData[slug as keyof typeof projectsData];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    ogImage: project.imageUrl,
  });
}

// Generate static paths for all projects
export function generateStaticParams() {
  return Object.keys(projectsData).map(slug => ({
    slug,
  }));
}

export default function ProjectPage({ params }: Params) {
  const slug = params.slug;
  const project = projectsData[slug as keyof typeof projectsData];
  
  if (!project) {
    notFound();
  }
  
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Add structured data for this project */}
          <ProjectStructuredData
            title={project.title}
            description={project.description}
            url={project.url}
            imageUrl={project.imageUrl}
            datePublished={project.datePublished}
            dateModified={project.dateModified}
            author="Ismat Samadov"
          />
          
          <h1 className="text-3xl font-bold mb-6 text-primary">{project.title}</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-4">{project.description}</p>
            <p>{project.content}</p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-8 flex gap-4">
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
                Visit Live Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
