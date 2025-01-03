import { NavBar } from "@/components/navbar";
import { TypingGame } from "@/components/typing-test/typing-game";
// import dynamic from "next/dynamic";

// const Leaderboard = dynamic(
//   () => import("@/components/typing-test/leaderboard").then((m) => m.default),
//   {
//     loading: () => <div>Loading...</div>,
//   }
// );

export default function TypingTutorPage() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <NavBar />
      <main className="mx-auto px-4 py-8 container">
        <TypingGame isArena={true} />
      </main>
    </div>
  );
}