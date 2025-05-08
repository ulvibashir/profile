// src/components/OptimizedImage.tsx with improved performance
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  eager?: boolean // For above-the-fold images
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 50vw',
  eager = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative overflow-hidden" style={{ width, height, aspectRatio: `${width}/${height}` }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={80} // Lower quality to 80 for faster loading
        priority={priority || eager}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        className={`
          duration-500 ease-in-out
          ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}
          ${className}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEJAI0HiL9PQAAAABJRU5ErkJggg=="
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage