'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaExternalLinkAlt } from 'react-icons/fa'
import DownloadButton from './DownloadButton'

const educationData = [
  {
    institution: 'Azerbaijan State University of Economics • UNEC',
    degree: "Master's degree",
    field: 'Artificial Intelligence',
    period: 'Sep 2024 - Jul 2026'
  },
  {
    institution: 'SABAH groups',
    degree: "Bachelor's degree",
    field: 'Petroleum Engineering',
    period: '2018 - 2021'
  },
  {
    institution: 'Azerbaijan State Oil and Industry University • ASOIU',
    degree: "Bachelor's degree",
    field: 'Petroleum Engineering',
    period: '2017 - 2021'
  },
  {
    institution: 'STEP IT Academy Azerbaijan',
    degree: '',
    field: 'Computer Software Engineering',
    period: '2018 - 2021'
  }
]

const certificationData = [
  {
    title: 'The Technology of Music Production',
    issuer: 'Berklee College of Music',
    id: 'QDHUY9NKOZVL',
    date: 'Nov 2024',
    pdfUrl: '',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/records/QDHUY9NKOZVL'
  },
  {
    title: 'Introduction to Ableton Live',
    issuer: 'Berklee College of Music',
    id: 'A2STNLU9IKAN',
    date: 'Nov 2024',
    pdfUrl: '',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/records/A2STNLU9IKAN'
  },

  // {
  //   title: 'Viveka Company Creation Program',
  //   issuer: 'Viveka',
  //   id: '',
  //   date: 'Dec 2023',
  //   pdfUrl: '',
  //   verificationUrl: ''
  // },
  {
    title: 'Introduction to Bash Shell Scripting',
    issuer: 'Coursera',
    id: 'RA2ZXM5K4R7U',
    date: 'Sep 2022',
    pdfUrl: '',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/certificate/RA2ZXM5K4R7U'
  },
  {
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    id: '978F8OAE2175',
    date: 'Sep 2020',
    pdfUrl: '',
    verificationUrl: 'https://www.hackerrank.com/certificates/978f80ae2175'
  },
  {
    title: 'Mobile Development',
    issuer: 'ABB Innovation',
    id: '21989647',
    date: 'Aug 2020',
    pdfUrl: '',
    verificationUrl: 'https://www.credential.net/f047b093-f9c3-4c3d-b847-b2f17657c905'
  },
  {
    title: 'Microsoft Technology Associate: Software Development Fundamentals (MTA)',
    issuer: 'Microsoft',
    id: '98-361',
    date: 'Feb 2020',
    pdfUrl: '',
    verificationUrl: 'https://www.youracclaim.com/badges/aa72d2a4-c594-432a-b6cd-0bc1d5f7cc6a/linked_in'
  }
  // {
  //   title: 'IT Essentials',
  //   issuer: 'Cisco Networking Academy',
  //   id: '',
  //   date: 'Mar 2019',
  //   pdfUrl: '',
  //   verificationUrl: ''
  // }
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
                    verificationUrl={cert.verificationUrl}
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
  verificationUrl?: string
  index: number
}

const CertificationItem = ({ title, issuer, id, date, pdfUrl, verificationUrl, index }: CertificationItemProps) => {
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
      {
        id && <p className="text-gray-600 text-xs md:text-sm mt-2">ID: {id}</p>
      }
      
      <p className="text-gray-600 text-xs md:text-sm">Issued: {date}</p>
      
      <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
        {pdfUrl && (
          <DownloadButton 
            filePath={pdfUrl}
            label="Download Certificate"
            variant="secondary"
            className="text-sm py-2 px-3"
            documentType="certificate"
          />
        )}
        
        {verificationUrl && (
          <a 
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-100 text-gray-800 hover:bg-gray-200 py-2 px-3 rounded-md transition-colors text-sm"
          >
            Verify Certificate <FaExternalLinkAlt className="ml-1 text-xs" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default Education