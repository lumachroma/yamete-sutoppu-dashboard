/**
 * Type definitions index
 * 
 * This file exports all type definitions for the yamete-sutoppu-dashboard application.
 * Organized by domain for easy maintenance and extension.
 */

// User related types
export type {
  User,
  UserFormData,
  Identity,
} from './user';

// Authentication related types
export type {
  LoginFormData,
  LoginRequest,
  LoginResponse,
  OTPVerificationRequest,
  OTPVerificationResponse,
} from './auth';

// API related types
export type {
  Pagination,
  PaginatedResponse,
  UsersResponse,
  ApiError,
  ApiResponse,
} from './api';

// Common form and UI types
export type {
  FormField,
  FormState,
  ModalState,
} from './common';

// Utility types
export type {
  ID,
  Timestamp,
  BaseEntity,
  CreateData,
  UpdateData,
  FormState as GenericFormState,
} from './utils';

// React hooks and component types
export type {
  BaseComponentProps,
  LoadingState,
  UseApiReturn,
  UseFormReturn,
  UseModalReturn,
} from './hooks';

// Constants and enums
export {
  HTTP_METHODS,
  FORM_FIELD_TYPES,
  MODAL_TYPES,
  API_ENDPOINTS,
} from './constants';

export type {
  HttpMethod,
  FormFieldType,
  ModalType,
} from './constants';