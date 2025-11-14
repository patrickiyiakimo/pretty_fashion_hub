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
  HiX
} from "react-icons/hi";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

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

  useEffect(() => {
    loadShipments();
  }, []);

  async function loadShipments() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
        headers: { 
          Authorization: token ? `Bearer ${token}` : "",
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) toast.error("Failed to load shipments");
      
      const data = await res.json();
      if (data.success) {
        setShipments(data.shipments || []);
      } else {
        toast.error(data.error || "Failed to load shipments");
      }
    } catch (e) {
      console.error("Load shipments failed:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createShipment(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: token ? `Bearer ${token}` : "" 
        },
        body: JSON.stringify({
          ...createForm,
          currentLocation: createForm.origin
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create shipment");
      
      setShipments(prev => [data.shipment, ...prev]);
      setShowCreateForm(false);
      setCreateForm({
        clientName: "", clientEmail: "", clientPhone: "", origin: "", 
        destination: "", item: "", weight: "", dimensions: "", shippingMethod: "Standard"
      });
      
      alert(`Shipment created! Tracking: ${data.shipment.trackingNumber}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateShipment(e) {
    e.preventDefault();
    if (!updateForm.trackingNumber || !updateForm.location) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${API_ENDPOINT}/api/logistics/${updateForm.trackingNumber}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: token ? `Bearer ${token}` : "" 
        },
        body: JSON.stringify(updateForm),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update shipment");
      
      setShipments(prev => prev.map(s => 
        s.trackingNumber === data.shipment.trackingNumber ? data.shipment : s
      ));
      setShowUpdateForm(false);
      setUpdateForm({ trackingNumber: "", location: "", status: "In Transit", notes: "" });
      
      alert(`Shipment ${data.shipment.trackingNumber} updated!`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-44 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              📦 Logistics Management
            </h1>
            <p className="text-gray-600">
              Manage shipments and track package delivery status
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <HiPlus className="w-5 h-5" />
              Create Shipment
            </button>
            <button
              onClick={loadShipments}
              disabled={loading}
              className="bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center gap-2"
            >
              <HiRefresh className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Shipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <HiTruck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No shipments yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first shipment to get started
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Shipment
              </button>
            </div>
          ) : (
            shipments.map((shipment) => (
              <motion.div
                key={shipment._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {shipment.item || "Shipment"}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {shipment.clientName}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[shipment.currentStatus]}`}>
                      {shipment.currentStatus}
                    </span>
                  </div>

                  {/* Tracking Number */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-sm text-gray-600 mb-1">Tracking Number</div>
                    <div className="font-mono font-bold text-blue-600 text-lg">
                      {shipment.trackingNumber}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">From:</span>
                      <span className="font-medium">{shipment.origin}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium">{shipment.destination}</span>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-gray-600">Current Location:</span>
                    <span className="font-medium text-blue-600">{shipment.currentLocation}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
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
                      className="flex-1 bg-blue-50 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(shipment.trackingNumber);
                        alert('Tracking number copied!');
                      }}
                      className="flex-1 bg-gray-50 text-gray-600 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    >
                      Copy Track ID
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Created {formatDate(shipment.createdAt)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Create Shipment Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowCreateForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Shipment</h2>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HiX size={24} />
                    </button>
                  </div>
                </div>

                <form onSubmit={createShipment} className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.clientName}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, clientName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Origin *
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.origin}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, origin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination *
                      </label>
                      <input
                        type="text"
                        required
                        value={createForm.destination}
                        onChange={(e) => setCreateForm(prev => ({ ...prev, destination: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      {loading ? "Creating..." : "Create Shipment"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Shipment Modal */}
        <AnimatePresence>
          {showUpdateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowUpdateForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Update Shipment</h2>
                    <button
                      onClick={() => setShowUpdateForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <HiX size={24} />
                    </button>
                  </div>
                </div>

                <form onSubmit={updateShipment} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={updateForm.trackingNumber}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={updateForm.location}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={updateForm.status}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Order Created">Order Created</option>
                      <option value="Processing">Processing</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Exception">Exception</option>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                      {loading ? "Updating..." : "Update Shipment"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
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