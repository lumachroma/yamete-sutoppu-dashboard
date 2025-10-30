/**
 * API Service
 * Centralized API calls with proper endpoint management
 */

import { API_ENDPOINTS } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

/**
 * Base fetch wrapper with common configuration
 */
const apiRequest = async (
  endpoint: string,
  options: RequestOptions = {}
): Promise<Response> => {
  const { requireAuth = false, ...fetchOptions } = options;
  
  const config: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  };

  // Add authentication header if required
  if (requireAuth) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found. Please login.');
    }
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return response;
};

/**
 * Authentication API calls
 */
export const authApi = {
  login: async (data: { email?: string; phone?: string }) => {
    return apiRequest(API_ENDPOINTS.PUBLIC.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyOtp: async (data: { attemptId: string; otp: string }) => {
    return apiRequest(API_ENDPOINTS.PUBLIC.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  refreshToken: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC.AUTH.REFRESH, {
      method: 'POST',
    });
  },

  logoutEverywhere: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC.AUTH.LOGOUT_EVERYWHERE, {
      method: 'POST',
    });
  },
};

/**
 * User Identity API calls
 */
export const identityApi = {
  getIdentity: async () => {
    return apiRequest(API_ENDPOINTS.PRIVATE.IDENTITY.GET, {
      requireAuth: true,
    });
  },

  getDashboard: async () => {
    return apiRequest(API_ENDPOINTS.PRIVATE.IDENTITY.DASHBOARD, {
      requireAuth: true,
    });
  },
};

/**
 * Users API calls
 */
export const usersApi = {
  getUsers: async (page = 1, limit = 10) => {
    return apiRequest(`${API_ENDPOINTS.PRIVATE.USERS.LIST}?page=${page}&limit=${limit}`, {
      requireAuth: true,
    });
  },

  getUserById: async (id: string) => {
    return apiRequest(API_ENDPOINTS.PRIVATE.USERS.BY_ID(id), {
      requireAuth: true,
    });
  },

  createUser: async (data: { email?: string; phone?: string }) => {
    return apiRequest(API_ENDPOINTS.PRIVATE.USERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth: true,
    });
  },

  updateUser: async (id: string, data: { email?: string; phone?: string }) => {
    return apiRequest(API_ENDPOINTS.PRIVATE.USERS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(data),
      requireAuth: true,
    });
  },

  deleteUser: async (id: string) => {
    return apiRequest(API_ENDPOINTS.PRIVATE.USERS.DELETE(id), {
      method: 'DELETE',
      requireAuth: true,
    });
  },
};

/**
 * System API calls
 */
export const systemApi = {
  getHealth: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC.HEALTH);
  },

  getInfo: async () => {
    return apiRequest(API_ENDPOINTS.PUBLIC.INFO);
  },
};