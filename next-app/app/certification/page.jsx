import dynamic from "next/dynamic";
import { NavBar } from "@/components/navbar";
import { DecorativeWave } from "@/components/decorative-wave";
import CertificationTest from "@/components/certification/CertificationTest";

const Leaderboard = dynamic(
  () => import("@/components/certification/leaderboard").then((m) => m.default),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function Certification() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <NavBar />
      <DecorativeWave />
      <main className="mx-auto px-4 py-8 container">
        <div className="gap-8 grid md:grid-cols-3">
          <div className="md:col-span-2">
            <CertificationTest />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  );
}
