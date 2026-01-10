-- Criar tabela de estados
CREATE TABLE IF NOT EXISTS states (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL,
  region TEXT NOT NULL,
  capital TEXT NOT NULL,
  population BIGINT NOT NULL,
  ddd_codes TEXT[] NOT NULL,
  area TEXT,
  municipalities INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de cidades
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  state_id TEXT NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  ddd TEXT NOT NULL,
  population INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);
CREATE INDEX IF NOT EXISTS idx_states_region ON states(region);
CREATE INDEX IF NOT EXISTS idx_cities_state_id ON cities(state_id);
CREATE INDEX IF NOT EXISTS idx_cities_ddd ON cities(ddd);
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name);

-- Habilitar RLS (Row Level Security) - acesso público para leitura
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública para states
CREATE POLICY "Allow public read access to states"
  ON states FOR SELECT
  USING (true);

-- Política de leitura pública para cities
CREATE POLICY "Allow public read access to cities"
  ON cities FOR SELECT
  USING (true);

-- Comentários para documentação
COMMENT ON TABLE states IS 'Tabela de estados brasileiros com informações de DDD';
COMMENT ON TABLE cities IS 'Tabela de cidades brasileiras com códigos DDD';
COMMENT ON COLUMN states.ddd_codes IS 'Array de códigos DDD do estado';
COMMENT ON COLUMN cities.ddd IS 'Código DDD da cidade';