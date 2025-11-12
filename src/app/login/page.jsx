"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Logging in with:", formData);

      const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // Important for cookies
      });

      const data = response.data;
      console.log("✅ Login response:", data);

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = data;

        if (accessToken && user) {
          // ✅ Store tokens consistently in localStorage
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
          }
          localStorage.setItem("user", JSON.stringify(user));

          console.log("💾 Saved user & tokens:", {
            user,
            accessToken,
            refreshToken: refreshToken ? "stored" : "not provided",
          });

          toast.success("Login successful! Redirecting...");
          
          // Redirect after successful login
          setTimeout(() => {
            router.push("/shop");
          }, 1000);
        } else {
          toast.error("Missing token or user data from server");
        }
      } else {
        toast.error(data.message || data.error || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           "Login failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 py-40 px-3 md:px-12">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-purple-100 p-3"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-purple-800">
              Log In to Your Account
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Access your Kingz_World account and manage your store, products, and orders.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-purple-700 hover:underline"
              >
                Forgot Password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-700 underline">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 font-semibold transition ${
                  loading
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:opacity-95"
                }`}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}