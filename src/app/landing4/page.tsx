import { NavBar } from "@/src/components/nav-bar"
import { DecorativeWave } from "@/src/components/decorative-wave"
import { HeroSection } from "@/src/components/hero-section"
import { CertificateSection } from "@/src/components/certification-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <DecorativeWave />
      <main>
        <HeroSection />
        <CertificateSection />
      </main>
    </div>
  )
}