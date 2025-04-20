'use client'

import { motion } from 'framer-motion'
import DownloadButton from './DownloadButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    // Check if image exists
    const img: HTMLImageElement = new window.Image() // Use `window.Image`
    img.src = '/ismat-profile.jpg'
    img.onerror = () => {
      console.error('Profile image not found in public directory')
      setImgError(true)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Use proper semantic structure for SEO */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            <span className="text-primary">Ismat</span> Samadov
          </h1>
          <p className="text-xl sm:text-2xl font-medium mb-6 text-gray-700">
            Data & Fraud Analytics Professional | Machine Learning Specialist
          </p>

          {/* Add more detailed description for SEO content */}
          <div className="mb-8">
            <p className="text-gray-600 mb-4 text-lg max-w-2xl mx-auto">
              Specialized in machine learning, predictive modeling, and full-stack development.
              Creating practical AI solutions that drive business value, particularly in banking,
              healthcare, and finance sectors.
            </p>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Based in Baku, Azerbaijan with expertise in fraud detection, business intelligence,
              and developing end-to-end machine learning solutions for enterprise applications.
            </p>
          </div>

          {/* Add optimized image with proper alt text */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
              {imgError ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  IS
                </div>
              ) : (
                <Image
                  src="/ismat-profile.jpg"
                  alt="Ismat Samadov - Data & Fraud Analytics Professional"
                  fill
                  sizes="(max-width: 768px) 100vw, 128px"
                  priority
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#experience"
              className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition-colors"
              aria-label="View my professional experience"
            >
              View My Experience
            </a>

            <DownloadButton
              filePath="/ISMAT SAMADOV.pdf"
              label="Download CV"
              className="py-3 px-6"
              variant="secondary"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
      ></div>
    </section>
  )
}

export default Hero
