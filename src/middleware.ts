// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(_request: NextRequest) {
  // Using underscore prefix for the parameter name to indicate it's intentionally unused
  // You can add any site-wide middleware logic here if needed
  // For example, security headers, redirects, etc.
  return NextResponse.next()
}

// Update the config to remove admin routes
export const config = {
  matcher: [] // Empty matcher since we're not protecting any routes now
}
