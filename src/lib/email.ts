// src/lib/email.ts
import { Resend } from 'resend';

interface EmailOptions {
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ subject, text, html }: EmailOptions) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || '');
    
    // Handle the case where environment variables might be undefined
    const fromEmail = process.env.NOTIFICATION_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.NOTIFICATION_TO_EMAIL || 'ismetsemedov@gmail.com';
    
    console.log('Attempting to send email:', {
      from: `Contact Form <${fromEmail}>`,
      to: toEmail,
      subject
    });
    
    const result = await resend.emails.send({
      from: `Contact Form <${fromEmail}>`,
      to: toEmail,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
    });
    
    console.log('Email send result:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to handle in the API route
  }
}