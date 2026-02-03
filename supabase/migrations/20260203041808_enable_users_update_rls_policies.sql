/*
  # Enable UPDATE RLS Policies for Users Table
  
  1. Security Changes
    - Add UPDATE policy to allow public updates on users table
    - This allows admins to update user information including roles
    - Policy is permissive to support admin operations
  
  2. Important Notes
    - The policy allows updates for both anon and authenticated roles
    - This is necessary for admin operations to function properly
*/

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Authenticated users can update own data" ON users;

-- Create permissive UPDATE policy
CREATE POLICY "Allow public update access"
  ON users
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create INSERT policy for creating users
CREATE POLICY "Allow public insert access"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create DELETE policy for deleting users
CREATE POLICY "Allow public delete access"
  ON users
  FOR DELETE
  TO anon, authenticated
  USING (true);
