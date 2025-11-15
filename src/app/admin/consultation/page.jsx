"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  HiCalendar, 
  HiClock, 
  HiUser, 
  HiMail, 
  HiPhone, 
  HiCheck,
  HiX,
  HiRefresh,
  HiEye,
  HiTrash
} from "react-icons/hi";

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000';
      
      const response = await fetch(`${API_URL}/api/consultations`);
      const result = await response.json();

      if (result.success) {
        setConsultations(result.data);
      } else {
        setError('Failed to fetch consultations');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const updateConsultationStatus = async (id, status) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000';
      
      const response = await fetch(`${API_URL}/api/consultations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state
        setConsultations(prev => 
          prev.map(consultation => 
            consultation._id === id 
              ? { ...consultation, status }
              : consultation
          )
        );
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Network error. Please try again.');
    }
  };

  const deleteConsultation = async (id) => {
    if (!confirm('Are you sure you want to delete this consultation?')) {
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000';
      
      const response = await fetch(`${API_URL}/api/consultations/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setConsultations(prev => prev.filter(consultation => consultation._id !== id));
        if (selectedConsultation?._id === id) {
          setIsModalOpen(false);
          setSelectedConsultation(null);
        }
      } else {
        alert('Failed to delete consultation');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Network error. Please try again.');
    }
  };

  const openModal = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl pt-20 font-bold text-gray-900">Consultation Bookings</h1>
            <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation Bookings</h1>
            <p className="text-gray-600 mt-2">
              Manage and review all consultation requests from clients
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchConsultations}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HiRefresh className="w-5 h-5" />
              Refresh
            </button>
            <Link
              href="/admin"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Admin
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-gray-900">{consultations.length}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {consultations.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">
              {consultations.filter(c => c.status === 'confirmed').length}
            </div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {consultations.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <HiX className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Consultations List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {consultations.length === 0 ? (
            <div className="text-center py-12">
              <HiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations found</h3>
              <p className="text-gray-600">No one has booked a consultation yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <tr key={consultation._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {consultation.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {consultation.consultationId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{consultation.email}</div>
                        <div className="text-sm text-gray-500">{consultation.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(consultation.preferredDate)}
                        </div>
                        <div className="text-sm text-gray-500">{consultation.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.budgetRange || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={consultation.status}
                          onChange={(e) => updateConsultationStatus(consultation._id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(consultation.status)} border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(consultation)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="View Details"
                          >
                            <HiEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteConsultation(consultation._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Consultation Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Client Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-gray-900">{selectedConsultation.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Consultation ID</label>
                      <p className="text-gray-900 font-mono">{selectedConsultation.consultationId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedConsultation.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedConsultation.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Preferred Date</label>
                      <p className="text-gray-900">{formatDate(selectedConsultation.preferredDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Preferred Time</label>
                      <p className="text-gray-900">{selectedConsultation.preferredTime}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Budget Range</label>
                      <p className="text-gray-900">{selectedConsultation.budgetRange || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <select
                        value={selectedConsultation.status}
                        onChange={(e) => updateConsultationStatus(selectedConsultation._id, e.target.value)}
                        className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(selectedConsultation.status)} border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Style Preferences */}
                {selectedConsultation.stylePreferences && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Preferences</h3>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                      {selectedConsultation.stylePreferences}
                    </p>
                  </div>
                )}

                {/* Additional Message */}
                {selectedConsultation.message && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Message</h3>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                      {selectedConsultation.message}
                    </p>
                  </div>
                )}

                {/* Timestamps */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Timestamps</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-600">Created</label>
                      <p className="text-gray-900">
                        {new Date(selectedConsultation.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-600">Last Updated</label>
                      <p className="text-gray-900">
                        {new Date(selectedConsultation.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => deleteConsultation(selectedConsultation._id)}
                  className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Delete Consultation
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}