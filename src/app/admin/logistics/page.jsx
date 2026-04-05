"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiPlus, 
  HiRefresh, 
  HiTruck, 
  HiCheckCircle, 
  HiClock, 
  HiExclamationCircle,
  HiSearch,
  HiX,
  HiBan,
  HiClipboardCopy,
  HiLocationMarker,
  HiArrowRight,
  HiMap,
  HiCalendar
} from "react-icons/hi";
import toast from "react-hot-toast";

const API_URL = "";

const statusColors = {
  "Order Created": "bg-blue-100 text-blue-800",
  "Processing": "bg-purple-100 text-purple-800",
  "In Transit": "bg-yellow-100 text-yellow-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  "Delivered": "bg-green-100 text-green-800",
  "Delayed": "bg-red-100 text-red-800",
  "Exception": "bg-red-200 text-red-900"
};

export default function LogisticsPage() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Form states
  const [createForm, setCreateForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    origin: "",
    destination: "",
    item: "",
    weight: "",
    dimensions: "",
    shippingMethod: "Standard"
  });

  const [updateForm, setUpdateForm] = useState({
    trackingNumber: "",
    location: "",
    status: "In Transit",
    notes: ""
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", // This sends HTTP-only cookies
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log("User not authenticated");
          setIsAuthenticated(false);
          setAuthChecked(true);
          toast.error("Please login to access logistics");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
        return;
      }

      const data = await response.json();
      
      if (data.user) {
        setIsAuthenticated(true);
        setAuthChecked(true);
        // Load shipments after successful auth
        loadShipments();
      }
      
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setAuthChecked(true);
      toast.error("Authentication failed");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  async function loadShipments() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/logistics", {
        credentials: "include", // This sends HTTP-only cookies
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to load shipments: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.success) {
        setShipments(data.shipments || []);
      } else {
        toast.error(data.error || "Failed to load shipments");
      }
    } catch (e) {
      console.error("Load shipments failed:", e);
      setError(e.message);
      toast.error(e.message || "Failed to load shipments");
    } finally {
      setLoading(false);
    }
  }

  async function createShipment(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/logistics", {
        method: "POST",
        credentials: "include", // This sends HTTP-only cookies
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...createForm,
          currentLocation: createForm.origin
        }),
      });

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create shipment");
      
      setShipments(prev => [data.shipment, ...prev]);
      setShowCreateForm(false);
      setCreateForm({
        clientName: "", clientEmail: "", clientPhone: "", origin: "", 
        destination: "", item: "", weight: "", dimensions: "", shippingMethod: "Standard"
      });
      
      toast.success(`Shipment created! Tracking: ${data.shipment.trackingNumber}`);
    } catch (e) {
      setError(e.message);
      toast.error(e.message || "Failed to create shipment");
    } finally {
      setLoading(false);
    }
  }

  async function updateShipment(e) {
    e.preventDefault();
    if (!updateForm.trackingNumber || !updateForm.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`/api/logistics/${updateForm.trackingNumber}`, {
        method: "PUT",
        credentials: "include", // This sends HTTP-only cookies
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateForm),
      });

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update shipment");
      
      setShipments(prev => prev.map(s => 
        s.trackingNumber === data.shipment.trackingNumber ? data.shipment : s
      ));
      setShowUpdateForm(false);
      setUpdateForm({ trackingNumber: "", location: "", status: "In Transit", notes: "" });
      
      toast.success(`Shipment ${data.shipment.trackingNumber} updated!`);
    } catch (e) {
      setError(e.message);
      toast.error(e.message || "Failed to update shipment");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats Overview */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <HiTruck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Logistics Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage shipments and track package delivery status
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <HiPlus className="w-5 h-5" />
                Create Shipment
              </button>
              <button
                onClick={loadShipments}
                disabled={loading}
                className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                <HiRefresh className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{shipments.length}</p>
                  <p className="text-sm text-gray-500">Total Shipments</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HiTruck className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {shipments.filter(s => s.currentStatus === "In Transit" || s.currentStatus === "Processing").length}
                  </p>
                  <p className="text-sm text-gray-500">In Transit</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <HiClock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {shipments.filter(s => s.currentStatus === "Delivered").length}
                  </p>
                  <p className="text-sm text-gray-500">Delivered</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HiCheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {shipments.filter(s => s.currentStatus === "Delayed" || s.currentStatus === "Exception").length}
                  </p>
                  <p className="text-sm text-gray-500">Delayed/Exception</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <HiBan className="w-5 h-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 text-red-700 mb-6 shadow-sm">
            <div className="flex items-center gap-2">
              <HiBan className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by tracking number, client name, or destination..."
                // value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              // value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Order Created">Order Created</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
              <option value="Exception">Exception</option>
            </select>
          </div>
        </div>

        {/* Shipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiTruck className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No shipments yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Create your first shipment to start tracking deliveries
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <HiPlus className="w-5 h-5" />
                Create Shipment
              </button>
            </div>
          ) : (
            shipments.map((shipment, index) => (
              <motion.div
                key={shipment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Status Bar */}
                <div className={`h-1 w-full ${statusColors[shipment.currentStatus]?.split(' ')[0] || 'bg-blue-600'}`} />
                
                <div className="p-5">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                          {shipment.item || "Shipment Package"}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">{shipment.clientName}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[shipment.currentStatus] || 'bg-gray-100 text-gray-700'}`}>
                      {shipment.currentStatus}
                    </span>
                  </div>

                  {/* Tracking Number with Copy */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-3 mb-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                        <p className="font-mono font-bold text-blue-600 text-sm">
                          {shipment.trackingNumber}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shipment.trackingNumber);
                          toast.success("Tracking number copied!");
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy tracking number"
                      >
                        <HiClipboardCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Route Visualization */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <HiLocationMarker className="w-3 h-3 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Origin</p>
                        <p className="text-sm font-medium text-gray-900">{shipment.origin}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <HiArrowRight className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-gray-200" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <HiMap className="w-3 h-3 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Destination</p>
                        <p className="text-sm font-medium text-gray-900">{shipment.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="bg-blue-50/50 rounded-lg p-2.5 mb-4 border border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <HiLocationMarker className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Current Location</p>
                        <p className="text-sm font-medium text-blue-700">{shipment.currentLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        setUpdateForm({
                          trackingNumber: shipment.trackingNumber,
                          location: shipment.currentLocation,
                          status: shipment.currentStatus,
                          notes: ""
                        });
                        setShowUpdateForm(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm shadow-sm"
                    >
                      Update Status
                    </button>
                  </div>
                </div>

                {/* Footer with Date */}
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-500">
                      <HiCalendar className="w-3 h-3" />
                      <span>Created {formatDate(shipment.createdAt)}</span>
                    </div>
                    {shipment.estimatedDelivery && (
                      <div className="text-gray-500">
                        Est. delivery: {formatDate(shipment.estimatedDelivery)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Create Shipment Modal - Improved */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowCreateForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Create New Shipment</h2>
                      <p className="text-sm text-gray-500 mt-1">Fill in the details to create a shipment</p>
                    </div>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <HiX size={18} />
                    </button>
                  </div>
                </div>

                <form onSubmit={createShipment} className="p-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.clientName}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, clientName: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter client name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Email
                      </label>
                      <input
                        type="email"
                        value={createForm.clientEmail}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, clientEmail: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="client@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origin <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.origin}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, origin: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.destination}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Note:</span> A unique tracking number will be automatically generated for this shipment.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Creating...
                        </div>
                      ) : (
                        "Create Shipment"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Shipment Modal - Improved */}
        <AnimatePresence>
          {showUpdateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowUpdateForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Update Shipment</h2>
                      <p className="text-sm text-gray-500 mt-1">Update tracking information</p>
                    </div>
                    <button
                      onClick={() => setShowUpdateForm(false)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      <HiX size={18} />
                    </button>
                  </div>
                </div>

                <form onSubmit={updateShipment} className="p-6 space-y-5">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                    <p className="font-mono font-bold text-blue-600">{updateForm.trackingNumber}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={updateForm.location}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter current location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={updateForm.status}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="Order Created">📦 Order Created</option>
                      <option value="Processing">⚙️ Processing</option>
                      <option value="In Transit">🚚 In Transit</option>
                      <option value="Out for Delivery">🚛 Out for Delivery</option>
                      <option value="Delivered">✅ Delivered</option>
                      <option value="Delayed">⏰ Delayed</option>
                      <option value="Exception">⚠️ Exception</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={updateForm.notes}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Add delivery notes or comments..."
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Update Shipment
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowUpdateForm(false)}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 border border-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}