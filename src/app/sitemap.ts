// src/app/sitemap.ts
import { MetadataRoute } from 'next'

// Add all your static routes here
const routes = [
  '',
  '/projects',
  '/about',
  '/contact',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ismat.pro'
  
  // Create sitemap entries for all static routes
  const routeEntries = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Add project entries (these would dynamically come from your project data)
  const projectSlugs = ['ihealth', 'trackio', 'jobry', 'myfrog']
  const projectEntries = projectSlugs.map(slug => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...routeEntries, ...projectEntries]
}
