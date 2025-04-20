-- Table for storing visitor information
CREATE TABLE visitor_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    visitor_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45), -- IPv6 can be up to 45 chars
    user_agent TEXT,
    referrer TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    screen_resolution VARCHAR(50),
    language VARCHAR(50),
    is_mobile BOOLEAN,
    is_bot BOOLEAN,
    first_visit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_visit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing page views and user events
CREATE TABLE visitor_events (
    event_id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'pageview', 'click', 'scroll', 'form_submit', etc.
    page_path VARCHAR(255),
    page_title VARCHAR(255),
    component_id VARCHAR(255), -- For tracking specific components
    event_value TEXT, -- Can store JSON or other data related to the event
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    duration_ms INTEGER, -- For tracking time spent on page
    FOREIGN KEY (session_id) REFERENCES visitor_sessions(session_id)
);

-- Indices for better performance
CREATE INDEX idx_visitor_events_session_id ON visitor_events(session_id);
CREATE INDEX idx_visitor_events_timestamp ON visitor_events(timestamp);
CREATE INDEX idx_visitor_events_event_type ON visitor_events(event_type);
CREATE INDEX idx_visitor_sessions_visitor_id ON visitor_sessions(visitor_id);
CREATE INDEX idx_visitor_sessions_country ON visitor_sessions(country);