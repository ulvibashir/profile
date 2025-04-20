// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Skip tracking for non-HTML requests (images, API calls, etc)
  const contentType = request.headers.get('content-type');
  if (contentType && !contentType.includes('text/html')) {
    return response;
  }
  
  // Skip tracking for bots based on user agent
  const userAgent = request.headers.get('user-agent') || '';
  if (isBot(userAgent)) {
    return response;
  }
  
  // Get visitor ID from cookie or create a new one if it doesn't exist
  let visitorId = request.cookies.get('visitor_id')?.value;
  let sessionId = request.cookies.get('session_id')?.value;
  
  if (!visitorId) {
    visitorId = uuidv4();
    // Set cookie for 2 years
    response.cookies.set('visitor_id', visitorId, { 
      maxAge: 60 * 60 * 24 * 365 * 2,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }
  
  if (!sessionId) {
    sessionId = uuidv4();
    // Set cookie for 30 minutes
    response.cookies.set('session_id', sessionId, {
      maxAge: 60 * 30, // 30 minutes
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
  }
  
  return response;
}

// Helper function to check if user agent is a bot
function isBot(userAgentString: string): boolean {
  const botPatterns = [
    'bot', 'crawl', 'spider', 'slurp', 'baiduspider',
    'yandex', 'googlebot', 'bingbot', 'semrushbot'
  ];
  
  const lowerUA = userAgentString.toLowerCase();
  return botPatterns.some(pattern => lowerUA.includes(pattern));
}

// Configure paths for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|android-chrome|apple-touch|favicon|site.webmanifest|api/).*)',
  ],
};