// src/lib/database.ts
import { createClient, VercelClient } from '@vercel/postgres';

/**
 * Creates a client for the Vercel Postgres database
 */
export function getDbClient(): VercelClient {
  return createClient();
}

/**
 * Execute a database query with proper connection handling
 */
export async function executeQuery<T>(
  queryFn: (client: VercelClient) => Promise<T>
): Promise<T> {
  const client = getDbClient();
  
  try {
    await client.connect();
    return await queryFn(client);
  } finally {
    await client.end();
  }
}

/**
 * Save a contact message to the database
 */
export async function saveContactMessage(
  name: string,
  email: string, 
  message: string,
  createdAt?: Date
): Promise<void> {
  await executeQuery(async (client) => {
    return client.sql`
      INSERT INTO contact_messages (name, email, message, created_at)
      VALUES (${name}, ${email}, ${message}, ${createdAt || new Date().toISOString()})
    `;
  });
}
