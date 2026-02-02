
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET request - fetch courses
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, search } = parseQueryParams(request);
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");
  const courseType = searchParams.get("course_type");
  
  const coursesCrud = new CrudOperations("courses");
  
  const filters: Record<string, any> = {};
  if (provider) {
    filters.provider = provider;
  }
  if (courseType) {
    filters.course_type = courseType;
  }
  
  const data = await coursesCrud.findMany(filters, { 
    limit: limit || 100, 
    offset,
    orderBy: {
      column: 'sort_order',
      direction: 'asc'
    }
  });
  
  return createSuccessResponse(data);
});

// POST request - create course
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.title || !body.provider) {
    return createErrorResponse({
      errorMessage: "Title and provider are required",
      status: 400,
    });
  }
  
  const coursesCrud = new CrudOperations("courses");
  const data = await coursesCrud.create({ ...body });
  return createSuccessResponse(data, 201);
});

// PUT request - update course
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);

  if (!id) {
    return createErrorResponse({
      errorMessage: "ID is required",
      status: 400,
    });
  }
  
  const body = await validateRequestBody(request);
  const coursesCrud = new CrudOperations("courses");
  
  const existing = await coursesCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Course not found",
      status: 404,
    });
  }
  
  const data = await coursesCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE request - delete course
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "ID parameter is required",
      status: 400,
    });
  }
  
  const coursesCrud = new CrudOperations("courses");
  
  const existing = await coursesCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Course not found",
      status: 404,
    });
  }
  
  const data = await coursesCrud.delete(id);
  return createSuccessResponse(data);
});
