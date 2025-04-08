'use client'

import { motion } from 'framer-motion'

const experienceData = [
  {
    title: 'Fraud Analyst',
    company: 'Kapital Bank',
    period: 'Feb 2023 - Present',
    responsibilities: [
      'Detect and prevent fraudulent activities including unauthorized account access, identity theft, and payment fraud',
      'Analyze transactional data using advanced fraud detection tools',
      'Conduct thorough investigations into suspected cases of fraud',
      'Collaborate with internal teams and law enforcement agencies to resolve issues',
      'Implement measures to mitigate potential risks to the financial institution and its customers'
    ]
  },
  {
    title: 'Business Analyst',
    company: 'Unibank',
    period: 'Dec 2021 - Feb 2023',
    responsibilities: [
      'Managed master data, including creation, updates, and deletion',
      'Identified trends, patterns, and anomalies in banking data',
      'Assisted in data analysis projects to support business needs',
      'Worked on automating routine reports for improved efficiency',
      'Provided actionable recommendations to improve operational efficiency, risk management, and customer experience'
    ]
  },
  {
    title: 'Loan Underwriter',
    company: 'Unibank',
    period: 'Sep 2019 - Dec 2021',
    responsibilities: [
      'Evaluated loan applications to assess creditworthiness',
      'Reviewed credit applications for various consumer loans',
      'Ensured adherence to lending guidelines and risk levels',
      'Made data-driven decisions to approve or deny loan requests',
      'Balanced borrower needs with bank\'s risk exposure and regulatory requirements'
    ]
  }
]

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="section-title text-center mb-12">Professional Experience</h2>
          
          <div className="space-y-12">
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
      <ul className="list-disc pl-5 space-y-2 mt-3">
        {responsibilities.map((item, i) => (
          <li key={i} className="timeline-content">{item}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Experience