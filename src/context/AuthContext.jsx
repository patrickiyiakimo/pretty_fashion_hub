"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

// Create axios instance with better defaults
const authAxios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
  withCredentials: true, // Important: This sends cookies with every request
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [initialized, setInitialized] = useState(false);

  const login = async (loginData) => {
    try {
      setLoading(true);
      
      toast.loading("Signing you in...", { id: "login" });
      
      const { data } = await authAxios.post(`/api/auth/login`, loginData, {
        timeout: 8000,
      });

      console.log("Login response:", data);

      if (!data.user) {
        toast.error("Login failed: missing user data", { id: "login" });
        setLoading(false);
        return { success: false, error: "Invalid response" };
      }

      // Cache user data
      localStorage.setItem('cachedUser', JSON.stringify(data.user));
      localStorage.setItem('cachedUserTime', Date.now().toString());
      
      setUser(data.user);
      
      toast.success(`Welcome back, ${data.user.fullname?.split(" ")[0] || data.user.email?.split('@')[0] || 'User'}!`, { 
        id: "login",
        duration: 2000 
      });
      
      setLoading(false);
      return { success: true, user: data.user };
      
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      
      let errorMessage = "Login failed";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Connection timeout. Please check your internet.";
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (err.response?.status === 429) {
        errorMessage = "Too many attempts. Please wait 15 minutes.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage, { id: "login" });
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await authAxios.post(`/api/auth/logout`, {});
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedUserTime');
      toast.success("Logged out successfully", { duration: 1500 });
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      const { data } = await authAxios.post(`/api/auth/refresh`, {}, {
        timeout: 3000,
      });
      return data.accessToken;
    } catch (err) {
      console.log("Token refresh failed:", err);
      return null;
    }
  }, []);

  // Auto refresh token every 14 minutes
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, refreshToken]);

  const isAdmin = user?.role === 'admin' || user?.isAdmin || false;

  const getToken = () => {
    console.warn("getToken() called but tokens are HTTP-only and not accessible from JavaScript");
    return null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      initialized,
      isAdmin,
      getToken,
      refreshToken,
    //   checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};