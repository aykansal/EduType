"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypingInterface } from "./typing-interface";
import { Scoreboard } from "./scoreboard";
import { AudienceChat } from "./audience-chat";
import { BiddingSystem } from "./bidding-system";
import { Button } from "../ui/button";
import { Shield, Play, Timer } from "lucide-react";

export function LiveSpace() {
  const [competitors, setCompetitors] = useState([
    { id: 1, name: "CyberTypist", wpm: 0, accuracy: 0 },
    { id: 2, name: "QuantumKeys", wpm: 0, accuracy: 0 },
  ]);

  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isHost] = useState(true); // In a real app, this would come from auth/props
  const [isLobby, setIsLobby] = useState(true);

  useEffect(() => {
    if (isGameStart) {
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
    }
  }, [isGameStart]);

  const updateCompetitorStats = (id: number, wpm: number, accuracy: number) => {
    setCompetitors((prevCompetitors) =>
      prevCompetitors.map((competitor) =>
        competitor.id === id ? { ...competitor, wpm, accuracy } : competitor
      )
    );
  };

  const handleGameStart = () => {
    setIsLobby(false);
    setIsGameStart(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg p-6 border border-cyan-500"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-cyan-400 font-tech">
              Battle Arena
            </h2>
            {isHost && isLobby && (
              <div className="flex items-center gap-2">
                <Shield className="text-green-400" size={20} />
                <span className="text-green-400 text-sm">Host Controls</span>
              </div>
            )}
          </div>

          {isLobby && isHost ? (
            <div className="text-center py-12">
              <Button
                onClick={handleGameStart}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 mx-auto"
              >
                <Play size={24} />
                Start Game
              </Button>
              <p className="text-gray-400 mt-4">
                Waiting for host to start the game...
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 text-4xl font-bold mb-4 text-red-500 font-digital">
                <Timer className="animate-pulse" />
                {timeLeft > 0 ? `${timeLeft}s` : "GAME OVER"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitors.map((competitor) => (
                  <TypingInterface
                    key={competitor.id}
                    competitor={competitor}
                    updateStats={updateCompetitorStats}
                    isGameOver={isGameOver}
                    isGameStart={isGameStart}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
        <Scoreboard competitors={competitors} />
      </div>
      <div className="space-y-8">
        <BiddingSystem competitors={competitors} />
        <AudienceChat />
      </div>
    </div>
  );
}