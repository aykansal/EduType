import { TypingTest } from "./components/typing-test"
import { CertificateShowcase } from "./components/certificate-showcase"
import { NavBar } from "@/src/components/nav-bar"
import { DecorativeWave } from "@/src/components/decorative-wave"

export default function TypingTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <TypingTest />
        <CertificateShowcase />
      </main>
    </div>
  )
}

