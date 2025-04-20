// src/app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import { trackSession, trackEvent, getGeoInfo, parseUtmParams } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      sessionId, 
      visitorId, 
      eventType, 
      pagePath,
      pageTitle,
      componentId,
      eventValue,
      durationMs,
      userAgent: clientUserAgent,
      screenResolution,
      language,
      referrer
    } = data;

    // Get IP address from request
    const ip = request.ip || 
               request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    // Get user agent from request or client-provided value
    const userAgent = request.headers.get('user-agent') || clientUserAgent || '';

    // Parse UTM parameters if provided in the request
    const utmParams = data.utmSource ? {
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      utmTerm: data.utmTerm,
      utmContent: data.utmContent,
    } : referrer ? parseUtmParams(referrer) : {};

    // Parse user agent for device information
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    const deviceInfo = {
      deviceType: result.device.type || 'desktop',
      browser: `${result.browser.name || ''} ${result.browser.version || ''}`.trim(),
      os: `${result.os.name || ''} ${result.os.version || ''}`.trim(),
      isMobile: result.device.type === 'mobile' || result.device.type === 'tablet',
    };

    // Check if this is a bot
    const botPatterns = [
      'bot', 'crawl', 'spider', 'slurp', 'baiduspider',
      'yandex', 'googlebot', 'bingbot', 'semrushbot'
    ];
    const lowerUA = userAgent.toLowerCase();
    const isBot = botPatterns.some(pattern => lowerUA.includes(pattern));

    // Get geolocation information
    const geoInfo = await getGeoInfo(ip);

    // Track session first (ensures the session exists)
    await trackSession({
      sessionId,
      visitorId,
      ipAddress: ip,
      userAgent,
      referrer,
      ...utmParams,
      ...geoInfo,
      ...deviceInfo,
      screenResolution,
      language,
      isBot,
    });

    // Then track the event
    await trackEvent({
      sessionId,
      eventType,
      pagePath,
      pageTitle,
      componentId,
      eventValue,
      durationMs,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    );
  }
}