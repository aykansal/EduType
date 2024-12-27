import { NavBar } from "@/src/components/nav-bar";
import { CtaSection } from "@/src/components/landingblue/cta-section";
import { HeroSection } from "@/src/components/landingblue/hero-section";
import { FeaturesSection } from "@/src/components/landingblue/features-section";
import { TestimonialsSection } from "@/src/components/landingblue/testimonials-section";
import { FloatingElements } from "@/src/components/landingblue/floating-elements";

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

