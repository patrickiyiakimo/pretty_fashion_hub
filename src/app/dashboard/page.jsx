// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";

// export default function PartnerDashboard() {
//   const [partnerId, setPartnerId] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     stock: "",
//     imageFile: null,
//   });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [loading, setLoading] = useState(false);

//    // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

//   // Simulate partner login (In real app, replace with actual auth logic)
//   useEffect(() => {
//     const storedId = localStorage.getItem("partnerId");
//     if (storedId) {
//       setPartnerId(storedId);
//       fetchProducts(storedId);
//     } else {
//       toast.error("Please log in as a verified partner to access your dashboard.");
//       window.location.href = "/partner"; // redirect to login page
//     }
//   }, []);

//   // Fetch all products by this partner
//   const fetchProducts = async (id) => {
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners/products/${id}`);
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "imageFile") {
//       setNewProduct({ ...newProduct, imageFile: files[0] });
//     } else {
//       setNewProduct({ ...newProduct, [name]: value });
//     }
//   };

//   // Add or Edit Product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!partnerId) return alert("Unauthorized access");

//     const formData = new FormData();
//     formData.append("partnerId", partnerId);
//     formData.append("name", newProduct.name);
//     formData.append("price", newProduct.price);
//     formData.append("description", newProduct.description);
//     formData.append("category", newProduct.category);
//     formData.append("stock", newProduct.stock);
//     if (newProduct.imageFile) {
//       formData.append("images", newProduct.imageFile);
//     }

//     setLoading(true);
//     try {
//       const url = editingProduct
//         ? `${API_ENDPOINT}/api/partners/products/${editingProduct._id}`
//         : `${API_ENDPOINT}/api/partners/products`;
//       const method = editingProduct ? "PUT" : "POST";

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (res.ok) {
//         alert(editingProduct ? "Product updated!" : "Product added!");
//         fetchProducts(partnerId);
//         setNewProduct({
//           name: "",
//           price: "",
//           description: "",
//           category: "",
//           stock: "",
//           imageFile: null,
//         });
//         setEditingProduct(null);
//       } else {
//         alert(data.error || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Product
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners/products/${id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ partnerId }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert("Product deleted successfully");
//         fetchProducts(partnerId);
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       console.error("Error deleting:", error);
//     }
//   };

//   // Handle editing
//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setNewProduct({
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       stock: product.stock,
//       imageFile: null,
//     });
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-2xl"
//       >
//         <h1 className="text-4xl font-bold font-oswald text-purple-800 mb-8 text-center">
//           Partner Dashboard 🛍️
//         </h1>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
//           encType="multipart/form-data"
//         >
//           {["name", "price", "category", "stock"].map((field) => (
//             <div key={field}>
//               <label className="block text-sm font-semibold text-purple-700 mb-2 capitalize">
//                 {field}
//               </label>
//               <input
//                 type={field === "price" || field === "stock" ? "number" : "text"}
//                 name={field}
//                 value={newProduct[field]}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
//               />
//             </div>
//           ))}

//           <div className="md:col-span-2">
//             <label className="block text-sm font-semibold text-purple-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={newProduct.description}
//               onChange={handleChange}
//               rows="4"
//               required
//               className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
//             ></textarea>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-semibold text-purple-700 mb-2">
//               Upload Product Image
//             </label>
//             <input
//               type="file"
//               name="imageFile"
//               accept="image/*"
//               onChange={handleChange}
//               required={!editingProduct}
//               className="w-full border border-purple-300 rounded-lg px-4 py-3 bg-white"
//             />
//           </div>

//           <div className="md:col-span-2 flex justify-center mt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-12 py-3 rounded-lg transition-all ${
//                 loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//               }`}
//             >
//               {loading
//                 ? "Processing..."
//                 : editingProduct
//                 ? "Update Product"
//                 : "Add Product"}
//             </button>
//           </div>
//         </form>

//         {/* PRODUCT LIST */}
//         <div>
//           <h2 className="text-2xl font-semibold text-purple-800 mb-6">
//             Your Uploaded Products
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-gradient-to-br from-purple-100 via-white to-yellow-50 border border-purple-200 rounded-2xl p-6 shadow-lg"
//                 >
//                   <img
//                     src={
//                       product.images?.[0]
//                         ? `${API_ENDPOINT}/uploads/${product.images[0]}`
//                         : "/placeholder.jpg"
//                     }
//                     alt={product.name}
//                     className="h-48 w-full object-cover rounded-xl mb-4"
//                   />
//                   <h3 className="text-lg font-bold text-purple-700">{product.name}</h3>
//                   <p className="text-yellow-600 font-semibold mb-2">
//                     ₦{product.price}
//                   </p>
//                   <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>

//                   <div className="flex justify-between mt-4">
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="text-sm text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="text-sm text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No products uploaded yet.</p>
//             )}
//           </div>
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
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // 🔐 Load and validate token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in as a verified partner to access your dashboard.");
      window.location.href = "/partner";
    } else {
      fetchProducts(token);
    }
  }, []);

  // 🛍️ Fetch partner products
  const fetchProducts = async (token) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/api/partners/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        toast.error(data.error || "Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products");
    }
  };

  // ✏️ Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNewProduct({ ...newProduct, imageFile: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // ➕ Add or ✏️ Edit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized access");

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    setLoading(true);
    try {
      const url = editingProduct
        ? `${API_ENDPOINT}/api/partners/products/${editingProduct._id}`
        : `${API_ENDPOINT}/api/partners/products`;
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added!");
        fetchProducts(token);
        setNewProduct({
          name: "",
          price: "",
          description: "",
          category: "",
          stock: "",
          imageFile: null,
        });
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
        fetchProducts(token);
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
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      imageFile: null,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold font-oswald text-purple-800 mb-8 text-center">
          Partner Dashboard 🛍️
        </h1>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          encType="multipart/form-data"
        >
          {["name", "price", "category", "stock"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-purple-700 mb-2 capitalize">
                {field}
              </label>
              <input
                type={field === "price" || field === "stock" ? "number" : "text"}
                name={field}
                value={newProduct[field]}
                onChange={handleChange}
                required
                className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Upload Product Image
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              required={!editingProduct}
              className="w-full border border-purple-300 rounded-lg px-4 py-3 bg-white"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold px-12 py-3 rounded-lg transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading
                ? "Processing..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Your Uploaded Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gradient-to-br from-purple-100 via-white to-yellow-50 border border-purple-200 rounded-2xl p-6 shadow-lg"
                >
                  <img
                    src={
                      product.images?.[0]
                        ? `${API_ENDPOINT}/uploads/${product.images[0]}`
                        : "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-bold text-purple-700">{product.name}</h3>
                  <p className="text-yellow-600 font-semibold mb-2">
                    ₦{product.price}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products uploaded yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
