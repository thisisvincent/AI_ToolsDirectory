
-- Quick fix script if admin user exists but has wrong access_status
-- Run this if the admin user exists but you're getting access denied errors

-- Update admin user to have approved access status
UPDATE users 
SET 
  access_status = 'approved',
  approved_at = NOW(),
  role = 'app20260201200132errnxcxiac_v1_admin_user',
  password = 'Pamusha@34'
WHERE email = 'admin@adeptaitools';

-- Verify the update
SELECT 
  id,
  email,
  role,
  access_status,
  approved_at
FROM users 
WHERE email = 'admin@adeptaitools';
