"use client";

import Link from "next/link";
import { 
  HiUserGroup, 
  HiCalendar, 
  HiChartBar, 
  HiCog, 
  HiShoppingBag,
  HiUsers,
  HiTicket,
  HiChat
} from "react-icons/hi";
import { FaCarSide } from "react-icons/fa";

export default function AdminDashboard() {
  const adminCards = [
    {
      icon: <HiUserGroup className="w-8 h-8" />,
      title: "Partnership Applications",
      description: "Manage partnership requests and applications from potential collaborators",
      href: "/admin/partners",
      count: "24",
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <HiCalendar className="w-8 h-8" />,
      title: "Consultation Bookings",
      description: "View and manage all style consultation appointments and bookings",
      href: "/admin/consultation",
      count: "15",
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: <HiUsers className="w-8 h-8" />,
      title: "User Management",
      description: "Manage customer accounts, permissions, and user data",
      href: "/admin/users",
      count: "1,247",
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <HiShoppingBag className="w-8 h-8" />,
      title: "Product Management",
      description: "Add, edit, and manage products in your catalog",
      href: "/admin/products",
      count: "156",
      color: "bg-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: <HiChartBar className="w-8 h-8" />,
      title: "Analytics & Reports",
      description: "View sales analytics, customer insights, and business reports",
      href: "/admin/analytics",
      count: "12",
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      icon: <HiTicket className="w-8 h-8" />,
      title: "Logistics & Transactions",
      description: "Process logistics, orders, manage shipments, and handle transactions",
      href: "/admin/logistics",
      count: "89",
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: <HiChat className="w-8 h-8" />,
      title: "Customer Support",
      description: "Manage customer inquiries, feedback, and support tickets",
      href: "/admin/support",
      count: "34",
      color: "bg-pink-500",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      icon: <HiCog className="w-8 h-8" />,
      title: "System Settings",
      description: "Configure website settings, payment methods, and preferences",
      href: "/admin/settings",
      count: "8",
      color: "bg-gray-500",
      textColor: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
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

  const quickStats = [
    { label: "Total Users", value: "1,247", change: "+12%", trend: "up" },
    { label: "Pending Actions", value: "23", change: "+3", trend: "up" },
    { label: "Monthly Revenue", value: "₦2.8M", change: "+8%", trend: "up" },
    { label: "Conversion Rate", value: "4.2%", change: "+0.3%", trend: "up" }
  ];

  const recentActivity = [
    { action: "New partnership application", time: "2 min ago", user: "Fashion Retail Co." },
    { action: "Consultation booking confirmed", time: "5 min ago", user: "Sarah Johnson" },
    { action: "New user registration", time: "10 min ago", user: "mike.adebayo@email.com" },
    { action: "Order #KW-2847 shipped", time: "15 min ago", user: "Customer" },
    { action: "Product inventory updated", time: "20 min ago", user: "System" }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Manage your Kingz World platform from one centralized location.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last login</p>
              <p className="text-gray-700 font-medium">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              KW
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Actions Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Management Modules</h2>
                <span className="text-sm text-gray-500">
                  {adminCards.length} modules available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminCards.map((card, index) => (
                  <Link
                    key={index}
                    href={card.href}
                    className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${card.bgColor} ${card.borderColor}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${card.bgColor} group-hover:scale-110 transition-transform`}>
                        <div className={`${card.textColor}`}>
                          {card.icon}
                        </div>
                      </div>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${card.bgColor} ${card.textColor}`}>
                        {card.count}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {card.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {card.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                      Access module
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                View All Activity
              </button>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { service: "Website", status: "operational", color: "bg-green-500" },
                  { service: "Database", status: "operational", color: "bg-green-500" },
                  { service: "Payment Gateway", status: "operational", color: "bg-green-500" },
                  { service: "Email Service", status: "degraded", color: "bg-yellow-500" },
                  { service: "CDN", status: "operational", color: "bg-green-500" }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{system.service}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${system.color}`} />
                      <span className="text-xs text-gray-500 capitalize">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  Add New Product
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  View Today's Orders
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  Generate Report
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  System Backup
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Kingz World Admin Panel • Version 2.1.0 • 
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}