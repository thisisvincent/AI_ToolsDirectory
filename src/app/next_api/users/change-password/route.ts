
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';

// POST request - change user password
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.userId || !body.newPassword) {
    return createErrorResponse({
      errorMessage: "User ID and new password are required",
      status: 400,
    });
  }
  
  if (body.newPassword.length < 6) {
    return createErrorResponse({
      errorMessage: "Password must be at least 6 characters long",
      status: 400,
    });
  }
  
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Check if user exists
  const user = await usersCrud.findById(body.userId);
  if (!user) {
    return createErrorResponse({
      errorMessage: "User not found",
      status: 404,
    });
  }
  
  // Update user password (stored in plain text to match existing auth system)
  const data = await usersCrud.update(body.userId, {
    password: body.newPassword,
  });
  
  return createSuccessResponse(data);
});
