// src/components/Breadcrumbs.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const Breadcrumbs = () => {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<{label: string, path: string}[]>([])
  
  useEffect(() => {
    const generateBreadcrumbs = () => {
      // Remove trailing slash
      const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
      
      // Home is always first
      const crumbs = [{ label: 'Home', path: '/' }]
      
      // Split path into segments
      const segments = path.split('/').filter(segment => segment)
      
      // Build up breadcrumbs
      let currentPath = ''
      segments.forEach((segment, index) => {
        currentPath += `/${segment}`
        
        // Format label - convert slug to readable text
        let label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
          
        // Special case for known sections
        if (segment === 'projects' && index === segments.length - 1) {
          label = 'Portfolio Projects'
        } else if (segment === 'blog' && index === segments.length - 1) {
          label = 'Blog'
        }
        
        crumbs.push({ label, path: currentPath })
      })
      
      setBreadcrumbs(crumbs)
    }
    
    generateBreadcrumbs()
  }, [pathname])
  
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          
          return (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
              
              {isLast ? (
                <span className="font-medium text-gray-800" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  href={crumb.path}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs