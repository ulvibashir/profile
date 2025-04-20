'use client'

import { motion } from 'framer-motion'

const experienceData = [
  {
    title: 'Fraud Analyst',
    company: 'Kapital Bank',
    period: 'Feb 2023 - Present',
    responsibilities: [
      'Developing machine learning models for real-time fraud detection',
      'Creating predictive systems to identify suspicious transaction patterns',
      'Building end-to-end ML solutions from data processing to API deployment',
      'Collaborating with cross-functional teams on AI-driven security measures',
      'Implementing practical AI solutions to mitigate financial risks'
    ]
  },
  {
    title: 'Business Analyst',
    company: 'Unibank',
    period: 'Dec 2021 - Feb 2023',
    responsibilities: [
      'Designed and implemented predictive models for customer behavior analysis',
      'Developed time-series forecasting solutions for business metrics',
      'Created CLV prediction systems and customer segmentation models',
      'Automated analytical processes with machine learning algorithms',
      'Built data visualization solutions for actionable business insights'
    ]
  },
  {
    title: 'Loan Underwriter',
    company: 'Unibank',
    period: 'Sep 2019 - Dec 2021',
    responsibilities: [
      'Developed ML models for automated loan eligibility assessment',
      'Created risk prediction algorithms for loan applications',
      'Built analytical frameworks for credit risk evaluation',
      'Implemented data-driven decision systems for loan approvals',
      'Designed predictive models for default risk calculation'
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