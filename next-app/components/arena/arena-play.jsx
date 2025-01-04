"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTypingGame } from "@/hooks/use-typing-game";

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!";

export function TypingGame() {
  const {
    typedText,
    accuracy,
    wpm,
    timeLeft,
    isGameStarted,
    startGame,
    handleKeyPress,
  } = useTypingGame(SAMPLE_TEXT, 60);

  useEffect(() => {
    if (isGameStarted) {
      const handleKeyDown = (e) => {
        handleKeyPress(e.key);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isGameStarted, handleKeyPress]);

  return (
    <div className="bg-white shadow-lg p-8 rounded-2xl text-gray-900">
      <h2 className="mb-4 font-bold text-2xl">Typing Game</h2>
      {!isGameStarted ? (
        <div className="py-12 text-center">
          <Button
            onClick={startGame}
            size="lg"
            className="bg-green-400 hover:bg-green-500 px-8 py-4 font-semibold text-lg text-white"
          >
            Begin Certification Test
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
    </div>
  );
}
