/*
  # Fix Favourites Table RLS Policies

  1. Changes
    - Drop existing overly permissive RLS policies on favourites table
    - Create proper restrictive policies that check user authentication
    - Ensure users can only access their own favourites

  2. Security
    - Users can only view, create, update, and delete their own favourites
    - Anonymous users have no access to favourites
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own favourites" ON favourites;
DROP POLICY IF EXISTS "Users can add favourites" ON favourites;
DROP POLICY IF EXISTS "Users can update own favourites" ON favourites;
DROP POLICY IF EXISTS "Users can delete own favourites" ON favourites;

-- Create new secure policies
-- Users can view their own favourites
CREATE POLICY "Users can view own favourites"
  ON favourites
  FOR SELECT
  TO authenticated
  USING (user_id = COALESCE(uid(), -1));

-- Users can create their own favourites
CREATE POLICY "Users can create own favourites"
  ON favourites
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = COALESCE(uid(), -1));

-- Users can update their own favourites
CREATE POLICY "Users can update own favourites"
  ON favourites
  FOR UPDATE
  TO authenticated
  USING (user_id = COALESCE(uid(), -1))
  WITH CHECK (user_id = COALESCE(uid(), -1));

-- Users can delete their own favourites
CREATE POLICY "Users can delete own favourites"
  ON favourites
  FOR DELETE
  TO authenticated
  USING (user_id = COALESCE(uid(), -1));
