// "use client"

// import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { FaTimes } from "react-icons/fa";
// import { useCart } from '@/context/CartContext';
// import { FaShoppingCart } from "react-icons/fa";
// import { useAuth } from '@/context/AuthContext'; // ✅ Add this import

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const mobileMenuRef = useRef(null);
//   const pathname = usePathname();
//   const { cart } = useCart();
//   const { user, isAuthenticated, logout } = useAuth(); // ✅ Get user from auth context

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     if (isMobileMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const navLinks = [
//     { name: 'Home', href: '/', icon: 'fas fa-home' },
//     { name: 'Shop', href: '/shop', icon: 'fas fa-store' },
//     { name: 'Partner', href: '/partner', icon: 'fas fa-handshake' },
//     { name: 'Vendors', href: '/vendor', icon: 'fas fa-users' },
//   ];

//   const categories = [
//     'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys'
//   ];

//   return (
//     <header className={`w-full font-grotesk bg-white sticky top-0 z-50 transition-all duration-300 ${
//       isScrolled ? 'shadow-lg' : 'shadow-sm'
//     }`}>
//       {/* Main navbar - Clean and minimal */}
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Left side - Hamburger icon */}
//           <button 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             <div className="relative w-5 h-5">
//               <span className={`absolute block h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
//                 isMobileMenuOpen ? 'rotate-45 top-2' : 'top-0'
//               } w-5`}></span>
//               <span className={`absolute block h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out top-2 ${
//                 isMobileMenuOpen ? 'opacity-0' : 'w-5'
//               }`}></span>
//               <span className={`absolute block h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${
//                 isMobileMenuOpen ? '-rotate-45 top-2' : 'top-4'
//               } w-5`}></span>
//             </div>
//           </button>

//           {/* Logo - Centered on mobile, left on desktop */}
          // <Link href="/" className="flex items-center gap-2 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          //   <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden shadow-md">
          //     <Image
          //       src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
          //       alt="Vefiri"
          //       width={36}
          //       height={36}
          //       className="object-cover w-full h-full"
          //     />
          //   </div>
          //   <span className="text-xl lg:text-2xl font-bold text-orange-500">
          //     Vefiri
          //   </span>
          // </Link>

//           {/* Right side - Cart and Profile icons */}
//           <div className="flex items-center gap-5">
//            <Link href="/cart" className="relative text-gray-700 hover:text-orange-500 transition-colors">
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
        
//             {/* Profile icon with user initials */}
//               <Link href="/profile" className="flex items-center">
//                 <div className="w-9 h-9 hidden lg:flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold text-sm border-2 border-transparent hover:border-orange-300 transition-all duration-300">
//                   {user ? (
//                     user.firstName && user.lastName ? (
//                       `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
//                     ) : user.firstName ? (
//                       user.firstName.charAt(0).toUpperCase()
//                     ) : user.fullname ? (
//                       user.fullname.charAt(0).toUpperCase()
//                     ) : user.email ? (
//                       user.email.charAt(0).toUpperCase()
//                     ) : (
//                       'U'
//                     )
//                   ) : (
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                   )}
//                 </div>
//               </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link href="/signup" className="hidden lg:block text-sm text-gray-700 hover:text-orange-500 transition-colors">
//               Sign Up
//             </Link>
//             <Link href="/login" className="hidden lg:block text-sm text-gray-700 hover:text-orange-500 transition-colors">
//               Log In
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Navigation Links - Hidden on mobile */}
//       <div className="hidden lg:block border-t border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-center gap-8 py-3">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`relative text-gray-700 hover:text-orange-500 font-medium transition-all duration-300 py-2 group ${
//                   pathname === link.href ? 'text-orange-500' : ''
//                 }`}
//               >
//                 {link.name}
//                 <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${
//                   pathname === link.href ? 'w-full' : ''
//                 }`}></span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div 
//         className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
//           isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={closeMobileMenu}
//       />

//       {/* Mobile Menu Sidebar - All content consolidated here */}
//       <div
//         ref={mobileMenuRef}
//         className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl lg:hidden ${
//           isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header with logo and close button */}
//           <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-blue-50">
//             <div className="flex items-center justify-between">
//               <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden shadow-md">
//                   <Image
//                     src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG"
//                     alt="Vefiri"
//                     width={40}
//                     height={40}
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
//                   Vefiri
//                 </span>
//               </Link>
//               <button
//                 onClick={closeMobileMenu}
//                 className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
//                 aria-label="Close menu"
//               >
//                 <FaTimes className="w-7 h-7 text-orange-500"/>
//               </button>
//             </div>
//             <p className="text-sm text-gray-600 mt-4">Welcome to Vefiri! Shop with Confidence.</p>
//           </div>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto">
//             {/* Contact Info Section */}
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
//                 Contact Information
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
//                     <i className="fas fa-phone-alt text-orange-500 text-sm"></i>
//                   </div>
//                   <span className="text-sm">+234 81 **** ****</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
//                     <i className="fas fa-envelope text-orange-500 text-sm"></i>
//                   </div>
//                   <span className="text-sm">support@vefiri.com</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-700">
//                   <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
//                     <i className="fas fa-map-marker-alt text-orange-500 text-sm"></i>
//                   </div>
//                   <span className="text-sm">Lagos, Nigeria</span>
//                 </div>
//               </div>
//             </div>

//             {/* Auth Buttons */}
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex gap-3">
//                 <Link
//                   href="/login"
//                   onClick={closeMobileMenu}
//                   className="flex-1 text-center px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   href="/signup"
//                   onClick={closeMobileMenu}
//                   className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
//                 Menu
//               </h3>
//               <div className="space-y-1">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     href={link.href}
//                     onClick={closeMobileMenu}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                       pathname === link.href
//                         ? 'bg-gradient-to-r from-orange-50 to-blue-50 text-orange-600 font-semibold'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
//                     }`}
//                   >
//                     <i className={`${link.icon} w-5 text-lg`}></i>
//                     <span className="font-medium flex-1">{link.name}</span>
//                     {pathname === link.href && (
//                       <i className="fas fa-check-circle text-orange-500"></i>
//                     )}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Categories Section */}
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
//                 Shop by Category
//               </h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {categories.map((category) => (
//                   <Link
//                     key={category}
//                     href={`/category/${category.toLowerCase()}`}
//                     onClick={closeMobileMenu}
//                     className="px-3 py-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors text-center"
//                   >
//                     {category}
//                   </Link>
//                 ))}
//               </div>
//               <Link
//                 href="/all-categories"
//                 onClick={closeMobileMenu}
//                 className="flex items-center justify-center gap-2 mt-4 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium"
//               >
//                 <span>View All Categories</span>
//                 <i className="fas fa-arrow-right text-xs"></i>
//               </Link>
//             </div>

//             {/* User Actions */}
//             <div className="p-6">
//               <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
//                 Account
//               </h3>
//               <div className="space-y-1">
//                 <Link
//                   href="/profile"
//                   onClick={closeMobileMenu}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <i className="fas fa-user-circle w-5 text-xl"></i>
//                   <span>My Profile</span>
//                 </Link>
//                 <Link
//                   href="/orders"
//                   onClick={closeMobileMenu}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <i className="fas fa-shopping-bag w-5 text-xl"></i>
//                   <span>My Orders</span>
//                 </Link>
//                 <Link
//                   href="/wishlist"
//                   onClick={closeMobileMenu}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <i className="fas fa-heart w-5 text-xl"></i>
//                   <span>Wishlist</span>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Footer with app info */}
//           <div className="p-6 border-t border-gray-100 bg-gray-50">
//             <p className="text-xs text-center text-gray-500">
//               © 2026 Vefiri. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;





// "use client"

// import React from 'react';
// import Link from 'next/link';
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from '@/context/CartContext';
// import { useAuth } from '@/context/AuthContext';

// const Navbar = () => {
//   const { cart } = useCart();
//   const { user, logout } = useAuth(); // Remove isAuthenticated from here since we'll check user directly

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   // Get user's display name
//   const getDisplayName = () => {
//     if (!user) return '';
//     if (user.firstName) return user.firstName;
//     if (user.fullname) return user.fullname.split(' ')[0];
//     if (user.email) return user.email.split('@')[0];
//     return 'User';
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-orange-500">
//             Vefiri
//           </Link>

//           {/* Right side content */}
//           <div className="flex items-center gap-6">
//             {/* Cart Icon - Always visible */}
//             <Link href="/cart" className="relative text-gray-700 hover:text-orange-500">
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Show different content based on auth status */}
//             {user ? (
//               <>
//                 {/* User Name */}
//                 <span className="text-gray-700 font-medium">
//                   Hi, {getDisplayName()}
//                 </span>
                
//                 {/* Logout Button */}
//                 <button
//                   onClick={logout}
//                   className="text-gray-700 hover:text-orange-500 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* Sign Up Link */}
//                 <Link href="/signup" className="text-gray-700 hover:text-orange-500 transition-colors">
//                   Sign Up
//                 </Link>
                
//                 {/* Login Link */}
//                 <Link href="/login" className="text-gray-700 hover:text-orange-500 transition-colors">
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// "use client";

// import React from "react";
// import Link from "next/link";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";

// const Navbar = () => {
//   const { cart } = useCart();
//   const { user, logout, initialized } = useAuth(); // ✅ use initialized

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName) return user.firstName;
//     if (user.fullname) return user.fullname.split(" ")[0];
//     if (user.email) return user.email.split("@")[0];
//     return "User";
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-orange-500">
//             Vefiri
//           </Link>

//           {/* Right side */}
//           <div className="flex items-center gap-6">
//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative text-gray-700 hover:text-orange-500"
//             >
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* ✅ WAIT UNTIL AUTH IS READY */}
//             {!initialized ? null : user ? (
//               <>
//                 {/* Username */}
//                 <span className="text-gray-700 font-medium">
//                   Hi, {user.fullname ? user.fullname.split(" ")[0] : getDisplayName()}
//                 </span>

//                 {/* Logout */}
//                 <button
//                   onClick={logout}
//                   className="text-gray-700 hover:text-orange-500 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/signup"
//                   className="text-gray-700 hover:text-orange-500"
//                 >
//                   Sign Up
//                 </Link>

//                 <Link
//                   href="/login"
//                   className="text-gray-700 hover:text-orange-500"
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// "use client";

// import React from "react";
// import Link from "next/link";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";

// const Navbar = () => {
//   const { cart } = useCart();
//   const { user, logout, initialized } = useAuth();

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName) return user.firstName;
//     if (user.fullname) return user.fullname.split(" ")[0];
//     if (user.email) return user.email.split("@")[0];
//     return "User";
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-orange-500">
//             Vefiri
//           </Link>

//           {/* Right side */}
//           <div className="flex items-center gap-6">
//             {/* Cart */}
//             <Link href="/cart" className="relative text-gray-700 hover:text-orange-500">
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* ✅ LOADING STATE */}
//             {!initialized ? (
//               <span className="text-sm text-gray-400">...</span>
//             ) : user ? (
//               <>
//               <Link href="/profile" className="text-gray-700 hover:text-orange-500 transition-colors">
//                 <span className="text-gray-700 font-medium">
//                   Hi, {getDisplayName()}
//                 </span>
//               </Link>

//                 <button
//                   onClick={logout}
//                   className="text-gray-700 hover:text-orange-500 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/signup" className="text-gray-700 hover:text-orange-500">
//                   Sign Up
//                 </Link>

//                 <Link href="/login" className="text-gray-700 hover:text-orange-500">
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// "use client";

// import React from "react";
// import Link from "next/link";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { cart, clearCart } = useCart(); // ✅ add clearCart
//   const { user, initialized } = useAuth();
//   const router = useRouter();

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName) return user.firstName;
//     if (user.fullname) return user.fullname.split(" ")[0];
//     if (user.email) return user.email.split("@")[0];
//     return "User";
//   };

//   // ✅ FIXED LOGOUT
//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       clearCart(); // 🔥 THIS FIXES YOUR ISSUE
//       toast.success("Logged out successfully");
//       router.push("/login");
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-orange-500">
//             Vefiri
//           </Link>

//           {/* Right side */}
//           <div className="flex items-center gap-6">
//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative text-gray-700 hover:text-orange-500"
//             >
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Auth */}
//             {!initialized ? (
//               <span className="text-sm text-gray-400">...</span>
//             ) : user ? (
//               <>
//                 <Link
//                   href="/profile"
//                   className="text-gray-700 hover:text-orange-500"
//                 >
//                   Hi, {getDisplayName()}
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-700 hover:text-orange-500 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/signup" className="text-gray-700 hover:text-orange-500">
//                   Sign Up
//                 </Link>
//                 <Link href="/login" className="text-gray-700 hover:text-orange-500">
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// "use client";

// import React from "react";
// import Link from "next/link";
// import { FaShoppingCart } from "react-icons/fa";
// import { useCart } from "@/context/CartContext";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { cart, clearCart } = useCart();
//   const { user, initialized, checkAuthStatus } = useAuth(); // ✅ ADD THIS
//   const router = useRouter();

//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName) return user.firstName;
//     if (user.fullname) return user.fullname.split(" ")[0];
//     if (user.email) return user.email.split("@")[0];
//     return "User";
//   };

//   // ✅ PROPER LOGOUT
//   const handleLogout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       // 🔥 Clear EVERYTHING properly
//       clearCart();
//       localStorage.removeItem("cachedUser");
//       localStorage.removeItem("cachedUserTime");

//       // 🔥 Force auth state refresh
//       await checkAuthStatus();

//       toast.success("Logged out successfully");

//       router.push("/login");
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold text-orange-500">
//             Vefiri
//           </Link>

//           {/* Right side */}
//           <div className="flex items-center gap-6">
//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative text-gray-700 hover:text-orange-500"
//             >
//               <FaShoppingCart className="text-xl" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Auth */}
//             {!initialized ? (
//               <span className="text-sm text-gray-400">...</span>
//             ) : user ? (
//               <>
//                 <Link
//                   href="/profile"
//                   className="text-gray-700 hover:text-orange-500"
//                 >
//                   Hi, {getDisplayName()}
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-700 hover:text-orange-500 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/signup" className="text-gray-700 hover:text-orange-500">
//                   Sign Up
//                 </Link>

//                 <Link href="/login" className="text-gray-700 hover:text-orange-500">
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const Navbar = () => {
  const { cart, clearCart } = useCart();
  const { user, logout: authLogout, checkAuthStatus } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;

  const getDisplayName = () => {
    if (!user) return "";
    if (user.firstName) return user.firstName;
    if (user.fullname) return user.fullname.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const handleLogout = async () => {
    // Immediately clear user state and cart
    clearCart();
    localStorage.removeItem("cachedUser");
    localStorage.removeItem("cachedUserTime");
    
    // Call logout from auth context
    await authLogout();
    
    toast.success("Logged out successfully");
    router.push("/login");
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Navigation links
  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Partner", href: "/partner" },
    { name: "Vendor", href: "/vendor" },
  ];

  return (
    <>
      <nav className="bg-white font-grotesk shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-orange-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Logo */}
            <div className=" inline items-center gap-2">
              <Link href="/" className="text-2xl font-bold text-orange-500">
                <Image src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG" 
                  alt="Vefiri" 
                  width={60} 
                  height={60} 
                  className="inline"
                />
                  Vefiri
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-gray-700 hover:text-orange-500 transition-colors font-medium ${
                    pathname === link.href ? "text-orange-500" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-gray-700 hover:text-orange-500"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth - Desktop */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      Hi, {getDisplayName()}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-orange-500 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      Sign Up
                    </Link>

                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-orange-500"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-orange-500" onClick={() => 
                setIsMobileMenuOpen(false)}>
                  <Image src="/images/0ddb8c41-20a9-446e-a056-9b6290b33d6b.JPG" 
                  alt="Vefiri" 
                  width={60} 
                  height={60} 
                  className="inline"
                />
                Vefiri
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-orange-50 text-orange-500 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Links - Mobile */}
            <div className="border-t border-gray-100 pt-4">
              {user ? (
                <>
                  <div className="px-4 py-2 text-gray-700 font-medium">
                    Hi, {getDisplayName()}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;