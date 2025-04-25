// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@vercel/postgres';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, email, message, createdAt } = await request.json();
    
    // Validate the required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Create a client to connect to the database
    const client = createClient();
    await client.connect();
    
    // Insert the data into the database
    await client.sql`
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${createdAt || new Date().toISOString()})
    `;
    
    // Send email notification
    await sendEmail({
      subject: `New contact message from ${name}`,
      text: `You received a new contact message from your portfolio website:
      
Name: ${name}
Email: ${email}
Message:

${message}

Sent at: ${new Date().toLocaleString()}`,
    });
    
    // Close the connection
    await client.end();
    
    // Return a success response
    return NextResponse.json(
      { message: 'Contact message saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    );
  }
}