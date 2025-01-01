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
      <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
    ),
    ssr: false,
  }
);

export default function TypingTutorPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-blue-50"
      suppressHydrationWarning={true}
    >
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <TypingTutor />
      </main>
    </div>
  );
}
