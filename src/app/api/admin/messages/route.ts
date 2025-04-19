import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// GET handler to retrieve all messages with optional status filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let result
    
    if (status && status !== 'all') {
      result = await sql`
        SELECT * FROM contact_messages 
        WHERE status = ${status}
        ORDER BY created_at DESC
      `
    } else {
      result = await sql`
        SELECT * FROM contact_messages 
        ORDER BY created_at DESC
      `
    }
    
    return NextResponse.json(
      { messages: result.rows },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
