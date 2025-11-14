"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiPlus, 
  HiPhotograph, 
  HiTrash, 
  HiPencil, 
  HiX,
  HiCheckCircle,
  HiExclamationCircle
} from "react-icons/hi";
import toast from "react-hot-toast";

export default function PartnerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

  // Categories for dropdown
  const categories = [
    "Clothing & Apparel",
    "Footwear", 
    "Accessories",
    "Bags & Luggage",
    "Jewelry",
    "Watches",
    "Beauty & Cosmetics",
    "Home & Living",
    "Other"
  ];

  // 🔐 Load and validate token on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Authentication required. Redirecting...");
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }
    fetchProducts(token);
    
    // Cleanup preview on unmount
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, []);

  // 🛍️ Fetch partner products
  const fetchProducts = async (token) => {
    try {
      setFetching(true);
      const res = await fetch(`${API_ENDPOINT}/api/partners/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        throw new Error("Authentication expired");
      }

      const data = await res.json();
      
      if (res.ok) {
        setProducts(Array.isArray(data) ? data : data.products || []);
      } else {
        throw new Error(data.error || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.message === "Authentication expired") {
        toast.error("Session expired. Please login again.");
        localStorage.clear();
        setTimeout(() => window.location.href = "/login", 2000);
      } else {
        toast.error(error.message || "Failed to load products");
      }
    } finally {
      setFetching(false);
    }
  };

  // ✏️ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files?.[0] || null;
      setNewProduct((p) => ({ ...p, imageFile: file }));
      
      // Cleanup previous preview
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
      // Create new preview
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      setNewProduct((p) => ({ ...p, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("accessToken");
  if (!token) {
    toast.error("Authentication required");
    return;
  }

  // Validation
  if (!newProduct.name.trim() || !newProduct.price || !newProduct.description.trim()) {
    toast.error("Please fill in all required fields");
    return;
  }

  if (parseFloat(newProduct.price) <= 0) {
    toast.error("Price must be greater than 0");
    return;
  }

  if (!newProduct.imageFile && !editingProduct) {
    toast.error("Please select a product image");
    return;
  }

  const formData = new FormData();
  formData.append("name", newProduct.name.trim());
  formData.append("price", String(newProduct.price));
  formData.append("description", newProduct.description.trim());
  formData.append("category", newProduct.category || "Other");
  formData.append("stock", String(newProduct.stock || 1));
  
  if (newProduct.imageFile) {
    formData.append("imageFile", newProduct.imageFile);
    console.log('📤 Uploading file:', newProduct.imageFile.name, newProduct.imageFile.type, newProduct.imageFile.size);
  }

  setLoading(true);
  try {
    const url = editingProduct
      ? `${API_ENDPOINT}/api/partners/products/${editingProduct._id}`
      : `${API_ENDPOINT}/api/partners/products`;
    
    const method = editingProduct ? "PUT" : "POST";

    console.log('🔄 Sending request to:', url);

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: formData,
    });

    console.log('📥 Response status:', res.status);

    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error('❌ Non-JSON response:', text.substring(0, 200));
      throw new Error('Server returned an invalid response. Please try again.');
    }

    if (res.ok) {
      console.log('✅ Product saved successfully:', data);
      toast.success(editingProduct ? "Product updated successfully! 🎉" : "Product added successfully! 🎉");
      
      // Update local state
      if (editingProduct) {
        setProducts(prev => prev.map(p => p._id === data.product._id ? data.product : p));
      } else {
        setProducts(prev => [data.product, ...prev]);
      }

      // Reset form
      resetForm();
      
      // Refresh products to get the latest data
      fetchProducts(token);
    } else {
      console.log('❌ Server error:', data);
      throw new Error(data.error || "Failed to save product");
    }
  } catch (error) {
    console.error("❌ Error submitting product:", error);
    
    if (error.message.includes('JSON') || error.message.includes('DOCTYPE')) {
      toast.error("Server error. Please check if the uploads directory exists and try again.");
    } else {
      toast.error(error.message || "Failed to save product");
    }
  } finally {
    setLoading(false);
  }
};

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    try {
      const res = await fetch(`${API_ENDPOINT}/api/partners/products/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success("Product deleted successfully");
        setProducts(prev => prev.filter(p => p._id !== id));
      } else {
        throw new Error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.message || "Failed to delete product");
    }
  };

  // ✏️ Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || "1",
      imageFile: null,
    });
    setImagePreview(null);
    setShowForm(true);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 🔄 Reset form
  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "1",
      imageFile: null,
    });
    setEditingProduct(null);
    setImagePreview(null);
    setShowForm(false);
  };

  // 🖼️ Build image URL with debugging
const buildImageSrc = (product) => {
  if (!product || !product.images || product.images.length === 0) {
    console.log('❌ No images found for product:', product?.name);
    return "/images/placeholder-product.jpg";
  }

  const imagePath = product.images[0];
  console.log('🔍 Raw image path from database:', imagePath);
  
  if (imagePath.startsWith('http')) {
    console.log('✅ Using full URL:', imagePath);
    return imagePath;
  }
  
  // Handle different path formats
  let cleanPath = imagePath;
  
  // Remove any double slashes or incorrect prefixes
  if (imagePath.includes('uploadss')) {
    console.log('⚠️ Found double "s" in path, correcting...');
    cleanPath = imagePath.replace('uploadss', 'uploads');
  }
  
  if (imagePath.startsWith('/uploads/')) {
    cleanPath = imagePath; // Keep as is
  } else if (imagePath.startsWith('uploads/')) {
    cleanPath = `/${imagePath}`; // Add leading slash
  } else if (imagePath.startsWith('/')) {
    // Already has leading slash, ensure it's correct
    cleanPath = imagePath;
  } else {
    cleanPath = `/uploads/${imagePath}`; // Add /uploads/ prefix
  }
  
  // Ensure no double slashes
  cleanPath = cleanPath.replace(/\/+/g, '/');
  
  const fullUrl = `${API_ENDPOINT}${cleanPath}`;
  console.log('🎯 Final image URL:', fullUrl);
  return fullUrl;
};

// 💰 Format currency - ADD THIS FUNCTION
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Product Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your products and grow your business
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <HiPlus className="w-5 h-5" />
            Add New Product
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Products", value: products.length },
            { label: "In Stock", value: products.filter(p => p.stock > 0).length },
            { label: "Out of Stock", value: products.filter(p => p.stock === 0).length },
            { label: "Categories", value: new Set(products.map(p => p.category)).size }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Product Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div id="product-form" className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6" encType="multipart/form-data">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter product name"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (₦) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="0.00"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe your product in detail..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-300">
                      <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <HiPhotograph className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">
                          Click to upload product image
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, JPEG up to 5MB
                        </p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Current Image for Edit */}
                    {editingProduct && !imagePreview && editingProduct.images.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
                          <img
                            src={buildImageSrc(editingProduct)}
                            alt={editingProduct.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/images/placeholder-product.jpg";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 ${
                        loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {editingProduct ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          <HiCheckCircle className="w-5 h-5" />
                          {editingProduct ? "Update Product" : "Add Product"}
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Products</h2>
            <div className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
          </div>

          {fetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-100">
                    <img
                      src={buildImageSrc(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/images/placeholder-product.jpg";
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Stock Status */}
                    <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatCurrency(product.price)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(product)}
                        className="flex-1 bg-blue-50 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <HiPencil className="w-4 h-4" />
                        Edit
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 bg-red-50 text-red-600 font-medium py-2 rounded-lg hover:bg-red-100 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <HiTrash className="w-4 h-4" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <HiPhotograph className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first product to showcase in your store
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Your First Product
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}