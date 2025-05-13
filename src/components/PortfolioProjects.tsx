'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

const projectsData = [
  {
    title: 'Birbank',
    url: 'https://apps.apple.com/az/app/birbank/id1293207342',
    description: 'Contributed to the development and enhancement of Birbank’s official iOS app. Focused on financial features including payments, transfers, and secure authentication. Improved code quality and app performance with Swift and UIKit.',
    tags: ['Fintech', 'Swift', 'iOS Development'],
    rating: '4.9',
    ratingCount: '191.3K+'
  },

  {
    title: 'UBank by Unibank',
    url: 'https://apps.apple.com/az/app/ubank-by-unibank/id1073632425',
    description: 'Worked on the UBank iOS app in a hybrid setting. Responsible for implementing and maintaining core banking features, enhancing user experience, and refactoring legacy components.',
    tags: ['Banking', 'UIKit', 'Mobile UX'],
    rating: '4.8',
    ratingCount: '17.6K+'
  },
  {
    title: 'ABB Mobile',
    url: 'https://apps.apple.com/az/app/abb-mobile/id1251456175',
    description: 'Developed core features of ABB’s mobile banking app including payment integrations and account management. Contributed to architecture improvements and ensured performance optimizations.',
    tags: ['Mobile Banking', 'Architecture', 'Swift'],
    rating: '4.9',
    ratingCount: '110K+'
  },
  {
    title: 'Beso',
    url: 'https://apps.apple.com/az/app/beso-mobile/id6449295813',
    description: 'Led the end-to-end development of the Beso mobile application aimed at small businesses. Implemented modules for inventory, expense tracking, e-invoicing, and financial forecasting using Swift.',
    tags: ['Business Tools', 'Finance'],
    rating: '5.0',
    ratingCount: 'New'
  },
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
                rating={project.rating}
                ratingCount={project.ratingCount}
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
  rating: string;
  ratingCount: string;
  index: number;
}

const ProjectCard = ({ title, url, description, tags, rating, ratingCount, index }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{title}</h3>
        
        {rating && ratingCount && (
          <p className="text-sm text-yellow-600 font-semibold mb-1">Rating: {rating} ({ratingCount})</p>
        )}
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
          className="inline-flex items-center bg-primary text-white hover:bg-blue-600 transition-colors text-sm font-medium py-2 px-4 rounded-md"
        >
          Visit App <FaExternalLinkAlt className="ml-2" />
        </a>
      </div>
    </motion.div>
  )
}

export default PortfolioProjects
