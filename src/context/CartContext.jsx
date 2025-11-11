// "use client";
// import { createContext, useContext, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);

//   const addToCart = (product, imgRect) => {
//     setCart((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       if (exists) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });

//     // Trigger flying animation
//     setFlyingItem({ ...product, imgRect });
//     setTimeout(() => setFlyingItem(null), 800);
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity }}
//     >
//       {children}
     

// <AnimatePresence>
//   {flyingItem && (
//     <motion.div
//       className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//       style={{
//         top: flyingItem.imgRect.top,
//         left: flyingItem.imgRect.left,
//       }}
//       initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//       animate={{
//         // Fly towards top-right corner (where cart icon usually is)
//         x: window.innerWidth - flyingItem.imgRect.left - 60,
//         y: -flyingItem.imgRect.top + 80, // smoother curve upwards
//         scale: 0.4,
//         opacity: 0.7,
//       }}
//       exit={{ opacity: 0 }}
//       transition={{
//         duration: window.innerWidth < 768 ? 1 : 0.8, // slower on mobile
//         ease: "easeInOut",
//       }}
//     >
//       <img
//         src={flyingItem.image}
//         alt={flyingItem.name}
//         className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//       />
//     </motion.div>
//   )}
// </AnimatePresence>

//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);








// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// // 🌍 Base API URL (set in your .env file)
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/cart";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const userEmail = "testuser@example.com"; // Replace with logged-in user's email

//   // 🧩 Fetch Cart
//   const fetchCart = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/${userEmail}`);
//       if (!res.ok) throw new Error("Failed to fetch cart");
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // ➕ Add to Cart
//   const addToCart = async (product, imgRect) => {
//     try {
//       const res = await fetch(`${API_BASE}/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, product }),
//       });

//       if (!res.ok) throw new Error("Failed to add to cart");
//       const data = await res.json();
//       setCart(data.items || []);

//       // Trigger flying animation
//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   // ❌ Remove from Cart
//   const removeFromCart = async (productId) => {
//     try {
//       const res = await fetch(`${API_BASE}/remove`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId }),
//       });

//       if (!res.ok) throw new Error("Failed to remove item");
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // 🔁 Update Quantity
//   const updateQuantity = async (productId, quantity) => {
//     try {
//       const res = await fetch(`${API_BASE}/update`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId, quantity }),
//       });

//       if (!res.ok) throw new Error("Failed to update quantity");
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // 🧹 Clear Cart
//   const clearCart = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/clear`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail }),
//       });

//       if (!res.ok) throw new Error("Failed to clear cart");
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}

//       {/* 🛍️ Flying Animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);







// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

//   // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   // ✅ Load email from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserEmail(user.email);
//     }
//   }, []);

//   // 🧩 Fetch Cart
//   const fetchCart = async () => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/${userEmail}`);
//       if (!res.ok) toast.error("Failed to fetch cart");
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   // Fetch cart after login email loads
//   useEffect(() => {
//     fetchCart();
//   }, [userEmail]);

//   // ➕ Add to Cart
//   const addToCart = async (product, imgRect) => {
//     if (!userEmail) return console.warn("User email not loaded yet");

//     try {
//       const res = await fetch(`${API_ENDPOINT}/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, product }),
//       });

//       if (!res.ok) throw new Error("Failed to add to cart");
//       const data = await res.json();
//       setCart(data.items || []);

//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   // ❌ Remove item
//   const removeFromCart = async (productId) => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/remove`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId }),
//       });
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // 🔁 Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/update`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId, quantity }),
//       });
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // 🧹 Clear Cart
//   const clearCart = async () => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/clear`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail }),
//       });
//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}

//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);




// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// // ✅ Ensure your .env has NEXT_PUBLIC_API_ENDPOINT like:
// // NEXT_PUBLIC_API_ENDPOINT=https://yourserver.com/api

//   // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   // ✅ Load email from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         setUserEmail(user?.email || null);
//       } catch (err) {
//         console.error("Invalid user in localStorage:", err);
//       }
//     }
//   }, []);

//   // 🧩 Fetch Cart
//   const fetchCart = async () => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/${encodeURIComponent(userEmail)}`, {
//         method: "GET",
//       });

//       if (!res.ok) {
//         toast.error("Failed to fetch your cart. Please try again.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.log("Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // ✅ Fetch cart when userEmail is ready
//   useEffect(() => {
//     fetchCart();
//   }, [userEmail]);

//   // ➕ Add to Cart
//   const addToCart = async (product, imgRect) => {
//     if (!userEmail) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, product }),
//       });

//       if (!res.ok) {
//         toast.error("Failed to add item to cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success(`${product.name} added to cart!`);

//       // Animate the flying item
//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (error) {
//       console.log("Error adding to cart:", error);
//       toast.error("Error adding item. Please try again.");
//     }
//   };

//   // ❌ Remove item
//   const removeFromCart = async (productId) => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId }),
//       });

//       if (!res.ok) {
//         toast.error("Failed to remove item.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // 🔁 Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail, productId, quantity }),
//       });

//       if (!res.ok) {
//         toast.error("Failed to update quantity.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // 🧹 Clear Cart
//   const clearCart = async () => {
//     if (!userEmail) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userEmail }),
//       });

//       if (!res.ok) {
//         toast.error("Failed to clear cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}

//       {/* Flying Animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <Toaster position="top-right" />
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);







// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// // Load API endpoint from environment variable
// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [user, setUser] = useState(null); // now store full user with token

//   // Load user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser);
//         setUser(parsed); // should contain { email, token, ... }
//       } catch (err) {
//         console.error("Invalid user in localStorage:", err);
//       }
//     }
//   }, []);

//   // Helper to get Authorization headers
//   const getAuthHeaders = () => {
//     if (!user?.token) return {};
//     return {
//       Authorization: `Bearer ${user.token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   // Fetch Cart
//   const fetchCart = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/me`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         toast.error("Failed to fetch your cart. Please try again.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.log("Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // Fetch cart when user is ready
//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   // Add to Cart
//   const addToCart = async (product, imgRect) => {
//     if (!user?.email) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ product }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to add item to cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success(`${product.name} added to cart!`);

//       // Animate the flying item
//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (error) {
//       console.log("Error adding to cart:", error);
//       toast.error("Error adding item. Please try again.");
//     }
//   };

//   // Remove item
//   const removeFromCart = async (productId) => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to remove item.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to update quantity.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     if (!user?.email) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to clear cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}

//       {/* Flying Animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <Toaster position="top-right" />
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);








// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// // Load API endpoint from environment variable
// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [user, setUser] = useState(null); // Store full user with token

//   // Load user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsed = JSON.parse(storedUser);
//         setUser(parsed); // Should contain { email, token, ... }
//       } catch (err) {
//         console.error("Invalid user in localStorage:", err);
//       }
//     }
//   }, []);

//   // Helper to get Authorization headers
//   const getAuthHeaders = () => {
//     if (!user?.token) return {};
//     return {
//       Authorization: `Bearer ${user.token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   // Fetch Cart
//   const fetchCart = async () => {
//     if (!user?.token) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/me`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         toast.error("Failed to fetch your cart. Please try again.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//     } catch (error) {
//       console.log("Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // Fetch cart when user is ready
//   useEffect(() => {
//     if (user?.token) fetchCart();
//   }, [user]);

//   // Add to Cart
//   const addToCart = async (product, imgRect) => {
//     if (!user?.token) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ product }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to add item to cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success(`${product.name} added to cart!`);

//       // Animate the flying item
//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (error) {
//       console.log("Error adding to cart:", error);
//       toast.error("Error adding item. Please try again.");
//     }
//   };

//   // Remove item
//   const removeFromCart = async (productId) => {
//     if (!user?.token) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to remove item.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!user?.token) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId, quantity }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to update quantity.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     if (!user?.token) return;
//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         toast.error(err.message || "Failed to clear cart.");
//         return;
//       }

//       const data = await res.json();
//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}

//       {/* Flying Animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <Toaster position="top-right" />
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);





// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// // Load API endpoint from environment variable
// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// console.log("✅ API Endpoint loaded:", API_ENDPOINT);

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [user, setUser] = useState(null); // Store full user with token

//   // Load user from localStorage
//   // useEffect(() => {
//   //   const storedUser = localStorage.getItem("user");
//   //   console.log("📦 Checking localStorage for user...");
//   //   if (storedUser) {
//   //     try {
//   //       const parsed = JSON.parse(storedUser);
//   //       console.log("✅ Loaded user from localStorage:", parsed);
//   //       setUser(parsed); // Should contain { email, token, ... }
//   //     } catch (err) {
//   //       console.error("❌ Invalid user data in localStorage:", err);
//   //     }
//   //   } else {
//   //     console.warn("⚠️ No user found in localStorage.");
//   //   }
//   // }, []);




//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//   const token = localStorage.getItem("token");

//   if (storedUser && token) {
//     try {
//       const parsedUser = JSON.parse(storedUser);
//       setUser({ ...parsedUser, token }); // ✅ combine user + token
//       console.log("✅ Loaded user with token:", { ...parsedUser, token });
//     } catch (err) {
//       console.error("❌ Invalid user data in localStorage:", err);
//     }
//   } else {
//     console.warn("⚠️ No user or token found in localStorage.");
//   }
// }, []);


//   // Helper to get Authorization headers
//   const getAuthHeaders = () => {
//     if (!user?.token) {
//       console.warn("⚠️ No token found in user object. Returning empty headers.");
//       return { "Content-Type": "application/json" };
//     }
//     console.log("🔐 Using token in Authorization header:", user.token.slice(0, 20) + "...");
//     return {
//       Authorization: `Bearer ${user.token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   // Fetch Cart
//   const fetchCart = async () => {
//     if (!user?.token) {
//       console.warn("⚠️ fetchCart() called but no token found.");
//       return;
//     }

//     console.log("🛒 Fetching cart for user:", user.email);

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/me`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       console.log("📡 fetchCart() response status:", res.status);

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         console.error("❌ Failed to fetch cart:", errData);
//         toast.error(errData.message || "Failed to fetch your cart.");
//         return;
//       }

//       const data = await res.json();
//       console.log("✅ Cart fetched successfully:", data);
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("🔥 Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // Fetch cart when user is ready
//   useEffect(() => {
//     if (user?.token) {
//       console.log("📥 User token detected. Fetching cart...");
//       fetchCart();
//     }
//   }, [user]);

//   // Add to Cart
//   // const addToCart = async (product, imgRect) => {
//   //   console.log("🛍️ addToCart() triggered for product:", product);

//   //   if (!user?.token) {
//   //     console.warn("⚠️ No token — cannot add to cart.");
//   //     toast.error("Please log in to add items to your cart.");
//   //     return;
//   //   }

//   //   try {
//   //     console.log("📡 Sending POST /api/cart/add request...");
//   //     const res = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//   //       method: "POST",
//   //       headers: getAuthHeaders(),
//   //       body: JSON.stringify({ product }),
//   //     });

//   //     console.log("📩 addToCart() response status:", res.status);

//   //     const responseBody = await res.text(); // Get raw text to catch errors even if not JSON
//   //     console.log("🧾 Raw response body:", responseBody);

//   //     let data;
//   //     try {
//   //       data = JSON.parse(responseBody);
//   //     } catch (e) {
//   //       console.warn("⚠️ Response not valid JSON:", e);
//   //       data = {};
//   //     }

//   //     if (!res.ok) {
//   //       console.error("❌ addToCart() failed:", data);
//   //       toast.error(data.message || "Failed to add item to cart.");
//   //       return;
//   //     }

//   //     console.log("✅ Item added to cart successfully:", data);
//   //     setCart(data.items || []);
//   //     toast.success(`${product.name} added to cart!`);

//   //     // Animate the flying item
//   //     if (imgRect) {
//   //       console.log("✨ Triggering flying item animation...");
//   //       setFlyingItem({ ...product, imgRect });
//   //       setTimeout(() => setFlyingItem(null), 800);
//   //     }
//   //   } catch (error) {
//   //     console.error("🔥 Error adding to cart:", error);
//   //     toast.error("Error adding item. Please try again.");
//   //   }
//   // };


// const addToCart = async (product) => {
//   console.log("🛍️ addToCart() triggered for product:", product);

//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.warn("⚠️ No token — cannot add to cart.");
//     return;
//   }

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/cart/add`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`, // ✅ include the token here
//       },
//       body: JSON.stringify({ productId: product.id }),
//     });

//     const data = await response.json();
//     console.log("✅ Cart Response:", data);

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to add to cart");
//     }

//     // success logic here (e.g., update cart state)
//   } catch (error) {
//     console.error("❌ addToCart() error:", error.message);
//   }
// };




//   // Remove item
//   const removeFromCart = async (productId) => {
//     console.log("🗑️ removeFromCart() called for productId:", productId);

//     if (!user?.token) {
//       console.warn("⚠️ No token found. Cannot remove item.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId }),
//       });

//       console.log("📩 removeFromCart() response status:", res.status);

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Failed to remove item:", data);
//         toast.error(data.message || "Failed to remove item.");
//         return;
//       }

//       console.log("✅ Item removed successfully:", data);
//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("🔥 Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     console.log("🔄 updateQuantity() called for:", { productId, quantity });

//     if (!user?.token) {
//       console.warn("⚠️ No token found. Cannot update quantity.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId, quantity }),
//       });

//       console.log("📩 updateQuantity() response status:", res.status);

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Failed to update quantity:", data);
//         toast.error(data.message || "Failed to update quantity.");
//         return;
//       }

//       console.log("✅ Quantity updated successfully:", data);
//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("🔥 Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     console.log("🧹 clearCart() called");

//     if (!user?.token) {
//       console.warn("⚠️ No token found. Cannot clear cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       });

//       console.log("📩 clearCart() response status:", res.status);

//       const data = await res.json();
//       if (!res.ok) {
//         console.error("❌ Failed to clear cart:", data);
//         toast.error(data.message || "Failed to clear cart.");
//         return;
//       }

//       console.log("✅ Cart cleared successfully:", data);
//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("🔥 Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}

//       {/* Flying Animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <Toaster position="top-right" />
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);







// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
// console.log("✅ API Endpoint loaded:", API_ENDPOINT);

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [user, setUser] = useState(null);

//   // Load user from localStorage
//   useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//   const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

//   if (storedUser && token) {
//     try {
//       const parsedUser = JSON.parse(storedUser);
//       setUser({ ...parsedUser, token });
//       console.log("✅ Loaded user with token:", { ...parsedUser, token });
//     } catch (err) {
//       console.error("❌ Invalid user data in localStorage:", err);
//     }
//   } else {
//     console.warn("⚠️ No user or token found in localStorage.");
//   }
// }, []);


//   // Helper: auth headers
//   const getAuthHeaders = () => {
//     if (!user?.token) {
//       console.warn("⚠️ No token found in user object.");
//       return { "Content-Type": "application/json" };
//     }
//     return {
//       Authorization: `Bearer ${user.token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   // Fetch user cart
//   const fetchCart = async () => {
//     if (!user?.token) return console.warn("⚠️ fetchCart() called without token.");

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/me`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         console.log("❌ Failed to fetch cart:", errData);
//         toast.error(errData.message || "Failed to fetch your cart.");
//         return;
//       }

//       const data = await res.json();
//       console.log("✅ Cart fetched successfully:", data);
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("🔥 Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // Fetch cart once user is available
//   useEffect(() => {
//     if (user?.token) {
//       console.log("📥 User token detected. Fetching cart...");
//       fetchCart();
//     }
//   }, [user]);

//   // ✅ Add to cart
//   const addToCart = async (product) => {
//     console.log("🛍️ addToCart() triggered for product:", product);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     // Make sure we're sending the exact key backend expects
//     const payload = {
//       productId: product._id || product.id, // handle either _id or id
//     };

//     if (!payload.productId) {
//       console.error("❌ Missing productId:", product);
//       toast.error("Invalid product information.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json().catch(() => ({}));
//       console.log("📩 addToCart() Response:", data);

//       if (!response.ok) {
//         console.error("❌ addToCart() failed:", data);
//         toast.error(data.message || "Failed to add item to cart.");
//         return;
//       }

//       console.log("✅ Item added to cart successfully:", data);
//       setCart(data.items || []);
//       toast.success(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error("🔥 addToCart() error:", error);
//       toast.error("Error adding item. Please try again.");
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (productId) => {
//     if (!user?.token) {
//       toast.error("Please log in to remove items.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to remove item.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("🔥 Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!user?.token) {
//       toast.error("Please log in to update your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId, quantity }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to update quantity.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("🔥 Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     if (!user?.token) {
//       toast.error("Please log in to clear your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to clear cart.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("🔥 Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}

//       {/* Toast notifications */}
//       <Toaster position="top-right" />

//       {/* Flying animation (optional visual) */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);






// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
// console.log("✅ API Endpoint loaded:", API_ENDPOINT);

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);
//   const [user, setUser] = useState(null);

//   // Load user from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token") || localStorage.getItem("accessToken");

//     if (storedUser && token) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser({ ...parsedUser, token });
//         console.log("✅ Loaded user with token:", { ...parsedUser, token });
//       } catch (err) {
//         console.error("❌ Invalid user data in localStorage:", err);
//       }
//     } else {
//       console.warn("⚠️ No user or token found in localStorage.");
//     }
//   }, []);

//   // Helper: auth headers
//   const getAuthHeaders = () => {
//     if (!user?.token) {
//       console.warn("⚠️ No token found in user object.");
//       return { "Content-Type": "application/json" };
//     }
//     return {
//       Authorization: `Bearer ${user.token}`,
//       "Content-Type": "application/json",
//     };
//   };

//   // Fetch user cart
//   const fetchCart = async () => {
//     if (!user?.token) return console.warn("⚠️ fetchCart() called without token.");

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/me`, {
//         method: "GET",
//         headers: getAuthHeaders(),
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         console.log("❌ Failed to fetch cart:", errData);
//         toast.error(errData.message || "Failed to fetch your cart.");
//         return;
//       }

//       const data = await res.json();
//       console.log("✅ Cart fetched successfully:", data);
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("🔥 Error fetching cart:", error);
//       toast.error("Error fetching cart. Please check your connection.");
//     }
//   };

//   // Fetch cart once user is available
//   useEffect(() => {
//     if (user?.token) {
//       console.log("📥 User token detected. Fetching cart...");
//       fetchCart();
//     }
//   }, [user]);

//   // ✅ Add to cart
//   const addToCart = async (product) => {
//     console.log("🛍️ addToCart() triggered for product:", product);

//     const token = user?.token || localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please log in to add items to your cart.");
//       return;
//     }

//     if (!product) {
//       console.error("❌ Product is undefined.");
//       toast.error("Invalid product information.");
//       return;
//     }

//     // Send the full product object as 'product'
//    const payload = {
//   product: {
//     productId: product.productId,  // your newly added productId
//     name: product.title,
//     price: parseFloat(product.price.replace(/₦|,/g, "")),
//     image: product.image,
//     quantity: 1,
//   },
// };


//     try {
//       const response = await fetch(`${API_ENDPOINT}/api/cart/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json().catch(() => ({}));
//       console.log("📩 addToCart() Response:", data);

//       if (!response.ok) {
//         console.log("❌ addToCart() failed:", data);
//         toast.error(data.message || "Failed to add item to cart.");
//         return;
//       }

//       console.log("✅ Item added to cart successfully:", data);
//       setCart(data.items || []);
//       toast.success(`${product.name || "Item"} added to cart!`);
//     } catch (error) {
//       console.error("🔥 addToCart() error:", error);
//       toast.error("Error adding item. Please try again.");
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (productId) => {
//     if (!user?.token) {
//       toast.error("Please log in to remove items.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/remove`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to remove item.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       console.error("🔥 Error removing item:", error);
//       toast.error("Error removing item. Please try again.");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (!user?.token) {
//       toast.error("Please log in to update your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/update`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify({ productId, quantity }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to update quantity.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Cart updated!");
//     } catch (error) {
//       console.error("🔥 Error updating quantity:", error);
//       toast.error("Error updating quantity. Please try again.");
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     if (!user?.token) {
//       toast.error("Please log in to clear your cart.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/cart/clear`, {
//         method: "DELETE",
//         headers: getAuthHeaders(),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || "Failed to clear cart.");
//         return;
//       }

//       setCart(data.items || []);
//       toast.success("Cart cleared successfully!");
//     } catch (error) {
//       console.error("🔥 Error clearing cart:", error);
//       toast.error("Error clearing cart. Please try again.");
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}

//       {/* Toast notifications */}
//       <Toaster position="top-right" />

//       {/* Flying animation */}
//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{
//               top: flyingItem.imgRect.top,
//               left: flyingItem.imgRect.left,
//             }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: window.innerWidth < 768 ? 1 : 0.8,
//               ease: "easeInOut",
//             }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);





// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartContext = createContext();
// const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   // Fetch cart on mount
//   // useEffect(() => {
//   //   if (!token) return;
//   //   axios
//   //     .get(`${API}/cart`, { headers: { Authorization: `Bearer ${token}` } })
//   //     .then((res) => setCart(res.data))
//   //     .catch((err) => console.error(err));
//   // }, [token]);

//   const addToCart = async (product, imgRect) => {
//     setCart((prev) => {
//       const exists = prev.find((item) => item.productId === product.id);
//       if (exists) {
//         return prev.map((item) =>
//           item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });

//     try {
//       await axios.post(
//         `${API}/api/cart`,
//         console.log("POSTing to:", `${API}/cart`),
//         console.log("Token:", token),

//         {
//           productId: product.id,
//           name: product.name,
//           image: product.image,
//           price: product.price,
//           quantity: 1,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add item to server cart");
//     }

//     setFlyingItem({ ...product, imgRect });
//     setTimeout(() => setFlyingItem(null), 800);
//   };

//   const removeFromCart = async (id) => {
//     setCart(cart.filter((item) => item._id !== id));
//     try {
//       await axios.delete(`${API}/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove item from server cart");
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     setCart(cart.map((item) => (item._id === id ? { ...item, quantity } : item)));
//     try {
//       await axios.put(
//         `${API}/api/cart/${id}`,
//         { quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update quantity on server");
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
//       {children}

//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{ top: flyingItem.imgRect.top, left: flyingItem.imgRect.left }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: window.innerWidth < 768 ? 1 : 0.8, ease: "easeInOut" }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);







// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import axios from "axios";
// import toast from "react-hot-toast";

// const CartContext = createContext();
// const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [flyingItem, setFlyingItem] = useState(null);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   // Fetch cart on mount
//   useEffect(() => {
//     if (!token) return;
//     axios
//       .get(`${API}/cart`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => setCart(res.data))
//       .catch((err) => console.error(err));
//   }, [token]);

//   const addToCart = async (product, imgRect) => {
//     try {
//       const res = await axios.post(
//         `${API}/cart`,
//         {
//           productId: product.id,
//           name: product.name,
//           image: product.image,
//           price: product.price,
//           quantity: 1,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const newItem = res.data;

//       setCart((prev) => {
//         const exists = prev.find((item) => item._id === newItem._id);
//         if (exists) {
//           return prev.map((item) =>
//             item._id === newItem._id ? { ...item, quantity: newItem.quantity } : item
//           );
//         }
//         return [...prev, newItem];
//       });

//       // Flying animation
//       setFlyingItem({ ...product, imgRect });
//       setTimeout(() => setFlyingItem(null), 800);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add item to server cart");
//     }
//   };

//   const removeFromCart = async (id) => {
//     setCart((prev) => prev.filter((item) => item._id !== id));
//     try {
//       await axios.delete(`${API}/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to remove item from server cart");
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     setCart((prev) => prev.map((item) => (item._id === id ? { ...item, quantity } : item)));

//     try {
//       await axios.put(
//         `${API}/cart/${id}`,
//         { quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update quantity on server");
//     }
//   };

//   const clearCart = async () => {
//     try {
//       await Promise.all(
//         cart.map((item) =>
//           axios.delete(`${API}/cart/${item._id}`, { headers: { Authorization: `Bearer ${token}` } })
//         )
//       );
//       setCart([]);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to clear cart");
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}

//       <AnimatePresence>
//         {flyingItem && (
//           <motion.div
//             className="fixed w-16 h-16 z-50 rounded-xl overflow-hidden pointer-events-none"
//             style={{ top: flyingItem.imgRect.top, left: flyingItem.imgRect.left }}
//             initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
//             animate={{
//               x: window.innerWidth - flyingItem.imgRect.left - 60,
//               y: -flyingItem.imgRect.top + 80,
//               scale: 0.4,
//               opacity: 0.7,
//             }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: window.innerWidth < 768 ? 1 : 0.8, ease: "easeInOut" }}
//           >
//             <img
//               src={flyingItem.image}
//               alt={flyingItem.name}
//               className="w-full h-full object-cover rounded-xl shadow-lg will-change-transform"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);





"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
