// src/lib/contact.ts
import { saveContactMessage } from './database';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

/**
 * Submit contact form data with fallback options
 * If the database is unavailable, we will still allow the user to send a message
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Try to save to database first
    await saveContactMessage(data.name, data.email, data.message, data.createdAt);
    return { success: true, message: 'Your message has been saved successfully!' };
  } catch (error) {
    console.error('Database error:', error);

    // Fallback: Provide direct contact info
    return { 
      success: true, 
      message: 'Thank you for your message! While there was an issue with our contact system, ' +
               'you can reach me directly at ismetsemedov@gmail.com.'
    };
  }
}