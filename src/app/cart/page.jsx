"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create a unique key for each cart item to prevent duplicates
  const getUniqueKey = (item) => {
    return `${item._id || item.id}-${item.productId || ''}-${item.name || ''}`;
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Discover amazing products and fill your cart with style.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Shopping
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600 text-lg">Review your items and proceed to checkout</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Cart Items ({cart.length})
                  </h2>
                  <span className="text-sm text-gray-600">
                    Total: <strong>₦{total.toLocaleString()}</strong>
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="popLayout">
                  {cart.map((item, index) => (
                    <motion.div
                      key={getUniqueKey(item)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 
                      }}
                      layout
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                            <Image
                              src={item.image || "/images/placeholder-product.jpg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                                {item.name}
                              </h3>
                              <p className="text-xl font-bold text-purple-600">
                                ₦{item.price?.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Unit price
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item._id || item.id)}
                              className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 hover:bg-red-50 rounded-lg ml-2"
                              aria-label="Remove item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm">
                                <button
                                  onClick={() => updateQuantity(item._id || item.id, Math.max(1, item.quantity - 1))}
                                  className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="px-4 py-2 text-sm font-semibold text-gray-900 min-w-[3rem] text-center border-l border-r border-gray-200">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ₦{((item.price || 0) * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                Total
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8"
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Items ({cart.length})</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-2xl text-purple-600">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Link href="/checkout">
                    <button className="w-full mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Proceed to Checkout
                    </button>
                  </Link>
                  
                  <Link href="/shop">
                    <button className="w-full border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Continue Shopping
                    </button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs text-gray-600">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-xs text-gray-600">Free Shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}