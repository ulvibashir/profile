-- Basic visitor stats by day
SELECT 
    DATE_TRUNC('day', first_visit_timestamp) AS day,
    COUNT(DISTINCT visitor_id) AS unique_visitors,
    COUNT(DISTINCT session_id) AS sessions
FROM visitor_sessions
GROUP BY DATE_TRUNC('day', first_visit_timestamp)
ORDER BY day DESC;

-- Pageview counts by page path
SELECT 
    page_path,
    COUNT(*) AS pageviews,
    COUNT(DISTINCT session_id) AS unique_sessions
FROM visitor_events
WHERE event_type = 'pageview'
GROUP BY page_path
ORDER BY pageviews DESC;

-- Funnel analysis query (tracking steps through your website)
WITH funnel_steps AS (
    SELECT
        session_id,
        MAX(CASE WHEN page_path = '/' THEN 1 ELSE 0 END) AS step_1_home,
        MAX(CASE WHEN page_path = '/portfolio' OR page_path LIKE '/portfolio/%' THEN 1 ELSE 0 END) AS step_2_portfolio,
        MAX(CASE WHEN page_path = '/contact' THEN 1 ELSE 0 END) AS step_3_contact,
        MAX(CASE WHEN event_type = 'form_submit' AND component_id = 'contact-form' THEN 1 ELSE 0 END) AS step_4_form_submit
    FROM visitor_events
    GROUP BY session_id
)
SELECT
    COUNT(*) AS total_sessions,
    SUM(step_1_home) AS visited_home,
    SUM(step_2_portfolio) AS visited_portfolio,
    SUM(step_3_contact) AS visited_contact,
    SUM(step_4_form_submit) AS submitted_form,
    ROUND(SUM(step_2_portfolio)::numeric / SUM(step_1_home), 4) * 100 AS home_to_portfolio_rate,
    ROUND(SUM(step_3_contact)::numeric / SUM(step_2_portfolio), 4) * 100 AS portfolio_to_contact_rate,
    ROUND(SUM(step_4_form_submit)::numeric / SUM(step_3_contact), 4) * 100 AS contact_to_submit_rate,
    ROUND(SUM(step_4_form_submit)::numeric / COUNT(*), 4) * 100 AS overall_conversion_rate
FROM funnel_steps;

-- Traffic sources analysis
SELECT 
    COALESCE(utm_source, 'direct') AS source,
    COALESCE(utm_medium, 'none') AS medium,
    COALESCE(utm_campaign, 'none') AS campaign,
    COUNT(DISTINCT visitor_id) AS visitors,
    COUNT(DISTINCT session_id) AS sessions
FROM visitor_sessions
GROUP BY source, medium, campaign
ORDER BY sessions DESC;

-- Geographic distribution
SELECT 
    country,
    COUNT(DISTINCT session_id) AS sessions,
    COUNT(DISTINCT visitor_id) AS unique_visitors
FROM visitor_sessions
WHERE country IS NOT NULL
GROUP BY country
ORDER BY sessions DESC;

-- Device type analysis
SELECT 
    device_type,
    COUNT(DISTINCT session_id) AS sessions,
    ROUND((COUNT(DISTINCT session_id)::numeric / (SELECT COUNT(DISTINCT session_id) FROM visitor_sessions)) * 100, 2) AS percentage
FROM visitor_sessions
GROUP BY device_type
ORDER BY sessions DESC;

-- Browser usage analysis
SELECT 
    SPLIT_PART(browser, ' ', 1) AS browser_name,
    COUNT(DISTINCT session_id) AS sessions,
    ROUND((COUNT(DISTINCT session_id)::numeric / (SELECT COUNT(DISTINCT session_id) FROM visitor_sessions)) * 100, a2) AS percentage
FROM visitor_sessions
GROUP BY browser_name
ORDER BY sessions DESC;

-- Time spent analysis
SELECT 
    page_path,
    COUNT(*) AS pageviews,
    ROUND(AVG(duration_ms) / 1000, 2) AS avg_time_on_page_seconds,
    ROUND(MAX(duration_ms) / 1000, 2) AS max_time_on_page_seconds
FROM visitor_events
WHERE event_type = 'page_exit' AND duration_ms IS NOT NULL
GROUP BY page_path
ORDER BY avg_time_on_page_seconds DESC;

-- Hourly traffic patterns
SELECT 
    EXTRACT(HOUR FROM first_visit_timestamp) AS hour_of_day,
    COUNT(DISTINCT session_id) AS sessions
FROM visitor_sessions
GROUP BY hour_of_day
ORDER BY hour_of_day;

-- Day of week traffic patterns
SELECT 
    TO_CHAR(first_visit_timestamp, 'Day') AS day_of_week,
    COUNT(DISTINCT session_id) AS sessions
FROM visitor_sessions
GROUP BY day_of_week, EXTRACT(DOW FROM first_visit_timestamp)
ORDER BY EXTRACT(DOW FROM first_visit_timestamp);

-- Click tracking analysis
SELECT 
    component_id,
    event_value,
    COUNT(*) AS clicks
FROM visitor_events
WHERE event_type = 'click'
GROUP BY component_id, event_value
ORDER BY clicks DESC;

-- Bounce rate analysis (sessions with only one pageview)
WITH session_pageviews AS (
    SELECT 
        session_id,
        COUNT(*) AS pageview_count
    FROM visitor_events
    WHERE event_type = 'pageview'
    GROUP BY session_id
)
SELECT 
    COUNT(*) AS total_sessions,
    SUM(CASE WHEN pageview_count = 1 THEN 1 ELSE 0 END) AS bounce_sessions,
    ROUND((SUM(CASE WHEN pageview_count = 1 THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100, 2) AS bounce_rate
FROM session_pageviews;

-- Returning visitor analysis
SELECT 
    is_returning,
    COUNT(*) AS sessions,
    ROUND(AVG(session_duration) / 1000, 2) AS avg_session_duration_seconds,
    AVG(pageviews) AS avg_pageviews
FROM (
    SELECT 
        s.session_id,
        CASE WHEN COUNT(DISTINCT DATE_TRUNC('day', s.first_visit_timestamp)) OVER (PARTITION BY s.visitor_id) > 1 THEN TRUE ELSE FALSE END AS is_returning,
        MAX(e.timestamp) - MIN(e.timestamp) AS session_duration,
        COUNT(CASE WHEN e.event_type = 'pageview' THEN 1 ELSE NULL END) AS pageviews
    FROM visitor_sessions s
    JOIN visitor_events e ON s.session_id = e.session_id
    GROUP BY s.session_id, s.visitor_id, s.first_visit_timestamp
) subquery
GROUP BY is_returning;


-- Track all downloads with relevant details
SELECT 
    ve.event_type,
    ve.component_id,
    ve.event_value AS file_name,
    ve.page_path,
    COUNT(*) AS download_count,
    COUNT(DISTINCT ve.session_id) AS unique_sessions,
    COUNT(DISTINCT vs.visitor_id) AS unique_users,
    DATE_TRUNC('day', ve.timestamp) AS download_date
FROM visitor_events ve
JOIN visitor_sessions vs ON ve.session_id = vs.session_id
WHERE ve.event_type = 'download'
GROUP BY ve.event_type, ve.component_id, ve.event_value, ve.page_path, DATE_TRUNC('day', ve.timestamp)
ORDER BY download_date DESC, download_count DESC;

-- CV download stats specifically
SELECT 
    DATE_TRUNC('day', ve.timestamp) AS day,
    COUNT(*) AS cv_downloads,
    COUNT(DISTINCT ve.session_id) AS unique_sessions,
    COUNT(DISTINCT vs.visitor_id) AS unique_users
FROM visitor_events ve
JOIN visitor_sessions vs ON ve.session_id = vs.session_id
WHERE ve.event_type = 'download' AND ve.component_id = 'download-cv'
GROUP BY DATE_TRUNC('day', ve.timestamp)
ORDER BY day DESC;

-- Certificate download stats
SELECT 
    DATE_TRUNC('day', ve.timestamp) AS day,
    COUNT(*) AS certificate_downloads,
    COUNT(DISTINCT ve.session_id) AS unique_sessions,
    COUNT(DISTINCT vs.visitor_id) AS unique_users
FROM visitor_events ve
JOIN visitor_sessions vs ON ve.session_id = vs.session_id
WHERE ve.event_type = 'download' AND ve.component_id = 'download-certificate'
GROUP BY DATE_TRUNC('day', ve.timestamp)
ORDER BY day DESC;

-- Download conversion rate by page
WITH page_visitors AS (
    SELECT 
        page_path, 
        COUNT(DISTINCT session_id) AS visitor_count
    FROM visitor_events
    WHERE event_type = 'pageview'
    GROUP BY page_path
),
page_downloads AS (
    SELECT 
        page_path, 
        COUNT(DISTINCT session_id) AS download_count
    FROM visitor_events
    WHERE event_type = 'download'
    GROUP BY page_path
)
SELECT 
    pv.page_path,
    pv.visitor_count,
    COALESCE(pd.download_count, 0) AS download_count,
    CASE 
        WHEN pv.visitor_count > 0 THEN ROUND((COALESCE(pd.download_count, 0)::numeric / pv.visitor_count) * 100, 2)
        ELSE 0
    END AS conversion_rate
FROM page_visitors pv
LEFT JOIN page_downloads pd ON pv.page_path = pd.page_path
ORDER BY conversion_rate DESC, visitor_count DESC;

-- Track downloads by device type
SELECT 
    vs.device_type,
    vs.is_mobile,
    COUNT(*) AS download_count,
    COUNT(DISTINCT ve.session_id) AS unique_sessions
FROM visitor_events ve
JOIN visitor_sessions vs ON ve.session_id = vs.session_id
WHERE ve.event_type = 'download'
GROUP BY vs.device_type, vs.is_mobile
ORDER BY download_count DESC;

-- Download trends over time (weekly)
SELECT 
    DATE_TRUNC('week', ve.timestamp) AS week,
    COUNT(CASE WHEN ve.component_id = 'download-cv' THEN 1 ELSE NULL END) AS cv_downloads,
    COUNT(CASE WHEN ve.component_id = 'download-certificate' THEN 1 ELSE NULL END) AS certificate_downloads,
    COUNT(CASE WHEN ve.component_id NOT IN ('download-cv', 'download-certificate') THEN 1 ELSE NULL END) AS other_downloads
FROM visitor_events ve
WHERE ve.event_type = 'download'
GROUP BY DATE_TRUNC('week', ve.timestamp)
ORDER BY week;