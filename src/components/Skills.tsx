'use client'

import { motion } from 'framer-motion'

const skillsData = [
  { 
    category: "Data Analysis",
    skills: ["SQL", "Python", "Data Visualization", "Statistical Analysis", "Excel"]
  },
  { 
    category: "Fraud Prevention",
    skills: ["Risk Assessment", "Fraud Detection", "Transaction Monitoring", "Compliance", "Investigation"]
  },
  { 
    category: "Business Intelligence",
    skills: ["Reporting", "Dashboard Development", "KPI Tracking", "Data Mining", "Trend Analysis"]
  },
  { 
    category: "Technical",
    skills: ["Oracle Database", "Data Engineering", "Data Science", "Predictive Modeling", "Process Automation"]
  }
]

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
          <h2 className="section-title text-center mb-12">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillsData.map((category, index) => (
              <SkillCategory 
                key={index}
                category={category.category}
                skills={category.skills}
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Passionate about leveraging data to identify patterns, prevent fraud, and drive 
              business decisions through actionable insights and predictive modeling.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

interface SkillCategoryProps {
  category: string
  skills: string[]
  index: number
}

const SkillCategory = ({ category, skills, index }: SkillCategoryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-50 rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-lg font-bold mb-4 text-primary">{category}</h3>
      <div className="flex flex-wrap">
        {skills.map((skill, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
            className="skill-tag"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default Skills