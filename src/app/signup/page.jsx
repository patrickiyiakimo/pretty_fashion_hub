"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // later you can connect this to your backend
  };

  return (
    <section className="min-h-screen mb-20 py-20 flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-purple-700 px-6">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side - Image */}
        <div className="hidden md:block relative">
          <img
            src="/images/shoe-1.webp"
            alt="Fashion Boutique"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white font-satisfy text-3xl font-extrabold tracking-wide text-center px-4">
              Pretty Fashion Hub ✨
            </h2>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Create Your Account
          </h2>
          <p className="text-gray-200 mb-6">
            Join our Gwarimpa boutique family for exclusive offers, latest arrivals & luxury experiences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Create a password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
