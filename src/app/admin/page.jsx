"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  HiUserGroup, 
  HiCalendar, 
  HiChartBar, 
  HiCog, 
  HiShoppingBag,
  HiUsers,
  HiTicket,
  HiChat,
  HiRefresh,
  HiExclamationCircle,
  HiCheckCircle,
  HiClock,
  HiPlus
} from "react-icons/hi";
import { FaCarSide } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function AdminDashboard() {
  const router = useRouter();
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingActions: 0,
    pendingPartners: 0,
    pendingConsultations: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState({
    activity: true,
    stats: true,
    auth: true
  });
  const [systemStatus, setSystemStatus] = useState([
    { service: "Website", status: "checking", color: "bg-gray-400" },
    { service: "Database", status: "checking", color: "bg-gray-400" },
    { service: "Payment Gateway", status: "checking", color: "bg-gray-400" },
    { service: "Email Service", status: "checking", color: "bg-gray-400" },
    { service: "CDN", status: "checking", color: "bg-gray-400" }
  ]);
  
  // Authentication states
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const adminCards = [
    {
      icon: <HiUserGroup className="w-8 h-8" />,
      title: "Partnership Applications",
      description: "Manage partnership requests and applications from potential collaborators",
      href: "/admin/partners",
      count: stats.pendingPartners || 0,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      endpoint: "/api/partners"
    },
    {
      icon: <HiCalendar className="w-8 h-8" />,
      title: "Consultation Bookings",
      description: "View and manage all style consultation appointments and bookings",
      href: "/admin/consultation",
      count: stats.pendingConsultations || 0,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      endpoint: "/api/consultations"
    },
    {
      icon: <HiUsers className="w-8 h-8" />,
      title: "User Management",
      description: "Manage customer accounts, permissions, and user data",
      href: "/admin/users",
      count: stats.totalUsers || 0,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      endpoint: "/api/auth/admin/users"
    },
    // {
    //   icon: <HiShoppingBag className="w-8 h-8" />,
    //   title: "Product Management",
    //   description: "Add, edit, and manage products in your catalog",
    //   href: "/admin/products",
    //   count: "156",
    //   color: "bg-orange-500",
    //   textColor: "text-orange-600",
    //   bgColor: "bg-orange-50",
    //   borderColor: "border-orange-200"
    // },
    // {
    //   icon: <HiChartBar className="w-8 h-8" />,
    //   title: "Analytics & Reports",
    //   description: "View sales analytics, customer insights, and business reports",
    //   href: "/admin/analytics",
    //   count: "12",
    //   color: "bg-indigo-500",
    //   textColor: "text-indigo-600",
    //   bgColor: "bg-indigo-50",
    //   borderColor: "border-indigo-200"
    // },
    {
      icon: <HiTicket className="w-8 h-8" />,
      title: "Logistics & Transactions",
      description: "Process logistics, orders, manage shipments, and handle transactions",
      href: "/admin/logistics",
      count: "89",
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      endpoint: "/api/logistics"
    },
    // {
    //   icon: <HiChat className="w-8 h-8" />,
    //   title: "Customer Support",
    //   description: "Manage customer inquiries, feedback, and support tickets",
    //   href: "/admin/support",
    //   count: "34",
    //   color: "bg-pink-500",
    //   textColor: "text-pink-600",
    //   bgColor: "bg-pink-50",
    //   borderColor: "border-pink-200"
    // },
    // {
    //   icon: <HiCog className="w-8 h-8" />,
    //   title: "System Settings",
    //   description: "Configure website settings, payment methods, and preferences",
    //   href: "/admin/settings",
    //   count: "8",
    //   color: "bg-gray-500",
    //   textColor: "text-gray-600",
    //   bgColor: "bg-gray-50",
    //   borderColor: "border-gray-200"
    // },
    {
      icon: <FaCarSide className="w-8 h-8" />,
      title: "Logistics Delivery Applications",
      description: "Manage delivery applications schedules, tracking, and logistics operations",
      href: "/admin/logistics-delivery-applications",
      count: "5",
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  // Check authentication and get user data
  const checkAuth = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, auth: true }));
      console.log('🔐 Starting auth check for admin dashboard...');
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("adminToken");
      
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
          localStorage.removeItem('adminToken');
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
        setLoading(prev => ({ ...prev, auth: false }));
        
        return null;
      }

      setUser(data.user);
      setIsAdmin(true);
      setAuthChecked(true);
      setLoading(prev => ({ ...prev, auth: false }));
      return data.user;
    } catch (error) {
      console.error('🔴 Auth check error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      toast.error('Authentication failed. Please login again.');
      router.push('/login');
      return null;
    }
  }, [router]);

  useEffect(() => {
    const initialize = async () => {
      const authenticatedUser = await checkAuth();
      if (authenticatedUser && isAdmin) {
        console.log('✅ Admin user authenticated, fetching dashboard data...');
        fetchRecentActivity();
        fetchDashboardStats();
        checkSystemStatus();
        
        // Refresh data every 30 seconds
        const interval = setInterval(() => {
          fetchRecentActivity();
          fetchDashboardStats();
        }, 30000);
        
        return () => clearInterval(interval);
      }
    };
    initialize();
  }, [checkAuth, isAdmin]);

  async function fetchRecentActivity() {
    if (!isAdmin) return;
    
    setLoading(prev => ({ ...prev, activity: true }));
    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("adminToken");
      
      // Fetch data from multiple endpoints
      const [partnersRes, consultationsRes, usersRes, logisticsRes] = await Promise.allSettled([
        fetch(`${API_ENDPOINT}/api/partners?limit=5&status=pending`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),
        fetch(`${API_ENDPOINT}/api/consultations?limit=5&status=pending`),
        fetch(`${API_ENDPOINT}/api/auth/admin/users?limit=5`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),
        fetch(`${API_ENDPOINT}/api/logistics?limit=5`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
      ]);

      const activities = [];

      // Process partners data
      if (partnersRes.status === "fulfilled" && partnersRes.value.ok) {
        const partnersData = await partnersRes.value.json();
        const partners = Array.isArray(partnersData) ? partnersData : 
                        partnersData.partners || partnersData.data || [];
        
        partners.slice(0, 3).forEach(partner => {
          activities.push({
            action: "New partnership application",
            time: formatTimeAgo(partner.createdAt || new Date()),
            user: partner.businessName || partner.fullName || "New Partner",
            type: "partnership",
            id: partner._id,
            icon: "👥"
          });
        });
      }

      // Process consultations data
      if (consultationsRes.status === "fulfilled" && consultationsRes.value.ok) {
        const consultationsData = await consultationsRes.value.json();
        const consultations = Array.isArray(consultationsData) ? consultationsData :
                            consultationsData.data || consultationsData.consultations || [];
        
        consultations.slice(0, 3).forEach(consultation => {
          if (consultation.status === "pending" || consultation.status === "confirmed") {
            activities.push({
              action: `Consultation ${consultation.status === 'confirmed' ? 'confirmed' : 'booking'}`,
              time: formatTimeAgo(consultation.createdAt || consultation.date || new Date()),
              user: consultation.name || consultation.fullName || "Client",
              type: "consultation",
              id: consultation._id,
              icon: "📅"
            });
          }
        });
      }

      // Process users data
      if (usersRes.status === "fulfilled" && usersRes.value.ok) {
        const usersData = await usersRes.value.json();
        const users = Array.isArray(usersData) ? usersData :
                     usersData.users || usersData.data || [];
        
        users.slice(0, 3).forEach(user => {
          if (user.createdAt) {
            activities.push({
              action: "New user registration",
              time: formatTimeAgo(user.createdAt),
              user: user.email || user.fullname || "New User",
              type: "user",
              id: user._id,
              icon: "👤"
            });
          }
        });
      }

      // Process logistics data
      if (logisticsRes.status === "fulfilled" && logisticsRes.value.ok) {
        const logisticsData = await logisticsRes.value.json();
        const shipments = Array.isArray(logisticsData) ? logisticsData :
                         logisticsData.shipments || logisticsData.data || [];
        
        shipments.slice(0, 2).forEach(shipment => {
          if (shipment.status === "Order Created" || shipment.status === "Processing") {
            activities.push({
              action: `Order #${shipment.trackingNumber || shipment._id?.slice(-6) || 'KW-2847'} ${shipment.status.toLowerCase()}`,
              time: formatTimeAgo(shipment.createdAt || shipment.date || new Date()),
              user: shipment.clientName || "Customer",
              type: "logistics",
              id: shipment._id || shipment.trackingNumber,
              icon: "🚚"
            });
          }
        });
      }

      // Sort by time (newest first) and limit to 5
      activities.sort((a, b) => new Date(b.time) - new Date(a.time));
      setRecentActivity(activities.slice(0, 5));

    } catch (error) {
      console.error("Error fetching recent activity:", error);
      // Fallback to sample data if API fails
      setRecentActivity([
        { action: "New partnership application", time: "2 min ago", user: "Fashion Retail Co.", icon: "👥" },
        { action: "Consultation booking confirmed", time: "5 min ago", user: "Sarah Johnson", icon: "📅" },
        { action: "New user registration", time: "10 min ago", user: "mike.adebayo@email.com", icon: "👤" },
        { action: "Order #KW-2847 shipped", time: "15 min ago", user: "Customer", icon: "🚚" },
        { action: "Product inventory updated", time: "20 min ago", user: "System", icon: "📦" }
      ]);
    } finally {
      setLoading(prev => ({ ...prev, activity: false }));
    }
  }

  async function fetchDashboardStats() {
    if (!isAdmin) return;
    
    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token") || localStorage.getItem("adminToken");
      
      const [partnersRes, consultationsRes, usersRes] = await Promise.allSettled([
        fetch(`${API_ENDPOINT}/api/partners?status=pending`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),
        fetch(`${API_ENDPOINT}/api/consultations?status=pending`),
        fetch(`${API_ENDPOINT}/api/auth/admin/users?limit=1`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
      ]);

      let pendingPartners = 0;
      let pendingConsultations = 0;
      let totalUsers = 0;

      // Get partners count
      if (partnersRes.status === "fulfilled" && partnersRes.value.ok) {
        const partnersData = await partnersRes.value.json();
        if (Array.isArray(partnersData)) {
          pendingPartners = partnersData.filter(p => p.status === "pending").length;
        } else if (partnersData.partners) {
          pendingPartners = partnersData.partners.filter(p => p.status === "pending").length;
        }
      }

      // Get consultations count
      if (consultationsRes.status === "fulfilled" && consultationsRes.value.ok) {
        const consultationsData = await consultationsRes.value.json();
        if (Array.isArray(consultationsData)) {
          pendingConsultations = consultationsData.filter(c => c.status === "pending").length;
        } else if (consultationsData.data) {
          pendingConsultations = consultationsData.data.filter(c => c.status === "pending").length;
        }
      }

      // Get users count
      if (usersRes.status === "fulfilled" && usersRes.value.ok) {
        const usersData = await usersRes.value.json();
        if (usersData.pagination?.totalUsers) {
          totalUsers = usersData.pagination.totalUsers;
        } else if (Array.isArray(usersData)) {
          totalUsers = usersData.length;
        } else if (usersData.users) {
          totalUsers = usersData.users.length;
        }
      }

      const pendingActions = pendingPartners + pendingConsultations;

      setStats({
        totalUsers,
        pendingActions,
        pendingPartners,
        pendingConsultations,
        totalRevenue: 2800000 // This would come from a separate API endpoint
      });

    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  }

  async function checkSystemStatus() {
    const endpoints = [
      { url: `${API_ENDPOINT}/api/health`, service: "Website" },
      { url: `${API_ENDPOINT}/api/partners?limit=1`, service: "Database" },
      { url: `${API_ENDPOINT}/api/consultations?limit=1`, service: "Payment Gateway" },
      // Email service check (you might have a different endpoint for this)
      { url: `${API_ENDPOINT}/api/health/email`, service: "Email Service" },
      { url: `${API_ENDPOINT}/api/logistics?limit=1`, service: "CDN" }
    ];

    const newStatus = [...systemStatus];

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const response = await fetch(endpoints[i].url, { method: 'HEAD' });
        newStatus[i] = {
          ...newStatus[i],
          status: response.ok ? "operational" : "degraded",
          color: response.ok ? "bg-green-500" : "bg-yellow-500"
        };
      } catch (error) {
        newStatus[i] = {
          ...newStatus[i],
          status: "offline",
          color: "bg-red-500"
        };
      }
      // Update state after each check to show progress
      setSystemStatus([...newStatus]);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between checks
    }
  }

  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  async function handleRefresh() {
    toast.loading("Refreshing dashboard data...");
    await Promise.all([
      fetchRecentActivity(),
      fetchDashboardStats(),
      checkSystemStatus()
    ]);
    toast.dismiss();
    toast.success("Dashboard refreshed!");
  }

  function handleActivityClick(activity) {
    if (!isAdmin) {
      toast.error('Admin privileges required');
      return;
    }
    // Navigate to the relevant section
    switch(activity.type) {
      case 'partnership':
        window.location.href = `/admin/partners?highlight=${activity.id}`;
        break;
      case 'consultation':
        window.location.href = `/admin/consultation?highlight=${activity.id}`;
        break;
      case 'user':
        window.location.href = `/admin/users?highlight=${activity.id}`;
        break;
      case 'logistics':
        window.location.href = `/admin/logistics?tracking=${activity.id}`;
        break;
      default:
        break;
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    router.push('/login');
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

  const quickStats = [
    { 
      label: "Total Users", 
      value: stats.totalUsers.toLocaleString(), 
      change: "+12%", 
      trend: "up",
      loading: loading.stats
    },
    { 
      label: "Pending Actions", 
      value: stats.pendingActions, 
      change: `+${stats.pendingActions > 0 ? stats.pendingActions : 0}`, 
      trend: stats.pendingActions > 0 ? "up" : "down",
      loading: loading.stats
    },
    { 
      label: "Monthly Revenue", 
      value: formatCurrency(stats.totalRevenue), 
      change: "+8%", 
      trend: "up",
      loading: loading.stats
    },
    { 
      label: "Active Partners", 
      value: stats.pendingPartners, 
      change: `+${stats.pendingPartners > 0 ? stats.pendingPartners : 0} new`, 
      trend: stats.pendingPartners > 0 ? "up" : "down",
      loading: loading.stats
    }
  ];

  // Show loading while checking auth
  if (loading.auth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authChecked || !isAdmin || !user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <HiExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in as an administrator to access the admin dashboard.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Go to Login
              </button>
              <button
                onClick={requestAdminAccess}
                className="w-full border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Request Admin Access
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-5 bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with User Info */}
        <div className="flex flex-col pt-28 lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Welcome back, {user.fullname || user.email}! Manage your Vendly platform.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HiRefresh className={`w-4 h-4 ${loading.activity || loading.stats ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-gray-700 font-medium">
                {user.role || user.userType || 'Administrator'}
              </p>
            </div>
            <div 
              onClick={handleLogout}
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90 transition-opacity"
              title="Logout"
            >
              {user.fullname?.charAt(0) || user.email?.charAt(0) || 'A'}
            </div>
             <Link
                          href="/admin"
                          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Back to Admin
                        </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  {stat.loading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-1"></div>
                  ) : (
                    <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className={`mt-3 h-1 rounded-full ${
                stat.trend === "up" ? "bg-green-500" : "bg-red-500"
              }`} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Actions Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Management Modules</h2>
                <span className="text-sm text-gray-500">
                  {adminCards.length} modules available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {adminCards.map((card, index) => (
                  <Link
                    key={index}
                    href={isAdmin ? card.href : '#'}
                    onClick={(e) => {
                      if (!isAdmin) {
                        e.preventDefault();
                        toast.error('Admin privileges required');
                      }
                    }}
                    className={`group p-4 md:p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${card.bgColor} ${card.borderColor} ${!isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 md:p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform`}>
                        <div className={`${card.textColor}`}>
                          {card.icon}
                        </div>
                      </div>
                      <span className={`text-xs md:text-sm font-semibold px-2 py-1 rounded-full ${card.bgColor} ${card.textColor}`}>
                        {typeof card.count === 'number' ? card.count.toLocaleString() : card.count}
                      </span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center text-xs md:text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                      {isAdmin ? 'Access module' : 'Admin access required'}
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                <button 
                  onClick={fetchRecentActivity}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {loading.activity ? "Loading..." : "Refresh"}
                </button>
              </div>
              <div className="space-y-4">
                {loading.activity ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3 p-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  ))
                ) : recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleActivityClick(activity)}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className="text-lg">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                          {activity.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <HiExclamationCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
              <button 
                onClick={() => isAdmin ? window.location.href = '/admin/activity' : toast.error('Admin privileges required')}
                className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View All Activity
              </button>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">System Status</h3>
                <button 
                  onClick={checkSystemStatus}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Check
                </button>
              </div>
              <div className="space-y-3">
                {systemStatus.map((system, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{system.service}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${system.color} ${system.status === 'checking' ? 'animate-pulse' : ''}`} />
                      <span className="text-xs text-gray-500 capitalize">
                        {system.status === 'checking' ? 'Checking...' : system.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-4 md:p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href={isAdmin ? "/admin/products/add" : "#"}
                  onClick={(e) => !isAdmin && (e.preventDefault(), toast.error('Admin privileges required'))}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>Add New Product</span>
                  <HiPlus className="w-4 h-4" />
                </Link>
                <Link
                  href={isAdmin ? "/admin/logistics?status=Order Created" : "#"}
                  onClick={(e) => !isAdmin && (e.preventDefault(), toast.error('Admin privileges required'))}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>View Today's Orders</span>
                  <HiShoppingBag className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => isAdmin ? toast.success("Report generation started!") : toast.error('Admin privileges required')}
                  className="flex items-center justify-between w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>Generate Report</span>
                  <HiChartBar className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (!isAdmin) {
                      toast.error('Admin privileges required');
                      return;
                    }
                    toast.loading("Starting system backup...");
                    setTimeout(() => toast.success("Backup completed!"), 2000);
                  }}
                  className="flex items-center justify-between w-full p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span>System Backup</span>
                  <HiCog className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}