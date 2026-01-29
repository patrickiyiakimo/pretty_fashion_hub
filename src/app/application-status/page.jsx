'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function ApplicationStatusPage() {
  const searchParams = useSearchParams();
  const [applicationId, setApplicationId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedId = localStorage.getItem('lastApplicationId');
    const savedEmail = localStorage.getItem('applicantEmail');
    if (savedId) setApplicationId(savedId);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const checkStatus = async (e) => {
    e?.preventDefault();
    if (!applicationId || !email) {
      setError('Please enter both Application ID and Email');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_ENDPOINT}/api/logistics/applications/${applicationId}/${email}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch application status');
      }
      
      setStatus(data.data);
    } catch (err) {
      setError(err.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Check Application Status
          </h1>
          <p className="text-gray-600">
            Enter your Application ID and email to check your logistics partner application status
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={checkStatus} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application ID
              </label>
              <input
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your application ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the email used in application"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {status && (
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Status</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium">Application ID:</span>
                  <span className="ml-2 font-mono">{status._id}</span>
                </div>
                <div>
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{status.fullName}</span>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                    status.status === 'approved' ? 'bg-green-100 text-green-800' :
                    status.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status.status.charAt(0).toUpperCase() + status.status.slice(1).replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Submitted:</span>
                  <span className="ml-2">{new Date(status.submittedAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium">Vehicle Type:</span>
                  <span className="ml-2">{status.vehicleType}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have your Application ID? Check your email confirmation or{' '}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}