// src/components/OptimizedImage.tsx
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
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw'
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        priority={priority}
        sizes={sizes}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
          ${className}
        `}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage
