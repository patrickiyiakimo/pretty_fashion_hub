import AboutSection from "@/app/(website)/components/AboutSection";
import Hero from "@/app/(website)/components/Hero";
import LiveNotifications from "@/app/(website)/components/LiveNotifications";
import LogisticsCTA from "@/app/(website)/components/LogisticsCTA";
import Testimonials from "@/app/(website)/components/Testimonial";
import Collections from "@/containers/Collections";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <AboutSection />
      <LogisticsCTA />
      <Testimonials />
      <LiveNotifications />
    </>
  );
}
