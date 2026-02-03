/* 
  SIMPLE SUPABASE SETUP
  ---------------------
  This SQL code uses simple TEXT IDs (like 'volleyball') so you can easily 
  connect Events and Houses without looking up successful numbers.
*/

-- 1. CLEANUP (Delete old tables with CASCADE to handle dependencies)
DROP TABLE IF EXISTS event_results CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS houses CASCADE;
DROP TABLE IF EXISTS historical_rankings CASCADE;
DROP TABLE IF EXISTS meet_leaders CASCADE; -- External table causing errors
DROP TABLE IF EXISTS historical_results CASCADE; -- External table causing errors

-- 2. CREATE HOUSES TABLE
-- We use the house name as the ID because it's unique and easy to remember.
CREATE TABLE houses (
  id TEXT PRIMARY KEY,          -- e.g. 'Parasathu'
  name TEXT NOT NULL,           -- e.g. 'Parasathu'
  color_key TEXT NOT NULL,      -- e.g. 'bg-yellow-500' (matches your code)
  total_score INTEGER DEFAULT 0 -- Total points calculated
);

-- 3. CREATE EVENTS TABLE
-- We use a simple text ID like 'volleyball-boys' instead of random numbers.
CREATE TABLE events (
  id TEXT PRIMARY KEY,          -- e.g. 'volleyball-boys'
  name TEXT NOT NULL,           -- e.g. 'Volleyball (Boys)'
  date TEXT,                    -- e.g. '2026/01/26'
  venue TEXT,                   -- e.g. 'School Ground'
  status TEXT DEFAULT 'upcoming' -- 'upcoming', 'ongoing', 'completed'
);

-- 4. CREATE RESULTS TABLE
-- This links an Event to a House and gives them a score.
CREATE TABLE event_results (
  id SERIAL PRIMARY KEY,        -- Auto-generated number
  event_id TEXT REFERENCES events(id),  -- Links to 'volleyball-boys'
  house_id TEXT REFERENCES houses(id),  -- Links to 'Parasathu'
  score INTEGER DEFAULT 0,
  position INTEGER              -- 1, 2, 3, or 4
);

-- 5. ENABLE SECURITY (Required by Supabase)
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Houses" ON houses FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Results" ON event_results FOR SELECT USING (true);

-- 6. CREATE HISTORICAL DATA TABLE
CREATE TABLE historical_rankings (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  house_id TEXT REFERENCES houses(id),
  total_score INTEGER NOT NULL,
  rank INTEGER NOT NULL
);

ALTER TABLE historical_rankings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read History" ON historical_rankings FOR SELECT USING (true);

-- ==========================================
--        INSERT SAMPLE DATA
-- ==========================================

-- A. Insert Houses
INSERT INTO houses (id, name, color_key, total_score) VALUES
('Parasathu', 'Parasathu', 'Parasathu', 100),
('Madara',    'Madara',    'Madara',    80),
('Sewwandi',  'Sewwandi',  'Sewwandi',  45),
('Kethaki',   'Kethaki',   'Kethaki',   30)
ON CONFLICT (id) DO UPDATE SET total_score = EXCLUDED.total_score;

-- B. Insert Events (Using simple IDs you create!)
INSERT INTO events (id, name, date, venue, status) VALUES
('volleyball',   'Volleyball',   '2026/01/26', 'Volleyball Court', 'completed'),
('relay-100m',   '100m Relay',   '2026/01/27', 'Main Track',       'ongoing')
ON CONFLICT (id) DO NOTHING;

-- C. Insert Results (Now easy! logical Names match the IDs above)
INSERT INTO event_results (event_id, house_id, score, position) VALUES
-- Volleyball Results
('volleyball', 'Parasathu', 15, 1),
('volleyball', 'Madara',    10, 2),
('volleyball', 'Kethaki',   5,  3),
('volleyball', 'Sewwandi',  0,  4),

-- Relay Results
('relay-100m', 'Sewwandi',  20, 1),
('relay-100m', 'Kethaki',   15, 2),
('relay-100m', 'Parasathu', 10, 3),
('relay-100m', 'Madara',    5,  4)
ON CONFLICT DO NOTHING;

-- D. Insert Historical Data
INSERT INTO historical_rankings (year, house_id, total_score, rank) VALUES
(2025, 'Madara',    450, 1),
(2025, 'Parasathu', 420, 2),
(2025, 'Sewwandi',  380, 3),
(2025, 'Kethaki',   350, 4),
(2024, 'Parasathu', 480, 1),
(2024, 'Madara',    440, 2),
(2024, 'Kethaki',   400, 3),
(2024, 'Sewwandi',  360, 4);
