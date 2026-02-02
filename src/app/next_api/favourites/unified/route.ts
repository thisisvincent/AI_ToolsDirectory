import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, validateRequestBody, parseQueryParams } from "@/lib/api-utils";
import { NextRequest } from 'next/server';
import { generateUserToken } from '@/lib/auth';

function getUserIdFromRequest(request: NextRequest): string | null {
  return request.headers.get('X-User-Id');
}

export const GET = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  const item_type = request.nextUrl.searchParams.get('item_type');

  const userToken = await generateUserToken(userId, '');
  const favouritesCrud = new CrudOperations("favourites", userToken);

  const filters: any = { user_id: parseInt(userId) };
  if (item_type) {
    filters.item_type = item_type;
  }

  const data = await favouritesCrud.findMany(filters);
  return createSuccessResponse(data);
});

export const POST = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  const body = await validateRequestBody(request);

  if (!body.item_type || !body.item_id || !body.item_name) {
    return createErrorResponse({
      errorMessage: "item_type, item_id, and item_name are required",
      status: 400,
    });
  }

  const userToken = await generateUserToken(userId, '');
  const favouritesCrud = new CrudOperations("favourites", userToken);

  const existing = await favouritesCrud.findMany({
    user_id: parseInt(userId),
    item_type: body.item_type,
    item_id: body.item_id,
  });

  if (existing && existing.length > 0) {
    return createErrorResponse({
      errorMessage: "Item already in favourites",
      status: 409,
    });
  }

  const data = await favouritesCrud.create({
    user_id: parseInt(userId),
    item_type: body.item_type,
    item_id: body.item_id,
    item_name: body.item_name,
    item_url: body.item_url || null,
    item_description: body.item_description || null,
    item_image_url: body.item_image_url || null,
    metadata: body.metadata || {},
  });

  return createSuccessResponse(data);
});

export const DELETE = requestMiddleware(async (request) => {
  const userId = getUserIdFromRequest(request);

  if (!userId) {
    return createErrorResponse({
      errorMessage: "User not authenticated",
      status: 401,
    });
  }

  const item_type = request.nextUrl.searchParams.get('item_type');
  const item_id = request.nextUrl.searchParams.get('item_id');

  if (!item_type || !item_id) {
    return createErrorResponse({
      errorMessage: "item_type and item_id are required",
      status: 400,
    });
  }

  const userToken = await generateUserToken(userId, '');
  const favouritesCrud = new CrudOperations("favourites", userToken);

  const existing = await favouritesCrud.findMany({
    user_id: parseInt(userId),
    item_type,
    item_id,
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
