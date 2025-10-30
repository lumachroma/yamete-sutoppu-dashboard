/**
 * Utility types for type manipulation and common patterns
 */

// Common ID type
export type ID = string;

// Timestamp type
export type Timestamp = string;

// Common entity base
export interface BaseEntity {
  _id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Create types for form operations
export type CreateData<T extends BaseEntity> = Omit<T, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateData<T extends BaseEntity> = Partial<CreateData<T>>;

// Generic form state
export interface FormState<T = unknown> {
  data: T;
  loading: boolean;
  error: string;
  success: string;
}