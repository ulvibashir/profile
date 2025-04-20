// src/lib/analytics.ts
import { createClient, VercelClient } from '@vercel/postgres';
import { UAParser } from 'ua-parser-js';

// Types for our analytics data
export interface VisitorSession {
  sessionId: string;
  visitorId: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  country?: string;
  region?: string;
  city?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  screenResolution?: string;
  language?: string;
  isMobile?: boolean;
  isBot?: boolean;
}

export interface VisitorEvent {
  sessionId: string;
  eventType: string;
  pagePath?: string;
  pageTitle?: string;
  componentId?: string;
  eventValue?: string;
  durationMs?: number;
}

// Get a database client
function getDbClient(): VercelClient {
  return createClient();
}

// Execute a database query with proper connection handling
async function executeQuery<T>(
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

// Parse user agent to get device, browser, and OS information
export function parseUserAgent(userAgentString: string | undefined): {
  deviceType?: string;
  browser?: string;
  os?: string;
  isMobile?: boolean;
} {
  if (!userAgentString) return {};
  
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();
  
  return {
    deviceType: result.device.type || 'desktop',
    browser: `${result.browser.name || ''} ${result.browser.version || ''}`.trim(),
    os: `${result.os.name || ''} ${result.os.version || ''}`.trim(),
    isMobile: result.device.type === 'mobile'
  };
}

// Check if the user agent is likely a bot
export function isBot(userAgentString: string | undefined): boolean {
  if (!userAgentString) return false;
  
  const botPatterns = [
    'bot', 'crawl', 'spider', 'slurp', 'baiduspider',
    'yandex', 'googlebot', 'bingbot', 'semrushbot'
  ];
  
  const lowerUA = userAgentString.toLowerCase();
  return botPatterns.some(pattern => lowerUA.includes(pattern));
}

// Create or update a visitor session
export async function trackSession(sessionData: VisitorSession): Promise<string> {
  // Use the provided session ID
  const sessionId = sessionData.sessionId;
  
  await executeQuery(async (client) => {
    // Check if session exists
    const { rows } = await client.sql`
      SELECT session_id FROM visitor_sessions 
      WHERE session_id = ${sessionId}
    `;
    
    if (rows.length === 0) {
      // Create new session
      await client.sql`
        INSERT INTO visitor_sessions (
          session_id, visitor_id, ip_address, user_agent, referrer,
          utm_source, utm_medium, utm_campaign, utm_term, utm_content,
          country, region, city, device_type, browser, os,
          screen_resolution, language, is_mobile, is_bot
        ) VALUES (
          ${sessionId}, ${sessionData.visitorId}, ${sessionData.ipAddress}, ${sessionData.userAgent}, ${sessionData.referrer},
          ${sessionData.utmSource}, ${sessionData.utmMedium}, ${sessionData.utmCampaign}, ${sessionData.utmTerm}, ${sessionData.utmContent},
          ${sessionData.country}, ${sessionData.region}, ${sessionData.city}, ${sessionData.deviceType}, ${sessionData.browser}, ${sessionData.os},
          ${sessionData.screenResolution}, ${sessionData.language}, ${sessionData.isMobile}, ${sessionData.isBot}
        )
      `;
    } else {
      // Update existing session
      await client.sql`
        UPDATE visitor_sessions 
        SET last_visit_timestamp = CURRENT_TIMESTAMP
        WHERE session_id = ${sessionId}
      `;
    }
  });
  
  return sessionId;
}

// Log a visitor event
export async function trackEvent(eventData: VisitorEvent): Promise<void> {
  await executeQuery(async (client) => {
    await client.sql`
      INSERT INTO visitor_events (
        session_id, event_type, page_path, page_title,
        component_id, event_value, duration_ms
      ) VALUES (
        ${eventData.sessionId}, ${eventData.eventType}, ${eventData.pagePath}, ${eventData.pageTitle},
        ${eventData.componentId}, ${eventData.eventValue}, ${eventData.durationMs}
      )
    `;
  });
}

// Helper function to parse UTM parameters from URL
export function parseUtmParams(url: string): Record<string, string | undefined> {
  try {
    const parsedUrl = new URL(url);
    return {
      utmSource: parsedUrl.searchParams.get('utm_source') || undefined,
      utmMedium: parsedUrl.searchParams.get('utm_medium') || undefined,
      utmCampaign: parsedUrl.searchParams.get('utm_campaign') || undefined,
      utmTerm: parsedUrl.searchParams.get('utm_term') || undefined,
      utmContent: parsedUrl.searchParams.get('utm_content') || undefined,
    };
  } catch {
    // Ignore URL parsing errors
    return {};
  }
}

// Get visitor's geolocation information using a third-party service
export async function getGeoInfo(ip: string): Promise<Record<string, string>> {
  try {
    // Using free ipinfo.io service (limited to 50,000 requests/month)
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await response.json();
    
    return {
      country: data.country,
      region: data.region,
      city: data.city
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return {};
  }
}