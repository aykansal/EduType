import { NavBar } from "@/components/nav-bar"
import { DecorativeWave } from "@/components/decorative-wave"
import { GameHero } from "./components/game-hero"
import { GameModeExplanation } from "./components/game-mode-explanation"

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

