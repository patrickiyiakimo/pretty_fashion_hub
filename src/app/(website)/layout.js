import CTASection from "./components/CTA";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <CTASection />
      <Footer />
    </>
  );
}