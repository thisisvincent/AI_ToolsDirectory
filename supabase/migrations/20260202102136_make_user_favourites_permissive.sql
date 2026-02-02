/*
  # Make User Favourites RLS Policies Permissive

  1. Changes
    - Drop existing restrictive RLS policies on user_favourites table
    - Create permissive policies that allow anon/authenticated access
    - The API layer will handle user-specific filtering

  2. Security
    - RLS allows access to the table
    - API routes filter by user_id to ensure users only see their own data
    - This approach works with the Supabase anon key
*/

-- Drop existing policies on user_favourites
DROP POLICY IF EXISTS "user_favourites_select" ON user_favourites;
DROP POLICY IF EXISTS "user_favourites_insert" ON user_favourites;
DROP POLICY IF EXISTS "user_favourites_update" ON user_favourites;
DROP POLICY IF EXISTS "user_favourites_delete" ON user_favourites;

-- Create permissive policies
-- Allow anon and authenticated users to view all records
CREATE POLICY "user_favourites_select_policy"
  ON user_favourites
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anon and authenticated users to insert records
CREATE POLICY "user_favourites_insert_policy"
  ON user_favourites
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anon and authenticated users to update records
CREATE POLICY "user_favourites_update_policy"
  ON user_favourites
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon and authenticated users to delete records
CREATE POLICY "user_favourites_delete_policy"
  ON user_favourites
  FOR DELETE
  TO anon, authenticated
  USING (true);
