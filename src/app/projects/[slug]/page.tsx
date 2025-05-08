// src/app/projects/[slug]/page.tsx
import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import { MachineLearningSoftwareSchema } from '@/components/StructuredData'

// Define the project data type
interface ProjectData {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  github: string;
  url: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
  technologies: string[];
  datasets: string[];
  accuracy: number;
}

// Define the type for the projects data object
interface ProjectsDataMap {
  [key: string]: ProjectData;
}

// This would eventually come from your database
export async function generateStaticParams() {
  return [
    { slug: 'ihealth' },
    { slug: 'trackio' },
    // Other project slugs
  ]
}

// Sample project data - you'll replace with database calls
const projectsData: ProjectsDataMap = {
  'ihealth': {
    title: 'iHealth - Healthcare Analytics Platform',
    description: 'Healthcare analytics platform with ML-powered patient outcome prediction and personalized health recommendations',
    content: `
      <h2>Project Overview</h2>
      <p>iHealth is a comprehensive healthcare analytics platform designed to leverage machine learning for predictive healthcare outcomes. The system processes patient data to provide personalized health recommendations and help healthcare providers make data-driven decisions.</p>
      
      <h2>Technical Implementation</h2>
      <p>The platform was built using a stack of modern technologies:</p>
      <ul>
        <li>Frontend: Next.js 15, React 19, TypeScript</li>
        <li>Backend: Node.js with Express, PostgreSQL</li>
        <li>ML Pipeline: Python, TensorFlow, scikit-learn</li>
        <li>Data Processing: Pandas, NumPy</li>
      </ul>
      
      <h2>Machine Learning Models</h2>
      <p>Several models were developed for this platform:</p>
      <ul>
        <li>Patient Outcome Prediction: Random Forest classifier with 87% accuracy</li>
        <li>Medication Recommendation: Collaborative filtering system</li>
        <li>Health Risk Assessment: Gradient Boosting model</li>
      </ul>
      
      <h2>Challenges & Solutions</h2>
      <p>One of the biggest challenges was ensuring patient data privacy while still providing meaningful insights. We implemented...</p>
    `,
    imageUrl: '/projects/ihealth.jpg',
    github: 'https://github.com/Ismat-Samadov/ihealth',
    url: 'https://www.ihealth.ink/',
    datePublished: '2024-01-15',
    dateModified: '2024-03-20',
    tags: ['ML Applications', 'Healthcare', 'Predictive Analytics'],
    technologies: ['Python', 'TensorFlow', 'React', 'Next.js', 'PostgreSQL'],
    datasets: ['MIMIC-III', 'Healthcare Data', 'Custom Patient Records'],
    accuracy: 87
  },
  // Add other projects here
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const project = projectsData[slug];
  
  if (!project) {
    return generatePageMetadata({
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
      path: `/projects/${slug}`,
      noIndex: true
    });
  }
  
  return generatePageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    ogImage: project.imageUrl,
    keywords: [...project.tags, ...project.technologies],
    datePublished: project.datePublished,
    dateModified: project.dateModified,
    contentType: 'SoftwareSourceCode'
  });
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = projectsData[slug];
  
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
      <MachineLearningSoftwareSchema 
        projectName={project.title}
        description={project.description}
        repositoryUrl={project.github}
        technologies={project.technologies}
        datasets={project.datasets}
        accuracy={project.accuracy}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
          
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          
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
          
          <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: project.content }} />
          
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