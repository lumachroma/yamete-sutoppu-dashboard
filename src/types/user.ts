/**
 * User entity interfaces
 */

import { BaseEntity } from './utils';

export interface User extends BaseEntity {
  email?: string;
  phone?: string;
}

export interface UserFormData {
  email: string;
  phone: string;
}

export interface Identity extends Pick<User, 'email' | 'phone'> {
  sub: string;
  iat?: number;
  exp?: number;
}