import { NavBar } from "@/components/navbar";
import { DecorativeWave } from "@/components/decorative-wave";
import { TypingGame } from "@/components/typing-test/typing-game";
import dynamic from "next/dynamic";

const Leaderboard = dynamic(
  () => import("@/components/typing-test/leaderboard").then((m) => m.default),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function TypingTutorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TypingGame />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  );
}
