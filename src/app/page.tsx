import { NavBar } from "@/src/components/landing4/nav-bar";
import { CtaSection } from "@/src/components/landing4/cta-section";
import { HeroSection } from "@/src/components/landing4/hero-section";
import { FeaturesSection } from "@/src/components/landing4/features-section";
import { TestimonialsSection } from "@/src/components/landing4/testimonials-section";
import { FloatingElements } from "@/src/components/landing4/floating-elements";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 overflow-hidden">
      <FloatingElements />
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

