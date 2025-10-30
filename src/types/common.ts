/**
 * Common form interfaces
 */

import { FormFieldType, ModalType } from './constants';

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface FormState {
  loading: boolean;
  error: string;
  success: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  data?: unknown;
}