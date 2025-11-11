// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// export default function PartnerDashboard() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     stock: "",
//     imageFile: null,
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(false);

//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

//   // 🔐 Load and validate token on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in as a verified partner to access your dashboard.");
//       window.location.href = "/partner";
//     } else {
//       fetchProducts(token);
//     }
//     // cleanup preview on unmount
//     return () => {
//       if (imagePreview) URL.revokeObjectURL(imagePreview);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // 🛍️ Fetch partner products (handles different response shapes)
//   const fetchProducts = async (token) => {
//     try {
//       setFetching(true);
//       const res = await fetch(`${API_ENDPOINT}/api/partners/products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (res.ok) {
//         // support either array or { products: [...] }
//         setProducts(Array.isArray(data) ? data : data.products || []);
//       } else {
//         toast.error(data.error || "Failed to load products");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("An error occurred while fetching products");
//     } finally {
//       setFetching(false);
//     }
//   };

//   // ✏️ Handle input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "imageFile") {
//       const file = files?.[0] || null;
//       setNewProduct((p) => ({ ...p, imageFile: file }));
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//       if (file) {
//         const previewUrl = URL.createObjectURL(file);
//         setImagePreview(previewUrl);
//       } else {
//         setImagePreview(null);
//       }
//     } else {
//       setNewProduct((p) => ({ ...p, [name]: value }));
//     }
//   };

//   // ➕ Add or ✏️ Edit product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) return toast.error("Unauthorized access");

//     // basic validation
//     if (!newProduct.name || !newProduct.price || !newProduct.description) {
//       return toast.error("Please fill required fields");
//     }

//     const formData = new FormData();

//     // Append fields explicitly so numbers become strings and image gets multiple keys
//     formData.append("name", newProduct.name);
//     formData.append("price", String(newProduct.price));
//     formData.append("description", newProduct.description);
//     formData.append("category", newProduct.category || "");
//     formData.append("stock", String(newProduct.stock || 0));

//     if (newProduct.imageFile) {
//       // append the file under multiple common keys to match backend expectations
//       formData.append("imageFile", newProduct.imageFile);
//       formData.append("image", newProduct.imageFile);
//       formData.append("images", newProduct.imageFile);
//     }

//     setLoading(true);
//     try {
//       const url = editingProduct
//         ? `${API_ENDPOINT}/api/partners/products/${editingProduct._id}`
//         : `${API_ENDPOINT}/api/partners/products`;
//       const method = editingProduct ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // DO NOT set Content-Type; browser will set the multipart boundary
//         },
//         body: formData,
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success(editingProduct ? "Product updated!" : "Product added!");
//         // if API returned the created/updated product we can optimistic update
//         if (data && data._id) {
//           // replace if exists
//           setProducts((prev) => {
//             const found = prev.find((p) => p._id === data._id);
//             if (found) return prev.map((p) => (p._id === data._id ? data : p));
//             return [data, ...prev];
//           });
//         } else {
//           const tokenAfter = localStorage.getItem("token");
//           fetchProducts(tokenAfter);
//         }

//         // reset form
//         setNewProduct({ name: "", price: "", description: "", category: "", stock: "", imageFile: null });
//         if (imagePreview) {
//           URL.revokeObjectURL(imagePreview);
//           setImagePreview(null);
//         }
//         setEditingProduct(null);
//       } else {
//         toast.error(data.error || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error);
//       toast.error("Network or server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🗑️ Delete product
//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!token) return toast.error("Unauthorized access");

//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners/products/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Product deleted successfully");
//         setProducts((prev) => prev.filter((p) => p._id !== id));
//       } else {
//         toast.error(data.error || "Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setNewProduct({
//       name: product.name || "",
//       price: product.price || "",
//       description: product.description || "",
//       category: product.category || "",
//       stock: product.stock || "",
//       imageFile: null,
//     });
//     // clear any previous preview
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//       setImagePreview(null);
//     }
//   };

//   // helper to build image src robustly
//   const buildImageSrc = (product) => {
//     const maybe = product?.images?.[0] || product?.image || product?.images;
//     // if backend stored full URL or array
//     if (!maybe) return "/placeholder.jpg";

//     // handle arrays
//     const first = Array.isArray(maybe) ? maybe[0] : maybe;
//     if (!first) return "/placeholder.jpg";

//     if (typeof first === "string") {
//       // already an absolute url?
//       if (first.startsWith("http://") || first.startsWith("https://")) return first;
//       // sometimes files are stored with leading slashes
//       const fileName = first.startsWith("/") ? first.slice(1) : first;
//       // ensure API_ENDPOINT exists
//       if (!API_ENDPOINT) return `/uploads/${fileName}`;
//       return `${API_ENDPOINT.replace(/\/$/, '')}/uploads/${fileName}`;
//     }

//     return "/placeholder.jpg";
//   };

//   const currency = (value) => {
//     try {
//       const num = Number(value) || 0;
//       return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(num);
//     } catch (e) {
//       return `₦${value}`;
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-40 px-4 sm:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto p-3 sm:p-10"
//       >
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl sm:text-4xl font-bold font-oswald text-purple-800">Partner Dashboard 🛍️</h1>
//           <div className="text-sm text-gray-500">Manage your products — fast & easy</div>
//         </div>

//         {/* Form Section */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" encType="multipart/form-data">
//           {[
//             { key: "name", label: "Product name" },
//             { key: "price", label: "Price (₦)" },
//             { key: "category", label: "Category" },
//             { key: "stock", label: "Stock" },
//           ].map(({ key, label }) => (
//             <div key={key}>
//               <label className="block text-sm font-semibold text-purple-700 mb-2">{label}</label>
//               <input
//                 type={key === "price" || key === "stock" ? "number" : "text"}
//                 name={key}
//                 value={newProduct[key]}
//                 onChange={handleChange}
//                 required={key === "name" || key === "price"}
//                 className="w-full border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none bg-white"
//               />
//             </div>
//           ))}

//           <div className="md:col-span-2">
//             <label className="block text-sm font-semibold text-purple-700 mb-2">Description</label>
//             <textarea
//               name="description"
//               value={newProduct.description}
//               onChange={handleChange}
//               rows={4}
//               required
//               className="w-full border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none bg-white"
//             />
//           </div>

//           <div className="md:col-span-2 flex flex-col gap-3">
//             <label className="block text-sm font-semibold text-purple-700">Upload Product Image</label>
//             <input type="file" name="imageFile" accept="image/*" onChange={handleChange} className="w-full" />

//             {imagePreview ? (
//               <div className="w-full mt-2 rounded-lg overflow-hidden border border-dashed border-purple-200 p-2">
//                 <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded-md" />
//                 <div className="text-xs text-gray-500 mt-2">Selected image preview — will be uploaded when you submit.</div>
//               </div>
//             ) : editingProduct ? (
//               <div className="w-full mt-2 rounded-lg overflow-hidden border border-dashed border-purple-200 p-2">
//                 <img src={buildImageSrc(editingProduct)} alt={editingProduct.name} className="w-full h-48 object-cover rounded-md" onError={(e)=>{e.currentTarget.src='/placeholder.jpg'}} />
//                 <div className="text-xs text-gray-500 mt-2">Current image for the product. Choose a new file to replace it.</div>
//               </div>
//             ) : null}

//             <div className="flex justify-center md:justify-start mt-3">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-6 py-2 rounded-lg transition-all ${
//                   loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//                 }`}
//               >
//                 {loading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
//               </button>

//               {editingProduct && (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditingProduct(null);
//                     setNewProduct({ name: "", price: "", description: "", category: "", stock: "", imageFile: null });
//                     if (imagePreview) {
//                       URL.revokeObjectURL(imagePreview);
//                       setImagePreview(null);
//                     }
//                   }}
//                   className="ml-4 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>

//         {/* Product List */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-semibold text-purple-800">Your Uploaded Products</h2>
//             <div className="text-sm text-gray-500">{products.length} product(s)</div>
//           </div>

//           {fetching ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div key={i} className="animate-pulse bg-white rounded-2xl p-6 border border-purple-50 shadow">
//                   <div className="h-40 bg-purple-100 rounded-lg mb-4" />
//                   <div className="h-4 bg-purple-100 rounded w-3/4 mb-2" />
//                   <div className="h-4 bg-purple-100 rounded w-1/2 mb-2" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <div key={product._id} className="bg-gradient-to-br from-purple-50 via-white to-yellow-50 border border-purple-100 rounded-2xl p-4 shadow hover:shadow-lg transition">
//                     <div className="relative h-48 rounded-xl overflow-hidden">
//                       <img
//                         src={buildImageSrc(product)}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.currentTarget.onerror = null;
//                           e.currentTarget.src = "/placeholder.jpg";
//                         }}
//                       />
//                       <div className="absolute top-3 left-3 bg-white/70 text-xs px-2 py-1 rounded">{product.category || 'Uncategorized'}</div>
//                       <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                       </div>
//                     </div>

//                     <div className="mt-3">
//                       <h3 className="text-lg font-bold text-purple-700 truncate">{product.name}</h3>
//                       <div className="flex items-center justify-between mt-2">
//                         <p className="text-yellow-600 font-semibold">{currency(product.price)}</p>
//                         {/* <div className="text-sm text-gray-500">ID: {String(product._id).slice(-6)}</div> */}
//                       </div>
//                       <p className="text-gray-600 text-sm line-clamp-3 mt-2">{product.description}</p>

//                       <div className="flex justify-between items-center mt-4">
//                         <div className="flex gap-3">
//                           <button onClick={() => handleEdit(product)} className="text-sm text-blue-600 hover:underline">Edit</button>
//                           <button onClick={() => handleDelete(product._id)} className="text-sm text-red-600 hover:underline">Delete</button>
//                         </div>

//                         <div className="text-xs text-gray-500">{new Date(product.createdAt || Date.now()).toLocaleDateString()}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No products uploaded yet.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </section>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

  // 🔐 Load and validate token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in as a verified partner to access your dashboard.");
      window.location.href = "/partner";
    } else {
      fetchProducts(token);
    }
    // cleanup preview on unmount
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const data = await res.json();
      if (res.ok) {
        setProducts(Array.isArray(data) ? data : data.products || []);
      } else {
        toast.error(data.error || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products");
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
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
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

  // ➕ Add or ✏️ Edit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized access");

    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      return toast.error("Please fill required fields");
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", String(newProduct.price));
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category || "");
    formData.append("stock", String(newProduct.stock || 0));
    if (newProduct.imageFile) {
      formData.append("imageFile", newProduct.imageFile);
    }

    setLoading(true);
    try {
      const url = editingProduct
        ? `${API_ENDPOINT}/api/partners/products/${editingProduct._id}`
        : `${API_ENDPOINT}/api/partners/products`;
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added!");
        if (data && data._id) {
          setProducts((prev) => {
            const found = prev.find((p) => p._id === data._id);
            if (found) return prev.map((p) => (p._id === data._id ? data : p));
            return [data, ...prev];
          });
        } else {
          const tokenAfter = localStorage.getItem("token");
          fetchProducts(tokenAfter);
        }

        setNewProduct({ name: "", price: "", description: "", category: "", stock: "", imageFile: null });
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
        setEditingProduct(null);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized access");

    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_ENDPOINT}/api/partners/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || "",
      imageFile: null,
    });
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // Robust image src builder
  const buildImageSrc = (product) => {
    const img = product?.imageFile || product?.image || product?.images?.[0] || null;
    if (!img) return "/placeholder.jpg";

    if (typeof img === "string") {
      if (img.startsWith("http://") || img.startsWith("https://")) return img;
      const fileName = img.startsWith("/") ? img.slice(1) : img;
      if (!API_ENDPOINT) return `/uploads/${fileName}`;
      return `${API_ENDPOINT.replace(/\/$/, "")}/uploads/${fileName}`;
    }

    return "/placeholder.jpg";
  };

  const currency = (value) => {
    try {
      const num = Number(value) || 0;
      return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(num);
    } catch (e) {
      return `₦${value}`;
    }
  };

  return (
    <section className="min-h-screen  py-40 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto p-3 sm:p-10"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 sm:gap-0">
          <h1 className="text-3xl sm:text-4xl font-bold font-oswald text-purple-800">Partner Dashboard 🛍️</h1>
          <div className="text-sm text-gray-500">Manage your products — fast & easy</div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" encType="multipart/form-data">
          {[{ key: "name", label: "Product name" }, { key: "price", label: "Price (₦)" }, { key: "category", label: "Category" }, { key: "stock", label: "Stock" }].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-purple-700 mb-2">{label}</label>
              <input
                type={key === "price" || key === "stock" ? "number" : "text"}
                name={key}
                value={newProduct[key]}
                onChange={handleChange}
                required={key === "name" || key === "price"}
                className="w-full border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none bg-white"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-purple-700 mb-2">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border border-purple-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none bg-white"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <label className="block text-sm font-semibold text-purple-700">Upload Product Image</label>
            <input type="file" name="imageFile" accept="image/*" onChange={handleChange} className="w-full" />

            {imagePreview ? (
              <div className="w-full mt-2 rounded-lg overflow-hidden border border-dashed border-purple-200 p-2">
                <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded-md" />
                <div className="text-xs text-gray-500 mt-2">Selected image preview — will be uploaded when you submit.</div>
              </div>
            ) : editingProduct ? (
              <div className="w-full mt-2 rounded-lg overflow-hidden border border-dashed border-purple-200 p-2">
                <img
                  src={buildImageSrc(editingProduct)}
                  alt={editingProduct.name}
                  className="w-full h-48 object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
                <div className="text-xs text-gray-500 mt-2">Current image for the product. Choose a new file to replace it.</div>
              </div>
            ) : null}

            <div className="flex justify-center md:justify-start mt-3 gap-3">
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-6 py-2 rounded-lg transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                }`}
              >
                {loading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewProduct({ name: "", price: "", description: "", category: "", stock: "", imageFile: null });
                    if (imagePreview) {
                      URL.revokeObjectURL(imagePreview);
                      setImagePreview(null);
                    }
                  }}
                  className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Product List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-800">Your Uploaded Products</h2>
            <div className="text-sm text-gray-500">{products.length} product(s)</div>
          </div>

          {fetching ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl p-6 border border-purple-50 shadow">
                  <div className="h-40 bg-purple-100 rounded-lg mb-4" />
                  <div className="h-4 bg-purple-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-purple-100 rounded w-1/2 mb-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="bg-gradient-to-br from-purple-50 via-white to-yellow-50 border border-purple-100 rounded-2xl p-4 shadow hover:shadow-lg transition">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                      <img
                        src={buildImageSrc(product)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/70 text-xs px-2 py-1 rounded">{product.category || 'Uncategorized'}</div>
                      <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </div>
                    </div>

                    <div className="mt-3">
                      <h3 className="text-lg font-bold text-purple-700 truncate">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-yellow-600 font-semibold">{currency(product.price)}</p>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mt-2">{product.description}</p>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(product)} className="text-sm text-blue-600 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(product._id)} className="text-sm text-red-600 hover:underline">Delete</button>
                        </div>

                        <div className="text-xs text-gray-500">{new Date(product.createdAt || Date.now()).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products uploaded yet.</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
