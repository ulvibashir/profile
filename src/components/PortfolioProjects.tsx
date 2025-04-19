'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa'
import Link from 'next/link'

const projectsData = [
  {
    title: 'iHealth',
    slug: 'ihealth',
    url: 'https://www.ihealth.ink/',
    description: 'Healthcare analytics platform with ML-powered patient outcome prediction and personalized health recommendations',
    tags: ['ML Applications', 'Healthcare', 'Predictive Analytics']
  },
  {
    title: 'Trackio',
    slug: 'trackio',
    url: 'https://www.trackio.art/',
    description: 'AI-enhanced project management tool with automated task prioritization and resource optimization algorithms',
    tags: ['Machine Learning', 'Process Optimization', 'AI Solutions']
  },
  {
    title: 'Jobry',
    slug: 'jobry',
    url: 'https://www.jobry.me/',
    description: 'Career analytics platform with ML-based job matching and skill gap analysis for professional development',
    tags: ['Predictive Models', 'Career Analytics', 'AI Recommendations']
  },
  {
    title: 'MyFrog',
    slug: 'myfrog',
    url: 'https://www.myfrog.me/',
    description: 'ML-powered personal finance management platform with spending prediction and automated budget optimization',
    tags: ['Financial Modeling', 'Predictive Analytics', 'AI Applications']
  }
]

const PortfolioProjects = () => {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-12">Portfolio Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                slug={project.slug}
                url={project.url}
                description={project.description}
                tags={project.tags}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  title: string;
  slug: string;
  url: string;
  description: string;
  tags: string[];
  index: number;
}

const ProjectCard = ({ title, slug, url, description, tags, index }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex space-x-2">
            <Link 
              href={`/portfolio/${slug}`}
              className="text-primary hover:text-blue-600 transition-colors"
              aria-label={`Learn more about ${title}`}
            >
              <FaInfoCircle />
            </Link>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-600 transition-colors"
              aria-label={`Visit ${title}`}
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href={`/portfolio/${slug}`}
            className="text-primary hover:text-blue-600 transition-colors text-sm font-medium"
          >
            View Project Details →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioProjects
