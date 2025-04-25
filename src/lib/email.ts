// src/lib/email.ts
import { Resend } from 'resend';

interface EmailOptions {
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ subject, text, html }: EmailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_Dgscvft1_LN8hBqxikt3Bq7hL1zRXaQPq');
  
  // Handle the case where environment variables might be undefined
  const fromEmail = process.env.NOTIFICATION_FROM_EMAIL || 'noreply@ismat.pro';
  const toEmail = process.env.NOTIFICATION_TO_EMAIL || 'ismetsemedov@gmail.com';
  
  return resend.emails.send({
    from: `Contact Form <${fromEmail}>`,
    to: toEmail, // Now guaranteed to be a string
    subject,
    text,
    html: html || text.replace(/\n/g, '<br>'),
  });
}