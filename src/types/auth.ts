/**
 * Authentication related interfaces
 */

export interface LoginFormData {
  emailOrPhone: string;
  otp: string;
}

export interface LoginRequest {
  email?: string;
  phone?: string;
}

export interface LoginResponse {
  attemptId: string;
  message: string;
}

export interface OTPVerificationRequest {
  attemptId: string;
  otp: string;
}

export interface OTPVerificationResponse {
  accessToken: string;
  refreshToken?: string;
  message: string;
}