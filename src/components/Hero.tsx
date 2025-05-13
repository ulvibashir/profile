'use client'

import { motion } from 'framer-motion'
import DownloadButton from './DownloadButton'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-16 pb-20 flex flex-col justify-center min-h-[100vh] bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Name and title - improved responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-gray-900">
            <span className="text-primary">Ulvi</span> Bashirov
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-gray-700">
            iOS Engineer & Instructor
          </p>
          <p className="text-md sm:text-lg font-medium mb-6 text-gray-700">
            I code with electronic music playing—code and beats just work well together.
          </p>

          {/* Description - improved text size and spacing */}
          <div className="mb-8">
            <p className="text-gray-600 mb-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              iOS Engineer focused on fintech applications. I build and maintain secure payment systems and banking features with an emphasis on clean code and reliable performance.
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              I value straightforward solutions and clear communication. My experience includes both hands-on development and teaching others.
            </p>
          </div>

          {/* Buttons - improved for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a
              href="#experience"
              className="w-full sm:w-auto inline-block bg-primary text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors text-center"
              aria-label="View my professional experience"
            >
              View My Experience
            </a>

            <DownloadButton
              filePath="/ISMAT SAMADOV.pdf"
              label="Download CV"
              className="w-full sm:w-auto py-3 px-6"
              variant="secondary"
              documentType="cv"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-full h-20 sm:h-32 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
      ></div>
    </section>
  )
}

export default Hero