// "use client";
// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const CartContext = createContext();
// const API_BASE = process.env.BACKEND_URL || "http://localhost:4000";

// // Create axios instance with credentials included
// const api = axios.create({
//   baseURL: `${API_BASE}/api/cart`,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true, // This is crucial - sends HTTP-only cookies with every request
// });

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialized, setInitialized] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication status by attempting to fetch cart
//   const checkAuthStatus = useCallback(async () => {
//     try {
//       // Try to fetch cart - this will automatically send cookies
//       const response = await api.get("/me", {
//         timeout: 5000
//       });
      
//       // If we get here, we're authenticated
//       setIsAuthenticated(true);
      
//       if (response.data) {
//         setCart(response.data || []);
//       }
      
//       return true;
//     } catch (error) {
//       // 401 means not authenticated - this is expected
//       if (error.response?.status === 401) {
//         console.log("User not authenticated");
//         setIsAuthenticated(false);
//         setCart([]);
//       } else {
//         // Other errors (network, server issues)
//         console.error("Auth check error:", error.message);
//       }
//       return false;
//     } finally {
//       setInitialized(true);
//     }
//   }, []);

//   // Initialize on mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, [checkAuthStatus]);

//   // Fetch cart (only if authenticated)
//   const fetchCart = useCallback(async () => {
//     if (!isAuthenticated) {
//       console.log("User not authenticated, skipping cart fetch");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("🔄 Fetching cart...");
//       const response = await api.get("/me");
//       console.log("✅ Cart fetched successfully:", response.data);
//       setCart(response.data || []);
//     } catch (error) {
//       console.log("❌ Error fetching cart:", error.response?.data || error.message);
      
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         toast.error("Please log in to view your cart");
//       } else {
//         toast.error("Failed to load cart");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [isAuthenticated]);

//   // Refresh cart when authentication status changes
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCart();
//     }
//   }, [isAuthenticated, fetchCart]);

//   const addToCart = async (product) => {
//     if (!isAuthenticated) {
//       toast.error("Please log in to add items to cart");
//       setTimeout(() => {
//         window.location.href = "/login";
//       }, 1000);
//       return;
//     }

//     try {
//       console.log("🛒 Adding to cart:", product);
      
//       // Validate product data
//       if (!product._id && !product.id) {
//         toast.error("Product ID is missing");
//         return;
//       }

//       const payload = {
//         productId: product._id || product.id,
//         name: product.name || "Unnamed Product",
//         image: product.image || "",
//         price: product.price || 0,
//         quantity: 1,
//       };

//       console.log("📦 Payload:", payload);

//       const response = await api.post("/add", payload);
//       console.log("✅ Add to cart response:", response.data);

//       // Update cart state
//       setCart((prev) => {
//         const existingItemIndex = prev.findIndex(
//           (item) => item.productId === (product._id || product.id)
//         );
        
//         if (existingItemIndex >= 0) {
//           // Update existing item
//           const updatedCart = [...prev];
//           updatedCart[existingItemIndex] = response.data;
//           return updatedCart;
//         } else {
//           // Add new item
//           return [...prev, response.data];
//         }
//       });

//       toast.success("Added to cart successfully!");
//     } catch (error) {
//       console.error("❌ Error adding to cart:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
      
//       const errorMessage = error.response?.data?.error || 
//                           error.response?.data?.message || 
//                           "Failed to add item to cart";
      
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         toast.error("Session expired. Please log in again.");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 2000);
//       } else {
//         toast.error(errorMessage);
//       }
//     }
//   };

//   const removeFromCart = async (id) => {
//     if (!isAuthenticated) {
//       toast.error("Please log in to manage cart");
//       return;
//     }

//     try {
//       await api.delete("/remove", { data: { id } });
//       setCart((prev) => prev.filter((item) => item._id !== id));
//       toast.success("Item removed from cart");
//     } catch (error) {
//       console.error("Error removing from cart:", error);
      
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         toast.error("Session expired. Please log in again.");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 1500);
//       } else {
//         toast.error(error.response?.data?.error || "Failed to remove item");
//       }
//     }
//   };

//   const updateQuantity = async (id, quantity) => {
//     if (!isAuthenticated) {
//       toast.error("Please log in to update cart");
//       return;
//     }

//     try {
//       if (quantity === 0) {
//         await removeFromCart(id);
//         return;
//       }

//       const response = await api.put("/update", { id, quantity });
      
//       setCart((prev) => 
//         prev.map((item) => 
//           item._id === id ? response.data : item
//         )
//       );
//       toast.success("Quantity updated");
//     } catch (error) {
//       console.error("Error updating quantity:", error);
      
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         toast.error("Session expired. Please log in again.");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 1500);
//       } else {
//         toast.error(error.response?.data?.error || "Failed to update quantity");
//       }
//     }
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   const getCartTotal = useCallback(() => {
//     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   }, [cart]);

//   const getCartItemsCount = useCallback(() => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   }, [cart]);

//   // Response interceptor for handling 401 errors globally
//   useEffect(() => {
//     const interceptor = api.interceptors.response.use(
//       (response) => {
//         console.log("✅ API Response:", response.status, response.config.url);
//         return response;
//       },
//       async (error) => {
//         if (error.response?.status === 401) {
//           // Don't show error for the initial auth check
//           if (error.config.url !== "/me") {
//             console.log("🔒 Authentication error detected");
//             setIsAuthenticated(false);
//             setCart([]);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup interceptor on unmount
//     return () => {
//       api.interceptors.response.eject(interceptor);
//     };
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{ 
//         cart, 
//         loading,
//         initialized,
//         isAuthenticated,
//         addToCart, 
//         removeFromCart, 
//         updateQuantity,
//         clearCart,
//         getCartTotal,
//         getCartItemsCount,
//         refreshCart: fetchCart
//       }}
//     >
//       {children}
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//           },
//         }}
//       />
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };





"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CartContext = createContext();

// Use Next.js API routes as proxy
const API_BASE = ""; // Empty string means use relative paths

export function CartProvider({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function for authenticated fetch requests
  const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // This is crucial - sends cookies with the request
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    return response;
  };

  // Check authentication status by attempting to fetch cart
  const checkAuthStatus = useCallback(async () => {
    try {
      console.log("🔍 Checking authentication status...");
      const response = await fetchWithAuth("/api/cart/me", {
        method: "GET",
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("✅ User authenticated, cart data:", data);
        setIsAuthenticated(true);
        setCart(data || []);
      } else if (response.status === 401) {
        console.log("🔒 User not authenticated");
        setIsAuthenticated(false);
        setCart([]);
      } else {
        console.log("⚠️ Unexpected response:", response.status);
        setIsAuthenticated(false);
        setCart([]);
      }
    } catch (error) {
      console.error("❌ Auth check error:", error.message);
      setIsAuthenticated(false);
      setCart([]);
    } finally {
      setInitialized(true);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Fetch cart (only if authenticated)
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      console.log("User not authenticated, skipping cart fetch");
      return;
    }

    try {
      setLoading(true);
      console.log("🔄 Fetching cart...");
      const response = await fetchWithAuth("/api/cart/me", {
        method: "GET",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Cart fetched successfully:", data);
      setCart(data || []);
    } catch (error) {
      console.error("❌ Error fetching cart:", error.message);
      
      if (error.message.includes("401")) {
        setIsAuthenticated(false);
        toast.error("Please log in to view your cart");
      } else {
        toast.error("Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Refresh cart when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    try {
      console.log("🛒 Adding to cart:", product);
      
      // Validate product data
      const productId = product._id || product.id;
      if (!productId) {
        toast.error("Product ID is missing");
        return;
      }

      const payload = {
        productId: productId,
        name: product.name || product.title || "Unnamed Product",
        image: product.image || product.images?.[0] || "",
        price: product.price || 0,
        quantity: 1,
      };

      console.log("📦 Payload:", payload);

      const response = await fetchWithAuth("/api/cart/add", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Add to cart response:", data);

      // Update cart state
      setCart((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.productId === productId
        );
        
        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedCart = [...prev];
          updatedCart[existingItemIndex] = data;
          return updatedCart;
        } else {
          // Add new item
          return [...prev, data];
        }
      });

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      
      if (error.message.includes("401")) {
        setIsAuthenticated(false);
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(error.message || "Failed to add item to cart");
      }
    }
  };

  const removeFromCart = async (id) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage cart");
      return;
    }

    try {
      const response = await fetchWithAuth("/api/cart/remove", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }

      setCart((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      
      if (error.message.includes("401")) {
        setIsAuthenticated(false);
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(error.message || "Failed to remove item");
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!isAuthenticated) {
      toast.error("Please log in to update cart");
      return;
    }

    try {
      if (quantity <= 0) {
        await removeFromCart(id);
        return;
      }

      const response = await fetchWithAuth("/api/cart/update", {
        method: "PUT",
        body: JSON.stringify({ id, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setCart((prev) => 
        prev.map((item) => 
          item._id === id ? data : item
        )
      );
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      
      if (error.message.includes("401")) {
        setIsAuthenticated(false);
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(error.message || "Failed to update quantity");
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getCartItemsCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        loading,
        initialized,
        isAuthenticated,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        refreshCart: fetchCart
      }}
    >
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};