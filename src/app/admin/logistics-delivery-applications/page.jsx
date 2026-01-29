'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaSync, 
  FaEye, 
  FaCheck, 
  FaTimes, 
  FaClock,
  FaTruck, 
  FaUser, 
  FaEdit,
  FaDownload,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSignOutAlt,
  FaUserShield,
  FaExclamationTriangle,
} from 'react-icons/fa';

import { MdEmail, MdPhone, MdLocationOn, MdPerson, MdAdminPanelSettings } from 'react-icons/md';
import toast from 'react-hot-toast';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function LogisticsDeliveryApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'submittedAt', direction: 'desc' });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    under_review: 0,
    approved: 0,
    rejected: 0
  });

  // Debug function to check localStorage
  const debugAuth = () => {
    console.log('🔍 Debug Auth Check:');
    console.log('localStorage accessToken:', localStorage.getItem('accessToken') ? 'Exists' : 'Missing');
    console.log('localStorage token:', localStorage.getItem('token') ? 'Exists' : 'Missing');
    console.log('User state:', user);
    console.log('Is Admin:', isAdmin);
    
    // Check backend response
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    if (token) {
      fetch(`${API_ENDPOINT}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        console.log('Backend user data:', data);
        console.log('User isAdmin property:', data.user?.isAdmin);
        console.log('User role:', data.user?.role);
      })
      .catch(err => console.error('Debug fetch error:', err));
    }
  };

  // Check authentication and get user data
  const checkAuth = useCallback(async () => {
    try {
      console.log('🔐 Starting auth check...');
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      if (!token) {
        console.log('❌ No token found');
        toast.error('Please login to access admin panel');
        router.push('/login');
        return null;
      }

      console.log('✅ Token found, checking with backend...');
      
      const response = await fetch(`${API_ENDPOINT}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('🔐 Auth response status:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          console.log('❌ 401 Unauthorized - removing token');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          router.push('/login');
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Auth error:', errorData);
          throw new Error(errorData.message || 'Authentication failed');
        }
        return null;
      }

      const data = await response.json();
      console.log('✅ Auth successful, user data:', data.user);
      console.log('🔑 User isAdmin property:', data.user?.isAdmin);
      console.log('🔑 User role property:', data.user?.role);
      
      // Check if user is admin - support multiple ways to check admin status
      const userIsAdmin = data.user?.isAdmin === true || 
                          data.user?.role === 'admin' || 
                          data.user?.role === 'administrator' ||
                          data.user?.userType === 'admin';
      
      console.log('🔑 User is admin?', userIsAdmin);
      
      if (!userIsAdmin) {
        console.log('❌ User is not admin - redirecting');
        toast.error('Access denied. Admin privileges required.');
        
        // Store user data for debugging
        setUser(data.user);
        setIsAdmin(false);
        setAuthChecked(true);
        
        // Show admin request modal instead of redirecting immediately
        return null;
      }

      setUser(data.user);
      setIsAdmin(true);
      setAuthChecked(true);
      return data.user;
    } catch (error) {
      console.error('🔴 Auth check error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      toast.error('Authentication failed. Please login again.');
      router.push('/login');
      return null;
    }
  }, [router]);

  // Fetch applications
  const fetchApplications = useCallback(async (force = false) => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      if (!token) {
        console.log('❌ No token for fetch');
        await checkAuth();
        return;
      }

      console.log('📦 Fetching applications with token:', token.substring(0, 20) + '...');
      
      // IMPORTANT: Correct endpoint is /api/logistics/admin/applications (plural)
      const url = `${API_ENDPOINT}/api/logistics/admin/applications${force ? '?refresh=' + Date.now() : ''}`;
      console.log('📡 Fetching from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });

      console.log('📦 Fetch response status:', response.status);

      if (response.status === 401) {
        console.log('❌ 401 in fetch - removing token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Fetch error:', errorText);
        throw new Error(`Failed to fetch applications: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Applications data:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch applications');
      }

      setApplications(data.data || []);
      setFilteredApplications(data.data || []);
      updateStats(data.data || []);
      setError('');
    } catch (err) {
      console.error('🔴 Error fetching applications:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [router, checkAuth, isAdmin]);

  useEffect(() => {
    const initialize = async () => {
      console.log('🚀 Initializing admin page...');
      debugAuth();
      const authenticatedUser = await checkAuth();
      if (authenticatedUser && isAdmin) {
        console.log('✅ Admin user authenticated, fetching applications...');
        await fetchApplications();
      } else {
        setAuthChecked(true);
      }
    };
    initialize();
  }, [checkAuth, fetchApplications, isAdmin]);

  // Update stats
  const updateStats = (apps) => {
    const newStats = {
      total: apps.length,
      pending: apps.filter(app => app.status === 'pending').length,
      under_review: apps.filter(app => app.status === 'under_review').length,
      approved: apps.filter(app => app.status === 'approved').length,
      rejected: apps.filter(app => app.status === 'rejected').length
    };
    setStats(newStats);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...applications];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.fullName?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.phone?.includes(term) ||
        app.idNumber?.toLowerCase().includes(term) ||
        app.licenseNumber?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Vehicle type filter
    if (vehicleTypeFilter !== 'all') {
      filtered = filtered.filter(app => app.vehicleType === vehicleTypeFilter);
    }

    // Date range filter
    if (dateRange.start) {
      const startDate = new Date(dateRange.start);
      filtered = filtered.filter(app => new Date(app.submittedAt) >= startDate);
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(app => new Date(app.submittedAt) <= endDate);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === 'submittedAt') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.submittedAt) - new Date(b.submittedAt)
          : new Date(b.submittedAt) - new Date(a.submittedAt);
      }
      if (sortConfig.key === 'fullName') {
        return sortConfig.direction === 'asc'
          ? a.fullName?.localeCompare(b.fullName)
          : b.fullName?.localeCompare(a.fullName);
      }
      return 0;
    });

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, vehicleTypeFilter, dateRange, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // View application details
  const viewApplication = (app) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  // Open update modal
  const openUpdateModal = (app) => {
    setSelectedApplication(app);
    setStatusUpdate(app.status);
    setIsUpdateModalOpen(true);
  };

  // Update application status
  const updateStatus = async () => {
    if (!selectedApplication || !statusUpdate) return;

    setUpdatingId(selectedApplication._id);
    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to perform this action');
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_ENDPOINT}/api/logistics/admin/applications/${selectedApplication._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: statusUpdate })
      });

      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const data = await response.json();
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app._id === selectedApplication._id 
          ? { ...app, status: statusUpdate }
          : app
      ));

      toast.success(data.message || 'Status updated successfully');
      setIsUpdateModalOpen(false);
      setSelectedApplication(null);
      setStatusUpdate('');
      
      // Refresh data
      await fetchApplications(true);
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.message || 'Failed to update status');
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <FaClock /> },
      under_review: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <FaSync className="animate-spin" /> },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: <FaCheck /> },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: <FaTimes /> }
    };
    return config[status] || config.pending;
  };

  // Get vehicle icon
  const getVehicleIcon = (type) => {
    const icons = {
      'Motorcycle': '🏍️',
      'Car/SUV': '🚗',
      'Van': '🚐',
      'Truck': '🚚',
      'Bicycle': '🚲',
      'Other': '🚛'
    };
    return icons[type] || '🚛';
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!isAdmin) {
      toast.error('Admin privileges required');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Vehicle Type', 'Status', 'Submitted Date', 'City', 'State'];
    const csvData = filteredApplications.map(app => [
      app.fullName,
      app.email,
      app.phone,
      app.vehicleType,
      app.status,
      new Date(app.submittedAt).toLocaleDateString(),
      app.city,
      app.state
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logistics-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Data exported successfully');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  // Debug button for testing
  const handleDebug = () => {
    debugAuth();
    console.log('Current applications:', applications);
    console.log('Current user:', user);
    console.log('Is admin:', isAdmin);
  };

  // Request admin access
  const requestAdminAccess = () => {
    toast.loading('Requesting admin access...');
    // In a real app, you would send a request to your backend
    setTimeout(() => {
      toast.dismiss();
      toast.error('Admin access request sent. Please contact system administrator.');
    }, 2000);
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in as an administrator to access this page.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
            <button
              onClick={handleDebug}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
            >
              Debug Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Logistics Delivery Applications
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUserShield className="text-blue-600" />
                  <span>Welcome, {user.name || 'Admin'}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Role: {user.role || 'Administrator'}
                </div>
                <button
                  onClick={handleDebug}
                  className="text-xs text-gray-400 hover:text-gray-600"
                  title="Debug"
                >
                  🐛
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => fetchApplications(true)}
                disabled={loading}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(stats).map(([key, value], index) => {
            const titles = {
              total: 'Total Applications',
              pending: 'Pending Review',
              under_review: 'Under Review',
              approved: 'Approved',
              rejected: 'Rejected'
            };
            
            const colors = {
              total: 'bg-blue-100 text-blue-900',
              pending: 'bg-yellow-100 text-yellow-900',
              under_review: 'bg-blue-100 text-blue-900',
              approved: 'bg-green-100 text-green-900',
              rejected: 'bg-red-100 text-red-900'
            };

            const icons = {
              total: '📋',
              pending: <FaClock className="text-yellow-600" />,
              under_review: <FaSync className="text-blue-600 animate-spin" />,
              approved: <FaCheck className="text-green-600" />,
              rejected: <FaTimes className="text-red-600" />
            };

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{titles[key]}</h3>
                  <div className={`w-12 h-12 ${colors[key].split(' ')[0]} rounded-full flex items-center justify-center`}>
                    {typeof icons[key] === 'string' ? (
                      <span className="text-2xl">{icons[key]}</span>
                    ) : (
                      <div className="text-2xl">{icons[key]}</div>
                    )}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-96">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setVehicleTypeFilter('all');
                  setDateRange({ start: '', end: '' });
                }}
                className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={exportToCSV}
                className="px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors flex items-center gap-2"
              >
                <FaDownload />
                Export CSV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
              <select
                value={vehicleTypeFilter}
                onChange={(e) => setVehicleTypeFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Vehicles</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Car/SUV">Car/SUV</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('fullName')}
                  >
                    <div className="flex items-center gap-2">
                      Applicant
                      {sortConfig.key === 'fullName' && (
                        sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('submittedAt')}
                  >
                    <div className="flex items-center gap-2">
                      Submitted
                      {sortConfig.key === 'submittedAt' && (
                        sortConfig.direction === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Loading applications...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaFilter className="text-4xl text-gray-300 mb-4" />
                        <p className="text-lg">No applications found</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {applications.length === 0 ? 'No applications submitted yet' : 'Try adjusting your filters'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application) => {
                    const statusBadge = getStatusBadge(application.status);
                    return (
                      <motion.tr
                        key={application._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <MdPerson className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {application.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {application.idNumber?.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              <MdEmail className="text-gray-400" />
                              {application.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MdPhone className="text-gray-400" />
                              {application.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getVehicleIcon(application.vehicleType)}</span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {application.vehicleType}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.vehicleModel || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(application.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                            {statusBadge.icon}
                            {application.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewApplication(application)}
                              className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                            >
                              <FaEye />
                              View
                            </button>
                            <button
                              onClick={() => openUpdateModal(application)}
                              className="px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                            >
                              <FaEdit />
                              Update
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-600" />
                <div>
                  <p className="text-red-700 font-medium">Error</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-600 hover:text-red-800"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading Overlay - Only show for initial load */}
        {loading && applications.length === 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-700">Loading applications...</p>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaUser />
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium">{selectedApplication.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium">
                        {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaTruck />
                    Vehicle Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Vehicle Type</label>
                      <p className="font-medium">{selectedApplication.vehicleType}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Vehicle Model</label>
                      <p className="font-medium">{selectedApplication.vehicleModel || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">License Number</label>
                      <p className="font-medium">{selectedApplication.licenseNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">ID Number</label>
                      <p className="font-medium">{selectedApplication.idNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MdLocationOn />
                    Location Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Address</label>
                      <p className="font-medium">{selectedApplication.address}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">City</label>
                      <p className="font-medium">{selectedApplication.city}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">State</label>
                      <p className="font-medium">{selectedApplication.state}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Postal Code</label>
                      <p className="font-medium">{selectedApplication.postalCode}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaClock />
                    Application Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedApplication.status).color}`}>
                          {getStatusBadge(selectedApplication.status).icon}
                          {selectedApplication.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Submitted On</label>
                      <p className="font-medium">
                        {new Date(selectedApplication.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Experience</label>
                      <p className="font-medium">{selectedApplication.experience || 'No experience provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Availability</label>
                      <p className="font-medium">
                        {selectedApplication.availability?.join(', ') || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    openUpdateModal(selectedApplication);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Update Status Modal */}
      {isUpdateModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Update Application Status</h3>
              <p className="text-gray-600 mb-6">
                Update status for <span className="font-semibold">{selectedApplication.fullName}</span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Status
                  </label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Status Descriptions */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Pending: Initial submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Under Review: Verification in progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Approved: Ready for onboarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Rejected: Application declined</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={updatingId === selectedApplication._id}
                >
                  Cancel
                </button>
                <button
                  onClick={updateStatus}
                  disabled={updatingId === selectedApplication._id || !statusUpdate}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {updatingId === selectedApplication._id ? (
                    <>
                      <FaSync className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Status'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}




