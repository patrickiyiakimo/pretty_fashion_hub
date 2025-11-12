"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();
const API_BASE = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAccessToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const getRefreshToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  };

  // Create axios instance
  const api = axios.create({
    baseURL: `${API_BASE}/api/cart`,
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Adding token to request");
    } else {
      console.warn("⚠️ No access token available");
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Response interceptor with improved token refresh
  api.interceptors.response.use(
    (response) => {
      console.log("✅ API Response:", response.status, response.config.url);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          console.log("🔄 Attempting token refresh...");
          const refreshToken = getRefreshToken();
          
          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const response = await axios.post(
            `${API_BASE}/api/auth/refresh`,
            { refreshToken },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const { accessToken, user } = response.data;
          
          if (accessToken) {
            // Store new tokens
            localStorage.setItem("accessToken", accessToken);
            if (user) {
              localStorage.setItem("user", JSON.stringify(user));
            }
            
            // Update authorization header
            api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            
            console.log("✅ Token refreshed successfully");
            
            // Retry original request
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("❌ Token refresh failed:", refreshError);
          
          // Clear all stored data
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          
          toast.error("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }
      }
      
      return Promise.reject(error);
    }
  );

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      const token = getAccessToken();
      if (!token) {
        console.log("⚠️ No access token available for fetching cart.");
        return;
      }

      try {
        setLoading(true);
        console.log("🔄 Fetching cart...");
        const response = await api.get("/me");
        console.log("✅ Cart fetched successfully:", response.data);
        setCart(response.data || []);
      } catch (error) {
        console.error("❌ Error fetching cart:", error.response?.data || error.message);
        
        if (error.response?.status === 401) {
          toast.error("Please log in to view your cart");
        } else {
          toast.error("Failed to load cart");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const token = getAccessToken();
    if (!token) {
      toast.error("Please log in to add items to cart");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      return;
    }

    try {
      console.log("🛒 Adding to cart:", product);
      
      // Validate product data
      if (!product._id && !product.id) {
        toast.error("Product ID is missing");
        return;
      }

      const payload = {
        productId: product._id || product.id,
        name: product.name || "Unnamed Product",
        image: product.image || "",
        price: product.price || 0,
        quantity: 1,
      };

      console.log("📦 Payload:", payload);

      const response = await api.post("/add", payload);
      console.log("✅ Add to cart response:", response.data);

      // Update cart state
      setCart((prev) => {
        const existingItem = prev.find(
          (item) => item.productId === (product._id || product.id)
        );
        
        if (existingItem) {
          return prev.map((item) =>
            item.productId === (product._id || product.id)
              ? { ...response.data }
              : item
          );
        } else {
          return [...prev, response.data];
        }
      });

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("❌ Error adding to cart:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to add item to cart";
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.delete("/remove", { data: { id } });
      setCart((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(error.response?.data?.error || "Failed to remove item");
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await api.put("/update", { id, quantity });
      
      if (quantity === 0) {
        setCart((prev) => prev.filter((item) => item._id !== id));
        toast.success("Item removed from cart");
      } else {
        setCart((prev) => 
          prev.map((item) => 
            item._id === id ? response.data : item
          )
        );
        toast.success("Quantity updated");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.response?.data?.error || "Failed to update quantity");
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        loading, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
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