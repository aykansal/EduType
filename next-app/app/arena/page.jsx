"use client";
import { useState } from "react";
import { toast } from "sonner";
import { TrophyIcon } from "lucide-react";
import { Header } from "@/components/arena/header";
import { Chat} from "@/components/arena/chat";
import { MatchCard } from "@/components/arena/match-card";
import { LeaderboardDrawer } from "@/components/arena/leaderboard-drawer";
import { Button } from "@/components/ui/button";
import { AnimatedGrid } from "@/components/ui/animated-grid";

export default function ArenaPage() {
  const [matches, setMatches] = useState(MOCK_MATCHES);
  const [messages] = useState(MOCK_MESSAGES);
  const [users] = useState(MOCK_USERS);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [globalRankings] = useState(MOCK_GLOBAL_RANKINGS);

  const handleBid = (matchId, playerId, amount) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              userBid: {
                playerId,
                amount,
              },
            }
          : match
      )
    );

    toast.success(`Bid placed successfully: ${amount} Edu`);
  };

  const allPlayers = matches.flatMap((match) => [match.player1, match.player2]);

  return (
    <div className="flex flex-col h-screen">
      <AnimatedGrid />
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-gaming text-transparent text-xl">
              Live Matches
            </h2>
            <Button
              variant="gaming"
              className="gap-2"
              onClick={() => setIsLeaderboardOpen(true)}
            >
              <TrophyIcon className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>

          <div className="space-y-6">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} onBid={handleBid} />
            ))}
          </div>
        </main>

        <aside className="border-purple-500/20 bg-black/40 backdrop-blur-sm border-l w-80">
          <Chat messages={messages} users={users} />
        </aside>
      </div>

      <LeaderboardDrawer
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        players={allPlayers}
        globalRankings={globalRankings}
      />
    </div>
  );
}


const MOCK_MATCHES = [
  {
    id: "1",
    name: "Speed Demons",
    player1: {
      id: "p1",
      name: "Harold Rhoads",
      wpm: 120,
      score: 2302,
      rank: 1,
    },
    player2: {
      id: "p2",
      name: "Phyllis Woods",
      wpm: 115,
      score: 2127,
      rank: 2,
    },
    bidAmount: 1.22,
  },
  {
    id: "2",
    name: "Typing Titans",
    player1: {
      id: "p3",
      name: "Frank Guy",
      wpm: 110,
      score: 1992,
      rank: 3,
    },
    player2: {
      id: "p4",
      name: "Corinne Gregg",
      wpm: 108,
      score: 1942,
      rank: 4,
    },
    bidAmount: 1.22,
  },
  {
    id: "3",
    name: "Keyboard Warriors",
    player1: {
      id: "p5",
      name: "Alan Foland",
      wpm: 105,
      score: 1864,
      rank: 5,
    },
    player2: {
      id: "p6",
      name: "Arthur Rice",
      wpm: 103,
      score: 1856,
      rank: 6,
    },
    bidAmount: 1.22,
  },
];

const MOCK_MESSAGES = [
  {
    id: "1",
    userId: "u1",
    text: "Good game everyone!",
    timestamp: new Date(),
  },
];

const MOCK_USERS = [
  {
    id: "u1",
    name: "User 1",
    avatar: "/placeholder.svg?height=32&width=32",
    online: true,
  },
];

const MOCK_GLOBAL_RANKINGS = [
  {
    playerId: "g1",
    playerName: "Harold Rhoads",
    score: 9500,
    wpm: 120,
    rank: 1,
  },
  {
    playerId: "g2",
    playerName: "Phyllis Woods",
    score: 9200,
    wpm: 115,
    rank: 2,
  },
  {
    playerId: "g3",
    playerName: "Frank Guy",
    score: 9000,
    wpm: 112,
    rank: 3,
  },
  {
    playerId: "g4",
    playerName: "Corinne Gregg",
    score: 8800,
    wpm: 110,
    rank: 4,
  },
  {
    playerId: "g5",
    playerName: "Alan Foland",
    score: 8600,
    wpm: 108,
    rank: 5,
  },
];