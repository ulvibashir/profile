// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, email, message, createdAt } = await request.json()
    
    // Validate the required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    
    // Insert the data into the database
    await sql`
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${createdAt || new Date().toISOString()})
    `
    
    // Return a success response
    return NextResponse.json(
      { message: 'Contact message saved successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contact message:', error)
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    )
  }
}
