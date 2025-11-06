"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    website: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);

  
  // ✅ Load API endpoint from environment variable
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


  // ✅ Load user from localStorage (after login)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !savedUser) {
      toast.error("You must be signed in to apply for partnership.");
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token missing. Please log in again.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_ENDPOINT}/api/partners/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 401 && data.error === "Token invalid or expired") {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        setSubmitted(true);
        setStatus(data.partner.status);
        toast.success("Application submitted successfully!");
      } else if (data?.error?.includes("already submitted")) {
        toast("You’ve already applied for partnership. Please wait for review.", {
          icon: "⏳",
        });
        setSubmitted(true);
        setStatus("pending");
      } else {
        toast.error(data.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refresh partner status (for pending applications)
  const handleRefreshStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token missing. Please log in again.");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${API_ENDPOINT}/api/partners`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const partners = await res.json();
      const myPartner = partners.find((p) => p.email === user.email);
      if (myPartner) {
        setStatus(myPartner.status);
        toast.success(`Status updated: ${myPartner.status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh status.");
    }
  };

  // ✅ Submitted Message
  if (submitted) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-3">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-l-4 border-purple-700 p-5 text-center max-w-xl shadow-xl"
        >
          <h2 className="text-3xl font-oswald text-purple-700 mb-4 uppercase tracking-wide">
            Application Received 💼
          </h2>
          {status === "pending" && (
            <>
              <p className="text-gray-700 text-lg">
                Thank you for partnering with{" "}
                <span className="text-purple-800 font-bold">Kingz_World</span>.
                <br />
                Your application is currently{" "}
                <span className="text-yellow-600 font-semibold">pending review</span>.
              </p>
              <button
                onClick={handleRefreshStatus}
                className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition"
              >
                Refresh Status
              </button>
            </>
          )}
          {status === "approved" && (
            <p className="text-gray-700 text-lg">
              Congratulations 🎉! You’ve been{" "}
              <span className="text-green-600 font-semibold">approved</span> as a verified partner.
              You can now upload and manage your products on your{" "}
              <a href="/dashboard" className="text-purple-700 underline">
                dashboard
              </a>.
            </p>
          )}
          {status === "rejected" && (
            <p className="text-red-600 text-lg">
              Unfortunately, your application was not approved. Please contact support for more information.
            </p>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white text-gray-900 py-40 px-6 md:px-16">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-oswald font-bold text-purple-800 uppercase tracking-wide">
            Become a Kingz_World Partner
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Join our network of fashion innovators and entrepreneurs. Get verified, showcase your products, and reach customers across Nigeria.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 border-purple-200 p-12 bg-gradient-to-br from-purple-50 via-white to-purple-100"
        >
          {[
            { name: "businessName", label: "Business Name", type: "text", placeholder: "Enter your brand name" },
            { name: "email", label: "Business Email", type: "email", placeholder: "youremail@business.com" },
            { name: "phone", label: "Phone Number", type: "text", placeholder: "+234..." },
            { name: "category", label: "Product Category", type: "text", placeholder: "e.g. Shoes, Bags, Accessories" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
                placeholder={placeholder}
              />
            </div>
          ))}

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
              Business Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              placeholder="Tell us about your brand and what makes it stand out."
            ></textarea>
          </div>

          {/* Website */}
          <div className="md:col-span-2">
            <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
              Website or Social Media Link
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              placeholder="https://instagram.com/yourbrand"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold tracking-wide uppercase px-16 py-4 shadow-md transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
