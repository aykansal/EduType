import { LiveSpace } from "@/components/arena/live-space"
import { NavBar } from "@/components/navbar"

export default function LiveCompetitionPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-cyan-400 font-tech">
          Typing Arena
        </h1>
        <LiveSpace />
      </main>
    </div>
  )
}

