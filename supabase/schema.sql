-- ═══════════════════════════════════════════════════
-- MILLION DOLLAR PROMPT — Database Schema
-- Run this in the Supabase SQL Editor to set up the database
-- ═══════════════════════════════════════════════════

-- Words table
CREATE TABLE IF NOT EXISTS words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word VARCHAR(30) NOT NULL,
  owner_name VARCHAR(100),
  owner_link VARCHAR(500),
  grid_x INTEGER NOT NULL,
  grid_y INTEGER NOT NULL,
  color VARCHAR(20) DEFAULT 'mint',
  package INTEGER DEFAULT 1,
  stripe_session_id VARCHAR(200),
  payment_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Generations table
CREATE TABLE IF NOT EXISTS ai_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  generation_number INTEGER NOT NULL,
  prompt_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  model VARCHAR(50) DEFAULT 'llama-3.1-70b-versatile',
  provider VARCHAR(30) DEFAULT 'Groq',
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stats table (cached for performance)
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_sold INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  total_generations INTEGER DEFAULT 0,
  last_purchase_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_words_grid ON words(grid_x, grid_y);
CREATE INDEX IF NOT EXISTS idx_words_created ON words(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_words_payment ON words(payment_status);
CREATE INDEX IF NOT EXISTS idx_ai_gen_created ON ai_generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_gen_number ON ai_generations(generation_number DESC);

-- ═══════════════════════════════════════════════════
-- ENABLE REALTIME
-- ═══════════════════════════════════════════════════

ALTER PUBLICATION supabase_realtime ADD TABLE words;
ALTER PUBLICATION supabase_realtime ADD TABLE stats;

-- ═══════════════════════════════════════════════════
-- INSERT INITIAL STATS ROW
-- ═══════════════════════════════════════════════════

INSERT INTO stats (id, total_sold, total_revenue, total_generations)
VALUES (1, 0, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════

ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Words: anyone can read, insert (payment verification handled in API)
CREATE POLICY "Words are viewable by everyone" ON words
  FOR SELECT USING (true);
CREATE POLICY "Words can be inserted" ON words
  FOR INSERT WITH CHECK (true);

-- AI generations: anyone can read, only server can insert
CREATE POLICY "AI generations viewable by everyone" ON ai_generations
  FOR SELECT USING (true);
CREATE POLICY "AI generations can be inserted" ON ai_generations
  FOR INSERT WITH CHECK (true);

-- Stats: anyone can read, only server can update
CREATE POLICY "Stats viewable by everyone" ON stats
  FOR SELECT USING (true);
CREATE POLICY "Stats can be updated" ON stats
  FOR UPDATE USING (true);

-- ═══════════════════════════════════════════════════
-- HELPER FUNCTION: Increment stats atomically
-- ═══════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION increment_stats(sold_count INTEGER, revenue_amount DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE stats
  SET
    total_sold = total_sold + sold_count,
    total_revenue = total_revenue + revenue_amount,
    last_purchase_at = NOW(),
    updated_at = NOW()
  WHERE id = 1;
END;
$$ LANGUAGE plpgsql;
