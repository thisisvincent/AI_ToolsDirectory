
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { generateAdminToken } from '@/lib/auth';

// GET request - fetch all users
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, search } = parseQueryParams(request);
  
  // Use admin token to bypass RLS
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Build filter conditions
  const filters: Record<string, any> = {};
  if (search) {
    // Note: PostgREST doesn't support complex search, handle at app layer
    filters.email = search;
  }
  
  const data = await usersCrud.findMany(filters, { 
    limit, 
    offset,
    orderBy: {
      column: 'created_at',
      direction: 'desc'
    }
  });
  
  return createSuccessResponse(data);
});

// POST request - create new user
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.email || !body.password) {
    return createErrorResponse({
      errorMessage: "Email and password are required",
      status: 400,
    });
  }
  
  if (body.password.length < 6) {
    return createErrorResponse({
      errorMessage: "Password must be at least 6 characters long",
      status: 400,
    });
  }
  
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Check if user already exists
  const existingUsers = await usersCrud.findMany({ email: body.email });
  if (existingUsers && existingUsers.length > 0) {
    return createErrorResponse({
      errorMessage: "User with this email already exists",
      status: 400,
    });
  }
  
  const userData = {
    email: body.email,
    password: body.password, // Store password in plain text to match existing auth system
    name: body.name || null,
    surname: body.surname || null,
    role: body.role || 'app20251014225423lezgriizlf_v1_user',
    access_status: body.access_status || 'pending',
  };
  
  const data = await usersCrud.create(userData);
  return createSuccessResponse(data, 201);
});

// PUT request - update user
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "User ID is required",
      status: 400,
    });
  }
  
  const body = await validateRequestBody(request);
  
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Check if user exists
  const existing = await usersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "User not found",
      status: 404,
    });
  }
  
  const updateData: Record<string, any> = {};
  
  if (body.email) updateData.email = body.email;
  if (body.name !== undefined) updateData.name = body.name;
  if (body.surname !== undefined) updateData.surname = body.surname;
  if (body.role) updateData.role = body.role;
  if (body.access_status) updateData.access_status = body.access_status;
  
  // Store password in plain text to match existing auth system
  if (body.password) {
    if (body.password.length < 6) {
      return createErrorResponse({
        errorMessage: "Password must be at least 6 characters long",
        status: 400,
      });
    }
    updateData.password = body.password;
  }
  
  const data = await usersCrud.update(id, updateData);
  return createSuccessResponse(data);
});

// DELETE request - delete user
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "User ID is required",
      status: 400,
    });
  }
  
  const adminToken = await generateAdminToken();
  const usersCrud = new CrudOperations("users", adminToken);
  
  // Check if user exists
  const existing = await usersCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "User not found",
      status: 404,
    });
  }
  
  const data = await usersCrud.delete(id);
  return createSuccessResponse(data);
});
