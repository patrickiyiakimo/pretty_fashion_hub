// "use client";
// import { useState } from "react";
// import ProductCard from "@/components/ProductCard";
// import { allProducts } from "@/common/ProductsContainer";
// import { useCart } from "@/context/CartContext";

// export default function ShopPage() {
//   const { addToCart } = useCart();
//   const [products] = useState(allProducts);

//   return (
//     <section className="py-24 px-3 md:px-12 bg-white/5 backdrop-blur-sm min-h-screen">
//       <h1 className="text-4xl font-satisfy font-extrabold text-purple-500 mb-12 text-center">
//         Our Products
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onAddToCart={addToCart}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import ProductCard from "@/components/ProductCard";

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

// export default function ShopPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: "",
//     search: "",
//     minPrice: "",
//     maxPrice: "",
//     sort: "createdAt"
//   });
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalProducts: 0
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, [filters, pagination.currentPage]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
//       if (filters.category) params.append('category', filters.category);
//       if (filters.search) params.append('search', filters.search);
//       if (filters.minPrice) params.append('minPrice', filters.minPrice);
//       if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
//       if (filters.sort) params.append('sort', filters.sort);
//       params.append('page', pagination.currentPage);
//       params.append('limit', '12');

//       const response = await fetch(`${API_ENDPOINT}/api/shop/products?${params}`);
//       const data = await response.json();

//       if (response.ok) {
//         setProducts(data.products || []);
//         setPagination(data.pagination || {});
//       } else {
//         console.error("Failed to fetch products:", data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//     setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
//   };

//   const buildImageSrc = (imagePath) => {
//     if (!imagePath) return "/images/placeholder-product.jpg";
    
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }
    
//     // Remove leading slash if present
//     const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
//     return `${API_ENDPOINT}/${cleanPath}`;
//   };

//   if (loading && products.length === 0) {
//     return (
//       <section className="min-h-screen bg-gray-50 py-20">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Loading Products...</h1>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="animate-pulse bg-white rounded-2xl p-4">
//                 <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-50 py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Shop All Products
//           </h1>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Discover amazing products from our curated collection and partner stores
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* Search */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange('search', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             {/* Category */}
//             <div>
//               <select
//                 value={filters.category}
//                 onChange={(e) => handleFilterChange('category', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">All Categories</option>
//                 <option value="Clothing & Apparel">Clothing</option>
//                 <option value="Footwear">Footwear</option>
//                 <option value="Accessories">Accessories</option>
//                 <option value="Bags & Luggage">Bags</option>
//                 <option value="Jewelry">Jewelry</option>
//               </select>
//             </div>

//             {/* Sort */}
//             <div>
//               <select
//                 value={filters.sort}
//                 onChange={(e) => handleFilterChange('sort', e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="createdAt">Newest First</option>
//                 <option value="price">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="name">Name: A to Z</option>
//               </select>
//             </div>

//             {/* Results Count */}
//             <div className="flex items-center justify-end">
//               <span className="text-gray-600">
//                 {pagination.totalProducts} products found
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {products.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
//               {products.map((product, index) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <ProductCard 
//                     product={{
//                       ...product,
//                       image: buildImageSrc(product.images?.[0]),
//                       // Add any other transformations needed
//                     }}
//                   />
//                 </motion.div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex justify-center gap-2">
//                 <button
//                   onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
//                   disabled={pagination.currentPage === 1}
//                   className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
                
//                 <span className="px-4 py-2 text-gray-600">
//                   Page {pagination.currentPage} of {pagination.totalPages}
//                 </span>
                
//                 <button
//                   onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
//                   disabled={pagination.currentPage === pagination.totalPages}
//                   className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-6xl mb-4">🛍️</div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
//             <p className="text-gray-600">Try adjusting your filters or search terms</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

// Helper function to properly handle image URLs
const normalizeImageUrl = (imagePath, apiEndpoint = API_ENDPOINT) => {
  // If no image path, return placeholder
  if (!imagePath || imagePath === "" || imagePath === "null" || imagePath === "undefined") {
    return "/images/placeholder-product.jpg";
  }

  // If it's already a full URL, return as-is
  if (typeof imagePath === "string" && (imagePath.startsWith('http://') || imagePath.startsWith('https://'))) {
    return imagePath;
  }

  // If it's a base64 image
  if (typeof imagePath === "string" && imagePath.startsWith('data:image')) {
    return imagePath;
  }

  // Handle array of images
  if (Array.isArray(imagePath)) {
    return normalizeImageUrl(imagePath[0] || imagePath, apiEndpoint);
  }

  // If it's an object with url property
  if (typeof imagePath === "object" && imagePath !== null && imagePath.url) {
    return normalizeImageUrl(imagePath.url, apiEndpoint);
  }

  // If it's a relative path, prepend API endpoint
  if (typeof imagePath === "string") {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Check if it looks like a file path (has extension)
    const hasExtension = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(cleanPath);
    
    if (hasExtension) {
      // For local server paths, construct proper URL
      return `${apiEndpoint.replace(/\/$/, '')}/${cleanPath}`;
    } else {
      // If it doesn't look like a proper file path, return placeholder
      console.warn("Invalid image path format:", imagePath);
      return "/images/placeholder-product.jpg";
    }
  }

  // Fallback to placeholder
  return "/images/placeholder-product.jpg";
};

// Cache for processed images to avoid re-processing
const imageCache = new Map();

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

  // Memoized function to process product images
  const processProductImages = useCallback((product) => {
    const cacheKey = `${product._id}_${JSON.stringify(product.images)}`;
    
    if (imageCache.has(cacheKey)) {
      return imageCache.get(cacheKey);
    }

    // Process the product with normalized images
    const processedProduct = {
      ...product,
      // Handle single image or array of images
      image: normalizeImageUrl(product.images?.[0] || product.image || product.mainImage),
      // Preserve all images if needed
      allImages: Array.isArray(product.images) 
        ? product.images.map(img => normalizeImageUrl(img))
        : [normalizeImageUrl(product.image || product.mainImage)]
    };

    imageCache.set(cacheKey, processedProduct);
    return processedProduct;
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);
      params.append('page', pagination.currentPage.toString());
      params.append('limit', '12');

      const response = await fetch(`${API_ENDPOINT}/api/shop/products?${params}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch products:", response.status, errorText);
        toast.error("Failed to load products. Please try again.");
        return;
      }

      const data = await response.json();
      console.log("Products API Response:", data); // Debug log

      if (data.products && Array.isArray(data.products)) {
        // Process each product to ensure proper image URLs
        const processedProducts = data.products.map(processProductImages);
        setProducts(processedProducts);
        
        // Set pagination data
        if (data.pagination) {
          setPagination({
            currentPage: data.pagination.currentPage || 1,
            totalPages: data.pagination.totalPages || 1,
            totalProducts: data.pagination.totalProducts || processedProducts.length
          });
        } else {
          // Fallback pagination
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalProducts: processedProducts.length
          });
        }
      } else {
        console.warn("No products found or invalid response format:", data);
        setProducts([]);
        toast.warning("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Network error. Please check your connection.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      search: "",
      minPrice: "",
      maxPrice: "",
      sort: "createdAt"
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Clear image cache on page change or filter change
  useEffect(() => {
    return () => {
      imageCache.clear();
    };
  }, []);

  if (loading && products.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
          </div>
          
          {/* Loading Filters */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Loading Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing products from our curated collection and partner stores
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter Products</h2>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              >
                <option value="">All Categories</option>
                <option value="Clothing & Apparel">Clothing & Apparel</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Bags & Luggage">Bags & Luggage</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Electronics">Electronics</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="md:flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  min="0"
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  min="0"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              >
                <option value="createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
                <option value="-rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="md:col-span-3 flex items-center justify-between">
              <div className="text-gray-600">
                Showing {products.length} of {pagination.totalProducts} products
              </div>
              <div className="text-sm text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <ProductCard 
                    product={product}
                    onImageError={(e) => {
                      console.warn("Image failed to load:", product.image);
                      e.target.src = "/images/placeholder-product.jpg";
                      e.target.onerror = null; // Prevent infinite loop
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-gray-200">
                <div className="text-gray-600">
                  Showing page {pagination.currentPage} of {pagination.totalPages}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    ← Previous
                  </button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: pageNum }))}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            pagination.currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}