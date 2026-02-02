/*
  # Fix User Favourites Table RLS Policies V2

  1. Changes
    - Drop existing RLS policies on user_favourites table
    - Create proper restrictive policies that check user authentication
    - Ensure users can only access their own favourites
    - Use COALESCE to handle NULL uid() values

  2. Security
    - Users can only view, create, update, and delete their own favourites
    - Anonymous users have no access to favourites
*/

-- Drop all existing policies on user_favourites
DROP POLICY IF EXISTS "Users can view own favourites" ON user_favourites;
DROP POLICY IF EXISTS "Users can add favourites" ON user_favourites;
DROP POLICY IF EXISTS "Users can update own favourites" ON user_favourites;
DROP POLICY IF EXISTS "Users can delete own favourites" ON user_favourites;

-- Create new secure policies
-- Users can view their own favourites
CREATE POLICY "user_favourites_select"
  ON user_favourites
  FOR SELECT
  TO authenticated
  USING (user_id = COALESCE(uid(), -1));

-- Users can create their own favourites
CREATE POLICY "user_favourites_insert"
  ON user_favourites
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = COALESCE(uid(), -1));

-- Users can update their own favourites
CREATE POLICY "user_favourites_update"
  ON user_favourites
  FOR UPDATE
  TO authenticated
  USING (user_id = COALESCE(uid(), -1))
  WITH CHECK (user_id = COALESCE(uid(), -1));

-- Users can delete their own favourites
CREATE POLICY "user_favourites_delete"
  ON user_favourites
  FOR DELETE
  TO authenticated
  USING (user_id = COALESCE(uid(), -1));
