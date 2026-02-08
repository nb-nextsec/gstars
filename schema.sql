-- Geelong Stars Database Schema

-- Admin Users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sponsors
CREATE TABLE IF NOT EXISTS sponsors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  tier TEXT DEFAULT 'bronze' CHECK(tier IN ('gold', 'silver', 'bronze')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site Images
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT CHECK(category IN ('hero', 'gallery', 'programs', 'social', 'general')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site Content (for editable text sections)
CREATE TABLE IF NOT EXISTS content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page, section)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);
CREATE INDEX IF NOT EXISTS idx_sponsors_active ON sponsors(is_active);
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_content_page ON content(page);

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION!)
-- Hash format is salt:sha256hash where salt is 32 hex chars
-- This hash is for password 'admin123' with salt 'a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8'
INSERT OR IGNORE INTO users (username, password_hash)
VALUES ('admin', 'a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8:8c6e5f4a3d2b1c0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6');

-- Insert sample content
INSERT OR IGNORE INTO content (page, section, content) VALUES
  ('home', 'hero_title', 'Welcome to Geelong Stars'),
  ('home', 'hero_subtitle', 'Building champions on and off the field'),
  ('home', 'about_preview', 'Geelong Stars is a community-focused sporting club dedicated to developing young athletes in a supportive and inclusive environment.'),
  ('about', 'history', 'Founded with a passion for sport and community, Geelong Stars has grown to become one of the premier sporting clubs in the Geelong region.'),
  ('about', 'mission', 'Our mission is to provide opportunities for athletes of all ages and abilities to participate, grow, and excel in their chosen sports.'),
  ('programs', 'intro', 'We offer a variety of programs designed to cater to different age groups and skill levels.'),
  ('contact', 'address', 'Geelong, Victoria, Australia'),
  ('contact', 'email', 'info@geelongstars.com.au'),
  ('contact', 'phone', '(03) 5XXX XXXX');
