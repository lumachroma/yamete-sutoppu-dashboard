"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Identity, UserFormData } from '@/types';
import { identityApi, usersApi } from '@/services/api';

// Profile form data is the same as user form data
type ProfileFormData = UserFormData;

export default function ProfilePage() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({ email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // Check authentication and get access token
  const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return null;
    }
    return token;
  };

  // Fetch user identity
  const fetchIdentity = async () => {
    const token = getAccessToken();
    if (!token) return;

    try {
      setLoading(true);
      setError('');

      const response = await identityApi.getIdentity();

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setIdentity(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAccessToken();
    if (!token || !identity) return;

    if (!formData.email && !formData.phone) {
      setError('Either email or phone is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccessMessage('');

      const response = await usersApi.updateUser(identity.sub, formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      setSuccessMessage('Profile updated successfully!');
      setShowEditModal(false);
      fetchIdentity(); // Refresh the profile data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Open edit modal
  const openEditModal = () => {
    if (identity) {
      setFormData({
        email: identity.email || '',
        phone: identity.phone || ''
      });
      setShowEditModal(true);
      setError('');
      setSuccessMessage('');
    }
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setFormData({ email: '', phone: '' });
    setError('');
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  useEffect(() => {
    fetchIdentity();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !identity) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            href="/users"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            👥 User Management
          </Link>
          &nbsp;&nbsp;
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            🏠 Back to Home
          </Link>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex gap-3">
            <button
              onClick={openEditModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {error && !showEditModal && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm">
                  {identity?.sub || '-'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                  {identity?.email || '-'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                  {identity?.phone || '-'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Created
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                  {identity?.iat ? new Date(identity.iat * 1000).toLocaleDateString() : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mt-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Session Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Issued At
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                  {identity?.iat ? new Date(identity.iat * 1000).toLocaleString() : '-'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token Expires At
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
                  {identity?.exp ? new Date(identity.exp * 1000).toLocaleString() : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Edit Profile
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1234567890"
                    />
                  </div>
                  {error && (
                    <div className="mb-4 text-red-600 text-sm">{error}</div>
                  )}
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      disabled={submitting}
                    >
                      {submitting ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
