"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Identity {
  sub: string;
  email?: string;
  phone?: string;
  iat?: number;
  exp?: number;
}

export default function ProfilePage() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Try to get access token from localStorage (or cookies if you prefer)
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('No access token found. Please login.');
      router.push('/login');
      return;
    }
  fetch(`${API_BASE_URL}/protected/identity`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      credentials: 'include',
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch identity');
        setIdentity(data);
      })
      .catch(err => {
        setError(err.message);
        router.push('/login');
      });
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="mb-4"><strong>User ID:</strong> {identity.sub}</div>
        <div className="mb-4"><strong>Email:</strong> {identity.email || '-'}</div>
        <div className="mb-4"><strong>Phone:</strong> {identity.phone || '-'}</div>
        <div className="mb-4"><strong>Token Issued At:</strong> {identity.iat ? new Date(identity.iat * 1000).toLocaleString() : '-'}</div>
        <div className="mb-4"><strong>Token Expires At:</strong> {identity.exp ? new Date(identity.exp * 1000).toLocaleString() : '-'}</div>
      </div>
    </div>
  );
}
