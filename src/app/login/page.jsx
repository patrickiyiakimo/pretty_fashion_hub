"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  
  // ✅ Load API endpoint from environment variable
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_ENDPOINT}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user + token to local storage
        if (data.accessToken) localStorage.setItem("token", data.accessToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        setLoggedIn(true);
        setTimeout(() => router.push("/shop"), 2000);
      } else {
        alert(data.message || data.error || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white px-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white border-l-4 border-purple-700 p-12 shadow-lg text-center"
        >
          <h2 className="text-3xl font-oswald text-purple-700 mb-3">
            Welcome Back 👑
          </h2>
          <p className="text-gray-700 text-lg">
            Login successful! Redirecting you to your dashboard...
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white text-gray-900 py-40 px-3 md:px-12">
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

          {/* Login Form */}
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
                Don’t have an account?{" "}
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
