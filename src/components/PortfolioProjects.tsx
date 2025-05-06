'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

const projectsData = [
  {
    title: 'iHealth',
    url: 'https://www.ihealth.ink/',
    description: 'An AI-powered healthcare assistant application that provides health information and guidance to users. Features an interactive chat interface with a knowledge base for common health topics, doctor verification system, and blog management for healthcare content. Built with Next.js 15, React 19, TypeScript, and PostgreSQL.',
    tags: ['ML Applications', 'Healthcare', 'Predictive Analytics']
  },
  {
    title: 'Trackio',
    url: 'https://www.trackio.art/',
    description: 'A modern, full-stack habit tracking application built with Next.js 14, featuring a calendar-style interface for tracking daily habits with visual progress representation. Includes habit creation with customizable properties, user authentication, and real-time updates with optimistic UI for better user experience.',
    tags: ['Machine Learning', 'Process Optimization', 'AI Solutions']
  },
  {
    title: 'Birjob',
    url: 'https://www.birjob.com/',
    description: 'A modern job aggregator that pulls positions from multiple sources into one unified platform. Features intelligent search with filtering capabilities, real-time updates, and automatic deduplication. Built with Next.js 14, Tailwind CSS, and PostgreSQL with a custom scraping engine for continuous data updates.',
    tags: ['Predictive Models', 'Career Analytics', 'AI Recommendations']
  },
  {
    title: 'MyFrog',
    url: 'https://www.myfrog.me/',
    description: 'A comprehensive task and project management application with Next.js 14, featuring real-time updates, project organization, and detailed task tracking. Includes priority levels, status tracking, due date management, and a clean interface for managing projects efficiently.',
    tags: ['Financial Modeling', 'Predictive Analytics', 'AI Applications']
  }
]

const PortfolioProjects = () => {
  return (
    <section id="portfolio" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Portfolio Projects</h2>
          
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
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
  title: string;
  url: string;
  description: string;
  tags: string[];
  index: number;
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
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
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
        <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">{description}</p>
        <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={url}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-blue-600 transition-colors text-sm font-medium"
        >
          Visit Website <span className="ml-1">→</span>
        </a>
      </div>
    </motion.div>
  )
}

export default PortfolioProjects
