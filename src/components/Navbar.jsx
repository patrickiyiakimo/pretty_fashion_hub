// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { HiMenu, HiX, HiOutlineShoppingCart, HiSearch, HiUser, HiChevronDown } from "react-icons/hi";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { cart } = useCart();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Safely calculate cart count
//   const cartCount = Array.isArray(cart)
//     ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
//     : 0;

//   // Navigation links with categories
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { 
//       name: "Shop", 
//       href: "/shop",
//       dropdown: [
//         { name: "New Arrivals", href: "/shop?category=new" },
//         { name: "Best Sellers", href: "/shop?category=bestsellers" },
//         { name: "Men's Fashion", href: "/shop?category=men" },
//         { name: "Women's Fashion", href: "/shop?category=women" },
//         { name: "Accessories", href: "/shop?category=accessories" },
//       ]
//     },
//     { name: "Collections", href: "/collections" },
//     { name: "Brands", href: "/brands" },
//     { name: "Partner", href: "/partner" },
//   ];

//   const authLinks = [
//     { name: "Account", href: "/account", icon: <HiUser size={18} /> },
//     { 
//       name: "Cart", 
//       href: "/cart", 
//       badge: cartCount,
//       icon: <HiOutlineShoppingCart size={20} /> 
//     },
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
//                 <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-blue-600 transition-all duration-500 shadow-lg">
//                   <Image
//                     src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
//                     alt="Kingz World - Premium Fashion"
//                     fill
//                     className="object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     priority
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`text-2xl font-bold transition-colors duration-300 ${
//                     isScrolled ? "text-gray-900" : "text-white"
//                   }`}>
//                     Kingz World
//                   </span>
//                   <span className="text-xs text-yellow-400 font-medium tracking-wider">
//                     PREMIUM FASHION
//                   </span>
//                 </div>
//               </Link>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-8">
//               {navLinks.map((link) => (
//                 <div key={link.name} className="relative group">
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
//                             className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
//                           >
//                             {link.dropdown.map((item) => (
//                               <Link
//                                 key={item.name}
//                                 href={item.href}
//                                 className="block px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
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

//               {/* Auth & Cart Links */}
//               {authLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`flex items-center space-x-2 font-medium transition-all duration-300 relative ${
//                     isScrolled 
//                       ? "text-gray-700 hover:text-blue-600" 
//                       : "text-white hover:text-yellow-300"
//                   }`}
//                 >
//                   {link.icon}
//                   <span className="hidden sm:block">{link.name}</span>
//                   {link.badge > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
//                       {link.badge}
//                     </span>
//                   )}
//                 </Link>
//               ))}
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden flex items-center space-x-4">
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

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
//             >
//               <div className="px-4 py-6 space-y-4">
//                 {navLinks.map((link) => (
//                   <div key={link.name}>
//                     {link.dropdown ? (
//                       <div className="space-y-2">
//                         <div className="font-semibold text-gray-900 px-3 py-2">
//                           {link.name}
//                         </div>
//                         <div className="pl-4 space-y-2 border-l-2 border-blue-200">
//                           {link.dropdown.map((item) => (
//                             <Link
//                               key={item.name}
//                               href={item.href}
//                               onClick={() => setIsOpen(false)}
//                               className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
//                             >
//                               {item.name}
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <Link
//                         href={link.href}
//                         onClick={() => setIsOpen(false)}
//                         className="block px-3 py-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
//                       >
//                         {link.name}
//                       </Link>
//                     )}
//                   </div>
//                 ))}
                
//                 {/* Auth Links for Mobile */}
//                 <div className="pt-4 border-t border-gray-200 space-y-3">
//                   {authLinks.filter(link => link.name !== "Cart").map((link) => (
//                     <Link
//                       key={link.name}
//                       href={link.href}
//                       onClick={() => setIsOpen(false)}
//                       className="flex items-center space-x-3 px-3 py-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
//                     >
//                       {link.icon}
//                       <span>{link.name}</span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
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
//               <div className="flex items-center space-x-4">
//                 <HiSearch size={24} className="text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search for products, brands, and collections..."
//                   className="flex-1 text-lg py-3 outline-none placeholder-gray-400"
//                   autoFocus
//                 />
//                 <button
//                   onClick={() => setIsSearchOpen(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <HiX size={24} />
//                 </button>
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Popular searches: Sneakers, Dresses, Accessories, Summer Collection
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }





// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { HiMenu, HiX, HiOutlineShoppingCart, HiSearch, HiUser, HiChevronDown, HiLogout, HiCog } from "react-icons/hi";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [user, setUser] = useState(null);
//   const { cart } = useCart();

//   // Check if user is logged in
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("accessToken");
//       const userData = localStorage.getItem("user");
      
//       if (token && userData) {
//         try {
//           setUser(JSON.parse(userData));
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           localStorage.removeItem("user");
//           localStorage.removeItem("accessToken");
//         }
//       } else {
//         setUser(null);
//       }
//     };

//     checkAuth();
    
//     // Listen for auth changes
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

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
//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsUserDropdownOpen(false);
//     setIsOpen(false);
//     window.dispatchEvent(new Event("storage"));
//     // Optionally redirect to home
//     window.location.href = "/";
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
//     { name: "Collections", href: "/collections" },
//     { name: "Brands", href: "/brands" },
//     { name: "Partner", href: "/partner" },
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
//                 <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-blue-600 transition-all duration-500 shadow-lg">
//                   <Image
//                     src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
//                     alt="Kingz World - Premium Fashion"
//                     fill
//                     className="object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     priority
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className={`text-2xl font-bold transition-colors duration-300 ${
//                     isScrolled ? "text-gray-900" : "text-white"
//                   }`}>
//                     Kingz World
//                   </span>
//                   <span className="text-xs text-yellow-400 font-medium tracking-wider">
//                     PREMIUM FASHION
//                   </span>
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
//                         {/* User Info */}
//                         <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
//                           <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
//                           <p className="text-sm text-gray-600">{user.email}</p>
//                         </div>

//                         {/* Menu Items */}
//                         {userDropdownItems.map((item) => (
//                           <Link
//                             key={item.name}
//                             href={item.href}
//                             className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
//                             onClick={() => setIsUserDropdownOpen(false)}
//                           >
//                             {item.icon}
//                             <span>{item.name}</span>
//                           </Link>
//                         ))}

//                         {/* Logout */}
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
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

//         {/* Mobile Menu - FIXED SCROLLABLE VERSION */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pt-20"
//               onClick={() => setIsOpen(false)}
//             >
//               <motion.div
//                 initial={{ x: "100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "100%" }}
//                 transition={{ type: "spring", damping: 30, stiffness: 300 }}
//                 className="absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl overflow-hidden"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Scrollable Content Container */}
//                 <div className="h-full flex flex-col">
//                   {/* Header with Close Button */}
//                   <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
//                     <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
//                     >
//                       <HiX size={24} />
//                     </button>
//                   </div>

//                   {/* Scrollable Content */}
//                   <div className="flex-1 overflow-y-auto">
//                     <div className="p-4 space-y-6">
//                       {/* Navigation Links */}
//                       {navLinks.map((link) => (
//                         <div key={link.name}>
//                           {link.dropdown ? (
//                             <div className="space-y-3">
//                               <div className="font-semibold text-gray-900 text-lg">
//                                 {link.name}
//                               </div>
//                               <div className="pl-4 space-y-2 border-l-2 border-blue-200">
//                                 {link.dropdown.map((item) => (
//                                   <Link
//                                     key={item.name}
//                                     href={item.href}
//                                     onClick={() => setIsOpen(false)}
//                                     className="block px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-base"
//                                   >
//                                     {item.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             </div>
//                           ) : (
//                             <Link
//                               href={link.href}
//                               onClick={() => setIsOpen(false)}
//                               className="block py-3 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-lg px-3"
//                             >
//                               {link.name}
//                             </Link>
//                           )}
//                         </div>
//                       ))}
                      
//                       {/* Auth Section */}
//                       <div className="pt-6 border-t border-gray-200 space-y-4">
//                         {user ? (
//                           <>
//                             {/* User Info */}
//                             <div className="px-3 py-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
//                               <p className="font-semibold text-gray-900 text-lg">Hi, {user.firstName}!</p>
//                               <p className="text-sm text-gray-600 mt-1">{user.email}</p>
//                             </div>
                            
//                             {/* User Links */}
//                             {userDropdownItems.map((item) => (
//                               <Link
//                                 key={item.name}
//                                 href={item.href}
//                                 onClick={() => setIsOpen(false)}
//                                 className="flex items-center space-x-3 px-3 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-base"
//                               >
//                                 {item.icon}
//                                 <span>{item.name}</span>
//                               </Link>
//                             ))}
                            
//                             {/* Logout */}
//                             <button
//                               onClick={handleLogout}
//                               className="flex items-center space-x-3 w-full px-3 py-4 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 text-base"
//                             >
//                               <HiLogout size={20} />
//                               <span>Sign Out</span>
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <Link
//                               href="/login"
//                               onClick={() => setIsOpen(false)}
//                               className="flex items-center space-x-3 px-3 py-4 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-base"
//                             >
//                               <HiUser size={20} />
//                               <span>Sign In</span>
//                             </Link>
//                             <Link
//                               href="/register"
//                               onClick={() => setIsOpen(false)}
//                               className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base"
//                             >
//                               Create Account
//                             </Link>
//                           </>
//                         )}
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
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX, HiOutlineShoppingCart, HiSearch, HiUser, HiChevronDown, HiLogout, HiCog } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const { cart } = useCart();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    
    // Listen for auth changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
      if (!event.target.closest('.shop-dropdown')) {
        setIsDropdownOpen(false);
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
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsUserDropdownOpen(false);
    setIsOpen(false);
    window.dispatchEvent(new Event("storage"));
    // Optionally redirect to home
    window.location.href = "/";
  };

  // Navigation links with categories
  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Shop", 
      href: "/shop",
      dropdown: [
        { name: "New Arrivals", href: "/shop?sort=newest" },
        { name: "Best Sellers", href: "/shop?sort=popular" },
        { name: "Men's Fashion", href: "/shop?category=men" },
        { name: "Women's Fashion", href: "/shop?category=women" },
        { name: "Accessories", href: "/shop?category=accessories" },
        { name: "Sale", href: "/shop?sort=discount" },
      ]
    },
    { name: "Collections", href: "/collections" },
    { name: "Brands", href: "/brands" },
    { name: "Partner", href: "/partner" },
  ];

  const userDropdownItems = [
    { name: "My Profile", href: "/account", icon: <HiUser size={18} /> },
    { name: "Settings", href: "/account/settings", icon: <HiCog size={18} /> },
    { name: "Order History", href: "/account/orders", icon: <HiOutlineShoppingCart size={18} /> },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 group"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400 group-hover:border-blue-600 transition-all duration-500 shadow-lg">
                  <Image
                    src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
                    alt="Kingz World - Premium Fashion"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}>
                    Kingz World
                  </span>
                  <span className="text-xs text-yellow-400 font-medium tracking-wider">
                    PREMIUM FASHION
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group shop-dropdown">
                  {link.dropdown ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 font-semibold transition-all duration-300 py-2 ${
                          isScrolled 
                            ? "text-gray-700 hover:text-blue-600" 
                            : "text-white hover:text-yellow-300"
                        }`}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                      >
                        <span>{link.name}</span>
                        <HiChevronDown className={`transform transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block px-6 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-semibold transition-all duration-300 py-2 relative ${
                        isScrolled 
                          ? "text-gray-700 hover:text-blue-600" 
                          : "text-white hover:text-yellow-300"
                      }`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-600 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:text-yellow-300 hover:bg-white/10"
                }`}
              >
                <HiSearch size={22} />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className={`flex items-center space-x-2 font-medium transition-all duration-300 relative ${
                  isScrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white hover:text-yellow-300"
                }`}
              >
                <HiOutlineShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account / Login */}
              {user ? (
                <div className="relative user-dropdown">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                      isScrolled 
                        ? "text-gray-700 hover:text-blue-600" 
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>Hi, {user.firstName || 'User'}</span>
                    <HiChevronDown className={`transform transition-transform duration-300 ${
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
                        className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        {/* User Info - SHOWING ONLY NAME */}
                        <div className="px-4 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                          <p className="font-semibold text-gray-900 text-lg">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-blue-600 font-medium mt-1">Welcome back!</p>
                        </div>

                        {/* Menu Items */}
                        {userDropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 font-medium border-b border-gray-100 last:border-b-0"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        ))}

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-4 text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                        >
                          <HiLogout size={18} />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Free
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Search Icon for Mobile */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 ${isScrolled ? "text-gray-700" : "text-white"}`}
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
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
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
              >
                {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - IMPROVED SIDEBAR VERSION */}
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
                className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Scrollable Content Container */}
                <div className="h-full flex flex-col">
                  {/* Header with Close Button */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-yellow-400">
                        <Image
                          src="/images/84712fed-7915-4ea9-a169-ce0c5d8b3531.JPG"
                          alt="Kingz World"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">Kingz World</span>
                        <span className="text-xs text-yellow-400 font-medium">PREMIUM FASHION</span>
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
                    <div className="p-6 space-y-8">
                      {/* Navigation Links */}
                      <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
                        {navLinks.map((link) => (
                          <div key={link.name}>
                            {link.dropdown ? (
                              <div className="space-y-3">
                                <div className="font-semibold text-gray-900 text-base">
                                  {link.name}
                                </div>
                                <div className="pl-4 space-y-2 border-l-2 border-blue-200">
                                  {link.dropdown.map((item) => (
                                    <Link
                                      key={item.name}
                                      href={item.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm"
                                    >
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300 text-base"
                              >
                                {link.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Auth Section */}
                      <div className="pt-6 border-t border-gray-200 space-y-6">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account</h3>
                        {user ? (
                          <>
                            {/* User Info - SHOWING ONLY NAME */}
                            <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                  {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                                  <p className="text-sm text-blue-600 font-medium">Welcome back!</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* User Links */}
                            <div className="space-y-2">
                              {userDropdownItems.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm"
                                >
                                  {item.icon}
                                  <span>{item.name}</span>
                                </Link>
                              ))}
                            </div>
                            
                            {/* Logout */}
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 text-sm mt-4"
                            >
                              <HiLogout size={18} />
                              <span>Sign Out</span>
                            </button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <Link
                              href="/login"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center space-x-3 px-4 py-4 font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 text-base border border-gray-200"
                            >
                              <HiUser size={20} />
                              <span>Sign In to Your Account</span>
                            </Link>
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
                              <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-base w-full"
                              >
                                Create Account
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Additional Links */}
                      <div className="pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Support</h3>
                        <Link href="/help" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">Help Center</Link>
                        <Link href="/contact" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact Us</Link>
                        <Link href="/about" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</Link>
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32"
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
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Popular: <button type="button" onClick={() => setSearchQuery("Sneakers")} className="hover:text-blue-600">Sneakers</button>, 
                    <button type="button" onClick={() => setSearchQuery("Dresses")} className="hover:text-blue-600 ml-1">Dresses</button>, 
                    <button type="button" onClick={() => setSearchQuery("Accessories")} className="hover:text-blue-600 ml-1">Accessories</button>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
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