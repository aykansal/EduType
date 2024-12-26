import { CtaSection } from "@/src/components/landing2/cta-section";
import { FeaturesSection } from "@/src/components/landing2/features-section";
import { HeroSection } from "@/src/components/landing2/hero-section";
import { NavBar } from "@/src/components/landing2/nav-bar";
import { SakuraElements } from "@/src/components/landing2/sakura-elements";
import { TestimonialsSection } from "@/src/components/landing2/testimonials-section";

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
  )
}

