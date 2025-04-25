// Using Resend
import { Resend } from 'resend';

interface EmailOptions {
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ subject, text, html }: EmailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  return resend.emails.send({
    from: `Contact Form <${process.env.NOTIFICATION_FROM_EMAIL}>`,
    to: process.env.NOTIFICATION_TO_EMAIL,
    subject,
    text,
    html: html || text.replace(/\n/g, '<br>'),
  });
}