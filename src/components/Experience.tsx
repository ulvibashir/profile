'use client'

import { motion } from 'framer-motion'

const experienceData = [
  {
    title: 'Machine Learning Engineer',
    company: 'Kapital Bank',
    period: 'Feb 2023 - Present',
    responsibilities: [
      'Designed and implemented real-time fraud detection systems using ensemble machine learning models, reducing fraudulent transactions by 27%',
      'Built end-to-end ML pipelines from data ingestion to model deployment using TensorFlow and Docker',
      'Developed NLP solutions for automated document processing and sentiment analysis from customer feedback',
      'Created anomaly detection algorithms for transaction monitoring with 93% precision',
      'Collaborated with cross-functional teams to integrate ML models into banking applications'
    ]
  },
  {
    title: 'Data Scientist',
    company: 'Unibank',
    period: 'Dec 2021 - Feb 2023',
    responsibilities: [
      'Led development of customer lifetime value prediction models that improved retention campaign ROI by 32%',
      'Implemented automated machine learning pipelines for customer segmentation and behavior analysis',
      'Built time-series forecasting models for business metrics with LSTM neural networks',
      'Created interactive dashboards for real-time monitoring of model performance',
      'Optimized database queries and ETL processes, reducing processing time by 40%'
    ]
  },
  {
    title: 'Analytics Specialist',
    company: 'Unibank',
    period: 'Sep 2019 - Dec 2021',
    responsibilities: [
      'Developed credit risk assessment models using gradient boosting algorithms with 85% accuracy',
      'Created automated data processing pipelines for loan applications using Python and SQL',
      'Built predictive models for default risk calculation with feature importance analysis',
      'Implemented A/B testing framework for evaluating model performance in production',
      'Collaborated with business teams to transform analytical insights into actionable strategies'
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