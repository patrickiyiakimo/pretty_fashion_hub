// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";

// export default function PartnerPage() {
//   const [formData, setFormData] = useState({
//     businessName: "",
//     email: "",
//     phone: "",
//     category: "",
//     description: "",
//     website: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");
//   const [user, setUser] = useState(null);

  
//   // ✅ Load API endpoint from environment variable
//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;


//   // ✅ Load user from localStorage (after login)
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!token || !savedUser) {
//       toast.error("You must be signed in to apply for partnership.");
//       window.location.href = "/login";
//     } else {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Token missing. Please log in again.");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners/apply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.status === 401 && data.error === "Token invalid or expired") {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return;
//       }

//       if (res.ok) {
//         setSubmitted(true);
//         setStatus(data.partner.status);
//         toast.success("Application submitted successfully!");
//       } else if (data?.error?.includes("already submitted")) {
//         toast("You’ve already applied for partnership. Please wait for review.", {
//           icon: "⏳",
//         });
//         setSubmitted(true);
//         setStatus("pending");
//       } else {
//         toast.error(data.error || "Failed to submit application. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while submitting your application.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Refresh partner status (for pending applications)
//   const handleRefreshStatus = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Token missing. Please log in again.");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const partners = await res.json();
//       const myPartner = partners.find((p) => p.email === user.email);
//       if (myPartner) {
//         setStatus(myPartner.status);
//         toast.success(`Status updated: ${myPartner.status}`);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to refresh status.");
//     }
//   };

//   // ✅ Submitted Message
//   if (submitted) {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-3">
//         <Toaster position="top-right" />
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white border-l-4 border-purple-700 p-5 text-center max-w-xl shadow-xl"
//         >
//           <h2 className="text-3xl font-oswald text-purple-700 mb-4 uppercase tracking-wide">
//             Application Received 💼
//           </h2>
//           {status === "pending" && (
//             <>
//               <p className="text-gray-700 text-lg">
//                 Thank you for partnering with{" "}
//                 <span className="text-purple-800 font-bold">Kingz_World</span>.
//                 <br />
//                 Your application is currently{" "}
//                 <span className="text-yellow-600 font-semibold">pending review</span>.
//               </p>
//               <button
//                 onClick={handleRefreshStatus}
//                 className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition"
//               >
//                 Refresh Status
//               </button>
//             </>
//           )}
//           {status === "approved" && (
//             <p className="text-gray-700 text-lg">
//               Congratulations 🎉! You’ve been{" "}
//               <span className="text-green-600 font-semibold">approved</span> as a verified partner.
//               You can now upload and manage your products on your{" "}
//               <a href="/dashboard" className="text-purple-700 underline">
//                 dashboard
//               </a>.
//             </p>
//           )}
//           {status === "rejected" && (
//             <p className="text-red-600 text-lg">
//               Unfortunately, your application was not approved. Please contact support for more information.
//             </p>
//           )}
//         </motion.div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-white text-gray-900 py-40 px-6 md:px-16">
//       <Toaster position="top-right" />
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-5xl md:text-6xl font-oswald font-bold text-purple-800 uppercase tracking-wide">
//             Become a Kingz_World Partner
//           </h1>
//           <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4 mb-6"></div>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
//             Join our network of fashion innovators and entrepreneurs. Get verified, showcase your products, and reach customers across Nigeria.
//           </p>
//         </motion.div>

//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-10 border-purple-200 p-12 bg-gradient-to-br from-purple-50 via-white to-purple-100"
//         >
//           {[
//             { name: "businessName", label: "Business Name", type: "text", placeholder: "Enter your brand name" },
//             { name: "email", label: "Business Email", type: "email", placeholder: "youremail@business.com" },
//             { name: "phone", label: "Phone Number", type: "text", placeholder: "+234..." },
//             { name: "category", label: "Product Category", type: "text", placeholder: "e.g. Shoes, Bags, Accessories" },
//           ].map(({ name, label, type, placeholder }) => (
//             <div key={name}>
//               <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
//                 placeholder={placeholder}
//               />
//             </div>
//           ))}

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
//               Business Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="5"
//               required
//               className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
//               placeholder="Tell us about your brand and what makes it stand out."
//             ></textarea>
//           </div>

//           {/* Website */}
//           <div className="md:col-span-2">
//             <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
//               Website or Social Media Link
//             </label>
//             <input
//               type="text"
//               name="website"
//               value={formData.website}
//               onChange={handleChange}
//               className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
//               placeholder="https://instagram.com/yourbrand"
//             />
//           </div>

//           <div className="md:col-span-2 flex justify-center mt-8">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold tracking-wide uppercase px-16 py-4 shadow-md transition-all duration-300 ${
//                 loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit Application"}
//             </button>
//           </div>
//         </motion.form>
//       </div>
//     </section>
//   );
// }








// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import Confetti from "react-confetti";

// /**
//  * PartnerPage
//  *
//  * Behavior:
//  * - On mount, checks localStorage for user + token; if missing, redirect to /login.
//  * - Fetches partner records and checks if current user's email exists:
//  *    -> approved  => show congratulations + confetti
//  *    -> pending   => show "Application Received" with Refresh Status
//  *    -> rejected  => show rejected message
//  *    -> none      => show the application form
//  *
//  * - On submit: posts to /api/partners/apply and handles server responses
//  *
//  * Environment: expects NEXT_PUBLIC_API_ENDPOINT (e.g. http://localhost:4000)
//  */

// const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

// export default function PartnerPage() {
//   const [formData, setFormData] = useState({
//     businessName: "",
//     email: "",
//     phone: "",
//     category: "",
//     description: "",
//     website: "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(""); // pending | approved | rejected | ""
//   const [user, setUser] = useState(null);
//   const [checking, setChecking] = useState(true);
//   const [error, setError] = useState("");
//   const confettiRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

//   // read user & token, redirect if missing
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!token || !savedUser) {
//       toast.error("You must be signed in to apply for partnership.");
//       // small delay so user sees toast
//       setTimeout(() => (window.location.href = "/login"), 700);
//       return;
//     }

//     const parsedUser = JSON.parse(savedUser);
//     setUser(parsedUser);
//     // pre-fill email on form if available
//     setFormData((prev) => ({ ...prev, email: parsedUser.email || prev.email }));

//     // Wait until we set user then check partner status
//     checkPartnerStatus(parsedUser);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     // set confetti size to window size
//     function handleResize() {
//       setDimensions({ width: window.innerWidth, height: window.innerHeight });
//     }
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   async function checkPartnerStatus(currentUser) {
//     setChecking(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${API_ENDPOINT}/api/partners`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       });

//       const ct = res.headers.get("content-type") || "";
//       let payload = null;
//       if (ct.includes("application/json")) {
//         payload = await res.json();
//       } else {
//         // if server returned HTML or something else, warn and bail
//         const text = await res.text();
//         console.warn("Partners endpoint returned non-json:", text.slice(0, 300));
//         throw new Error("Unexpected server response while checking partner status.");
//       }

//       // payload may be an array, or { partners: [...] }, or { success, partners }
//       let list = [];
//       if (Array.isArray(payload)) list = payload;
//       else if (payload.partners && Array.isArray(payload.partners)) list = payload.partners;
//       else if (payload.data && Array.isArray(payload.data)) list = payload.data;
//       else {
//         // try to extract the first array property
//         const maybeArray = Object.values(payload).find((v) => Array.isArray(v));
//         if (maybeArray) list = maybeArray;
//       }

//       // find partner by email (case-insensitive)
//       const myPartner = list.find(
//         (p) => p && (p.email || p.clientEmail || p.businessEmail) && (p.email || p.clientEmail || p.businessEmail).toLowerCase() === (currentUser.email || "").toLowerCase()
//       );

//       if (myPartner) {
//         // normalize status strings
//         const s = (myPartner.status || myPartner.state || myPartner.approval || "").toLowerCase();
//         if (s.includes("approve")) {
//           setStatus("approved");
//           setSubmitted(true); // show congrats
//         } else if (s.includes("pend")) {
//           setStatus("pending");
//           setSubmitted(true); // show "Application Received"
//         } else if (s.includes("reject")) {
//           setStatus("rejected");
//           setSubmitted(true);
//         } else {
//           // unknown status text — treat as pending
//           setStatus(myPartner.status || "pending");
//           setSubmitted(true);
//         }
//       } else {
//         // no partner found; show form
//         setSubmitted(false);
//         setStatus("");
//       }
//     } catch (err) {
//       console.error("checkPartnerStatus error:", err);
//       setError(err.message || "Failed to check partner status");
//     } finally {
//       setChecking(false);
//     }
//   }

//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Token missing. Please log in again.");
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//       return;
//     }

//     try {
//       const res = await fetch(`${API_ENDPOINT}/api/partners/apply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const ct = res.headers.get("content-type") || "";
//       let data = null;
//       if (ct.includes("application/json")) data = await res.json();
//       else {
//         const text = await res.text();
//         console.warn("Apply returned non-json:", text.slice(0, 300));
//         throw new Error("Unexpected server response when applying.");
//       }

//       if (res.status === 401 && data.error && data.error.toLowerCase().includes("token")) {
//         toast.error("Session expired. Please log in again.");
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return;
//       }

//       // server might return { success: true, partner } or { partner } or { error }
//       if (res.ok) {
//         const partnerObj = data.partner || data.data || data;
//         // determine status
//         const st = (partnerObj && (partnerObj.status || partnerObj.state)) || "pending";
//         setStatus(st.toLowerCase());
//         setSubmitted(true);

//         toast.success("Application submitted successfully!");
//       } else {
//         // server responded 4xx/5xx
//         if (data && data.error && typeof data.error === "string" && data.error.toLowerCase().includes("already")) {
//           toast("You’ve already applied for partnership. Please wait for review.", { icon: "⏳" });
//           setSubmitted(true);
//           setStatus("pending");
//         } else {
//           const msg = (data && (data.error || JSON.stringify(data))) || "Failed to submit application";
//           toast.error(msg);
//           setError(msg);
//         }
//       }
//     } catch (err) {
//       console.error("handleSubmit error:", err);
//       const msg = err.message || "An error occurred while submitting your application.";
//       toast.error(msg);
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh partner status (for pending applications)
//   const handleRefreshStatus = async () => {
//     if (!user) return;
//     try {
//       await checkPartnerStatus(user);
//       toast.success("Status refreshed");
//     } catch (err) {
//       toast.error("Failed to refresh status");
//     }
//   };

//   // UI: if still checking initial status, show loader
//   if (checking) {
//     return (
//       <section className="min-h-screen flex items-center justify-center">
//         <div className="text-center text-gray-600">Checking partner status...</div>
//       </section>
//     );
//   }

//   // Approved view — show confetti + congrats (no form)
//   if (submitted && status === "approved") {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-3">
//         <Toaster position="top-right" />
//         <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={250} recycle={false} />
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white border-l-4 border-green-600 p-6 text-center max-w-xl shadow-xl rounded"
//         >
//           <h2 className="text-3xl md:text-4xl font-oswald text-green-700 mb-4 uppercase tracking-wide">
//             Congratulations 🎉
//           </h2>
//           <p className="text-gray-700 text-lg mb-4">
//             You’ve been <span className="font-semibold text-green-600">approved</span> as a verified partner on{" "}
//             <span className="text-purple-800 font-bold">Kingz_World</span>!
//           </p>
//           <p className="text-gray-600 mb-6">
//             You can now upload and manage your products from your{" "}
//             <a href="/dashboard" className="text-purple-700 underline">
//               dashboard
//             </a>.
//           </p>
//           <div className="flex justify-center gap-3">
//             <a href="/dashboard" className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800">Go to Dashboard</a>
//             <button onClick={() => { setSubmitted(false); setStatus(""); }} className="bg-gray-100 px-4 py-3 rounded-lg">Sign out</button>
//           </div>
//         </motion.div>
//       </section>
//     );
//   }

//   // Submitted (pending / rejected) view
//   if (submitted && status && status !== "approved") {
//     return (
//       <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-3">
//         <Toaster position="top-right" />
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white border-l-4 border-purple-700 p-5 text-center max-w-xl shadow-xl rounded"
//         >
//           <h2 className="text-3xl font-oswald text-purple-700 mb-4 uppercase tracking-wide">
//             Application Received 💼
//           </h2>

//           {status === "pending" && (
//             <>
//               <p className="text-gray-700 text-lg">
//                 Thank you for partnering with <span className="text-purple-800 font-bold">Kingz_World</span>.
//                 <br />
//                 Your application is currently <span className="text-yellow-600 font-semibold">pending review</span>.
//               </p>
//               <button
//                 onClick={handleRefreshStatus}
//                 className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition"
//               >
//                 Refresh Status
//               </button>
//             </>
//           )}

//           {status === "rejected" && (
//             <>
//               <p className="text-red-600 text-lg">
//                 Unfortunately, your application was not approved. Please contact support for more information.
//               </p>
//               <div className="mt-6">
//                 <a href="/support" className="text-purple-700 underline">Contact Support</a>
//               </div>
//             </>
//           )}
//         </motion.div>
//       </section>
//     );
//   }

//   // Default: show form
//   return (
//     <section className="min-h-screen bg-white text-gray-900 py-20 px-6 md:px-16">
//       <Toaster position="top-right" />
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-oswald font-bold text-purple-800 uppercase tracking-wide">
//             Become a Kingz_World Partner
//           </h1>
//           <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4 mb-6"></div>
//           <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
//             Join our network of fashion innovators and entrepreneurs. Get verified, showcase your products, and reach customers across Nigeria.
//           </p>
//         </motion.div>

//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 border-purple-200 p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded"
//         >
//           {[
//             { name: "businessName", label: "Business Name", type: "text", placeholder: "Enter your brand name" },
//             { name: "email", label: "Business Email", type: "email", placeholder: "youremail@business.com" },
//             { name: "phone", label: "Phone Number", type: "text", placeholder: "+234..." },
//             { name: "category", label: "Product Category", type: "text", placeholder: "e.g. Shoes, Bags, Accessories" },
//           ].map(({ name, label, type, placeholder }) => (
//             <div key={name}>
//               <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name] || ""}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800 rounded"
//                 placeholder={placeholder}
//               />
//             </div>
//           ))}

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
//               Business Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description || ""}
//               onChange={handleChange}
//               rows="5"
//               required
//               className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800 rounded"
//               placeholder="Tell us about your brand and what makes it stand out."
//             ></textarea>
//           </div>

//           {/* Website */}
//           <div className="md:col-span-2">
//             <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">
//               Website or Social Media Link
//             </label>
//             <input
//               type="text"
//               name="website"
//               value={formData.website || ""}
//               onChange={handleChange}
//               className="w-full border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800 rounded"
//               placeholder="https://instagram.com/yourbrand"
//             />
//           </div>

//           <div className="md:col-span-2 flex justify-center mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold tracking-wide uppercase px-10 py-3 shadow-md transition-all duration-300 rounded ${
//                 loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit Application"}
//             </button>
//           </div>

//           {error && <div className="md:col-span-2 text-red-600 text-center">{error}</div>}
//         </motion.form>
//       </div>
//     </section>
//   );
// }






"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

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
  const [status, setStatus] = useState(""); // pending | approved | rejected | ""
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !savedUser) {
      toast.error("You must be signed in to apply for partnership.");
      setTimeout(() => (window.location.href = "/login"), 700);
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    setFormData((prev) => ({ ...prev, email: parsedUser.email || prev.email }));

    checkPartnerStatus(parsedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function checkPartnerStatus(currentUser) {
    setChecking(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_ENDPOINT}/api/partners`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const ct = res.headers.get("content-type") || "";
      let payload = null;
      if (ct.includes("application/json")) {
        payload = await res.json();
      } else {
        const text = await res.text();
        console.warn("Partners endpoint returned non-json:", text.slice(0, 300));
        throw new Error("Unexpected server response while checking partner status.");
      }

      let list = [];
      if (Array.isArray(payload)) list = payload;
      else if (payload.partners && Array.isArray(payload.partners)) list = payload.partners;
      else if (payload.data && Array.isArray(payload.data)) list = payload.data;
      else {
        const maybeArray = Object.values(payload).find((v) => Array.isArray(v));
        if (maybeArray) list = maybeArray;
      }

      const myPartner = list.find(
        (p) => p && (p.email || p.clientEmail || p.businessEmail) && (p.email || p.clientEmail || p.businessEmail).toLowerCase() === (currentUser.email || "").toLowerCase()
      );

      if (myPartner) {
        const s = (myPartner.status || myPartner.state || myPartner.approval || "").toLowerCase();
        if (s.includes("approve")) {
          setStatus("approved");
          setSubmitted(true);
        } else if (s.includes("pend")) {
          setStatus("pending");
          setSubmitted(true);
        } else if (s.includes("reject")) {
          setStatus("rejected");
          setSubmitted(true);
        } else {
          setStatus(myPartner.status || "pending");
          setSubmitted(true);
        }
      } else {
        setSubmitted(false);
        setStatus("");
      }
    } catch (err) {
      console.error("checkPartnerStatus error:", err);
      setError(err.message || "Failed to check partner status");
    } finally {
      setChecking(false);
    }
  }

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token missing. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

      const ct = res.headers.get("content-type") || "";
      let data = null;
      if (ct.includes("application/json")) data = await res.json();
      else {
        const text = await res.text();
        console.warn("Apply returned non-json:", text.slice(0, 300));
        throw new Error("Unexpected server response when applying.");
      }

      if (res.status === 401 && data.error && data.error.toLowerCase().includes("token")) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        const partnerObj = data.partner || data.data || data;
        const st = (partnerObj && (partnerObj.status || partnerObj.state)) || "pending";
        setStatus(st.toLowerCase());
        setSubmitted(true);

        toast.success("Application submitted successfully!");
      } else {
        if (data && data.error && typeof data.error === "string" && data.error.toLowerCase().includes("already")) {
          toast("You’ve already applied for partnership. Please wait for review.", { icon: "⏳" });
          setSubmitted(true);
          setStatus("pending");
        } else {
          const msg = (data && (data.error || JSON.stringify(data))) || "Failed to submit application";
          toast.error(msg);
          setError(msg);
        }
      }
    } catch (err) {
      console.error("handleSubmit error:", err);
      const msg = err.message || "An error occurred while submitting your application.";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (!user) return;
    try {
      await checkPartnerStatus(user);
      toast.success("Status refreshed");
    } catch (err) {
      toast.error("Failed to refresh status");
    }
  };

  if (checking) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600 text-lg font-medium">Checking partner status...</div>
      </section>
    );
  }

  if (submitted && status === "approved") {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4">
        <Toaster position="top-right" />
        <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={300} recycle={false} />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-2xl max-w-lg w-full p-8 md:p-12 text-center border border-purple-200"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 tracking-tight">🎉 Congratulations!</h2>
          <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
            Your application has been <span className="font-semibold text-green-600">approved</span> as a verified partner on <span className="text-purple-700 font-bold">Kingz_World</span>.
          </p>
          <p className="text-gray-600 mb-8">
            You can now upload and manage your products from your dashboard.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="/dashboard"
              className="bg-purple-700 text-white font-semibold px-6 py-3 shadow-lg hover:bg-purple-800 transition"
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => { setSubmitted(false); setStatus(""); localStorage.removeItem("user"); localStorage.removeItem("token"); window.location.href="/login"; }}
              className="border border-purple-700 text-white bg-purple-700 font-semibold px-6 py-3 hover:bg-red-400 transition"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  if (submitted && status && status !== "approved") {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4">
        <Toaster position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 text-center border border-purple-200"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4 tracking-wide">Application Status 💼</h2>
          {status === "pending" && (
            <>
              <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
                Thank you for partnering with <span className="text-purple-800 font-bold">Kingz_World</span>.<br />
                Your application is currently <span className="text-yellow-600 font-semibold">pending review</span>.
              </p>
              <button
                onClick={handleRefreshStatus}
                className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-purple-800 transition"
              >
                Refresh Status
              </button>
            </>
          )}
          {status === "rejected" && (
            <>
              <p className="text-red-600 text-lg md:text-xl mb-6 leading-relaxed">
                Unfortunately, your application was not approved. Please contact support for more information.
              </p>
              <a href="/support" className="text-purple-700 font-semibold underline hover:text-purple-900 transition">Contact Support</a>
            </>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white text-gray-900 py-16 px-4 md:px-16">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-2"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-oswald text-purple-800 uppercase tracking-wide">Become a Kingz_World Partner</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 mx-auto mt-4 mb-6 rounded"></div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Join our network of fashion innovators and entrepreneurs. Get verified, showcase your products, and reach customers across Nigeria.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-gradient-to-br from-purple-50 via-white to-purple-100 p-8 rounded-2xl border border-purple-200 shadow-lg"
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
                value={formData[name] || ""}
                onChange={handleChange}
                required
                className="w-full border border-purple-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
                placeholder={placeholder}
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">Business Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows="5"
              required
              className="w-full border border-purple-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              placeholder="Tell us about your brand and what makes it stand out."
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-purple-700 font-semibold mb-2 uppercase text-sm">Website or Social Media Link</label>
            <input
              type="text"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              placeholder="https://instagram.com/yourbrand"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold tracking-wide uppercase px-10 py-3 shadow-md rounded-lg transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>

          {error && <div className="md:col-span-2 text-red-600 text-center mt-2">{error}</div>}
        </motion.form>
      </div>
    </section>
  );
}
