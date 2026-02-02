
-- Script to update existing admin user email from admin@aitools to admin@adeptaitools
-- Run this if you have an existing admin user with the old email

-- Update the admin user email
UPDATE users 
SET 
  email = 'admin@adeptaitools',
  password = 'Pamusha@34',
  role = 'app20260201200132errnxcxiac_v1_admin_user',
  access_status = 'approved',
  approved_at = NOW()
WHERE email = 'admin@aitools';

-- Verify the update
SELECT 
  id,
  email,
  password,
  role,
  access_status,
  approved_at
FROM users 
WHERE email = 'admin@adeptaitools';

-- Expected output:
-- The query should return one row with:
-- - email: admin@adeptaitools
-- - password: Pamusha@34
-- - role: app20260201200132errnxcxiac_v1_admin_user
-- - access_status: approved
-- - approved_at: (should have a timestamp)
