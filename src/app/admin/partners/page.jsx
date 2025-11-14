"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiUsers, 
  HiCheckCircle, 
  HiClock, 
  HiXCircle, 
  HiSearch,
  HiEye,
  HiRefresh,
  HiShieldCheck,
  HiChartBar
} from "react-icons/hi";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: HiClock, label: "Pending" },
  approved: { color: "bg-green-100 text-green-800", icon: HiCheckCircle, label: "Approved" },
  rejected: { color: "bg-red-100 text-red-800", icon: HiXCircle, label: "Rejected" },
  suspended: { color: "bg-gray-100 text-gray-800", icon: HiShieldCheck, label: "Suspended" }
};

export default function PartnersManagement() {
  const [partners, setPartners] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    page: 1,
    limit: 10
  });

  useEffect(() => {
    loadPartners();
    loadStats();
  }, [filters.status, filters.page]);

  async function loadPartners() {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please log in to access partner management");
        return;
      }

      // Add cache-busting parameter
      const timestamp = new Date().getTime();
      const queryParams = new URLSearchParams({
        status: filters.status === "all" ? "" : filters.status,
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        _t: timestamp.toString(), // Cache buster
        ...(filters.search && { search: filters.search })
      });

      const res = await fetch(`${API_ENDPOINT}/api/partners?${queryParams}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      });

      // Handle 304 Not Modified response
      if (res.status === 304) {
        console.log("Data not modified, using cached data");
        // You can choose to keep existing data or refetch
        // For now, we'll refetch with forced refresh
        await loadPartnersForced();
        return;
      }

      if (!res.ok) {
        toast.error(`Failed to load partners: ${res.status} ${res.statusText}`);
        return;
      }
      
      const data = await res.json();
      console.log("Partners API response:", data); // Debug log
      
      // Handle different response formats
      if (data.partners !== undefined) {
        setPartners(data.partners || []);
      } else if (data.success && data.partners !== undefined) {
        setPartners(data.partners || []);
      } else if (Array.isArray(data)) {
        setPartners(data);
      } else {
        console.error("Unexpected API response format:", data);
        toast.error("Unexpected response format from server");
        setPartners([]);
      }
    } catch (error) {
      console.error("Load partners error:", error);
      toast.error("Failed to load partners. Please check your connection.");
      setPartners([]);
    } finally {
      setLoading(false);
    }
  }

  // Force refresh without cache
  async function loadPartnersForced() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const timestamp = new Date().getTime();
      const queryParams = new URLSearchParams({
        status: filters.status === "all" ? "" : filters.status,
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        _force: timestamp.toString(),
        ...(filters.search && { search: filters.search })
      });

      const res = await fetch(`${API_ENDPOINT}/api/partners?${queryParams}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      });

      if (res.ok) {
        const data = await res.json();
        if (data.partners !== undefined) {
          setPartners(data.partners || []);
        } else if (Array.isArray(data)) {
          setPartners(data);
        }
      }
    } catch (error) {
      console.error("Forced load partners error:", error);
    }
  }

  async function loadStats() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      const timestamp = new Date().getTime();
      const res = await fetch(`${API_ENDPOINT}/api/partners/stats?_t=${timestamp}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        cache: 'no-store'
      });

      if (res.status === 304) {
        return; // Use existing stats
      }

      if (!res.ok) {
        console.warn("Failed to load stats");
        return;
      }

      const data = await res.json();
      
      // Handle different response formats
      if (data.stats) {
        setStats(data.stats);
      } else if (data.success && data.stats) {
        setStats(data.stats);
      } else if (data.total !== undefined) {
        // If stats endpoint doesn't exist, create stats from partners data
        setStats({
          total: partners.length,
          approved: partners.filter(p => p.status === 'approved').length,
          pending: partners.filter(p => p.status === 'pending').length,
          rejected: partners.filter(p => p.status === 'rejected').length,
          availableSlots: 50 - partners.filter(p => p.status === 'approved').length
        });
      }
    } catch (error) {
      console.error("Load stats error:", error);
      // Create basic stats from partners data as fallback
      setStats({
        total: partners.length,
        approved: partners.filter(p => p.status === 'approved').length,
        pending: partners.filter(p => p.status === 'pending').length,
        rejected: partners.filter(p => p.status === 'rejected').length,
        availableSlots: Math.max(0, 50 - partners.filter(p => p.status === 'approved').length)
      });
    }
  }

  async function updatePartnerStatus(partnerId, status, reason = "") {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please log in to perform this action");
        return;
      }

      const res = await fetch(`${API_ENDPOINT}/api/partners/${partnerId}/status`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, reason }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || `Failed to update status: ${res.status}`);
        return;
      }

      const data = await res.json();
      toast.success(data.message || `Partner ${status} successfully`);
      setShowStatusModal(false);
      setSelectedPartner(null);
      // Reload data after update
      await loadPartnersForced();
      loadStats();
    } catch (error) {
      console.error("Update partner status error:", error);
      toast.error("Failed to update partner status. Please try again.");
    }
  }

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-44 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              👥 Partner Management
            </h1>
            <p className="text-gray-600">
              Manage partner applications and store approvals
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => loadPartnersForced()}
              disabled={loading}
              className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiRefresh className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Partners</p>
                <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
              </div>
              <HiUsers className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {partners.filter(p => p.status === 'approved').length}
                </p>
              </div>
              <HiCheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {partners.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <HiClock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {partners.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <HiXCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search partners by name, email, or city..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    loadPartners();
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, search: "", status: "all", page: 1 }));
                loadPartners();
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>

            <button
              onClick={() => loadPartners()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading partners...</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <HiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No partners found
              </h3>
              <p className="text-gray-600">
                {filters.status !== 'all' || filters.search ? 'No partners match your current filters' : 'No partner applications yet'}
              </p>
              {(filters.status !== 'all' || filters.search) && (
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, search: "", status: "all", page: 1 }));
                    loadPartners();
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partners.map((partner) => (
                    <tr key={partner._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {partner.businessName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {partner.businessType}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{partner.email}</div>
                        <div className="text-sm text-gray-500">{partner.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {partner.address?.city}, {partner.address?.state}
                        </div>
                        <div className="text-sm text-gray-500">
                          {partner.address?.country}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={partner.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(partner.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedPartner(partner);
                              setShowDetails(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <HiEye className="w-4 h-4" />
                          </button>
                          
                          {partner.status === 'pending' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedPartner(partner);
                                  setShowStatusModal('approved');
                                }}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <HiCheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedPartner(partner);
                                  setShowStatusModal('rejected');
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <HiXCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          
                          {(partner.status === 'approved' || partner.status === 'rejected') && (
                            <button
                              onClick={() => {
                                setSelectedPartner(partner);
                                setShowStatusModal(partner.status === 'approved' ? 'rejected' : 'approved');
                              }}
                              className={`p-2 ${partner.status === 'approved' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'} rounded-lg transition-colors`}
                              title={partner.status === 'approved' ? 'Reject' : 'Approve'}
                            >
                              {partner.status === 'approved' ? <HiXCircle className="w-4 h-4" /> : <HiCheckCircle className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Partner Details Modal */}
        <AnimatePresence>
          {showDetails && selectedPartner && (
            <PartnerDetailsModal
              partner={selectedPartner}
              onClose={() => {
                setShowDetails(false);
                setSelectedPartner(null);
              }}
              onStatusUpdate={(status, reason) => {
                updatePartnerStatus(selectedPartner._id, status, reason);
              }}
            />
          )}
        </AnimatePresence>

        {/* Status Update Modal */}
        <AnimatePresence>
          {showStatusModal && selectedPartner && (
            <StatusUpdateModal
              partner={selectedPartner}
              status={showStatusModal}
              onClose={() => {
                setShowStatusModal(false);
                setSelectedPartner(null);
              }}
              onConfirm={(reason) => {
                updatePartnerStatus(selectedPartner._id, showStatusModal, reason);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Partner Details Modal Component
function PartnerDetailsModal({ partner, onClose, onStatusUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Partner Details - {partner.businessName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <HiXCircle size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Business Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <p className="mt-1 text-sm text-gray-900">{partner.businessName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Type</label>
                <p className="mt-1 text-sm text-gray-900">{partner.businessType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                <p className="mt-1 text-sm text-gray-900">{partner.taxId || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Years in Business</label>
                <p className="mt-1 text-sm text-gray-900">{partner.yearsInBusiness || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{partner.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{partner.phone}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <p className="mt-1 text-sm text-gray-900">{partner.address?.street}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <p className="mt-1 text-sm text-gray-900">{partner.address?.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <p className="mt-1 text-sm text-gray-900">{partner.address?.state}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <p className="mt-1 text-sm text-gray-900">{partner.address?.country}</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{partner.description || 'No description provided'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            {partner.status === 'pending' && (
              <>
                <button
                  onClick={() => onStatusUpdate('approved')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Approve Partner
                </button>
                <button
                  onClick={() => onStatusUpdate('rejected')}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Reject Application
                </button>
              </>
            )}
            {(partner.status === 'approved' || partner.status === 'rejected') && (
              <button
                onClick={() => onStatusUpdate(partner.status === 'approved' ? 'rejected' : 'approved')}
                className={`${partner.status === 'approved' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
              >
                {partner.status === 'approved' ? 'Reject Partner' : 'Approve Partner'}
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Status Update Modal Component
function StatusUpdateModal({ partner, status, onClose, onConfirm }) {
  const [reason, setReason] = useState("");

  const statusMessages = {
    approved: {
      title: "Approve Partner",
      message: `Approve ${partner.businessName} as a partner?`,
      button: "Approve Partner",
      color: "green"
    },
    rejected: {
      title: "Reject Application",
      message: `Reject ${partner.businessName}'s partner application?`,
      button: "Reject Application",
      color: "red"
    }
  };

  const config = statusMessages[status] || statusMessages.approved;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {config.title}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-gray-600">
            {config.message}
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any notes or reasons for this action..."
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => onConfirm(reason)}
            className={`${status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex-1`}
          >
            {config.button}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex-1"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}