
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET request - fetch AI news sources
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, search } = parseQueryParams(request);
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sortBy') || 'sort_order';
  
  const sourcesCrud = new CrudOperations("ai_news_sources");
  
  // Build filter conditions
  const filters: Record<string, any> = {};
  
  if (category && category !== 'all') {
    filters.category = category;
  }
  
  // Determine sort order
  let orderBy: { column: string; direction: 'asc' | 'desc' } = {
    column: 'sort_order',
    direction: 'asc'
  };
  
  if (sortBy === 'name_asc') {
    orderBy = { column: 'name', direction: 'asc' };
  } else if (sortBy === 'name_desc') {
    orderBy = { column: 'name', direction: 'desc' };
  } else if (sortBy === 'newest') {
    orderBy = { column: 'created_at', direction: 'desc' };
  }
  
  const data = await sourcesCrud.findMany(filters, { 
    limit: limit || 1000, 
    offset: offset || 0,
    orderBy 
  });
  
  // Client-side search filtering (since PostgREST doesn't support complex search)
  let filteredData = data;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = data.filter((item: any) => 
      item.name?.toLowerCase().includes(searchLower) || 
      item.description?.toLowerCase().includes(searchLower)
    );
  }
  
  return createSuccessResponse(filteredData);
});

// POST request - create AI news source (admin only)
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.name || !body.url || !body.description) {
    return createErrorResponse({
      errorMessage: "Name, URL, and description are required",
      status: 400,
    });
  }
  
  const sourcesCrud = new CrudOperations("ai_news_sources");
  const data = await sourcesCrud.create({ ...body });
  return createSuccessResponse(data, 201);
});

// PUT request - update AI news source
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "ID parameter is required",
      status: 400,
    });
  }
  
  const body = await validateRequestBody(request);
  const sourcesCrud = new CrudOperations("ai_news_sources");
  
  const existing = await sourcesCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Record not found",
      status: 404,
    });
  }
  
  const data = await sourcesCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE request - delete AI news source
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "ID parameter is required",
      status: 400,
    });
  }
  
  const sourcesCrud = new CrudOperations("ai_news_sources");
  
  const existing = await sourcesCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Record not found",
      status: 404,
    });
  }
  
  const data = await sourcesCrud.delete(id);
  return createSuccessResponse(data);
});
