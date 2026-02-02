
# Admin Login Issue - Fix Instructions

## Problem
Login fails with error: "The email address and password combination are invalid" when trying to log in with:
- **Email**: admin@adeptaitools
- **Password**: Pamusha@34

## Root Cause
The admin user in the database either:
1. Doesn't exist
2. Has incorrect password
3. Has `access_status` set to 'pending' or 'rejected' instead of 'approved'

## Solution

### Step 1: Verify Current State
Run this SQL query to check if the admin user exists:

```sql
SELECT id, email, password, role, access_status 
FROM users 
WHERE email = 'admin@adeptaitools';
```

### Step 2: Fix the Issue

**Option A: If admin user doesn't exist**
Run the setup script:
```bash
psql -d your_database_name -f src/scripts/setup-admin-user.sql
```

**Option B: If admin user exists but has wrong settings**
Run the fix script:
```bash
psql -d your_database_name -f src/scripts/fix-admin-access.sql
```

**Option C: Manual SQL fix**
Execute this SQL directly in your database:
```sql
-- Delete existing admin user (if any)
DELETE FROM users WHERE email = 'admin@adeptaitools';

-- Create new admin user with correct settings
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
```

### Step 3: Verify the Fix
Run the verification script:
```bash
psql -d your_database_name -f src/scripts/verify-admin-login.sql
```

Expected output should show:
- email: `admin@adeptaitools`
- password: `Pamusha@34`
- role: `app20260201200132errnxcxiac_v1_admin_user`
- access_status: `approved`
- approved_at: (should have a timestamp)

### Step 4: Test Login
1. Go to the login page: `http://localhost:3000/login`
2. Enter credentials:
   - Email: `admin@adeptaitools`
   - Password: `Pamusha@34`
3. Click "Sign In"

The login should now work successfully!

## Important Notes

1. **Password Storage**: The current system stores passwords in plain text. This is for development purposes only. In production, passwords should be hashed using bcrypt or similar.

2. **Access Status**: The login system checks that `access_status = 'approved'`. Any other status ('pending', 'rejected') will prevent login.

3. **Role**: The admin role must be exactly `app20260201200132errnxcxiac_v1_admin_user` to have admin privileges.

## Troubleshooting

### Still getting "Invalid email or password"?
- Verify the password in the database matches exactly: `Pamusha@34` (case-sensitive)
- Check for extra spaces in the email or password fields
- Ensure the database connection is working properly

### Getting "Access pending approval" message?
- Run the fix script to set `access_status = 'approved'`
- Or manually update: `UPDATE users SET access_status = 'approved', approved_at = NOW() WHERE email = 'admin@adeptaitools';`

### User not found in database?
- Run the setup script to create the admin user
- Check you're connected to the correct database schema

## Database Connection
Make sure your `.env.local` file has the correct database connection settings:
```
POSTGREST_URL=your_postgrest_url
POSTGREST_SCHEMA=app20260201200132errnxcxiac_v1
POSTGREST_API_KEY=your_api_key
```

## Quick Fix via API Endpoint

You can also use the built-in API endpoint to reset/create the admin user:

1. Navigate to: `http://localhost:3000/admin/reset-password`
2. Click the "Reset/Create Admin User" button
3. The system will automatically:
   - Create the admin user if it doesn't exist
   - Reset the password if the user already exists
   - Set the access status to "approved"
   - Assign admin role permissions
4. Use the displayed credentials to log in

This is the easiest method and doesn't require direct database access!
