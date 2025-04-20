// src/components/DownloadButton.tsx
'use client'

import { FaDownload } from 'react-icons/fa'

interface DownloadButtonProps {
  filePath: string
  label: string
  className?: string
  variant?: 'primary' | 'secondary'
}

const DownloadButton = ({ 
  filePath, 
  label, 
  className = '',
  variant = 'primary' 
}: DownloadButtonProps) => {
  return (
    <a 
      href={filePath}
      download
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${
        variant === 'primary' 
          ? 'bg-primary text-white hover:bg-blue-600 py-2 px-4 shadow-md' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 py-2 px-3'
      } ${className}`}
    >
      <FaDownload className={variant === 'primary' ? 'text-white' : 'text-gray-600'} />
      <span>{label}</span>
    </a>
  )
}

export default DownloadButton