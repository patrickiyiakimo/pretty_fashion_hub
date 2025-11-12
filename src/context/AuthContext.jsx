"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in status on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        if (data.user) setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (loginData) => {
    try {
      const { data } = await axios.post("/api/auth/login", loginData, {
        withCredentials: true,
      });

      if (!data.user || !data.accessToken) {
        toast.error("Login failed: missing user or token");
        return;
      }

      // Save token if needed
      localStorage.setItem("accessToken", data.accessToken);

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.fullname.split(" ")[0]}!`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
