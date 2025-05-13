'use client'

import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaChartBar, FaTools } from 'react-icons/fa'

const skillsData = {
  technicalSkills: [
    'Swift',
    'UIKit',
    'Xcode',
    'Git',
    'CocoaPods',
    'SPM',
    'Interface Builder'
  ],
  architectureAndDesign: [
    'MVVM',
    'Modular Architecture',
    'Clean Architecture',
    'Design Patterns'
  ],
  toolingAndPractices: [
    'CI/CD',
    'Unit Testing',
    'Fastlane',
    'Jira',
    'Postman',
    'Debugging',
    'Performance Profiling',
    'TestFlight'
  ],
  collaborationAndProcess: [
    'Agile Methodologies',
    'Scrum',
    'Teamwork',
    'Code Review',
    'Cross-functional Collaboration'
  ]
}

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Professional Skills</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <SkillCategory 
              title="Technical Skills"
              icon={<FaCode />}
              skills={skillsData.technicalSkills}
              delay={0}
            />
            
            <SkillCategory 
              title="Architecture & Design"
              icon={<FaDatabase />}
              skills={skillsData.architectureAndDesign}
              delay={0.1}
            />
            
            <SkillCategory 
              title="Tooling & Practices"
              icon={<FaChartBar />}
              skills={skillsData.toolingAndPractices}
              delay={0.2}
            />
            
            <SkillCategory 
              title="Collaboration & Process"
              icon={<FaTools />}
              skills={skillsData.collaborationAndProcess}
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
      className="bg-gray-50 rounded-lg shadow-md p-4 md:p-6"
    >
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center">
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