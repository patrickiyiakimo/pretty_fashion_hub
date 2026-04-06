"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  HiUsers,
  HiUser,
  HiMail,
  HiPhone,
  HiCalendar,
  HiSearch,
  HiFilter,
  HiRefresh,
  HiEye,
  HiShieldCheck,
  HiBan,
  HiCheck,
  HiX,
  HiExclamation
} from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNext: false,
    hasPrev: false
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
        return;
      }

      const data = await response.json();
      
      // Handle both response formats (with user object or direct data)
      const userData = data.user || data;
      
      // Check if user is admin
      const isAdmin = userData?.role === 'admin' || 
                      userData?.isAdmin === true || 
                      userData?.userType === 'admin';
      
      if (!isAdmin) {
        toast.error("Access denied. Admin privileges required.");
        setTimeout(() => {
          router.push("/");
        }, 1500);
        return;
      }

      setAuthChecked(true);
      // Fetch users after successful auth check
      fetchUsers(1);
      
    } catch (error) {
      console.error("Auth check error:", error);
      toast.error("Authentication failed");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(filterStatus !== 'all' && { status: filterStatus })
      });

      const response = await fetch(`/api/auth/admin/users?${queryParams}`, {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle different response formats from your backend
      let usersData = [];
      let paginationData = {
        currentPage: page,
        totalPages: 1,
        totalUsers: 0,
        hasNext: false,
        hasPrev: page > 1
      };
      
      if (Array.isArray(data)) {
        usersData = data;
        paginationData.totalUsers = data.length;
        paginationData.totalPages = Math.ceil(data.length / 10);
        paginationData.hasNext = page < paginationData.totalPages;
      } else if (data.success && Array.isArray(data.users)) {
        usersData = data.users;
        paginationData = data.pagination || {
          currentPage: page,
          totalPages: Math.ceil((data.total || data.users.length) / 10),
          totalUsers: data.total || data.users.length,
          hasNext: page < Math.ceil((data.total || data.users.length) / 10),
          hasPrev: page > 1
        };
      } else if (data.users && Array.isArray(data.users)) {
        usersData = data.users;
        paginationData = data.pagination || {
          currentPage: page,
          totalPages: Math.ceil(data.total / 10),
          totalUsers: data.total || data.users.length,
          hasNext: page < Math.ceil(data.total / 10),
          hasPrev: page > 1
        };
      } else if (data.data && Array.isArray(data.data)) {
        usersData = data.data;
        paginationData = {
          currentPage: page,
          totalPages: Math.ceil(data.total / 10) || 1,
          totalUsers: data.total || data.data.length,
          hasNext: page < Math.ceil((data.total || data.data.length) / 10),
          hasPrev: page > 1
        };
      } else {
        console.error("Unexpected API response format:", data);
        usersData = [];
      }
      
      setUsers(usersData);
      setPagination(paginationData);
      
    } catch (error) {
      console.error('Fetch users error:', error);
      setError(`Failed to load users: ${error.message}`);
      setUsers([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
        hasNext: false,
        hasPrev: false
      });
    } finally {
      setLoading(false);
    }
  };

  // const updateUserStatus = async (userId, status) => {
  //   try {
  //     const response = await fetch(`/api/auth/admin/users/${userId}/status`, {
  //       method: 'PATCH', // Using PATCH for partial updates
  //       credentials: "include",
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ status })
  //     });

  //     if (response.status === 401) {
  //       toast.error("Session expired. Please login again.");
  //       setTimeout(() => {
  //         router.push("/login");
  //       }, 1500);
  //       return;
  //     }

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(errorData.message || errorData.error || `Failed to update user status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     // Update local state
  //     setUsers(prev => 
  //       prev.map(user => 
  //         user._id === userId ? { ...user, status } : user
  //       )
  //     );

  //     if (selectedUser?._id === userId) {
  //       setSelectedUser(prev => ({ ...prev, status }));
  //     }

  //     toast.success(data.message || 'User status updated successfully');
  //   } catch (error) {
  //     console.error('Update user error:', error);
  //     toast.error(error.message || 'Failed to update user status');
  //   }
  // };

const handleSuspendUser = async (userId) => {
  try {
    const response = await fetch(`/api/auth/admin/users/${userId}/suspend`, {
      method: 'PUT',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 401) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `Failed to suspend user: ${response.status}`);
    }
    const data = await response.json();
    setUsers(prev => 
      prev.map(user =>
        user._id === userId ? { ...user, status: 'suspended' } : user
      )
    );
    if (selectedUser?._id === userId) {
      setSelectedUser(prev => ({ ...prev, status: 'suspended' }));
    }
    toast.success(data.message || 'User suspended successfully');
  }
  catch (error) {
    console.error('Suspend user error:', error);
    toast.error(error.message || 'Failed to suspend user');
  }
};

const handleReactivateUser = async (userId) => {
  try {
    const response = await fetch(`/api/auth/admin/users/${userId}/reactivate`, {
      method: 'PUT',  
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 401) {
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `Failed to reactivate user: ${response.status}`);
    }
    const data = await response.json();
    setUsers(prev => 
      prev.map(user =>
        user._id === userId ? { ...user, status: 'active' } : user
      )
    );
    if (selectedUser?._id === userId) {
      setSelectedUser(prev => ({ ...prev, status: 'active' }));
    }
    toast.success(data.message || 'User reactivated successfully');
  }
  catch (error) {
    console.error('Reactivate user error:', error);
    toast.error(error.message || 'Failed to reactivate user');
  }
};

  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/auth/admin/users/${user._id}`, {
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        // Handle different response formats
        if (data.user) {
          setSelectedUser(data.user);
        } else if (data.data) {
          setSelectedUser(data.data);
        } else {
          setSelectedUser(data);
        }
      } else {
        // If detailed fetch fails, use the basic user data
        setSelectedUser(user);
      }
    } catch (error) {
      console.error('Fetch user details error:', error);
      // Fallback to basic user data
      setSelectedUser(user);
    }
    setIsModalOpen(true);
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle search with debounce
  useEffect(() => {
    if (!authChecked) return;
    
    const timeoutId = setTimeout(() => {
      fetchUsers(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus, authChecked]);

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || 'active';
    switch (statusLower) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    const roleLower = role?.toLowerCase() || 'customer';
    switch (roleLower) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'partner': 
      case 'vendor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount || 0);
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Loading skeleton for users
  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
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
    <div className="min-h-screen pt-14 bg-gray-50 p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">
              Manage and monitor all user accounts on the platform
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchUsers(1)}
              disabled={loading}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <HiRefresh className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
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
            <div className="text-2xl font-bold text-gray-900">{pagination.totalUsers}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.status?.toLowerCase() === 'active').length}
            </div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => !u.role || u.role?.toLowerCase() === 'customer').length}
            </div>
            <div className="text-gray-600">Customers</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role?.toLowerCase() === 'admin').length}
            </div>
            <div className="text-gray-600">Admins</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <HiExclamation className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {users.length === 0 && !loading ? (
            <div className="text-center py-12">
              <HiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No users have registered yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id || user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.fullname?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.fullname || user.name || 'Unknown User'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.status?.toLowerCase() || 'active'}
                            onChange={(e) => updateUserStatus(user._id || user.id, e.target.value)}
                            className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(user.status || 'active')} focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </td> */}


                        <td className="px-6 py-4 whitespace-nowrap">
  <div className="flex items-center gap-2">
    {/* Status Badge */}
    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status || 'active')}`}>
      {user.status || 'active'}
    </span>
    
    {/* Action Buttons */}
    {(user.status?.toLowerCase() || 'active') === 'active' ? (
      <button
        onClick={() => handleSuspendUser(user._id || user.id, user.fullname || user.email)}
        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
      >
        Suspend
      </button>
    ) : (user.status?.toLowerCase() || 'active') === 'suspended' ? (
      <button
        onClick={() => handleReactivateUser(user._id || user.id, user.fullname || user.email)}
        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
      >
        Activate
      </button>
    ) : (
      <button
        onClick={() => handleReactivateUser(user._id || user.id, user.fullname || user.email)}
        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
      >
        Activate
      </button>
    )}
  </div>
</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role || 'customer')}`}>
                            {user.role || 'customer'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openUserModal(user)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="View Details"
                            >
                              <HiEye className="w-5 h-5" />
                            </button>
                            {/* {(user.status?.toLowerCase() || 'active') === 'active' ? (
                              <button
                                onClick={() => updateUserStatus(user._id || user.id, 'suspended')}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                title="Suspend User"
                              >
                                <HiBan className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => updateUserStatus(user._id || user.id, 'active')}
                                className="text-green-600 hover:text-green-900 transition-colors"
                                title="Activate User"
                              >
                                <HiCheck className="w-5 h-5" />
                              </button>
                            )} */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="bg-white px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing page {pagination.currentPage} of {pagination.totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchUsers(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => fetchUsers(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  User Details
                </h2>
                <button
                  onClick={closeUserModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Information */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedUser.fullname?.charAt(0).toUpperCase() || selectedUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedUser.fullname || selectedUser.name || 'Unknown User'}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status || 'active')}`}>
                        {selectedUser.status || 'active'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role || 'customer')}`}>
                        {selectedUser.role || 'customer'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HiMail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiPhone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedUser.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HiCalendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">Joined {formatDate(selectedUser.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiUser className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          Last login {selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional user data */}
                {selectedUser.address && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Address</h4>
                    <p className="text-gray-700">
                      {selectedUser.address.street && `${selectedUser.address.street}, `}
                      {selectedUser.address.city && `${selectedUser.address.city}, `}
                      {selectedUser.address.state && `${selectedUser.address.state}, `}
                      {selectedUser.address.country || ''}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">User ID</h4>
                  <p className="text-sm text-gray-600 font-mono break-all">{selectedUser._id || selectedUser.id}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={closeUserModal}
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