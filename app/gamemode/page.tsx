import { NavBar } from "@/components/navbar"
import { DecorativeWave } from "@/components/decorative-wave"
import { GameHero } from "@/components/about/game-hero"
import { GameModeExplanation } from "@/components/about/game-mode-explanation"

export default function GameMode() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <DecorativeWave />
      <main>
        <GameHero />
        <GameModeExplanation />
      </main>
    </div>
  )
}

