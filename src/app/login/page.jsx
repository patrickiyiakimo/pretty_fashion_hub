"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Logging in with:", formData);

      const res = await fetch(`${API_ENDPOINT}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("✅ Login response:", data);

      if (res.ok) {
        // Combine user and token together for CartContext compatibility
        if (data.user && data.token) {
          const userData = { ...data.user, token: data.token };
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("💾 Saved user with token:", userData);
        } else {
          console.warn("⚠️ Missing user or token in response:", data);
        }

        toast.success("Login successful!");
        setTimeout(() => router.push("/shop"), 2000);
      } else {
        toast.error(data.message || data.error || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      toast.error("An error occurred. Please try again later.");
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
