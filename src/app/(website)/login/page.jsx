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
  const [showPassword, setShowPassword] = useState(false);

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
        withCredentials: true
      });

      const data = response.data;
      console.log("✅ Login response:", data);

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = data;

        if (accessToken && user) {
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

          toast.success("Welcome back");
          
          setTimeout(() => {
            router.push("/shop");
          }, 1000);
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error(data.message || data.error || "Invalid username or password. please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           "Login failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-sm">Sign in to your Vendly account</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In to Account"
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Vendly?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
              >
                Create an account
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";

// export default function LoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [disable, setDisable] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);
//   const [loginAttempts, setLoginAttempts] = useState(() => {
//     // Get stored attempts from localStorage
//     if (typeof window !== 'undefined') {
//       const stored = localStorage.getItem('loginAttempts');
//       return stored ? parseInt(stored) : 0;
//     }
//     return 0;
//   });

//   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4000";

//   // Effect to track remaining time and enable button
//   useEffect(() => {
//     if (disable) {
//       const lockoutTime = localStorage.getItem('lockoutUntil');
//       if (lockoutTime) {
//         const now = Date.now();
//         const lockoutUntil = parseInt(lockoutTime);
        
//         if (now < lockoutUntil) {
//           // Still locked out
//           const remaining = Math.ceil((lockoutUntil - now) / 1000);
//           setRemainingTime(remaining);
          
//           const timer = setInterval(() => {
//             const newRemaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
//             if (newRemaining <= 0) {
//               clearInterval(timer);
//               setDisable(false);
//               setRemainingTime(0);
//               localStorage.removeItem('lockoutUntil');
//             } else {
//               setRemainingTime(newRemaining);
//             }
//           }, 1000);
          
//           return () => clearInterval(timer);
//         } else {
//           // Lockout expired
//           setDisable(false);
//           localStorage.removeItem('lockoutUntil');
//           localStorage.setItem('loginAttempts', '0');
//         }
//       }
//     }
//   }, [disable]);

//   // Check if user is already locked out on component mount
//   useEffect(() => {
//     const lockoutTime = localStorage.getItem('lockoutUntil');
//     if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
//       setDisable(true);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLockout = () => {
//     const lockoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
//     const lockoutUntil = Date.now() + lockoutDuration;
    
//     localStorage.setItem('lockoutUntil', lockoutUntil.toString());
//     localStorage.setItem('loginAttempts', '5'); // Set to max attempts
    
//     setDisable(true);
//     setLoginAttempts(5);
//   };

//   const incrementLoginAttempts = () => {
//     const newAttempts = loginAttempts + 1;
//     setLoginAttempts(newAttempts);
//     localStorage.setItem('loginAttempts', newAttempts.toString());
    
//     // If this is the 5th failed attempt, start lockout
//     if (newAttempts >= 5) {
//       handleLockout();
//       toast.error("Too many login attempts. Please wait 15 minutes.");
//     }
//   };

//   const resetLoginAttempts = () => {
//     setLoginAttempts(0);
//     localStorage.setItem('loginAttempts', '0');
//     localStorage.removeItem('lockoutUntil');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check if button is disabled
//     if (disable) {
//       toast.error(`Please wait ${remainingTime} seconds before trying again`);
//       return;
//     }
    
//     // Check if user has exceeded attempts
//     if (loginAttempts >= 5) {
//       const lockoutTime = localStorage.getItem('lockoutUntil');
//       if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
//         handleLockout();
//         toast.error("Too many login attempts. Please wait 15 minutes.");
//         return;
//       } else {
//         // Lockout expired, reset attempts
//         resetLoginAttempts();
//       }
//     }
    
//     setLoading(true);

//     try {
//       console.log("🚀 Logging in with:", formData);

//       const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true
//       });

//       const data = response.data;
//       console.log("✅ Login response:", data);

//       if (response.status === 200) {
//         const { accessToken, refreshToken, user } = data;

//         if (accessToken && user) {
//           localStorage.setItem("accessToken", accessToken);
//           if (refreshToken) {
//             localStorage.setItem("refreshToken", refreshToken);
//           }
//           localStorage.setItem("user", JSON.stringify(user));
          
//           // Reset login attempts on successful login
//           resetLoginAttempts();

//           console.log("💾 Saved user & tokens:", {
//             user,
//             accessToken,
//             refreshToken: refreshToken ? "stored" : "not provided",
//           });

//           toast.success("Welcome back");
          
//           setTimeout(() => {
//             router.push("/shop");
//           }, 1000);
//         } else {
//           toast.error("Login failed. Please try again.");
//         }
//       } else {
//         toast.error(data.message || data.error || "Invalid username or password. please try again.");
//       }
//     } catch (error) {
//       console.error("❌ Login error:", error);
      
//       if (error.response) {
//         const errorMessage = error.response.data?.message || 
//                            error.response.data?.error || 
//                            "Login failed. Please try again.";
//         toast.error(errorMessage);
        
//         // If it's a 429 (rate limit) error from server
//         if (error.response.status === 429) {
//           handleLockout();
//         } else {
//           // For other errors, increment attempts
//           incrementLoginAttempts();
//         }
//       } else if (error.request) {
//         toast.error("Network error. Please check your connection.");
//       } else {
//         toast.error("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format time for display
//   const formatTime = (seconds) => {
//     if (seconds >= 60) {
//       const minutes = Math.floor(seconds / 60);
//       const remainingSeconds = seconds % 60;
//       return `${minutes}m ${remainingSeconds}s`;
//     }
//     return `${seconds}s`;
//   };

//   return (
//     <section className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
//       <Toaster position="top-right" />
      
//       {/* Background Elements */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
//       </div>

//       <div className="max-w-md w-full">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
//         >
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-center relative">
//             {disable && (
//               <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                 Locked
//               </div>
//             )}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring" }}
//               className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4"
//             >
//               <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </motion.div>
//             <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
//             <p className="text-gray-300 text-sm">Sign in to your Vendly account</p>
            
//             {/* Login Attempts Display */}
//             {/* {loginAttempts > 0 && !disable && (
//               <div className="mt-3 text-sm text-yellow-300">
//                 Attempts: {loginAttempts}/5
//               </div>
//             )} */}
//           </div>

//           {/* Form Section */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="you@example.com"
//                     disabled={disable || loading}
//                     className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
//                       disable ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     }`}
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your password"
//                     disabled={disable || loading}
//                     className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
//                       disable ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
//                     }`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     disabled={disable}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
//                   >
//                     <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       {showPassword ? (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       ) : (
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       )}
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password */}
//               <div className="flex justify-end">
//                 <Link
//                   href="/forgot-password"
//                   className={`text-sm font-medium transition-colors ${
//                     disable ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'
//                   }`}
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>

//               {/* Countdown Display */}
//               {disable && remainingTime > 0 && (
//                 <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
//                   <div className="flex items-center justify-center gap-2 text-red-700">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span className="font-semibold">Too many attempts</span>
//                   </div>
//                   {/* <p className="text-sm text-red-600 mt-1">
//                     Please wait <span className="font-bold">{formatTime(remainingTime)}</span> before trying again
//                   </p> */}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={loading || disable}
//                 whileHover={(!loading && !disable) ? { scale: 1.02 } : {}}
//                 whileTap={(!loading && !disable) ? { scale: 0.98 } : {}}
//                 className={`w-full py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
//                   loading || disable
//                     ? "bg-gray-300 text-gray-700 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Signing In...
//                   </div>
//                 ) : disable ? (
//                   `Try Again in ${formatTime(remainingTime)}`
//                 ) : (
//                   "Sign In to Account"
//                 )}
//               </motion.button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">New to Vendly?</span>
//               </div>
//             </div>

//             {/* Sign Up Link */}
//             <div className="text-center">
//               <Link
//                 href="/signup"
//                 className={`inline-flex items-center gap-2 font-semibold transition-colors group ${
//                   disable ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'
//                 }`}
//               >
//                 Create an account
//                 {!disable && (
//                   <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 )}
//               </Link>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
//             <p className="text-center text-xs text-gray-500">
//               By continuing, you agree to our{" "}
//               <Link href="/terms" className={`${disable ? 'text-gray-400' : 'text-blue-600 hover:underline'}`}>Terms of Service</Link>
//               {" "}and{" "}
//               <Link href="/privacy" className={`${disable ? 'text-gray-400' : 'text-blue-600 hover:underline'}`}>Privacy Policy</Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }