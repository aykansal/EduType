"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTyping } from "@/hooks/use-typing";
import { Button } from "@/components/ui/button";
import { useActiveAccount } from "thirdweb/react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useCallback } from "react";

const GameOverDialog = dynamic(() => import("../GameOverDialog"), {
  // loading: () => <div>Loading...</div>,
  ssr: false,
});

const SAMPLE_TEXT = "The quick brown";
// fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!";

export default function CertificationTest(params) {
  const account = useActiveAccount();

  const {
    wpm,
    timeLeft,
    accuracy,
    typedText,
    text,
    isGameStarted,
    startGame,
    handleKeyPress,
    resetTyping,
    setIsGameStarted,
  } = useTyping(SAMPLE_TEXT, 60); // Timed mode with 60 seconds

  const [isGameOver, setIsGameOver] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      const handleKeyDown = (e) => {
        e.preventDefault();
        handleKeyPress(e.key);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isGameStarted, handleKeyPress]);

  const saveScoresDB = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leaderboard/save-score`,
        {
          // params: {
          wpm,
          accuracy,
          walletAddress: account?.address,
          // },
        }
      );
      console.log("Score saved:", response?.data);
    } catch (err) {
      console.log("Error saving score:", err?.response?.data);
    } finally {
      console.log("SaveScoreDB Executed!");
    }
  };

  // Check for game over conditions
  useEffect(() => {
    if (isGameStarted && (timeLeft <= 0 || typedText.length === text.length)) {
      setIsGameOver(true);
      saveScoresDB();
    }
  }, [isGameStarted, timeLeft, typedText.length, text.length]);

  const handleGenerateCertificate = useCallback(async () => {
    // if (certificateGenerated) return ""; // Skip if already generated

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate/generate`,
        {
          params: {
            walletAddress: account?.address,
            wpm: wpm.toString(),
            accuracy: accuracy.toString(),
          },
        }
      );
      setCertificateGenerated(true);
      return response?.data?.certificate?.url;
    } catch (err) {
      console.error("Error generating certificate:", err?.response?.data);
      return "";
    }
  }, [accuracy, wpm, certificateGenerated]);

  return (
    <div
      className={`${
        params.isArena ? "bg-transparent text-white" : "bg-white text-gray-900"
      } shadow-lg p-8 rounded-2xl `}
    >
      {!params.isArena && (
        <h2 className="mb-4 font-bold text-2xl">Typing Game</h2>
      )}
      {!isGameStarted ? (
        <div className="py-12 text-center">
          <Button
            size="lg"
            className="bg-green-400 hover:bg-green-500 px-8 py-4 font-semibold text-lg text-white"
            onClick={startGame}
          >
            {params.submitName}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">Time left: {timeLeft}s</div>
            <div className="font-semibold text-lg">WPM: {wpm}</div>
          </div>
          <Progress value={(60 - timeLeft) * (100 / 60)} className="h-2" />
          <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] font-mono text-lg text-neutral-300 leading-relaxed">
            {SAMPLE_TEXT.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`${
                  index < typedText.length
                    ? typedText[index] === char
                      ? "text-green-500"
                      : "text-red-500"
                    : ""
                } ${
                  index === typedText.length ? "border-r-2 border-blue-500" : ""
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="text-right font-semibold text-lg">
            Accuracy: {accuracy}%
          </div>
        </div>
      )}

      {isGameOver && (
        <GameOverDialog
          isOpen={isGameOver}
          onClose={() => {
            setIsGameOver(false);
            setCertificateGenerated(false);
            setIsGameStarted(false);

            resetTyping();
          }}
          wpm={wpm}
          accuracy={accuracy}
          onGenerateCertificate={handleGenerateCertificate}
        />
      )}
    </div>
  );
}
