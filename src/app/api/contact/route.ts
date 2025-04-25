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
    
    console.log('Contact form submission received:', { name, email });
    
    // Create a client to connect to the database
    const client = createClient();
    await client.connect();
    
    // Insert the data into the database
    await client.sql`
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${createdAt || new Date().toISOString()})
    `;
    
    console.log('Contact message saved to database');
    
    // Send email notification
    try {
      const emailResult = await sendEmail({
        subject: `New contact message from ${name}`,
        text: `You received a new contact message from your portfolio website:
        
Name: ${name}
Email: ${email}
Message:

${message}

Sent at: ${new Date().toLocaleString()}`,
      });
      
      console.log('Email notification sent successfully', emailResult);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue execution - we don't want to fail the API response
      // just because the email didn't send
    }
    
    // Close the connection
    await client.end();
    
    // Return a success response
    return NextResponse.json(
      { message: 'Contact message saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact message:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to save contact message' },
      { status: 500 }
    );
  }
}