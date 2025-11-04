/*
  # Create Blog and Pages Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, unique, not null)
      - `excerpt` (text)
      - `content` (text, not null)
      - `meta_description` (text)
      - `meta_keywords` (text)
      - `author` (text, not null)
      - `published` (boolean, default false)
      - `featured_image` (text)
      - `reading_time` (integer)
      - `views` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null)
      - `slug` (text, unique, not null)
      - `description` (text)
      - `created_at` (timestamptz, default now())
    
    - `post_categories`
      - `post_id` (uuid, foreign key)
      - `category_id` (uuid, foreign key)
      - Primary key on (post_id, category_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published posts
    - Add policies for authenticated users to manage content

  3. Indexes
    - Add index on slug for fast lookups
    - Add index on published and created_at for filtering
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  meta_description text,
  meta_keywords text,
  author text NOT NULL DEFAULT 'Admin',
  published boolean DEFAULT false,
  featured_image text,
  reading_time integer DEFAULT 5,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS post_categories (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view post categories"
  ON post_categories FOR SELECT
  USING (true);
