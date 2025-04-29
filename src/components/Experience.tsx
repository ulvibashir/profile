'use client'

import { motion } from 'framer-motion'

const experienceData = [
  {
    title: 'SQL Developer',
    company: 'Kapital Bank',
    period: 'Feb 2023 - Present',
    responsibilities: [
      'Developing and optimizing SQL queries and stored procedures for fraud detection systems',
      'Creating and maintaining database schemas for transaction monitoring and analytics',
      'Implementing data extraction and transformation processes for financial reporting',
      'Building automated SQL-based data pipelines to support analytical requirements',
      'Collaborating with cross-functional teams to translate business requirements into SQL solutions'
    ]
  },
  {
    title: 'Business Analytics',
    company: 'Unibank',
    period: 'Dec 2021 - Feb 2023',
    responsibilities: [
      'Designed analytical reports and dashboards for tracking key business metrics and KPIs',
      'Conducted in-depth data analysis to identify trends and opportunities in customer behavior',
      'Developed SQL queries to extract and process data for business intelligence reporting',
      'Created data visualizations to communicate insights to business stakeholders',
      'Collaborated with department heads to establish metrics and reporting frameworks'
    ]
  },
  {
    title: 'Underwriter',
    company: 'Unibank',
    period: 'Sep 2019 - Dec 2021',
    responsibilities: [
      'Evaluated consumer loan applications using established credit policies and risk guidelines',
      'Analyzed applicant financial data and credit histories to make informed lending decisions',
      'Prepared detailed reports on loan portfolio performance and risk metrics',
      'Identified trends in application data to improve underwriting processes',
      'Collaborated with fraud prevention teams to verify application information'
    ]
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Professional Experience</h2>
          
          <div className="space-y-10 md:space-y-12">
            {experienceData.map((job, index) => (
              <ExperienceItem 
                key={index}
                title={job.title}
                company={job.company}
                period={job.period}
                responsibilities={job.responsibilities}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  responsibilities: string[]
  index: number
}

const ExperienceItem = ({ title, company, period, responsibilities, index }: ExperienceItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="timeline-item"
    >
      <div className="timeline-date">{period}</div>
      <h3 className="timeline-title">{title}</h3>
      <h4 className="timeline-subtitle">{company}</h4>
      <ul className="list-disc pl-4 md:pl-5 space-y-1 md:space-y-2 mt-3">
        {responsibilities.map((item, i) => (
          <li key={i} className="timeline-content text-sm md:text-base">{item}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Experience