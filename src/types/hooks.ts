/**
 * React hooks and component types
 */

import { ReactNode } from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Loading states
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// API hook return types
export interface UseApiReturn<T> extends LoadingState {
  data: T | null;
  refetch: () => Promise<void>;
}

// Form hook return types
export interface UseFormReturn<T> {
  data: T;
  setData: (data: T) => void;
  updateField: (field: keyof T, value: T[keyof T]) => void;
  reset: () => void;
  isDirty: boolean;
}

// Modal hook return types
export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}