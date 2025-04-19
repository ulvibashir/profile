'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaInfoCircle, FaGithub } from 'react-icons/fa'
import Link from 'next/link'

const projectsData = [
  {
    title: 'iHealth',
    slug: 'ihealth',
    url: 'https://www.ihealth.ink/',
    github: 'https://github.com/Ismat-Samadov/intelligent_healthcare',
    description: 'A Next.js-based healthcare assistant application that provides health information and guidance to users. This AI-powered assistant can answer questions about common health issues, provide general medical information, and guide users toward appropriate healthcare resources.',
    tags: ['AI Assistant', 'Healthcare', 'Next.js']
  },
  {
    title: 'Trackio',
    slug: 'trackio',
    url: 'https://www.trackio.art/',
    github: 'https://github.com/Ismat-Samadov/trackio',
    description: 'A modern, full-stack habit tracking application built with Next.js 14, featuring a calendar-style interface for tracking daily habits with real-time updates and user authentication.',
    tags: ['Habit Tracking', 'Next.js 14', 'User Authentication']
  },
  {
    title: 'Jobry',
    slug: 'jobry',
    url: 'https://www.jobry.me/',
    github: 'https://github.com/Ismat-Samadov/jobry',
    description: 'A modern, high-performance job board that aggregates positions from over 50 different sources, making job hunting simpler and more efficient. Built with Next.js and powered by real-time data scraping, it brings you the latest opportunities in one sleek interface.',
    tags: ['Job Board', 'Data Aggregation', 'Next.js']
  },
  {
    title: 'MyFrog',
    slug: 'myfrog',
    url: 'https://www.myfrog.me/',
    github: 'https://github.com/Ismat-Samadov/myfrog',
    description: 'A modern task and project management system built with Next.js 14, featuring real-time updates, project organization, and comprehensive task tracking. The application provides an intuitive interface for managing projects and tasks efficiently.',
    tags: ['Project Management', 'Task Tracking', 'Next.js 14']
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
                github={project.github}
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
  github: string;
  description: string;
  tags: string[];
  index: number;
}

const ProjectCard = ({ title, slug, url, github, description, tags, index }: ProjectCardProps) => {
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
            <a 
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-600 transition-colors"
              aria-label={`GitHub repository for ${title}`}
            >
              <FaGithub />
            </a>
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
