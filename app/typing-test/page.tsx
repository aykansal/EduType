// import { NavBar } from "@/src/components/nav-bar"
// import { DecorativeWave } from "@/src/components/decorative-wave"
// import { TypingTest } from "@/src/components/typing-test/typing-test"
// import { CertificateShowcase } from "@/src/components/typing-test/certificate-showcase"
// export default function TypingTestPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
//       <NavBar />
//       <DecorativeWave />
//       <main className="container mx-auto px-4 py-8">
//         <TypingTest />
//         <CertificateShowcase />
//       </main>
//     </div>
//   )
// }

//

import { NavBar } from "@/components/navbar";
import { DecorativeWave } from "@/components/decorative-wave";
import { TypingGame } from "@/components/typing-test/typing-game";
import { Leaderboard } from "@/components/typing-test/leaderboard";
import { CertificateSection } from "@/components/certification-section";

export default function TypingTutorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TypingGame />
            <CertificateSection/>
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </main>
    </div>
  );
}
