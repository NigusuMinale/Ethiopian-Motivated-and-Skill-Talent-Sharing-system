/**
 * API configuration and constants
 */

// Base API configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // milliseconds
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me',
    LOGOUT: '/auth/logout',
  },

  // Jobs
  JOBS: {
    LIST: '/jobs',
    DETAIL: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
    APPLY: '/applications',
    GET_APPLICATIONS: (jobId: string) => `/applications/job/${jobId}`,
  },

  // Talent
  TALENT: {
    SEARCH: '/talents/search',
    PROFILE: (id: string) => `/talents/${id}`,
    UPDATE_PROFILE: '/talents/profile',
    GET_PROFILE: '/talents/profile',
  },

  // Education
  EDUCATION: {
    LIST: '/education',
    CREATE: '/education',
    UPDATE: (id: string) => `/education/${id}`,
    DELETE: (id: string) => `/education/${id}`,
  },

  // Company
  COMPANY: {
    PROFILE: '/companies/profile',
    UPDATE_PROFILE: '/companies/profile',
    JOBS: '/companies/jobs',
    CERTIFICATES: '/companies/certificates',
  },

  // Applications
  APPLICATIONS: {
    CREATE: '/applications',
    MY: '/applications/my',
    COMPANY: '/applications/company',
    JOB: (jobId: string) => `/applications/job/${jobId}`,
    UPDATE_STATUS: (id: string) => `/applications/${id}/status`,
  },

  // Contact & Landing
  CONTACT: '/contact',
  LANDING: '/landing',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Cache configuration (React Query)
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchInterval: false,
  retry: 1,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authenticated. Please log in.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;
