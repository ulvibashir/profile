'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import DownloadButton from './DownloadButton'

const educationData = [
  {
    institution: 'Azerbaijan State University of Economics',
    degree: 'Master',
    field: 'Artificial Intelligence',
    period: 'Current'
  },
  {
    institution: 'Mingachevir State University',
    degree: 'Bachelor',
    field: 'Management of Industry',
    period: '2012 - 2016'
  }
]

const certificationData = [
  {
    title: 'Oracle Database SQL Certified Associate',
    issuer: 'Oracle',
    id: '290631207OCASQL12C',
    date: 'May 2022',
    pdfUrl: '/OCA.pdf'
  }
]

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-8 md:mb-12">Education & Certifications</h2>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center">
                <FaGraduationCap className="mr-2 text-primary" />
                Education
              </h3>
              <div className="space-y-4 md:space-y-8">
                {educationData.map((edu, index) => (
                  <EducationItem 
                    key={index}
                    institution={edu.institution}
                    degree={edu.degree}
                    field={edu.field}
                    period={edu.period}
                    index={index}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center mt-6 md:mt-0">
                <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Certifications
              </h3>
              <div className="space-y-4 md:space-y-8">
                {certificationData.map((cert, index) => (
                  <CertificationItem 
                    key={index}
                    title={cert.title}
                    issuer={cert.issuer}
                    id={cert.id}
                    date={cert.date}
                    pdfUrl={cert.pdfUrl}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface EducationItemProps {
  institution: string
  degree: string
  field: string
  period: string
  index: number
}

const EducationItem = ({ institution, degree, field, period, index }: EducationItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-4 md:p-6"
    >
      <h4 className="text-base md:text-lg font-bold mb-1">{institution}</h4>
      <p className="text-primary font-medium text-sm md:text-base">{degree} • {field}</p>
      <p className="text-gray-600 text-xs md:text-sm mt-2">{period}</p>
    </motion.div>
  )
}

interface CertificationItemProps {
  title: string
  issuer: string
  id: string
  date: string
  pdfUrl?: string
  index: number
}

// Updated CertificationItem component in Education.tsx
const CertificationItem = ({ title, issuer, id, date, pdfUrl, index }: CertificationItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-4 md:p-6"
    >
      <h4 className="text-base md:text-lg font-bold mb-1">{title}</h4>
      <p className="text-primary font-medium text-sm md:text-base">{issuer}</p>
      <p className="text-gray-600 text-xs md:text-sm mt-2">ID: {id}</p>
      <p className="text-gray-600 text-xs md:text-sm">Issued: {date}</p>
      
      {pdfUrl && (
        <div className="mt-3 md:mt-4">
          <DownloadButton 
            filePath={pdfUrl}
            label="Download Certificate"
            variant="secondary"
            className="text-sm py-2 px-3"
            documentType="certificate"
          />
        </div>
      )}
    </motion.div>
  )
}

export default Education