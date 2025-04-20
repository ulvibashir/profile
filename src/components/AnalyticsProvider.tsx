// src/components/AnalyticsProvider.tsx
'use client'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

const AnalyticsContent = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pageLoadTime, setPageLoadTime] = useState<number>(Date.now())
  const [hasTrackedPageView, setHasTrackedPageView] = useState<boolean>(false)

  // Get session data
  const getSessionData = useCallback(() => {
    // Try to get session ID from cookie, or create a new one
    let sessionId = Cookies.get('session_id')
    let visitorId = Cookies.get('visitor_id')
    
    if (!sessionId) {
      sessionId = uuidv4()
      Cookies.set('session_id', sessionId, { expires: 1/48 }) // 30 minutes
    }
    
    if (!visitorId) {
      visitorId = uuidv4()
      Cookies.set('visitor_id', visitorId, { expires: 365 * 2 }) // 2 years
    }
    
    return { sessionId, visitorId }
  }, [])

  // Track page view
  const trackPageView = useCallback(async () => {
    const { sessionId, visitorId } = getSessionData()
    
    try {
      // Get UTM parameters
      const utmSource = searchParams.get('utm_source') || undefined
      const utmMedium = searchParams.get('utm_medium') || undefined
      const utmCampaign = searchParams.get('utm_campaign') || undefined
      const utmTerm = searchParams.get('utm_term') || undefined
      const utmContent = searchParams.get('utm_content') || undefined
      
      // Get page title
      const pageTitle = document.title

      // Get referrer
      const referrer = document.referrer
      
      // Get screen resolution
      const screenResolution = `${window.screen.width}x${window.screen.height}`
      
      // Get language
      const language = navigator.language
      
      // Send data to the API endpoint
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          visitorId,
          eventType: 'pageview',
          pagePath: pathname,
          pageTitle,
          referrer,
          utmSource,
          utmMedium,
          utmCampaign,
          utmTerm,
          utmContent,
          userAgent: navigator.userAgent,
          screenResolution,
          language,
        }),
      })
      
      setHasTrackedPageView(true)
    } catch (error) {
      console.error('Error tracking page view:', error)
    }
  }, [getSessionData, pathname, searchParams])

  // Track user leaving the page
  const trackPageExit = useCallback(async () => {
    if (!hasTrackedPageView) return
    
    const { sessionId } = getSessionData()
    const durationMs = Date.now() - pageLoadTime
    
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          eventType: 'page_exit',
          pagePath: pathname,
          pageTitle: document.title,
          durationMs,
        }),
      })
    } catch (error) {
      console.error('Error tracking page exit:', error)
    }
  }, [getSessionData, hasTrackedPageView, pageLoadTime, pathname])

  // Setup click tracking
  const setupClickTracking = useCallback(() => {
    const handleClick = async (e: MouseEvent) => {
      // Only track clicks on interactive elements
      const target = e.target as HTMLElement
      
      if (!target) return
      
      // Check if the clicked element or any of its parents is a button, link, or has a data-track attribute
      let currentElement: HTMLElement | null = target
      let trackableElement: HTMLElement | null = null
      let componentId = ''
      
      while (currentElement && !trackableElement) {
        const tagName = currentElement.tagName.toLowerCase()
        const hasTrackAttribute = currentElement.hasAttribute('data-track')
        
        if (tagName === 'a' || tagName === 'button' || hasTrackAttribute) {
          trackableElement = currentElement
          componentId = currentElement.id || currentElement.getAttribute('data-track') || tagName
        }
        
        currentElement = currentElement.parentElement
      }
      
      if (!trackableElement) return
      
      // Get href for links
      let eventValue = ''
      if (trackableElement.tagName.toLowerCase() === 'a') {
        eventValue = (trackableElement as HTMLAnchorElement).href
      }
      
      // Get text content as a fallback
      if (!eventValue) {
        eventValue = trackableElement.textContent?.trim() || ''
      }
      
      const { sessionId } = getSessionData()
      
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            eventType: 'click',
            pagePath: pathname,
            componentId,
            eventValue,
          }),
        })
      } catch (error) {
        console.error('Error tracking click:', error)
      }
    }
    
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [getSessionData, pathname])

  // Track page view when the path changes or on initial load
  useEffect(() => {
    setPageLoadTime(Date.now())
    setHasTrackedPageView(false)
    
    // Small delay to ensure the page is properly loaded
    const trackingTimeout = setTimeout(() => {
      trackPageView()
    }, 500)
    
    return () => {
      clearTimeout(trackingTimeout)
      trackPageExit()
    }
  }, [pathname, searchParams, trackPageView, trackPageExit])

  // Setup click tracking when component mounts
  useEffect(() => {
    const cleanupClickTracking = setupClickTracking()
    
    // Setup visibility change tracking
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackPageExit()
      } else if (document.visibilityState === 'visible') {
        setPageLoadTime(Date.now())
        if (!hasTrackedPageView) {
          trackPageView()
        }
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Setup beforeunload tracking
    const handleBeforeUnload = () => {
      trackPageExit()
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      cleanupClickTracking()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasTrackedPageView, setupClickTracking, trackPageExit, trackPageView, setPageLoadTime])

  return null;
}

// Main provider component with Suspense boundary
const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsContent />
      </Suspense>
      {children}
    </>
  )
}

export default AnalyticsProvider