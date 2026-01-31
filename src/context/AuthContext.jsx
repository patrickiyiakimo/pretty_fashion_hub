"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in status on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${API_ENDPOINT}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });
        
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("Auth check error:", err);
        setUser(null);
        // Clear invalid token
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (loginData) => {
    try {
      const { data } = await axios.post(`${API_ENDPOINT}/api/auth/login`, loginData, {
        withCredentials: true,
      });

      console.log("Login response:", data);

      if (!data.user || !data.accessToken) {
        toast.error("Login failed: missing user or token");
        return;
      }

      // Save token
      localStorage.setItem("accessToken", data.accessToken);

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.fullname?.split(" ")[0] || data.user.name || 'User'}!`);
      
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        await axios.post(`${API_ENDPOINT}/api/auth/logout`, {}, { 
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true 
        });
      }
      
      setUser(null);
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      // Still clear local state even if API call fails
      setUser(null);
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
    }
  };

  // Helper to check if user is admin
  const isAdmin = user?.isAdmin || false;

  // Helper to get token
  const getToken = () => localStorage.getItem("accessToken");

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      isAdmin,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);