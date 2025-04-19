// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the middleware function with the NextRequest parameter
export function middleware(request: NextRequest) {
  // Simple middleware that just passes through the request
  return NextResponse.next()
}

// Keep an empty matcher config since we're not protecting any routes
export const config = {
  matcher: []
}
