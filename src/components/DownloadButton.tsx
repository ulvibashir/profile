// src/components/DownloadButton.tsx
'use client'

import { FaDownload } from 'react-icons/fa'
import { useCallback } from 'react'

interface DownloadButtonProps {
  filePath: string
  label: string
  className?: string
  variant?: 'primary' | 'secondary'
  documentType?: 'cv' | 'certificate' | 'other' // New prop to identify document type
}

const DownloadButton = ({ 
  filePath, 
  label, 
  className = '',
  variant = 'primary',
  documentType = 'other'
}: DownloadButtonProps) => {
  // Function to track download events
  const trackDownload = useCallback(async () => {
    try {
      // const fileName = filePath.split('/').pop() || 'unknown-file'
      
      // Track the download event
      // await fetch('/api/analytics/track', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     sessionId: document.cookie.split('; ').find(row => row.startsWith('session_id='))?.split('=')[1],
      //     eventType: 'download',
      //     componentId: `download-${documentType}`,
      //     eventValue: fileName,
      //     pagePath: window.location.pathname
      //   }),
      // })
    } catch (error) {
      // Silently fail - don't block the download if tracking fails
      console.error('Error tracking download:', error)
    }
  }, [/*filePath, documentType*/])

  return (
    <a 
      href={filePath}
      download
      onClick={trackDownload}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${
        variant === 'primary' 
          ? 'bg-primary text-white hover:bg-blue-600 py-2 px-4 shadow-md' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 py-2 px-3'
      } ${className}`}
      data-track={`download-${documentType}`}
    >
      <FaDownload className={variant === 'primary' ? 'text-white' : 'text-gray-600'} />
      <span>{label}</span>
    </a>
  )
}

export default DownloadButton