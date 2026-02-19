-- Database schema for MEU DDD
-- This schema handles states, cities, and their detailed information for SEO and performance.

-- Create table for states
CREATE TABLE IF NOT EXISTS states (
    id TEXT PRIMARY KEY, -- e.g., 'ac', 'al'
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    abbreviation TEXT NOT NULL,
    region TEXT NOT NULL,
    capital TEXT NOT NULL,
    population BIGINT,
    ddd_codes TEXT[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for cities
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id TEXT REFERENCES states(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    ddd TEXT NOT NULL,
    population BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(state_id, slug)
);

-- Create table for detailed state info (SEO)
CREATE TABLE IF NOT EXISTS state_details (
    state_id TEXT PRIMARY KEY REFERENCES states(id) ON DELETE CASCADE,
    area TEXT,
    municipalities INTEGER,
    urban_coverage TEXT,
    main_operators JSONB, -- Array of {name, coverage, services}
    region_info JSONB, -- {description, characteristics}
    highlights TEXT[],
    telephony_tips TEXT[],
    faqs JSONB, -- Array of {question, answer}
    related_states JSONB, -- Array of {name, abbreviation, ddds}
    authority_links JSONB, -- Array of {name, url, description}
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for detailed city info (SEO)
CREATE TABLE IF NOT EXISTS city_details (
    city_id UUID PRIMARY KEY REFERENCES cities(id) ON DELETE CASCADE,
    area TEXT,
    population_growth TEXT,
    density TEXT,
    city_type TEXT,
    classification TEXT,
    coordinates JSONB, -- {lat, lng}
    social_indicators JSONB, -- {idh, idhLevel, literacy, averageIncome, ownHomes}
    operators JSONB, -- Array of {name, coverage, technology}
    emergency_services JSONB, -- Array of {name, description, phone, color}
    local_services JSONB, -- Array of {name, description, icon}
    tourism JSONB, -- {description, attractions, events}
    about JSONB, -- {introduction, history, geography, economy, culture, infrastructure}
    faqs JSONB, -- Array of {question, answer}
    external_links JSONB, -- Array of {name, url, description}
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cities_state_id ON cities(state_id);
CREATE INDEX IF NOT EXISTS idx_cities_ddd ON cities(ddd);
CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
