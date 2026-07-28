/**
 * Common types used across the application
 */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export enum UserRole {
  JobSeeker = 'job_seeker',
  Company = 'company',
  Admin = 'admin',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  status: AsyncStatus;
  data?: T;
  error?: string;
}
