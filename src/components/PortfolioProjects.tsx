'use client'

import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'

const projectsData = [
  {
    title: 'NeuralHealth',
    github: 'https://github.com/Ismat-Samadov/neuralhealth',
    url: 'https://www.neuralhealth.ai/',
    description: 'Deep learning system for medical image analysis with 94% accuracy in early disease detection using convolutional neural networks',
    tags: ['Computer Vision', 'Medical AI', 'PyTorch', 'Transfer Learning']
  },
  {
    title: 'PredictFlow',
    github: 'https://github.com/Ismat-Samadov/predictflow',
    url: 'https://www.predictflow.dev/',
    description: 'Automated machine learning pipeline for time series forecasting with feature engineering and model selection optimization',
    tags: ['Time Series', 'AutoML', 'Feature Engineering', 'Ensemble Methods']
  },
  {
    title: 'SentimentLens',
    github: 'https://github.com/Ismat-Samadov/sentimentlens',
    url: 'https://www.sentimentlens.io/',
    description: 'NLP system for real-time customer feedback analysis and sentiment prediction using transformer-based language models',
    tags: ['NLP', 'BERT', 'Sentiment Analysis', 'Real-time Processing']
  },
  {
    title: 'FraudGuard',
    github: 'https://github.com/Ismat-Samadov/fraudguard',
    url: 'https://www.fraudguard.ai/',
    description: 'Anomaly detection system for financial transactions using unsupervised learning and graph neural networks',
    tags: ['Anomaly Detection', 'Graph Neural Networks', 'Financial ML', 'Real-time']
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
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Machine Learning Projects</h2>
          
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={index}
                title={project.title}
                github={project.github}
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
  github: string;
  url: string;
  description: string;
  tags: string[];
  index: number;
}

const ProjectCard = ({ title, github, url, description, tags, index }: ProjectCardProps) => {
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
          href={github}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-blue-600 transition-colors text-sm font-medium"
        >
          View Project Details <span className="ml-1">→</span>
        </a>
      </div>
    </motion.div>
  )
}

export default PortfolioProjects