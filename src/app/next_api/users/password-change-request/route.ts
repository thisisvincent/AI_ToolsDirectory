
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';

// POST request - create password change request
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.userId) {
    return createErrorResponse({
      errorMessage: "User ID is required",
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
  
  // Create password change request
  const requestsCrud = new CrudOperations("password_change_requests", adminToken);
  const requestData = {
    user_id: body.userId,
    request_reason: body.requestReason || null,
    status: 'pending',
  };
  
  const data = await requestsCrud.create(requestData);
  
  return createSuccessResponse(data, 201);
});

// GET request - fetch password change requests
export const GET = requestMiddleware(async (request) => {
  const adminToken = await generateAdminToken();
  const requestsCrud = new CrudOperations("password_change_requests", adminToken);
  
  const data = await requestsCrud.findMany({}, {
    orderBy: {
      column: 'requested_at',
      direction: 'desc'
    }
  });
  
  return createSuccessResponse(data);
});
