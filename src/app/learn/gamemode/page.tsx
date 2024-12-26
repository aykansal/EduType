import { NavBar } from "@/src/components/nav-bar"
import { GameHero } from "./components/game-hero"
import { GameModeExplanation } from "./components/game-mode-explanation"
import { DecorativeWave } from "@/src/components/decorative-wave"

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

