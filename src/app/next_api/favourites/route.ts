
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";
import { NextRequest } from 'next/server';

// Helper to get user ID from request headers
function getUserIdFromRequest(request: NextRequest): string | null {
  return request.headers.get('X-User-Id');
}

// GET request - fetch user's favourites
export const GET = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  // Use anon key - RLS policies will handle authorization
  const anonKey = process.env.POSTGREST_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const favouritesCrud = new CrudOperations("user_favourites", anonKey);
  
  const data = await favouritesCrud.findMany(
    { user_id: parseInt(userId) },
    { 
      orderBy: { column: 'created_at', direction: 'desc' }
    }
  );
  
  return createSuccessResponse(data);
});

// POST request - add to favourites
export const POST = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);
  
  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  const body = await validateRequestBody(request);
  
  if (!body.tool_name || !body.tool_category || !body.tool_description || !body.tool_url) {
    return createErrorResponse({
      errorMessage: "Missing required fields",
      status: 400,
    });
  }

  // Use anon key - RLS policies will handle authorization
  const anonKey = process.env.POSTGREST_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const favouritesCrud = new CrudOperations("user_favourites", anonKey);

  // Check if already favourited
  const existing = await favouritesCrud.findMany({
    user_id: parseInt(userId),
    tool_name: body.tool_name
  });

  if (existing && existing.length > 0) {
    return createErrorResponse({
      errorMessage: "Tool already in favourites",
      status: 409,
    });
  }

  const data = await favouritesCrud.create({
    user_id: parseInt(userId),
    tool_name: body.tool_name,
    tool_category: body.tool_category,
    tool_description: body.tool_description,
    tool_url: body.tool_url,
    tool_image_url: body.tool_image_url || null,
  });
  
  return createSuccessResponse(data, 201);
});

// DELETE request - remove from favourites
export const DELETE = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);
  
  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  const { search } = parseQueryParams(request);
  const toolName = search; // Using search param for tool_name
  
  if (!toolName) {
    return createErrorResponse({
      errorMessage: "Tool name is required",
      status: 400,
    });
  }

  // Use anon key - RLS policies will handle authorization
  const anonKey = process.env.POSTGREST_API_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const favouritesCrud = new CrudOperations("user_favourites", anonKey);

  // Find the favourite record
  const existing = await favouritesCrud.findMany({
    user_id: parseInt(userId),
    tool_name: toolName
  });

  if (!existing || existing.length === 0) {
    return createErrorResponse({
      errorMessage: "Favourite not found",
      status: 404,
    });
  }

  const data = await favouritesCrud.delete(existing[0].id);
  return createSuccessResponse(data);
});
