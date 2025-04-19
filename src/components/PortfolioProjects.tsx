'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

const projectsData = [
  {
    title: 'iHealth',
    url: 'https://www.ihealth.ink/',
    description: 'A healthcare platform for tracking and managing health metrics and appointments',
    tags: ['Healthcare', 'Analytics', 'Web Application']
  },
  {
    title: 'Trackio',
    url: 'https://www.trackio.art/',
    description: 'Creative project tracking and management tool for artists and designers',
    tags: ['Art', 'Project Management', 'Creative Tools']
  },
  {
    title: 'Jobry',
    url: 'https://www.jobry.me/',
    description: 'Job search and application tracking platform for professionals',
    tags: ['Job Search', 'Career', 'Productivity']
  },
  {
    title: 'MyFrog',
    url: 'https://www.myfrog.me/',
    description: 'Personal finance management and budgeting application',
    tags: ['Finance', 'Budgeting', 'Personal']
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
  title: string
  url: string
  description: string
  tags: string[]
  index: number
}

const ProjectCard = ({ title, url, description, tags, index }: ProjectCardProps) => {
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
      </div>
    </motion.div>
  )
}

export default PortfolioProjects
