import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for the admin routes
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    
    // In a real application, you would implement proper authentication here
    // This is a simple example using a basic auth header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !isValidAuth(authHeader)) {
      // Return 401 Unauthorized response for API routes
      if (request.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      
      // Redirect to login page for admin UI routes
      const url = new URL('/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

// Simple function to validate auth
// In a real application, you would use a proper authentication system
function isValidAuth(authHeader: string): boolean {
  // Basic authentication example (not recommended for production)
  // Format: "Basic base64(username:password)"
  if (!authHeader.startsWith('Basic ')) {
    return false
  }
  
  // Get the base64 encoded credentials
  const base64Credentials = authHeader.split(' ')[1]
  
  // Decode the credentials
  const credentials = atob(base64Credentials)
  
  // Split username and password
  const [username, password] = credentials.split(':')
  
  // Check credentials - in production, use environment variables or a secure auth system
  return username === 'admin' && password === 'adminpassword'
}
