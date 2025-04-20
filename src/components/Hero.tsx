'use client'

import { motion } from 'framer-motion'
import DownloadButton from './DownloadButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    // Check if image exists
    const img = new window.Image()
    img.src = '/ismat-profile.jpg'
    img.onerror = () => {
      console.error('Profile image not found in public directory')
      setImgError(true)
    }
  }, [])

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
          {/* Profile image moved above name for better mobile flow */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
              {imgError ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  IS
                </div>
              ) : (
                <Image
                  src="/ismat-profile.jpg"
                  alt="Ismat Samadov - Data & Fraud Analytics Professional"
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  priority
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          {/* Name and title - improved responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-gray-900">
            <span className="text-primary">Ismat</span> Samadov
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-4 text-gray-700">
            Data & Fraud Analytics Professional
          </p>
          <p className="text-md sm:text-lg font-medium mb-6 text-gray-700">
            Machine Learning Specialist
          </p>

          {/* Description - improved text size and spacing */}
          <div className="mb-8">
            <p className="text-gray-600 mb-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Specialized in machine learning, predictive modeling, and full-stack development.
              Creating practical AI solutions that drive business value.
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Based in Baku, Azerbaijan with expertise in fraud detection, business intelligence,
              and developing end-to-end machine learning solutions.
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