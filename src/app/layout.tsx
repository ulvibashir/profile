// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { defaultMetadata } from '@/lib/seo'
import { PersonStructuredData, WebsiteStructuredData } from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improves font loading performance
  variable: '--font-inter',
})

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="canonical" href="https://ismat.pro" />
        {/* Preconnect to key domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`bg-gray-50 text-gray-900 antialiased`}>
        {/* Add structured data */}
        <PersonStructuredData />
        <WebsiteStructuredData />
        {children}
      </body>
    </html>
  )
}
