// src/middleware.ts
import { NextResponse } from 'next/server'
// We still need to import NextRequest even if we don't use it directly
import type { NextRequest } from 'next/server'

// Define the middleware function without parameters to avoid unused variable warnings
export function middleware() {
  // Simple middleware that just passes through the request
  return NextResponse.next()
}

// Keep an empty matcher config since we're not protecting any routes
export const config = {
  matcher: []
}
