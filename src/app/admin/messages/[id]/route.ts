import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// GET handler to retrieve a specific message by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    
    const result = await sql`
      SELECT * FROM contact_messages 
      WHERE id = ${id}
    `
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: result.rows[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching message:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch message' },
      { status: 500 }
    )
  }
}

// PATCH handler to update a message's status
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    const { status } = await request.json()
    
    // Validate the status
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }
    
    const result = await sql`
      UPDATE contact_messages 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: result.rows[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating message:', error)
    
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

// DELETE handler to remove a message
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    
    const result = await sql`
      DELETE FROM contact_messages 
      WHERE id = ${id}
      RETURNING id
    `
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting message:', error)
    
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
