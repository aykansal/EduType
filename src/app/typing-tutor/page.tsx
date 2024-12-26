import { NavBar } from "@/src/components/nav-bar"
import { TypingTutor } from "./components/typing-tutor"
import { DecorativeWave } from "@/src/components/decorative-wave"

export default function TypingTutorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <TypingTutor />
      </main>
    </div>
  )
}

