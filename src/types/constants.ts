/**
 * Type-safe constants and enums
 */

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

// Form field types
export const FORM_FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'tel',
  PASSWORD: 'password',
  NUMBER: 'number',
} as const;

export type FormFieldType = typeof FORM_FIELD_TYPES[keyof typeof FORM_FIELD_TYPES];

// Modal types
export const MODAL_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  VIEW: 'view',
} as const;

export type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

// API endpoints
export const API_ENDPOINTS = {
  // Public endpoints (no authentication required)
  PUBLIC: {
    HEALTH: '/public/health',
    INFO: '/public/info',
    AUTH: {
      LOGIN: '/public/auth/login',
      VERIFY_OTP: '/public/auth/verify-otp',
      REFRESH: '/public/auth/refresh-token',
      LOGOUT_EVERYWHERE: '/public/auth/logout-everywhere',
    },
  },
  // Private endpoints (authentication required)
  PRIVATE: {
    IDENTITY: {
      GET: '/private/identity/identity',
      DASHBOARD: '/private/identity/dashboard',
    },
    USERS: {
      LIST: '/private/users',
      BY_ID: (id: string) => `/private/users/${id}`,
      CREATE: '/private/users',
      UPDATE: (id: string) => `/private/users/${id}`,
      DELETE: (id: string) => `/private/users/${id}`,
    },
  },
} as const;