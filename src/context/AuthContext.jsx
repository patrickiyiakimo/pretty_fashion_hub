// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check logged-in status on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
        
//         if (!token) {
//           setUser(null);
//           setLoading(false);
//           return;
//         }

//         const { data } = await axios.get(`${API_ENDPOINT}/api/auth/me`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//           withCredentials: true,
//         });
        
//         if (data.user) setUser(data.user);
//       } catch (err) {
//         console.error("Auth check error:", err);
//         setUser(null);
//         // Clear invalid token
//         if (err.response?.status === 401) {
//           localStorage.removeItem("accessToken");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const login = async (loginData) => {
//     try {
//       const { data } = await axios.post(`${API_ENDPOINT}/api/auth/login`, loginData, {
//         withCredentials: true,
//       });

//       console.log("Login response:", data);

//       if (!data.user || !data.accessToken) {
//         toast.error("Login failed: missing user or token");
//         return;
//       }

//       // Save token
//       localStorage.setItem("accessToken", data.accessToken);

//       setUser(data.user);
//       toast.success(`Welcome back, ${data.user.fullname?.split(" ")[0] || data.user.name || 'User'}!`);
      
//       return { success: true, user: data.user };
//     } catch (err) {
//       console.error("Login error:", err);
//       const errorMessage = err.response?.data?.message || err.message || "Login failed";
//       toast.error(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   const logout = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
      
//       if (token) {
//         await axios.post(`${API_ENDPOINT}/api/auth/logout`, {}, { 
//           headers: {
//             'Authorization': `Bearer ${token}`
//           },
//           withCredentials: true 
//         });
//       }
      
//       setUser(null);
//       localStorage.removeItem("accessToken");
//       toast.success("Logged out successfully");
//     } catch (err) {
//       console.error("Logout error:", err);
//       // Still clear local state even if API call fails
//       setUser(null);
//       localStorage.removeItem("accessToken");
//       toast.success("Logged out successfully");
//     }
//   };

//   // Helper to check if user is admin
//   const isAdmin = user?.isAdmin || false;

//   // Helper to get token
//   const getToken = () => localStorage.getItem("accessToken");

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       logout, 
//       loading,
//       isAdmin,
//       getToken
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);




"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

// Create axios instance with better defaults
const authAxios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000, // 5 second timeout
  withCredentials: true,
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Don't start as loading
  const [lastAuthCheck, setLastAuthCheck] = useState(0);
  const [authCache, setAuthCache] = useState(null);

  // Cache user data to localStorage for instant hydration
  const cacheUserData = useCallback((userData) => {
    if (userData) {
      localStorage.setItem('cachedUser', JSON.stringify(userData));
      localStorage.setItem('cachedUserTime', Date.now().toString());
    }
  }, []);

  // Get cached user data (immediate, no API call)
  const getCachedUser = useCallback(() => {
    try {
      const cached = localStorage.getItem('cachedUser');
      const cachedTime = localStorage.getItem('cachedUserTime');
      
      if (cached && cachedTime) {
        const timeDiff = Date.now() - parseInt(cachedTime);
        // Use cache if less than 5 minutes old
        if (timeDiff < 5 * 60 * 1000) {
          return JSON.parse(cached);
        }
      }
    } catch (err) {
      // Clear corrupted cache
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedUserTime');
    }
    return null;
  }, []);

  // Check auth status - optimized version
  const checkAuthStatus = useCallback(async (force = false) => {
    // Don't check too frequently (min 30 seconds between checks)
    const now = Date.now();
    if (!force && now - lastAuthCheck < 30000 && authCache) {
      return authCache;
    }

    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setAuthCache(null);
      return null;
    }

    // Use cached user immediately for better UX
    const cachedUser = getCachedUser();
    if (cachedUser && !force) {
      setUser(cachedUser);
    }

    try {
      setLoading(true);
      const { data } = await authAxios.get(`/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 3000, // Faster timeout for auth check
      });
      
      if (data.user) {
        setUser(data.user);
        cacheUserData(data.user);
        setAuthCache(data.user);
        setLastAuthCheck(now);
      }
      return data.user;
    } catch (err) {
      console.error("Auth check error:", err);
      
      // If 401 (unauthorized), clear invalid token
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem('cachedUser');
        localStorage.removeItem('cachedUserTime');
        setUser(null);
        setAuthCache(null);
      }
      
      // Return cached user if API fails (offline mode)
      return cachedUser;
    } finally {
      setLoading(false);
    }
  }, [lastAuthCheck, authCache, cacheUserData, getCachedUser]);

  // Initialize auth on mount (non-blocking)
  useEffect(() => {
    // First: Try to get from cache immediately (no delay)
    const cachedUser = getCachedUser();
    if (cachedUser) {
      setUser(cachedUser);
    }

    // Then: Check with server in background
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Small delay to prioritize page rendering
      const timer = setTimeout(() => {
        checkAuthStatus();
      }, 100); // 100ms delay, non-blocking
      
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [checkAuthStatus, getCachedUser]);

  const login = async (loginData) => {
    try {
      setLoading(true);
      
      // Show immediate feedback
      toast.loading("Signing you in...", { id: "login" });
      
      const { data } = await authAxios.post(`/api/auth/login`, loginData, {
        timeout: 8000, // 8 second timeout for login
      });

      console.log("Login response:", data);

      if (!data.user || !data.accessToken) {
        toast.error("Login failed: missing user or token", { id: "login" });
        setLoading(false);
        return { success: false, error: "Invalid response" };
      }

      // Save token
      localStorage.setItem("accessToken", data.accessToken);
      
      // Cache user data
      cacheUserData(data.user);
      setUser(data.user);
      
      toast.success(`Welcome back, ${data.user.fullname?.split(" ")[0] || data.user.name || 'User'}!`, { 
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
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        // Don't wait for logout API - fire and forget
        authAxios.post(`/api/auth/logout`, {}, { 
          headers: { 'Authorization': `Bearer ${token}` }
        }).catch(() => {/* Ignore errors */});
      }
    } catch (err) {
      // Ignore errors in logout
    } finally {
      // Always clear local state immediately
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem('cachedUser');
      localStorage.removeItem('cachedUserTime');
      setAuthCache(null);
      
      toast.success("Logged out successfully", { duration: 1500 });
    }
  };

  // Add silent token refresh
  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return null;

      const { data } = await authAxios.post(`/api/auth/refresh`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 3000,
      });

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      }
    } catch (err) {
      console.log("Token refresh failed:", err);
      return null;
    }
  }, []);

  // Auto-refresh token every 14 minutes (if token lasts 15 minutes)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
  }, [user, refreshToken]);

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
      getToken,
      checkAuthStatus,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);