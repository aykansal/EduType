import { NavBar } from "@/components/navbar";
import { CtaSection } from "@/components/landingblue/cta-section";
import { HeroSection } from "@/components/landingblue/hero-section";
import { FeaturesSection } from "@/components/landingblue/features-section";
import { TestimonialsSection } from "@/components/landingblue/testimonials-section";
import { FloatingElements } from "@/components/landingblue/floating-elements";

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

