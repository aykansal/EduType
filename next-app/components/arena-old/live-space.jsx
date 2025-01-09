"use client";

import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Scoreboard } from "./scoreboard";
import { BiddingSystem } from "./bidding-system";
import { Shield, Play, Timer } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import CertificationTest from "../certification/CertificationTest";

const LiveChat = dynamic(() => import("../LiveChat"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-800 rounded-lg h-64 animate-pulse"></div>
  ),
});

export const LiveSpace = () => {
  // Initial state with useMemo to prevent recreation
  const [competitors, setCompetitors] = useState(() => [
    { id: 1, name: "CyberTypist", wpm: 0, accuracy: 0 },
    { id: 2, name: "QuantumKeys", wpm: 0, accuracy: 0 },
  ]);

  const [isHost] = useState(true);
  const [isLobby, setIsLobby] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);

  // Memoize timer effect dependencies
  useEffect(() => {
    if (!isGameStart) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStart]);

  // Memoize callback functions
  const updateCompetitorStats = useCallback((id, wpm, accuracy) => {
    setCompetitors((prevCompetitors) =>
      prevCompetitors.map((competitor) =>
        competitor.id === id ? { ...competitor, wpm, accuracy } : competitor
      )
    );
  }, []);

  const handleGameStart = useCallback(() => {
    setIsLobby(false);
    setIsGameStart(true);
  }, []);

  // Memoize static values
  const streamId = useMemo(() => "test", []);
  const userId = useMemo(() => `user-${Math.random()}`, []);
  const username = useMemo(
    () => `User ${Math.floor(Math.random() * 1000)}`,
    []
  );

  // Memoize the game interface
  const GameInterface = useMemo(
    () => (
      <>
        {/* <div className="flex justify-center items-center gap-2 mb-4 font-bold font-digital text-4xl text-red-500">
          <Timer className="animate-pulse" />
          {timeLeft > 0 ? `${timeLeft}s` : "GAME OVER"}
        </div> */}
        {/* <div className="gap-6 grid grid-cols-1 md:grid-cols-2"> */}
        <div>
          <CertificationTest isArena={true} submitName={'Play Game'} />

          {/* {competitors.map((competitor) => (
            <TypingInterface
              key={competitor.id}
              competitor={competitor}
              updateStats={updateCompetitorStats}
              isGameOver={isGameOver}
              isGameStart={isGameStart}
            />
          ))} */}
        </div>
      </>
    ),
    [competitors, timeLeft, isGameOver, isGameStart, updateCompetitorStats]
  );

  // Memoize the lobby interface
  const LobbyInterface = useMemo(
    () => (
      <div className="py-12 text-center">
        <Button
          onClick={handleGameStart}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 mx-auto px-8 py-4 rounded-lg text-white"
        >
          <Play size={24} />
          Start Game
        </Button>
        <p className="mt-4 text-gray-400">
          Waiting for host to start the game...
        </p>
      </div>
    ),
    [handleGameStart]
  );

  return (
    <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-cyan-500 bg-gray-800 shadow-lg p-6 border rounded-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold font-tech text-3xl text-cyan-400">
              Battle Arena
            </h2>
            {isHost && isLobby && (
              <div className="flex items-center gap-2">
                <Shield className="text-green-400" size={20} />
                <span className="text-green-400 text-sm">Host Controls</span>
              </div>
            )}
          </div>
          {isLobby && isHost ? LobbyInterface : GameInterface}
        </motion.div>
        <Scoreboard competitors={competitors} />
      </div>
      <div className="space-y-8">
        {!streamId ? (
          <div className="bg-gray-800 rounded-lg h-64 animate-pulse"></div>
        ) : (
          // <LiveChat streamId={streamId} userId={userId} username={username} />
          <LiveChat />
        )}
        <BiddingSystem competitors={competitors} />
      </div>
    </div>
  );
};
