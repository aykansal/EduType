import { NavBar } from "@/components/navbar";
import { BubbleTypeGame } from "./components/bubble-type-game";

export default function BubbleTypePage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <NavBar />
      <main className="mx-auto px-4 container py8">
        {/* <h1 className="mb-8 font-bold font-tech text-5xl text-center text-cyan-400">
          Bubble Type Challenge
        </h1> */}
        <BubbleTypeGame />
      </main>
    </div>
  )
}

