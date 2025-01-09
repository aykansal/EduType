"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModularKeyboard } from "@/components/modular-keyboard";
import { WordBubble } from "./word-bubble";
import { VictoryScreen } from "./victory-screen";
import { getSocket } from "@/lib/socket";

const GAME_DURATION = 60; // seconds
const WORD_SPAWN_INTERVAL = 1000; // milliseconds
const MAX_ACTIVE_WORDS = 15;
const WORDS_TO_WIN = 20;

const words = [
  "type",
  "fast",
  "bubble",
  "challenge",
  "keyboard",
  "speed",
  "accuracy",
  "practice",
  "improve",
  "skills",
  "compete",
  "victory",
  "words",
  "floating",
  "capture",
  "stack",
  "game",
  "player",
  "score",
  "time",
];

export function BubbleTypeGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentWord, setCurrentWord] = useState("");
  const [activeWords, setActiveWords] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", wordCount: 0 },
    { id: 2, name: "Player 2", wordCount: 0 },
  ]);
  const [winner, setWinner] = useState(null);
  const containerRef = useRef(null);

  // ----------------sockets-stuff----------------
  const [socket, setSocket] = useState(null);
  
  const startGame = () => {
    let socketIo = getSocket();
    setSocket(socketIo);

    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(GAME_DURATION);
    setActiveWords([]);
    setPlayers(players.map((player) => ({ ...player, wordCount: 0 })));
    setWinner(null);
    setCurrentWord("");
  };

  const spawnWord = useCallback(() => {
    if (activeWords.length < MAX_ACTIVE_WORDS) {
      const newWord = words[Math.floor(Math.random() * words.length)];
      setActiveWords((prev) => [
        ...prev,
        { id: `${newWord}-${Date.now()}`, word: newWord },
      ]);
    }
  }, [activeWords]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      const wordSpawner = setInterval(spawnWord, WORD_SPAWN_INTERVAL);

      return () => {
        clearInterval(timer);
        clearInterval(wordSpawner);
      };
    }
  }, [gameStarted, gameOver, spawnWord]);

  const handleKeyPress = useCallback(
    (key) => {
      if (gameStarted && !gameOver) {
        if (key === "Backspace") {
          setCurrentWord((prev) => prev.slice(0, -1));
        } else if (key.length === 1) {
          const newWord = currentWord + key;
          setCurrentWord(newWord);

          const matchedWordIndex = activeWords.findIndex(
            ({ word }) => word === newWord
          );
          if (matchedWordIndex !== -1) {
            setActiveWords((prev) =>
              prev.filter((_, index) => index !== matchedWordIndex)
            );
            setPlayers((prev) => {
              const updatedPlayers = prev.map((player) => {
                if (player.id === 1) {
                  const newWordCount = player.wordCount + 1;
                  if (newWordCount >= WORDS_TO_WIN) {
                    setWinner(player);
                    setGameOver(true);
                  }
                  return { ...player, wordCount: newWordCount };
                }
                return player;
              });

              return updatedPlayers;
            });
            setCurrentWord("");
          }
        }
      }
    },
    [gameStarted, gameOver, currentWord, activeWords]
  );

  return (
    <div className="relative bg-gray-800 shadow-lg p-8 rounded-2xl min-h-[600px]">
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex justify-center items-center">
          <motion.button
            onClick={startGame}
            className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-lg font-semibold font-tech text-lg text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold font-digital text-2xl text-cyan-400">
              Time: {timeLeft}s
            </div>
            <div className="font-bold font-digital text-2xl text-cyan-400">
              Words: {activeWords.length}
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="font-bold font-tech text-cyan-400 text-xl"
              >
                {player.name}: {player.wordCount} / {WORDS_TO_WIN}
              </div>
            ))}
          </div>
          <div
            ref={containerRef}
            className="relative bg-gray-700 mb-4 rounded-lg h-[400px] overflow-hidden"
          >
            <AnimatePresence>
              {activeWords.map(({ id, word }) => (
                <WordBubble key={id} word={word} containerRef={containerRef} />
              ))}
            </AnimatePresence>
          </div>
          <div className="bg-gray-700 mb-4 p-4 rounded-lg">
            <div className="mb-2 font-semibold font-tech text-cyan-400 text-xl">
              Current Word:
            </div>
            <div className="font-bold font-mono text-2xl text-white">
              {currentWord}
            </div>
          </div>
          <ModularKeyboard
            onKeyPress={handleKeyPress}
            disabled={false}
            sampleText=""
            typedText={currentWord}
          />
        </>
      )}

      {gameOver && winner && (
        <VictoryScreen winner={winner} onRestart={startGame} />
      )}
    </div>
  );
}