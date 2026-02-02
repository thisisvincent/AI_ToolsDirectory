
-- Verification script to check admin user setup
-- Run this to verify the admin user is correctly configured

-- Check if admin user exists and has correct settings
SELECT 
  id,
  email,
  password,
  role,
  name,
  surname,
  access_status,
  approved_at,
  created_at
FROM users 
WHERE email = 'admin@adeptaitools';

-- Expected results for successful login:
-- 1. email should be: admin@adeptaitools
-- 2. password should be: Pamusha@34
-- 3. role should be: app20260201200132errnxcxiac_v1_admin_user
-- 4. access_status should be: approved
-- 5. approved_at should have a timestamp

-- If the query returns no rows, run setup-admin-user.sql first
-- If access_status is 'pending' or 'rejected', update it:
-- UPDATE users SET access_status = 'approved', approved_at = NOW() WHERE email = 'admin@adeptaitools';
