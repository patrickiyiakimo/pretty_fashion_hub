'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSearch, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner, FaEnvelope, FaIdCard, FaTruck, FaCalendarAlt } from 'react-icons/fa';
import { MdEmail, MdPerson } from 'react-icons/md';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function ApplicationStatusContent() {
  const searchParams = useSearchParams();
  const [applicationId, setApplicationId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load from URL params and localStorage on mount
  useEffect(() => {
    const urlId = searchParams.get('id');
    const urlEmail = searchParams.get('email');
    
    if (urlId && urlEmail) {
      setApplicationId(urlId);
      setEmail(urlEmail);
      // Auto-check status if params exist
      setTimeout(() => {
        handleCheckStatus();
      }, 500);
    } else {
      const savedId = localStorage.getItem('lastApplicationId');
      const savedEmail = localStorage.getItem('applicantEmail');
      if (savedId) setApplicationId(savedId);
      if (savedEmail) setEmail(savedEmail);
    }
  }, [searchParams]);

  const handleCheckStatus = async (e) => {
    e?.preventDefault();
    if (!applicationId || !email) {
      setError('Please enter both Application ID and Email');
      return;
    }

    setLoading(true);
    setError('');
    setStatus(null);
    
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
      setError(err.message || 'An error occurred while checking status. Please verify your details.');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle className="text-green-500 text-4xl" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500 text-4xl" />;
      case 'under_review':
        return <FaSpinner className="text-yellow-500 text-4xl animate-spin" />;
      default:
        return <FaClock className="text-blue-500 text-4xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approved':
        return 'Congratulations! Your application has been approved.';
      case 'rejected':
        return 'Your application was not successful at this time.';
      case 'under_review':
        return 'Your application is currently under review.';
      default:
        return 'Your application has been received and is pending review.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Application Status
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your logistics partner application with Kingz_World
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaSearch className="text-blue-600" />
            Check Your Status
          </h2>
          
          <form onSubmit={handleCheckStatus} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                  <FaIdCard className="text-blue-500" />
                  Application ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter your application ID"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaIdCard />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                  <MdEmail className="text-blue-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Enter the email used in application"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Checking Status...
                </>
              ) : (
                <>
                  <FaSearch />
                  Check Application Status
                </>
              )}
            </button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-700 font-medium flex items-center gap-2">
                <FaTimesCircle />
                {error}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Status Display */}
        {status && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Status Header */}
            <div className={`p-8 border-b ${getStatusColor(status.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(status.status)}
                  <div>
                    <h3 className="text-2xl font-bold">Application Status</h3>
                    <p className="text-lg mt-1">{getStatusMessage(status.status)}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full font-bold ${getStatusColor(status.status)}`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1).replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Application Details */}
            <div className="p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Application Details</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdPerson className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{status.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MdEmail className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{status.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaTruck className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <p className="font-medium">{status.vehicleType}</p>
                    </div>
                  </div>
                </div>

                {/* Application Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaIdCard className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Application ID</p>
                      <p className="font-mono font-medium">{status._id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaCalendarAlt className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Submitted On</p>
                      <p className="font-medium">
                        {new Date(status.submittedAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaSpinner className="text-blue-500 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">
                        {new Date(status.updatedAt || status.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t">
                <h5 className="font-bold text-gray-900 mb-4">Additional Information</h5>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{status.phone}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{status.city}, {status.state}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{status.licenseNumber}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">What's Next?</h5>
                <ul className="space-y-2">
                  {status.status === 'approved' && (
                    <>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>You will receive onboarding instructions via email</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Complete required documentation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Schedule orientation session</span>
                      </li>
                    </>
                  )}
                  {status.status === 'pending' && (
                    <>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Application under initial review</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Expected review time: 2-3 business days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Check back here for updates</span>
                      </li>
                    </>
                  )}
                  {status.status === 'under_review' && (
                    <>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Background verification in progress</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Additional documents may be requested</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Decision expected within 5 business days</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Can't find your Application ID?</h4>
              <p className="text-gray-600">
                Check your email inbox (including spam folder) for the confirmation email sent after application submission.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Still having issues?</h4>
              <p className="text-gray-600 mb-4">
                Contact our logistics support team for assistance:
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEnvelope />
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}