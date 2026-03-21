// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { HiMenu, HiX, HiOutlineShoppingCart, HiSearch, HiUser, HiChevronDown, HiLogout, HiCog } from "react-icons/hi";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// // ✅ REMOVED - No longer needed with proxy
// // const API_ENDPOINT = process.env.BACKEND_URL || "http://localhost:4000";

// export default function Navbar() {  const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const { cart } = useCart();

//   // Check if user is authenticated via cookies
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       // ✅ UPDATED: Use relative path (goes through proxy)
//       const response = await fetch('/api/auth/me', {
//         method: "GET",
//         credentials: "include", // This sends cookies with the request
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.user) {
//           // User is authenticated
//           setIsAuthenticated(true);
//           setUser(data.user);
          
//           // Store minimal user data in localStorage for quick access in UI
//           localStorage.setItem("user", JSON.stringify({
//             id: data.user.id,
//             fullname: data.user.fullname,
//             email: data.user.email
//           }));
//         } else {
//           // Not authenticated
//           setIsAuthenticated(false);
//           setUser(null);
//           localStorage.removeItem("user");
//         }
//       } else {
//         // Not authenticated (401)
//         setIsAuthenticated(false);
//         setUser(null);
//         localStorage.removeItem("user");
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       setIsAuthenticated(false);
//       setUser(null);
//       localStorage.removeItem("user");
//     } finally {
//       setCheckingAuth(false);
//     }
//   };

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.user-dropdown')) {
//         setIsUserDropdownOpen(false);
//       }
//       if (!event.target.closest('.shop-dropdown')) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   // Safely calculate cart count
//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
//       setIsSearchOpen(false);
//       setSearchQuery("");
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       // ✅ UPDATED: Use relative path (goes through proxy)
//       await fetch('/api/auth/logout', {
//         method: "POST",
//         credentials: "include", // This sends cookies with the request
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       // Clear local state regardless of API response
//       setIsAuthenticated(false);
//       setUser(null);
//       localStorage.removeItem("user");
//       setIsUserDropdownOpen(false);
//       setIsOpen(false);
      
//       // Redirect to home
//       window.location.href = "/";
//     }
//   };

//   // Get display name for user
//   const getUserDisplayName = () => {
//     if (user?.fullname) {
//       return user.fullname.split(' ')[0];
//     }
//     if (user?.email) {
//       return user.email.split('@')[0];
//     }
//     return 'User';
//   };

//   // Navigation links with categories
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { 
//       name: "Shop", 
//       href: "/shop",
//       dropdown: [
//         { name: "New Arrivals", href: "/shop?sort=newest" },
//         { name: "Best Sellers", href: "/shop?sort=popular" },
//         { name: "Men's Fashion", href: "/shop?category=men" },
//         { name: "Women's Fashion", href: "/shop?category=women" },
//         { name: "Accessories", href: "/shop?category=accessories" },
//         { name: "Sale", href: "/shop?sort=discount" },
//       ]
//     },
//     // { name: "Collections", href: "/collections" },
//     { name: "Brands", href: "/brands" },
//     { name: "Partner", href: "/partner" },
//     // { name: "Pre-Order", href: "/pre-order" },
//   ];

//   const userDropdownItems = [
//     { name: "My Profile", href: "/account", icon: <HiUser size={18} /> },
//     { name: "Settings", href: "/account/settings", icon: <HiCog size={18} /> },
//     { name: "Order History", href: "/account/orders", icon: <HiOutlineShoppingCart size={18} /> },
//   ];

//   return (
//     <>
//       <nav className={`fixed w-full z-50 transition-all duration-500 ${
//         isScrolled 
//           ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" 
//           : "bg-transparent"
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center space-x-3 group"
//             >
//               <Link href="/" className="flex items-center space-x-3">
//                 <div className="relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-500 shadow-lg">
//                   <Image
//                     src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
//                     alt="Vendly - Premium Fashion"
//                     fill
//                     className="object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     priority
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`text-2xl font-bold transition-colors duration-300 ${
//                     isScrolled ? "text-gray-900" : "text-white"
//                   }`}>
//                     Vendly
//                   </span>
//                   {/* <span className="text-xs text-yellow-400 font-medium tracking-wider">
//                     PREMIUM FASHION
//                   </span> */}
//                 </div>
//               </Link>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-8">
//               {navLinks.map((link) => (
//                 <div key={link.name} className="relative group shop-dropdown">
//                   {link.dropdown ? (
//                     <>
//                       <button
//                         className={`flex items-center space-x-1 font-semibold transition-all duration-300 py-2 ${
//                           isScrolled 
//                             ? "text-gray-700 hover:text-blue-600" 
//                             : "text-white hover:text-yellow-300"
//                         }`}
//                         onMouseEnter={() => setIsDropdownOpen(true)}
//                       >
//                         <span>{link.name}</span>
//                         <HiChevronDown className={`transform transition-transform duration-300 ${
//                           isDropdownOpen ? "rotate-180" : ""
//                         }`} />
//                       </button>
                      
//                       {/* Dropdown Menu */}
//                       <AnimatePresence>
//                         {isDropdownOpen && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             onMouseLeave={() => setIsDropdownOpen(false)}
//                             className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
//                           >
//                             {link.dropdown.map((item) => (
//                               <Link
//                                 key={item.name}
//                                 href={item.href}
//                                 className="block px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
//                                 onClick={() => setIsDropdownOpen(false)}
//                               >
//                                 {item.name}
//                               </Link>
//                             ))}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </>
//                   ) : (
//                     <Link
//                       href={link.href}
//                       className={`font-semibold transition-all duration-300 py-2 relative ${
//                         isScrolled 
//                           ? "text-gray-700 hover:text-blue-600" 
//                           : "text-white hover:text-yellow-300"
//                       }`}
//                     >
//                       {link.name}
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Right Side Actions */}
//             <div className="hidden lg:flex items-center space-x-6">
//               {/* Search Button */}
//               <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className={`p-2 rounded-full transition-all duration-300 ${
//                   isScrolled 
//                     ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50" 
//                     : "text-white hover:text-yellow-300 hover:bg-white/10"
//                 }`}
//               >
//                 <HiSearch size={22} />
//               </button>

//               {/* Cart */}
//               <Link
//                 href="/cart"
//                 className={`flex items-center space-x-2 font-medium transition-all duration-300 relative ${
//                   isScrolled 
//                     ? "text-gray-700 hover:text-blue-600" 
//                     : "text-white hover:text-yellow-300"
//                 }`}
//               >
//                 <HiOutlineShoppingCart size={20} />
//                 <span>Cart</span>
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {/* User Account / Login */}
//               {user ? (
//                 <div className="relative user-dropdown">
//                   <button
//                     onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                     className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
//                       isScrolled 
//                         ? "text-gray-700 hover:text-blue-600" 
//                         : "text-white hover:text-yellow-300"
//                     }`}
//                   >
//                     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
//                       {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
//                     </div>
//                     <span>Hi, {user.firstName || 'User'}</span>
//                     <HiChevronDown className={`transform transition-transform duration-300 ${
//                       isUserDropdownOpen ? "rotate-180" : ""
//                     }`} />
//                   </button>

//                   {/* User Dropdown Menu */}
//                   <AnimatePresence>
//                     {isUserDropdownOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                         className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
//                       >
//                         {/* User Info - SHOWING ONLY NAME */}
//                         <div className="px-4 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
//                           <p className="font-semibold text-gray-900 text-lg">{user.firstName} {user.lastName}</p>
//                           <p className="text-sm text-blue-600 font-medium mt-1">Welcome back! {user.firstName}</p>
//                         </div>

//                         {/* Menu Items */}
//                         {userDropdownItems.map((item) => (
//                           <Link
//                             key={item.name}
//                             href={item.href}
//                             className="flex items-center space-x-3 px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
//                             onClick={() => setIsUserDropdownOpen(false)}
//                           >
//                             {item.icon}
//                             <span>{item.name}</span>
//                           </Link>
//                         ))}

//                         {/* Logout */}
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center space-x-3 w-full px-4 py-4 text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
//                         >
//                           <HiLogout size={18} />
//                           <span>Sign Out</span>
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     href="/login"
//                     className={`font-medium transition-all duration-300 ${
//                       isScrolled 
//                         ? "text-gray-700 hover:text-blue-600" 
//                         : "text-white hover:text-yellow-300"
//                     }`}
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//                   >
//                     Join Free
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center space-x-4">
//               {/* Search Icon for Mobile */}
//               <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className={`p-2 ${isScrolled ? "text-gray-700" : "text-white"}`}
//               >
//                 <HiSearch size={22} />
//               </button>

//               {/* Cart Icon for Mobile */}
//               <Link href="/cart" className="relative">
//                 <HiOutlineShoppingCart 
//                   size={24} 
//                   className={isScrolled ? "text-gray-700" : "text-white"} 
//                 />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className={`p-2 rounded-lg transition-all duration-300 ${
//                   isScrolled 
//                     ? "text-gray-700 hover:bg-gray-100" 
//                     : "text-white hover:bg-white/10"
//                 }`}
//               >
//                 {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu - IMPROVED SIDEBAR VERSION */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
//               onClick={() => setIsOpen(false)}
//             >
//               <motion.div
//                 initial={{ x: "100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "100%" }}
//                 transition={{ type: "spring", damping: 30, stiffness: 300 }}
//                 className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Scrollable Content Container */}
//                 <div className="h-full flex flex-col">
//                   {/* Header with Close Button */}
//                   <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
//                     <div className="flex items-center space-x-3">
//                       <div className="relative w-10 h-10 rounded-xl overflow-hidden">
//                         <Image
//                           src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
//                           alt="Vendly"
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="font-bold text-gray-900">Vendly</span>
//                         {/* <span className="text-xs text-yellow-400 font-medium">PREMIUM FASHION</span> */}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
//                     >
//                       <HiX size={24} />
//                     </button>
//                   </div>

//                   {/* Scrollable Content */}
//                   <div className="flex-1 overflow-y-auto">
//                     <div className="p-6 space-y-8">
//                       {/* Navigation Links */}
//                       <div className="space-y-6">
//                         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
//                         {navLinks.map((link) => (
//                           <div key={link.name}>
//                             {link.dropdown ? (
//                               <div className="space-y-3">
//                                 <div className="font-semibold text-gray-900 text-base">
//                                   {link.name}
//                                 </div>
//                                 <div className="pl-4 space-y-2 border-l-2 border-blue-200">
//                                   {link.dropdown.map((item) => (
//                                     <Link
//                                       key={item.name}
//                                       href={item.href}
//                                       onClick={() => setIsOpen(false)}
//                                       className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm"
//                                     >
//                                       {item.name}
//                                     </Link>
//                                   ))}
//                                 </div>
//                               </div>
//                             ) : (
//                               <Link
//                                 href={link.href}
//                                 onClick={() => setIsOpen(false)}
//                                 className="block py-2 font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300 text-base"
//                               >
//                                 {link.name}
//                               </Link>
//                             )}
//                           </div>
//                         ))}
//                       </div>
                      
//                       {/* Auth Section */}
//                       <div className="pt-6 border-t border-gray-200 space-y-6">
//                         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
//                         {user ? (
//                           <>
//                             {/* User Info - SHOWING ONLY NAME */}
//                             <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
//                               <div className="flex items-center space-x-3">
//                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
//                                   {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
//                                 </div>
//                                 <div>
//                                   <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
//                                   <p className="text-sm text-blue-600 font-medium">Welcome back!</p>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             {/* User Links */}
//                             <div className="space-y-2">
//                               {userDropdownItems.map((item) => (
//                                 <Link
//                                   key={item.name}
//                                   href={item.href}
//                                   onClick={() => setIsOpen(false)}
//                                   className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm"
//                                 >
//                                   {item.icon}
//                                   <span>{item.name}</span>
//                                 </Link>
//                               ))}
//                             </div>
                            
//                             {/* Logout */}
//                             <button
//                               onClick={handleLogout}
//                               className="flex items-center space-x-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 text-sm mt-4"
//                             >
//                               <HiLogout size={18} />
//                               <span>Sign Out</span>
//                             </button>
//                           </>
//                         ) : (
//                           <div className="space-y-4">
//                             <Link
//                               href="/login"
//                               onClick={() => setIsOpen(false)}
//                               className="flex items-center space-x-3 px-4 py-4 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 text-base border border-gray-200"
//                             >
//                               <HiUser size={20} />
//                               <span>Sign In to Your Account</span>
//                             </Link>
//                             <div className="text-center">
//                               <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
//                               <Link
//                                 href="/signup"
//                                 onClick={() => setIsOpen(false)}
//                                 className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base w-full"
//                               >
//                                 Create Account
//                               </Link>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       {/* Additional Links */}
//                       <div className="pt-6 border-t border-gray-200 space-y-4">
//                         <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</h3>
//                         <Link href="/help" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">Help Center</Link>
//                         <Link href="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact Us</Link>
//                         <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Search Modal */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32"
//             onClick={() => setIsSearchOpen(false)}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: -20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: -20 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <form onSubmit={handleSearch}>
//                 <div className="flex items-center space-x-4">
//                   <HiSearch size={24} className="text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search for products, brands, and collections..."
//                     className="flex-1 text-lg py-3 outline-none placeholder-gray-400"
//                     autoFocus
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setIsSearchOpen(false)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     <HiX size={24} />
//                   </button>
//                 </div>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="text-sm text-gray-500">
//                     Popular: <button type="button" onClick={() => setSearchQuery("Sneakers")} className="hover:text-blue-600">Sneakers</button>, 
//                     <button type="button" onClick={() => setSearchQuery("Dresses")} className="hover:text-blue-600 ml-1">Dresses</button>, 
//                     <button type="button" onClick={() => setSearchQuery("Accessories")} className="hover:text-blue-600 ml-1">Accessories</button>
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
//                   >
//                     Search
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }







"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  HiMenu, 
  HiX, 
  HiOutlineShoppingCart, 
  HiSearch, 
  HiUser, 
  HiChevronDown, 
  HiLogout, 
  HiCog,
  HiHeart,
  HiTag,
  HiSparkles,
  HiUserCircle
} from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dropdownRef = useRef(null);
  const { cart } = useCart();

  // Check if user is authenticated via cookies
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
          
          localStorage.setItem("user", JSON.stringify({
            id: data.user.id,
            fullname: data.user.fullname,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email
          }));
        } else {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setCheckingAuth(false);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Safely calculate cart count
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
      setIsUserDropdownOpen(false);
      setIsOpen(false);
      window.location.href = "/";
    }
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.fullname) {
      return user.fullname.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  // Get user initial for avatar
  const getUserInitial = () => {
    if (user?.firstName) {
      return user.firstName.charAt(0).toUpperCase();
    }
    if (user?.fullname) {
      return user.fullname.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Navigation links (without dropdown)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Brands", href: "/brands" },
    { name: "Partner", href: "/partner" },
  ];

  // User dropdown items
  const userDropdownItems = [
    { name: "Dashboard", href: "/account", icon: <HiUserCircle size={20} /> },
    { name: "My Orders", href: "/account/orders", icon: <HiOutlineShoppingCart size={20} /> },
    { name: "Wishlist", href: "/account/wishlist", icon: <HiHeart size={20} /> },
    { name: "Settings", href: "/account/settings", icon: <HiCog size={20} /> },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white shadow-lg border-b border-gray-100" 
            : "bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden transition-all duration-500 shadow-lg">
                  <Image
                    src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
                    alt="Vendly - Premium Fashion"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}>
                    Vendly
                  </span>
                  {/* <span className={`text-[10px] lg:text-xs tracking-wider transition-colors duration-300 ${
                    isScrolled ? "text-gray-500" : "text-gray-300"
                  }`}>
                    PREMIUM FASHION
                  </span> */}
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative font-medium transition-all duration-300 py-2 group ${
                      isScrolled 
                        ? "text-gray-700 hover:text-blue-600" 
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-blue-600" : "bg-yellow-400"
                    }`}></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:text-yellow-300 hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <HiSearch size={22} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative flex items-center space-x-2 font-medium transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white hover:text-yellow-300"
                }`}
                aria-label="Cart"
              >
                <HiOutlineShoppingCart size={22} />
                <span className="hidden lg:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account / Login */}
              {!checkingAuth && (
                isAuthenticated && user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                        isScrolled 
                          ? "text-gray-700 hover:text-blue-600" 
                          : "text-white hover:text-yellow-300"
                      }`}
                      aria-label="User menu"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-300 ${
                        isUserDropdownOpen 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-110" 
                          : "bg-gradient-to-r from-blue-500 to-purple-500"
                      }`}>
                        {getUserInitial()}
                      </div>
                      <span className="hidden xl:inline">Hi, {getUserDisplayName()}</span>
                      <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`} />
                    </button>

                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {isUserDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                        >
                          {/* User Info Header */}
                          <div className="px-5 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              {/* <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {getUserInitial()}
                              </div> */}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {user.firstName && user.lastName 
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.fullname || getUserDisplayName()}
                                </p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            {userDropdownItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-3 px-5 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                                onClick={() => setIsUserDropdownOpen(false)}
                              >
                                <span className="text-gray-400">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                              </Link>
                            ))}
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-100"></div>

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                          >
                            <HiLogout size={20} />
                            <span>Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/login"
                      className={`font-medium transition-all duration-300 ${
                        isScrolled 
                          ? "text-gray-700 hover:text-blue-600" 
                          : "text-white hover:text-yellow-300"
                      }`}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Join Free
                    </Link>
                  </div>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Search Icon for Mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 ${isScrolled ? "text-gray-700" : "text-white"}`}
                aria-label="Search"
              >
                <HiSearch size={22} />
              </button>

              {/* Cart Icon for Mobile */}
              <Link href="/cart" className="relative">
                <HiOutlineShoppingCart 
                  size={24} 
                  className={isScrolled ? "text-gray-700" : "text-white"} 
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100" 
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Menu"
              >
                {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide-in Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 right-0 h-full w-85 bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
                          alt="Vendly"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">Vendly</span>
                        {/* <p className="text-xs text-gray-500">Premium Fashion</p> */}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                    >
                      <HiX size={24} />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-5 space-y-6">
                      {/* User Section */}
                      {!checkingAuth && (
                        isAuthenticated && user ? (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                            <div className="flex items-center space-x-3">
                              {/* <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {getUserInitial()}
                              </div> */}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {user.firstName && user.lastName 
                                    ? `${user.firstName} ${user.lastName}`
                                    : user.fullname || getUserDisplayName()}
                                </p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                            <p className="text-gray-700 text-sm mb-3">Welcome to Vendly!</p>
                            <div className="flex space-x-3">
                              <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-white text-blue-600 text-center px-4 py-2 rounded-lg font-semibold border border-blue-200 hover:bg-blue-50 transition-colors"
                              >
                                Sign In
                              </Link>
                              <Link
                                href="/signup"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                              >
                                Join Free
                              </Link>
                            </div>
                          </div>
                        )
                      )}

                      {/* Navigation Links */}
                      <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</h3>
                        {navLinks.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-50"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>

                      {/* Account Links (when logged in) */}
                      {isAuthenticated && user && (
                        <div className="space-y-1 pt-2">
                          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Account</h3>
                          {userDropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 py-3 text-gray-700 hover:text-blue-600 transition-all duration-300 border-b border-gray-50"
                            >
                              <span className="text-gray-400">{item.icon}</span>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                          
                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full py-3 text-red-600 hover:bg-red-50 transition-all duration-300 rounded-lg mt-2"
                          >
                            <HiLogout size={20} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      )}

                      {/* Support Links */}
                      <div className="space-y-1 pt-4 border-t border-gray-100">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Support</h3>
                        <Link href="/help" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">Help Center</Link>
                        <Link href="/contact" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact Us</Link>
                        <Link href="/about" className="block py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 lg:pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <div className="flex items-center space-x-4">
                  <HiSearch size={24} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, and collections..."
                    className="flex-1 text-lg py-3 outline-none placeholder-gray-400"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <HiX size={24} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-gray-500">
                    <span className="mr-2">Popular:</span>
                    {["Sneakers", "Dresses", "Accessories", "Bags"].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="hover:text-blue-600 mx-1 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}