import { CtaSection } from "./components/cta-section";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { NavBar } from "./components/nav-bar";
import { SakuraElements } from "./components/sakura-elements";
import { TestimonialsSection } from "./components/testimonials-section";

export default function Home() {
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

