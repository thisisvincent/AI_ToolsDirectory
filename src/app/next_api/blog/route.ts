
import CrudOperations from '@/lib/crud-operations';
import { createSuccessResponse, createErrorResponse } from '@/lib/create-response';
import { requestMiddleware, parseQueryParams, validateRequestBody } from "@/lib/api-utils";

// GET request - fetch blog posts
export const GET = requestMiddleware(async (request) => {
  const { limit, offset, search } = parseQueryParams(request);
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const slug = searchParams.get('slug');
  const author = searchParams.get('author');

  const blogCrud = new CrudOperations("blog_posts");

  // Build filter conditions
  const filters: Record<string, any> = {
    published: true
  };

  if (category && category !== 'all') {
    filters.category_id = category;
  }

  if (featured === 'true') {
    filters.featured = true;
  }

  if (slug) {
    filters.slug = slug;
  }

  if (author) {
    filters.author_name = author;
  }
  
  const data = await blogCrud.findMany(filters, { 
    limit: limit || 1000, 
    offset: offset || 0,
    orderBy: { column: 'published_at', direction: 'desc' }
  });
  
  // Client-side search filtering
  let filteredData = data;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = data.filter((item: any) => 
      item.title?.toLowerCase().includes(searchLower) || 
      item.description?.toLowerCase().includes(searchLower)
    );
  }
  
  return createSuccessResponse(filteredData);
});

// POST request - create blog post (admin only)
export const POST = requestMiddleware(async (request) => {
  const body = await validateRequestBody(request);
  
  if (!body.title || !body.slug || !body.description || !body.content) {
    return createErrorResponse({
      errorMessage: "Title, slug, description, and content are required",
      status: 400,
    });
  }
  
  const blogCrud = new CrudOperations("blog_posts");
  const data = await blogCrud.create({ ...body });
  return createSuccessResponse(data, 201);
});

// PUT request - update blog post
export const PUT = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "ID parameter is required",
      status: 400,
    });
  }
  
  const body = await validateRequestBody(request);
  const blogCrud = new CrudOperations("blog_posts");
  
  const existing = await blogCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Blog post not found",
      status: 404,
    });
  }
  
  const data = await blogCrud.update(id, body);
  return createSuccessResponse(data);
});

// DELETE request - delete blog post
export const DELETE = requestMiddleware(async (request) => {
  const { id } = parseQueryParams(request);
  
  if (!id) {
    return createErrorResponse({
      errorMessage: "ID parameter is required",
      status: 400,
    });
  }
  
  const blogCrud = new CrudOperations("blog_posts");
  
  const existing = await blogCrud.findById(id);
  if (!existing) {
    return createErrorResponse({
      errorMessage: "Blog post not found",
      status: 404,
    });
  }
  
  const data = await blogCrud.delete(id);
  return createSuccessResponse(data);
});
