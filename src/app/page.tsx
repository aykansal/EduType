import { NavBar } from "@/src/components/nav-bar";
import { CtaSection } from "@/src/components/landing/cta-section";
import { HeroSection } from "@/src/components/landing/hero-section";
import { SakuraElements } from "@/src/components/landing/sakura-elements";
import { FeaturesSection } from "@/src/components/landing/features-section";
import { TestimonialsSection } from "@/src/components/landing/testimonials-section";

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      <SakuraElements />
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
}
