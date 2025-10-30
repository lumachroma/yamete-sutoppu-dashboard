/**
 * API response interfaces
 */

import { User } from './user';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  data?: T[];
}

export interface UsersResponse extends PaginatedResponse<User> {
  users: User[];
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: ApiError;
  success: boolean;
}