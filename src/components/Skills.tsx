'use client'

import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaChartBar, FaTools } from 'react-icons/fa'

const skillsData = {
  dataAnalysis: [
    'Data Mining', 
    'Data Visualization', 
    'Predictive Modeling',
    'Statistical Analysis',
    'Forecasting'
  ],
  technicalSkills: [
    'SQL',
    'Python',
    'Business Intelligence',
    'ETL Processes',
    'Data Warehousing'
  ],
  fraudDetection: [
    'Fraud Prevention', 
    'Risk Assessment',
    'Anomaly Detection',
    'Compliance Monitoring',
    'Security Protocols'
  ],
  tools: [
    'Oracle Database', 
    'Data Analysis Tools',
    'Reporting Systems',
    'Version Control',
    'Business Analytics Platforms'
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
              title="Data Analysis"
              icon={<FaChartBar />}
              skills={skillsData.dataAnalysis}
              delay={0}
            />
            
            <SkillCategory 
              title="Technical Skills"
              icon={<FaCode />}
              skills={skillsData.technicalSkills}
              delay={0.1}
            />
            
            <SkillCategory 
              title="Fraud Detection"
              icon={<FaDatabase />}
              skills={skillsData.fraudDetection}
              delay={0.2}
            />
            
            <SkillCategory 
              title="Tools"
              icon={<FaTools />}
              skills={skillsData.tools}
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