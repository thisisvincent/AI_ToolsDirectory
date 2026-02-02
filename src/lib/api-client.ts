

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errorMessage?: string;
  errorCode?: string;
}

class ApiError extends Error {
  constructor(public status: number, public errorMessage: string, public errorCode?: string) {
    super(errorMessage);
    this.name = 'ApiError';
  }
}

// Helper to get current user from localStorage
function getCurrentUserForAPI() {
  if (typeof window === 'undefined') return null;
  
  const authData = localStorage.getItem('ai_tools_auth');
  if (!authData) return null;
  
  try {
    const authState = JSON.parse(authData);
    return authState.currentUser;
  } catch {
    return null;
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    // Get current user and add to headers
    const user = getCurrentUserForAPI();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string> || {}),
    };
    
    // Add user ID to headers if authenticated
    if (user?.id) {
      headers['X-User-Id'] = user.id;
    }

    const response = await fetch(`/next_api${endpoint}`, {
      ...options,
      headers,
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(response.status, result.errorMessage || 'API request failed', result.errorCode || '');
    }

    return result.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error or invalid response');
  }
}

export const api = {
  get: <T = any>(endpoint: string, params?: Record<string, string>) => {
    const url = params 
      ? `${endpoint}?${new URLSearchParams(params).toString()}`
      : endpoint;
    return apiRequest<T>(url, { method: 'GET' });
  },

  post: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(endpoint: string, data?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

export { ApiError };
export type { ApiResponse };

