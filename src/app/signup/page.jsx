"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Creating account with:", form);

      const response = await axios.post(`${API_ENDPOINT}/api/auth/register`, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true // Important for cookies
      });

      const data = response.data;
      console.log("✅ Signup response:", data);

      if (response.status === 201) {
        const { accessToken, refreshToken, user } = data;

        if (accessToken && user) {
          // ✅ Store all tokens consistently
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

          toast.success("Account created successfully! Welcome to Kingz_World!");

          // Redirect after successful signup
          setTimeout(() => {
            router.push("/shop");
          }, 1500);
        } else {
          toast.error("Missing token or user data from server");
        }
      } else {
        toast.error(data.message || data.error || "Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           "Registration failed. Please try again.";
        toast.error(errorMessage);
        
        // Specific handling for common errors
        if (error.response.status === 400) {
          if (error.response.data?.message?.includes("already registered")) {
            toast.error("Email already registered. Please use a different email or login.");
          }
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection and try again.");
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
              Create your account
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Join Kingz_World to shop, sell, and grow your fashion business. Create an
              account to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+234..."
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/forgot-password" className="text-purple-700 hover:underline">
                  Forgot Password?
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
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-700 underline">
              Log in
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}