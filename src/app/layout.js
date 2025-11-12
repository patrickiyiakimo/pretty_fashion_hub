import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import CTASection from "../components/CTA";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import LiveNotifications from "@/components/LiveNotifications";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kingz_World",
  description: "Luxury fashion boutique in Gwarimpa, Abuja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
        <CartProvider>
          <Navbar />
          {children}
          <CTASection />
          <Footer />
          <LiveNotifications />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
