
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';

// POST request - login user
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.email || !body.password) {
    return createErrorResponse({
      errorMessage: "Email and password are required",
      status: 400,
    });
  }
  
  // Use admin token to query users table
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Find user by email
  const users = await usersCrud.findMany({ email: body.email });
  
  if (!users || users.length === 0) {
    return createErrorResponse({
      errorMessage: "Invalid email or password",
      status: 401,
    });
  }
  
  const user = users[0];
  
  // Check password (plain text comparison to match existing system)
  if (user.password !== body.password) {
    return createErrorResponse({
      errorMessage: "Invalid email or password",
      status: 401,
    });
  }
  
  // Check if user access is approved
  if (user.access_status !== 'approved') {
    if (user.access_status === 'pending') {
      return createErrorResponse({
        errorMessage: "Your access request is pending admin approval. Please wait for approval before logging in.",
        status: 403,
      });
    } else if (user.access_status === 'rejected') {
      return createErrorResponse({
        errorMessage: "Your access request has been rejected. Please contact the administrator.",
        status: 403,
      });
    }
  }
  
  // Return user data (excluding password)
  const { password, ...userWithoutPassword } = user;
  
  return createSuccessResponse({
    success: true,
    user: userWithoutPassword,
  });
});
