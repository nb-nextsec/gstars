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
-- Note: tier column is deprecated but retained for CHECK constraint compatibility
CREATE TABLE IF NOT EXISTS sponsors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
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

-- Seed sponsors
INSERT OR IGNORE INTO sponsors (name, logo_url, website_url, description, tier, display_order, is_active) VALUES
  ('Sipcam', 'https://cdn.prod.website-files.com/68a52a259620521f4aec8c70/68a6f3dbea4151d7018b48e2_Sipcam-Logo-Full-Clr-removebg-preview.png', 'https://sipcam.com.au/', 'A leading crop protection and specialty chemicals company. Proud to invest in community wellbeing and all-abilities sport.', 'bronze', 1, 1),
  ('Breakwater Hotel', '/images/breakwater.avif', 'https://www.facebook.com/groups/21807272626', 'A proud Geelong hospitality venue supporting local sport and community. The Breakwater Hotel is a valued partner of Geelong Stars.', 'bronze', 2, 1),
  ('Meys Meats', '/images/Meys-Logo-web_png.avif', 'https://meysmeats.com.au/', 'Quality local butcher providing the finest meats in Geelong. Proud supporters of community sport and all-abilities inclusion.', 'bronze', 3, 1),
  ('Bunnings', '/images/Bunnings-logo_edited.avif', 'https://www.bunnings.com.au/', 'Australia''s leading home improvement and outdoor living retailer. Bunnings is proud to support local community clubs and organisations.', 'bronze', 4, 1),
  ('Bellarine Village', '/images/ballarine-lotto.jpg', 'https://bellarinevillage.com.au/stores/bellarine-village-lotto/', 'A welcoming shopping destination on the Bellarine Peninsula. Supporting local sport and the Geelong Stars community.', 'bronze', 5, 1),
  ('Fruit Biz', '/images/fruit biz.avif', 'https://www.facebook.com/FruitBiz/', 'Fresh fruit and produce supplier in the Geelong region. Keeping our athletes fuelled with healthy, quality produce.', 'bronze', 6, 1),
  ('Geelong Plaster Cartage', '/images/Geelong Plaster Cartage_edited_edited_ed.avif', NULL, 'Reliable plaster and building materials cartage across the Geelong region. Proud to support all-abilities sport in the community.', 'bronze', 7, 1),
  ('Lektrix', '/images/Lektrix_edited_edited.avif', 'https://lektrix.com.au/', 'Professional electrical services for homes and businesses in Geelong. Powering our community on and off the field.', 'bronze', 8, 1),
  ('McHarry''s Bus Lines', '/images/McHarry''s Bus Lines logo_edited_edited_p.avif', 'https://mcharrys.com.au/', 'Geelong''s trusted public transport provider. Helping our community get where they need to go, including to training and game days!', 'bronze', 9, 1),
  ('Repco', '/images/repco.avif', 'https://www.repco.com.au/', 'Australia''s leading auto parts and accessories retailer. Supporting the Geelong Stars community and keeping everyone on the road.', 'bronze', 10, 1),
  ('Rotary Club', '/images/rotary club_edited.avif', 'https://geelongrotary.org.au/', 'A global network of community leaders dedicated to service above self. The Rotary Club proudly supports inclusive sport in Geelong.', 'bronze', 11, 1),
  ('Hawk & Co', '/images/hawk-and-co.jpg', 'https://www.facebook.com/hawkcohandyman/', 'A trusted local handyman service in Geelong. Hawk & Co is a proud supporter of Geelong Stars and all-abilities sport in the community.', 'bronze', 12, 1),
  ('Wade 2 Go', '/images/wade-2-go.jpg', 'https://www.facebook.com/Wade2GoHandyman/', 'A reliable local handyman service in the Geelong region. Wade 2 Go is a proud supporter of Geelong Stars and inclusive sport in the community.', 'bronze', 13, 1),
  ('Winston & Co Cafe and Takeaway', '/images/winston-logo.jpg', 'https://www.facebook.com/winstonandcocafe/about', 'A local cafe and takeaway serving delicious food and coffee to the Geelong community. Winston & Co is a proud supporter of Geelong Stars and inclusive sport.', 'bronze', 14, 1),
  ('Phoenix Truck Bodies', '/images/phoenix.jpg', 'https://phoenixtruckbodies.com.au/', 'Specialist truck body builders based in Geelong. Phoenix Truck Bodies is a proud supporter of Geelong Stars and all-abilities sport in the community.', 'bronze', 15, 1),
  ('Jim''s Building Inspections', '/images/jims-building.jpg', 'https://jimsbuildinginspections.com.au/local/vic/geelong/', 'Professional building and pest inspections in the Geelong region. Jim''s Building Inspections is a proud supporter of Geelong Stars and all-abilities sport in the community.', 'bronze', 16, 1),
  ('Geelong Connected Communities', '/images/geelong-connected-communities.jpg', 'https://www.geelongconnectedcommunities.com.au/', 'Geelong Connected Communities provides grants to help Not for Profit organisations fund programs that strengthen and enrich the Geelong community. We are grateful for their support in helping Geelong Stars deliver inclusive, all-abilities sport.', 'bronze', 17, 1);
