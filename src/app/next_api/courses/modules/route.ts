
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET request - fetch course modules
export const GET = requestMiddleware(async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const courseId = searchParams.get("course_id");
  
  const modulesCrud = new CrudOperations("course_modules");
  
  const filters: Record<string, any> = {};
  if (courseId) {
    filters.course_id = courseId;
  }
  
  const data = await modulesCrud.findMany(filters, {
    orderBy: {
      column: 'module_number',
      direction: 'asc'
    }
  });
  
  return createSuccessResponse(data);
});

// POST request - create course module
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.course_id || !body.module_title) {
    return createErrorResponse({
      errorMessage: "Course ID and module title are required",
      status: 400,
    });
  }
  
  const modulesCrud = new CrudOperations("course_modules");
  const data = await modulesCrud.create({ ...body });
  return createSuccessResponse(data, 201);
});
