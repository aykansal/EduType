import { CharacterAnimationSection } from "./components/character-animation-section";
import { CtaSection } from "./components/cta-section";
import { FeaturesSection } from "./components/features-section";
import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero-section";
import { KeyFeaturesSection } from "./components/key-features-section";
import { NavBar } from "./components/nav-bar";
import { SeasonalBackground } from "./components/seasonal-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 overflow-hidden">
      <SeasonalBackground />
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CharacterAnimationSection />
        <KeyFeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

