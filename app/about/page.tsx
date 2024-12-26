import { NavBar } from "@/components/navbar"
import { GameHero } from "@/components/about/game-hero"
import { GameModeExplanation } from "@/components/about/game-mode-explanation"
import { DecorativeWave } from "@/components/decorative-wave"

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

