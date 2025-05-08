// src/components/OptimizedImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: width / height }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={85}
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}