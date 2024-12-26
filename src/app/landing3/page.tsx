'use client'

import { CharacterAnimationSection } from "@/src/components/landing3/character-animation-section"
import { CtaSection } from "@/src/components/landing3/cta-section"
import { FeaturesSection } from "@/src/components/landing3/features-section"
import { Footer } from "@/src/components/landing3/footer"
import { HeroSection } from "@/src/components/landing3/hero-section"
import { KeyFeaturesSection } from "@/src/components/landing3/key-features-section"
import { SeasonalBackground } from "@/src/components/landing3/seasonal-background"
import { NavBar } from "@/src/components/nav-bar"
import { useEffect, useState } from "react"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 overflow-hidden">
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