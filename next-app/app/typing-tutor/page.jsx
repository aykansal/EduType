"use client";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/navbar";
import { DecorativeWave } from "@/components/decorative-wave";

const TypingTutor = dynamic(
  () =>
    import("@/components/typing-tutor/typing-tutor").then(
      (mod) => mod.TypingTutor
    ),
  {
    loading: () => (
      <div className="bg-gray-200 rounded-lg h-96 animate-pulse" />
    ),
    ssr: false,
  }
);

export default function TypingTutorPage() {
  return (
    <div
      className="bg-gradient-to-b from-white to-blue-50 min-h-screen"
    >
      <NavBar />
      <DecorativeWave />
      <main className="mx-auto px-4 py-8 container">
        <TypingTutor />
      </main>
    </div>
  );
}
