"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [step, setStep] = useState(1);
  const [attemptId, setAttemptId] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Step 1: Request OTP
  const handleLoginRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          emailOrPhone.includes('@')
            ? { email: emailOrPhone }
            : { phone: emailOrPhone }
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setAttemptId(data.attemptId);
      setStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, otp }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');
      // Store access token for other pages
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      router.push('/profile');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {step === 1 && (
          <form onSubmit={handleLoginRequest}>
            <input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </form>
        )}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}
