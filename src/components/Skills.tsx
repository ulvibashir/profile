'use client'

import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaChartBar, FaTools } from 'react-icons/fa'

const skillsData = {
  dataScience: [
    'Machine Learning', 
    'Predictive Modeling', 
    'Time Series Analysis',
    'NLP',
    'Deep Learning'
  ],
  technicalSkills: [
    'Python',
    'SQL',
    'FastAPI',
    'Full-Stack Development',
    'DevOps'
  ],
  analytics: [
    'Customer Analytics', 
    'Financial Modeling',
    'CLV Prediction',
    'Risk Assessment',
    'Fraud Detection'
  ],
  projects: [
    'Real-time ML Systems', 
    'End-to-end AI Solutions',
    'API Development',
    'Budget Forecasting',
    'NLP Applications'
  ]
}

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-12">Professional Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <SkillCategory 
              title="Data Science"
              icon={<FaChartBar />}
              skills={skillsData.dataScience}
              delay={0}
            />
            
            <SkillCategory 
              title="Technical Skills"
              icon={<FaCode />}
              skills={skillsData.technicalSkills}
              delay={0.1}
            />
            
            <SkillCategory 
              title="Analytics"
              icon={<FaDatabase />}
              skills={skillsData.analytics}
              delay={0.2}
            />
            
            <SkillCategory 
              title="Project Areas"
              icon={<FaTools />}
              skills={skillsData.projects}
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillCategoryProps {
  title: string
  icon: React.ReactNode
  skills: string[]
  delay: number
}

const SkillCategory = ({ title, icon, skills, delay }: SkillCategoryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-50 rounded-lg shadow-md p-6"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-primary mr-2">{icon}</span>
        {title}
      </h3>
      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default Skills
