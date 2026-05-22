-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Designs table
CREATE TABLE IF NOT EXISTS designs (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  country     TEXT NOT NULL,
  style       TEXT NOT NULL,
  occasion    TEXT NOT NULL DEFAULT 'General',
  difficulty  TEXT NOT NULL DEFAULT 'Medium' CHECK (difficulty IN ('Easy','Medium','Hard','Expert')),
  image_url   TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL DEFAULT '',
  tags        TEXT[] NOT NULL DEFAULT '{}',
  pixabay_id  BIGINT UNIQUE,
  views       INT NOT NULL DEFAULT 0,
  likes       INT NOT NULL DEFAULT 0,
  photographer TEXT,
  source      TEXT NOT NULL DEFAULT 'pixabay',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,
  slug         TEXT NOT NULL UNIQUE,
  description  TEXT NOT NULL DEFAULT '',
  flag         TEXT NOT NULL DEFAULT '',
  design_count INT NOT NULL DEFAULT 0,
  hero_image   TEXT NOT NULL DEFAULT '',
  traditions   TEXT NOT NULL DEFAULT '',
  famous_for   TEXT NOT NULL DEFAULT '',
  styles       TEXT[] NOT NULL DEFAULT '{}'
);

-- Indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_designs_country    ON designs(country);
CREATE INDEX IF NOT EXISTS idx_designs_style      ON designs(style);
CREATE INDEX IF NOT EXISTS idx_designs_difficulty ON designs(difficulty);
CREATE INDEX IF NOT EXISTS idx_designs_occasion   ON designs(occasion);
CREATE INDEX IF NOT EXISTS idx_designs_tags       ON designs USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_designs_pixabay    ON designs(pixabay_id);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_designs_fts ON designs
  USING GIN(to_tsvector('english', title || ' ' || description || ' ' || country || ' ' || style));

-- Function to keep category design_count in sync
CREATE OR REPLACE FUNCTION update_category_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE categories SET design_count = (
    SELECT COUNT(*) FROM designs WHERE country = NEW.country
  ) WHERE name = NEW.country;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_design_count
AFTER INSERT OR DELETE ON designs
FOR EACH ROW EXECUTE FUNCTION update_category_count();

-- Row-level security (allow public read)
ALTER TABLE designs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public designs read" ON designs    FOR SELECT USING (true);
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
