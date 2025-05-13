'use client'

import { motion } from 'framer-motion'

const experienceData = [
  {
    title: 'Birbank',
    company: 'Senior iOS Engineer',
    period: 'Oct 2024 - Present',
    responsibilities: [
      "Contribute to the development and maintenance of the Birbank iOS app",
      "Collaborate with cross-functional teams on-site to deliver key features",
      "Ensure app performance, reliability, and scalability",
      "Implement clean and maintainable architecture using Swift"
    ]
  },
  {
    title: 'Beso Mobile',
    company: 'Leading iOS Engineer',
    period: 'Feb 2023 - Present',
    responsibilities: [
      "Lead end-to-end development and maintenance of the Beso app",
      "Built tools for inventory, income/expense tracking, and e-invoicing for small businesses",
      "Make all major technical decisions, including app architecture and infrastructure",
      "Optimize performance, scalability, and usability",
      "Troubleshoot and resolve technical issues across the app",
      "Continuously improve codebase to meet evolving business requirements",
      "Support long-term product strategy and roadmap"
    ]
  },
  {
    title: 'ABB Innovation',
    company: 'Senior iOS Engineer',
    period: 'Oct 2023 - Apr 2025',
    responsibilities: [
      "Develop and maintain iOS features for ABB as part of an external development team",
      "Integrated Masterpass by Mastercard for secure in-app payment functionality",
      "Work across multiple tribes and feature teams, depending on client needs",
      "Contribute to large-scale fintech projects, including payments, transfers, and investment flows",
      "Collaborate closely with ABB Bank’s in-house teams to ensure seamless integration and delivery",
      "Participate in architectural discussions, refactoring, and system improvements",
      "Handle feature development, debugging, and release planning in a dynamic, multi-team setup",
      "Ensure code quality, stability, and performance through regular reviews and testing"
    ]
  },
  {
    title: 'Unibank',
    company: 'Senior iOS Engineer',
    period: 'Jul 2023 - Oct 2024',
    responsibilities: [
      "Develop and maintain a large-scale iOS banking app",
      "Handle full-cycle development, from feature planning to release",
      "Collaborate with designers and backend engineers to ensure seamless UX",
      "Improve app architecture, performance, and scalability",
      "Ensure code quality and stability across versions",
      "Actively participate in Agile development processes"
    ]
  },
  {
    title: 'ABB',
    company: 'Leading iOS Developer',
    period: 'Sep 2020 - Jul 2023',
    responsibilities: [
      "Led development of a complex iOS application from planning to release",
      "Defined technical strategies and collaborated with stakeholders",
      "Conducted code reviews and maintained coding standards",
      "Mentored junior developers and supported team growth",
      "Diagnosed and optimized performance issues in production",
      "Ensured high product quality with clean architecture and stable releases",
      "Worked in an Agile environment using Nexus for cross-team coordination"
    ]
  },
  {
    title: 'ABB Innovation',
    company: 'Instructor',
    period: 'Mar 2023 - Jun 2023',
    responsibilities: [
      "Taught mobile development using MIT App Inventor",
      "Created lesson plans and guided students through hands-on projects",
      "Helped beginners build functional apps without prior coding experience",
      "Focused on technical and design skill development"
    ]
  },
  {
    title: 'ABB Innovation',
    company: 'Mobile and Web Developer (Apprenticeship)',
    period: 'Feb 2020 - Jun 2020',
    responsibilities: [
      "Worked on web and cross-platform mobile apps using React JS and React Native",
      "Designed UI and optimized app performance",
      "Troubleshot UI and functional issues across platforms",
      "Gained hands-on experience in JavaScript, Swift, and HTML"
    ]
  }
];

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