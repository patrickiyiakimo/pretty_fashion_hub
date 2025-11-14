"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiSearch, 
  HiTruck, 
  HiCheckCircle, 
  HiClock, 
  HiExclamationCircle,
  // HiMapPin,
  HiCalendar,
  HiUser
} from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const statusConfig = {
  "Order Created": { color: "bg-blue-500", icon: HiCheckCircle, description: "Order confirmed and being processed" },
  "Processing": { color: "bg-purple-500", icon: HiClock, description: "Package being prepared for shipment" },
  "In Transit": { color: "bg-yellow-500", icon: HiTruck, description: "Package is on the way" },
  "Out for Delivery": { color: "bg-orange-500", icon: HiTruck, description: "Package out for delivery today" },
  "Delivered": { color: "bg-green-500", icon: HiCheckCircle, description: "Package successfully delivered" },
  "Delayed": { color: "bg-red-500", icon: HiExclamationCircle, description: "Delivery delayed" },
  "Exception": { color: "bg-red-600", icon: HiExclamationCircle, description: "Delivery exception occurred" }
};

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setShipment(null);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`${API_ENDPOINT}/api/logistics/track/${trackingNumber.trim()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Tracking failed. Please check your tracking number.");
      
      if (data.success) {
        setShipment(data.shipment);
      } else {
        throw new Error(data.error || "Shipment not found");
      }
    } catch (err) {
      setError(err.message);
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    return statusConfig[status] || { color: "bg-gray-500", icon: HiClock, description: "Status unknown" };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = (history = []) => {
    const statusOrder = ["Order Created", "Processing", "In Transit", "Out for Delivery", "Delivered"];
    const currentStatus = shipment?.currentStatus;
    const currentIndex = statusOrder.indexOf(currentStatus);
    return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
  };

  // Render icon component directly
  const renderStatusIcon = (status) => {
    const statusInfo = getStatusInfo(status);
    const IconComponent = statusInfo.icon;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-44 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HiTruck className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Track Your Shipment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number below to get real-time updates on your package location and delivery status
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100"
        >
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your tracking number (e.g., KWABC123DEFG)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !trackingNumber.trim()}
              className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                loading || !trackingNumber.trim()
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <HiSearch className="w-5 h-5" />
                  Track Package
                </>
              )}
            </button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3"
            >
              <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {searched && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-8"
            >
              {shipment ? (
                <>
                  {/* Shipment Overview Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Shipment Details
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <HiCalendar className="w-4 h-4" />
                            Created: {formatDate(shipment.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <HiUser className="w-4 h-4" />
                            Client: {shipment.clientName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Tracking Number</div>
                        <div className="text-2xl font-mono font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                          {shipment.trackingNumber}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Order Created</span>
                        <span>Delivered</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${getProgressPercentage(shipment.history)}%` }}
                        />
                      </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${getStatusInfo(shipment.currentStatus).color} text-white`}>
                          {renderStatusIcon(shipment.currentStatus)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            Current Status: {shipment.currentStatus}
                          </h3>
                          <p className="text-gray-600">
                            {getStatusInfo(shipment.currentStatus).description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Route Information */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <HiMapPin className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900">Origin</h4>
                        </div>
                        <p className="text-lg text-gray-800">{shipment.origin}</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <HiMapPin className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-900">Destination</h4>
                        </div>
                        <p className="text-lg text-gray-800">{shipment.destination}</p>
                      </div>
                    </div>

                    {/* Package Details */}
                    {(shipment.item || shipment.weight || shipment.dimensions) && (
                      <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4">Package Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          {shipment.item && (
                            <div>
                              <span className="text-gray-600">Item:</span>
                              <p className="font-medium">{shipment.item}</p>
                            </div>
                          )}
                          {shipment.weight && (
                            <div>
                              <span className="text-gray-600">Weight:</span>
                              <p className="font-medium">{shipment.weight}</p>
                            </div>
                          )}
                          {shipment.dimensions && (
                            <div>
                              <span className="text-gray-600">Dimensions:</span>
                              <p className="font-medium">{shipment.dimensions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tracking History */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-6 text-xl">Tracking History</h4>
                      <div className="space-y-4">
                        {shipment.history && shipment.history.length > 0 ? (
                          shipment.history.slice().reverse().map((event, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex gap-4"
                            >
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${getStatusInfo(event.status).color}`} />
                                {index < shipment.history.length - 1 && (
                                  <div className="w-0.5 h-full bg-gray-300 mt-1" />
                                )}
                              </div>
                              <div className="flex-1 pb-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-semibold text-gray-900">{event.status}</h5>
                                    <span className="text-sm text-gray-500">
                                      {formatDate(event.updatedAt)}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mb-2">
                                    <HiMapPin className="w-4 h-4 inline mr-1" />
                                    {event.location}
                                  </p>
                                  {event.notes && (
                                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                      {event.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No tracking history available yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // No results state
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <HiTruck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No shipment found
                  </h3>
                  <p className="text-gray-600">
                    Please check your tracking number and try again.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}