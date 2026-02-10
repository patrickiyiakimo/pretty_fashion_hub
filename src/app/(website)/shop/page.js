"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/app/(website)/components/ProductCard";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sort: "createdAt"
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check authentication first
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Fetch products only after authentication check
  useEffect(() => {
    if (authChecked && user) {
      fetchProducts();
    }
  }, [filters, pagination.currentPage, authChecked, user]);

  const checkAuthentication = () => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      toast.error("Please login to access the shop");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setAuthChecked(true);
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => router.push("/login"), 1500);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);
      params.append('page', pagination.currentPage);
      params.append('limit', '12');

      const response = await fetch(`${API_ENDPOINT}/api/shop/products?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        // Token expired
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setTimeout(() => router.push("/login"), 1500);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        setProducts(data.products || []);
        setPagination(data.pagination || {});
      } else {
        console.error("Failed to fetch products:", data.error);
        toast.error(data.error || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const buildImageSrc = (imagePath) => {
    if (!imagePath) return "/images/placeholder-product.jpg";
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Handle proxy URLs
    if (imagePath.includes('/api/proxy-image/')) {
      const filename = imagePath.split('/api/proxy-image/')[1];
      return `${API_ENDPOINT}/api/proxy-image/${filename}`;
    }
    
    // Handle old /uploads/ URLs
    if (imagePath.startsWith('/uploads/')) {
      const filename = imagePath.replace('/uploads/', '');
      return `${API_ENDPOINT}/api/proxy-image/${filename}`;
    }
    
    // Default to proxy
    return `${API_ENDPOINT}/api/proxy-image/${imagePath}`;
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <section className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <Toaster position="top-right" />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-gray-600">Checking authentication...</p> */}
        </div>
      </section>
    );
  }

  // Show message if not logged in (though router should redirect)
  if (!user) {
    return (
      <section className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <Toaster position="top-right" />
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please login to access the shop</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  // Loading state for products
  if (loading && products.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 py-20">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading Products...</h1>
            <p className="text-gray-600">Welcome back, {user.fullname || user.email}!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4">
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
            Welcome back, <span className="font-semibold text-blue-600">{user.name || user.email}</span>!
          </p>
          <p className="text-gray-600">
            Discover amazing products from our curated collection and partner stores
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Clothing & Apparel">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Bags & Luggage">Bags</option>
                <option value="Jewelry">Jewelry</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-gray-600">
                {pagination.totalProducts} products found
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={{
                      ...product,
                      image: buildImageSrc(product.images?.[0]),
                      // Add any other transformations needed
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  );
}