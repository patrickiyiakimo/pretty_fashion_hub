"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  HiShoppingBag, 
  HiClock, 
  HiCheckCircle, 
  HiXCircle,
  HiTruck,
  HiPackage,
  HiEye,
  HiChevronDown,
  HiChevronUp,
  HiRefresh
} from "react-icons/hi";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/orders", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 401) {
        toast.error("Please login to view your orders");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      const ordersData = data.orders || data.data || data;
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const statusMap = {
      pending: { 
        icon: HiClock, 
        color: "bg-yellow-100 text-yellow-800",
        label: "Pending",
        progress: 25
      },
      processing: { 
        icon: HiPackage, 
        color: "bg-blue-100 text-blue-800",
        label: "Processing",
        progress: 50
      },
      shipped: { 
        icon: HiTruck, 
        color: "bg-purple-100 text-purple-800",
        label: "Shipped",
        progress: 75
      },
      delivered: { 
        icon: HiCheckCircle, 
        color: "bg-green-100 text-green-800",
        label: "Delivered",
        progress: 100
      },
      cancelled: { 
        icon: HiXCircle, 
        color: "bg-red-100 text-red-800",
        label: "Cancelled",
        progress: 0
      }
    };
    return statusMap[status?.toLowerCase()] || statusMap.pending;
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status?.toLowerCase() === filter.toLowerCase();
  });

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/placeholder-product.jpg";
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/api/proxy-image/${imagePath.split('/').pop()}`;
  };

  if (loading) {
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

  return (
    <div className="min-h-screen font-oswald pt-32 pb-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
            <HiShoppingBag className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
              My Orders
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            Track and manage all your orders in one place
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                filter === status
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {status === "all" ? "All Orders" : status}
            </button>
          ))}
        </motion.div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            <HiRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter !== "all" 
                ? `You don't have any ${filter} orders.`
                : "You haven't placed any orders yet."}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}

        {/* Orders List */}
        {filteredOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredOrders.map((order, index) => {
                const StatusIcon = getStatusConfig(order.status).icon;
                const statusConfig = getStatusConfig(order.status);
                
                return (
                  <motion.div
                    key={order._id || order.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <div 
                      className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleOrderExpand(order._id || order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-medium text-gray-500">
                              Order #{order.orderNumber || (order._id?.slice(-8))}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Placed on {formatDate(order.createdAt)}
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Total Amount</div>
                            <div className="font-bold text-gray-900">
                              {formatPrice(order.totalAmount || order.total)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Items</div>
                            <div className="font-medium text-gray-900">
                              {order.items?.length || 0}
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-orange-600 transition-colors">
                            {expandedOrder === (order._id || order.id) ? (
                              <HiChevronUp className="w-5 h-5" />
                            ) : (
                              <HiChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar (for non-cancelled orders) */}
                      {order.status?.toLowerCase() !== "cancelled" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Order Placed</span>
                            <span>Processing</span>
                            <span>Shipped</span>
                            <span>Delivered</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${statusConfig.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded Order Details */}
                    <AnimatePresence>
                      {expandedOrder === (order._id || order.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100 bg-gray-50"
                        >
                          <div className="p-5 space-y-6">
                            {/* Order Items */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                              <div className="space-y-3">
                                {(order.items || []).map((item, idx) => (
                                  <div key={idx} className="flex gap-4 bg-white rounded-xl p-3 border border-gray-100">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                      <Image
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.src = "/images/placeholder-product.jpg";
                                        }}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-medium text-gray-900">{item.name}</h5>
                                      <div className="flex justify-between items-center mt-1">
                                        <div className="text-sm text-gray-500">
                                          Qty: {item.quantity}
                                        </div>
                                        <div className="font-semibold text-gray-900">
                                          {formatPrice(item.price)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                              <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Subtotal</span>
                                  <span className="text-gray-900">{formatPrice(order.subtotal || order.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Shipping</span>
                                  <span className="text-gray-900">
                                    {order.shippingCost > 0 ? formatPrice(order.shippingCost) : "FREE"}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Tax (7.5%)</span>
                                  <span className="text-gray-900">{formatPrice(order.tax || 0)}</span>
                                </div>
                                <div className="border-t border-gray-100 pt-2 mt-2">
                                  <div className="flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-orange-600">{formatPrice(order.totalAmount || order.total)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Shipping Information */}
                            {order.shippingAddress && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                  <p className="text-gray-800 font-medium">{order.shippingAddress.fullName}</p>
                                  <p className="text-gray-600 text-sm mt-1">{order.shippingAddress.address}</p>
                                  <p className="text-gray-600 text-sm">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                  </p>
                                  <p className="text-gray-600 text-sm mt-2">Phone: {order.shippingAddress.phone}</p>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              {order.status?.toLowerCase() === "pending" && (
                                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                                  Cancel Order
                                </button>
                              )}
                              {order.status?.toLowerCase() === "delivered" && (
                                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                                  Write a Review
                                </button>
                              )}
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                Track Order
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}