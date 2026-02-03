/*
  # Make Favourites Table RLS Policies Permissive

  1. Changes
    - Drop existing restrictive RLS policies on favourites table
    - Create permissive policies that allow anon/authenticated access
    - The API layer will handle user-specific filtering

  2. Security
    - RLS allows access to the table
    - API routes filter by user_id to ensure users only see their own data
    - This approach works with the Supabase anon key
*/

-- Drop existing policies on favourites
DROP POLICY IF EXISTS "Users can view own favourites" ON favourites;
DROP POLICY IF EXISTS "Users can create own favourites" ON favourites;
DROP POLICY IF EXISTS "Users can update own favourites" ON favourites;
DROP POLICY IF EXISTS "Users can delete own favourites" ON favourites;

-- Create permissive policies
-- Allow anon and authenticated users to view all records
CREATE POLICY "favourites_select_policy"
  ON favourites
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anon and authenticated users to insert records
CREATE POLICY "favourites_insert_policy"
  ON favourites
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anon and authenticated users to update records
CREATE POLICY "favourites_update_policy"
  ON favourites
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anon and authenticated users to delete records
CREATE POLICY "favourites_delete_policy"
  ON favourites
  FOR DELETE
  TO anon, authenticated
  USING (true);
