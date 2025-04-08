'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            <span className="text-primary">Ismat</span> Samadov
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-700">
            Data & Fraud Analytics Professional
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Experienced in data analysis, fraud detection, and business intelligence. 
            Skilled in developing predictive models and identifying business needs.
            Proficient in SQL and Python.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <SocialLink href="https://az.linkedin.com/in/ismatsamadov" icon={<FaLinkedin />} label="LinkedIn" />
            <SocialLink href="mailto:ismetsemedov@gmail.com" icon={<FaEnvelope />} label="Email" />
            <SocialLink href="tel:+994504787463" icon={<FaPhone />} label="+994 50 478 7463" />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a 
              href="#experience" 
              className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors"
            >
              View My Experience
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
    </section>
  )
}

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white rounded-full py-2 px-5 shadow-md hover:shadow-lg transition-shadow"
    >
      <span className="text-primary text-lg">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  )
}

export default Hero