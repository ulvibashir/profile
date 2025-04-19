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

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = projectsData[slug as keyof typeof projectsData];
  
  if (!project) {
    notFound();
  }
  
  return (
    <main>
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
      
      <h1>{project.title}</h1>
      <div>{project.content}</div>
      
      {/* Rest of your project page content */}
    </main>
  );
}
