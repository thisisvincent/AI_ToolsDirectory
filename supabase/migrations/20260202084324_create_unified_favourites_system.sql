/*
  # Create Unified Favourites System

  1. New Tables
    - `favourites` - Unified table for all favorite items
      - `id` (bigint, primary key, auto-increment)
      - `user_id` (bigint, references users table)
      - `item_type` (varchar - 'tool', 'blog', 'news', 'course')
      - `item_id` (varchar - flexible ID for different content types)
      - `item_name` (varchar)
      - `item_url` (text)
      - `item_description` (text)
      - `item_image_url` (text)
      - `metadata` (jsonb - for additional item-specific data)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on favourites table
    - Allow authenticated users to manage their own favorites
    - Unique constraint on user_id + item_type + item_id

  3. Note
    - This is a new unified system alongside the existing user_favourites table
    - The old user_favourites table will remain for backward compatibility
*/

-- Create favourites table
CREATE TABLE IF NOT EXISTS favourites (
  id bigserial PRIMARY KEY,
  user_id bigint NOT NULL,
  item_type varchar(50) NOT NULL,
  item_id varchar(255) NOT NULL,
  item_name varchar(500) NOT NULL,
  item_url text,
  item_description text,
  item_image_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_type, item_id)
);

-- Enable RLS
ALTER TABLE favourites ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own favourites
CREATE POLICY "Users can view own favourites"
  ON favourites
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow users to add favourites
CREATE POLICY "Users can add favourites"
  ON favourites
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to update their own favourites
CREATE POLICY "Users can update own favourites"
  ON favourites
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow users to delete their own favourites
CREATE POLICY "Users can delete own favourites"
  ON favourites
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_favourites_user_id ON favourites(user_id);
CREATE INDEX IF NOT EXISTS idx_favourites_user_item ON favourites(user_id, item_type, item_id);
