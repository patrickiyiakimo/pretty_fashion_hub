import AboutSection from "@/components/AboutSection";
import Hero from "@/components/Hero";
import LiveNotifications from "@/components/LiveNotifications";
import Testimonials from "@/components/Testimonial";
import Collections from "@/containers/Collections";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <AboutSection />
      <Testimonials />
      <LiveNotifications />
    </>
  );
}
