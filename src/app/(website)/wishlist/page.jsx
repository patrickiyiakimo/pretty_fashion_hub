"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  HiHeart, 
  HiTrash, 
  HiShoppingBag, 
  HiStar,
  HiOutlineShoppingBag,
  HiX
} from "react-icons/hi";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  // Fetch wishlist on mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/wishlist", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 401) {
        toast.error("Please login to view your wishlist");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      const wishlistData = data.wishlist || data.data || data;
      setWishlist(Array.isArray(wishlistData) ? wishlistData : []);
      
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    setRemovingId(productId);
    
    try {
      const response = await fetch("/api/wishlist/remove", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      });

      if (response.status === 401) {
        toast.error("Please login to manage wishlist");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist");
      }

      setWishlist(prev => prev.filter(item => item._id !== productId && item.productId !== productId));
      toast.success("Removed from wishlist");
      
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    } finally {
      setTimeout(() => setRemovingId(null), 300);
    }
  };

  const addToCart = async (product) => {
    setAddingToCart(product._id || product.productId);
    
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product._id || product.productId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
        })
      });

      if (response.status === 401) {
        toast.error("Please login to add to cart");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      toast.success("Added to cart!");
      
      // Optional: Remove from wishlist after adding to cart
      // await removeFromWishlist(product._id || product.productId);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setTimeout(() => setAddingToCart(null), 500);
    }
  };

  const moveAllToCart = async () => {
    if (wishlist.length === 0) return;
    
    toast.loading("Moving items to cart...", { id: "moveAll" });
    
    try {
      const results = await Promise.all(
        wishlist.map(item => 
          fetch("/api/cart/add", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: item._id || item.productId,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: 1
            })
          })
        )
      );
      
      const allSuccessful = results.every(res => res.ok);
      
      if (allSuccessful) {
        toast.success(`Added ${wishlist.length} items to cart`, { id: "moveAll" });
        // Optional: Clear wishlist after moving
        // await clearWishlist();
      } else {
        toast.error("Some items failed to add", { id: "moveAll" });
      }
      
    } catch (error) {
      console.error("Error moving all to cart:", error);
      toast.error("Failed to move items", { id: "moveAll" });
    }
  };

  const clearWishlist = async () => {
    if (!confirm("Are you sure you want to clear your entire wishlist?")) return;
    
    try {
      const response = await fetch("/api/wishlist/clear", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to clear wishlist");
      }

      setWishlist([]);
      toast.success("Wishlist cleared");
      
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast.error("Failed to clear wishlist");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder-image";
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
            <HiHeart className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
              My Wishlist
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Saved Items
          </h1>
          <p className="text-gray-600">
            Products you've saved for later
          </p>
        </motion.div>

        {/* Wishlist Stats Bar */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <HiHeart className="w-5 h-5 text-orange-600" />
              <span className="text-gray-700">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={moveAllToCart}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                <HiShoppingBag className="w-4 h-4" />
                Move All to Cart
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
              >
                <HiTrash className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty Wishlist State */}
        {wishlist.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiHeart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save your favorite items here by clicking the heart icon on any product.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <HiOutlineShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item._id || item.productId || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  layout
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    removingId === (item._id || item.productId) ? 'opacity-50' : ''
                  }`}
                >
                  {/* Product Image */}
                  <Link href={`/product/${item._id || item.productId}`}>
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/images/placeholder-product.jpg";
                        }}
                      />
                      
                      {/* Remove Button (Mobile) */}
                      <button
                        onClick={() => removeFromWishlist(item._id || item.productId)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 transition-colors sm:hidden"
                        aria-label="Remove from wishlist"
                      >
                        <HiX className="w-4 h-4 text-red-500" />
                      </button>
                      
                      {/* Sale Badge (if applicable) */}
                      {item.discount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          -{item.discount}%
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/product/${item._id || item.productId}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-orange-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {/* Rating */}
                    {item.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <HiStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({item.reviewCount || 0})
                        </span>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="mb-3">
                      <span className="text-xl font-bold text-orange-600">
                        ₦{item.price?.toLocaleString()}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₦{item.originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        disabled={addingToCart === (item._id || item.productId)}
                        className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingToCart === (item._id || item.productId) ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <HiShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => removeFromWishlist(item._id || item.productId)}
                        className="hidden sm:flex p-2 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <HiTrash className="w-4 h-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}