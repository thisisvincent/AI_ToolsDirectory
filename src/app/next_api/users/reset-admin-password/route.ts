
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';

const ADMIN_EMAIL = 'admin@adeptaitools';
const NEW_ADMIN_PASSWORD = 'Pamusha@34';
const ADMIN_ROLE = 'app20260201200132errnxcxiac_v1_admin_user';

// POST request - reset or create admin user
export const POST = requestMiddleware(async (request) => {
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Find admin user by email
  const users = await usersCrud.findMany({ email: ADMIN_EMAIL });
  
  if (!users || users.length === 0) {
    // Admin user doesn't exist, create it
    const newAdmin = await usersCrud.create({
      email: ADMIN_EMAIL,
      password: NEW_ADMIN_PASSWORD,
      role: ADMIN_ROLE,
      name: 'Admin',
      surname: 'User',
      access_status: 'approved',
      approved_at: new Date().toISOString(),
    });
    
    return createSuccessResponse({
      message: 'Admin user created successfully',
      email: ADMIN_EMAIL,
      newPassword: NEW_ADMIN_PASSWORD,
      userId: newAdmin.id,
    });
  }
  
  const adminUser = users[0];
  
  // Update admin password and ensure access is approved
  await usersCrud.update(adminUser.id, {
    password: NEW_ADMIN_PASSWORD,
    access_status: 'approved',
    role: ADMIN_ROLE,
    approved_at: new Date().toISOString(),
  });
  
  return createSuccessResponse({
    message: 'Admin password reset successfully',
    email: ADMIN_EMAIL,
    newPassword: NEW_ADMIN_PASSWORD,
    userId: adminUser.id,
  });
});
