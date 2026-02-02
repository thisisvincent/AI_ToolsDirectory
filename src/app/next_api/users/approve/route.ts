
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';
import { NextRequest } from 'next/server';

// POST request - approve user access
export const POST = requestMiddleware(async (request: NextRequest) => {
  const body = await validateRequestBody(request);
  
  if (!body.userId) {
    return createErrorResponse({
      errorMessage: "User ID is required",
      status: 400,
    });
  }
  
  // Get admin user ID from headers
  const adminUserId = request.headers.get('X-User-Id');
  
  if (!adminUserId) {
    return createErrorResponse({
      errorMessage: "Admin authentication required",
      status: 401,
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
  
  // Update user access status
  const updateData = {
    access_status: 'approved',
    approved_by: parseInt(adminUserId),
    approved_at: new Date().toISOString(),
  };
  
  const data = await usersCrud.update(body.userId, updateData);
  return createSuccessResponse(data);
});
