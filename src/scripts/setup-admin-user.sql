
-- Setup admin user with correct credentials
-- This script ensures the admin user exists with the correct password and access status
-- Run this script in your PostgreSQL database to fix the login issue

-- First, delete any existing admin user to avoid conflicts
DELETE FROM users WHERE email = 'admin@adeptaitools';

-- Insert the admin user with correct credentials
INSERT INTO users (
  email,
  password,
  role,
  name,
  surname,
  access_status,
  approved_at,
  created_at,
  updated_at
) VALUES (
  'admin@adeptaitools',
  'Pamusha@34',
  'app20260201200132errnxcxiac_v1_admin_user',
  'Admin',
  'User',
  'approved',
  NOW(),
  NOW(),
  NOW()
);

-- Verify the admin user was created successfully
SELECT 
  id, 
  email, 
  role, 
  access_status, 
  name,
  surname,
  created_at 
FROM users 
WHERE email = 'admin@adeptaitools';

-- Expected output:
-- The query should return one row with:
-- - email: admin@adeptaitools
-- - role: app20260201200132errnxcxiac_v1_admin_user
-- - access_status: approved
-- - name: Admin
-- - surname: User
