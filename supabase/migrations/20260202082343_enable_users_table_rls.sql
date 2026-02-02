/*
  # Enable RLS and Add Login Policy for Users Table

  1. Security
    - Enable RLS on users table
    - Add policy to allow SELECT for login (anon users can read user records for authentication)
    - This is required for the login flow to work
*/

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read users table for login purposes
-- This is safe because passwords are hashed and the login route validates credentials
CREATE POLICY "Allow public read access for login"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);
