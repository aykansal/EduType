"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { TypingInterface } from "./typing-interface"
import { Scoreboard } from "./scoreboard"
import { BiddingSystem } from "./bidding-system"
import { Button } from "../ui/button"
import { Shield, Play, Timer } from "lucide-react"
import dynamic from "next/dynamic"

const LiveChat = dynamic(() => import("../LiveChat"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse h-64 bg-gray-800 rounded-lg"></div>
  )
})

export const LiveSpace = () => {
  // Initial state with useMemo to prevent recreation
  const [competitors, setCompetitors] = useState(() => [
    { id: 1, name: "CyberTypist", wpm: 0, accuracy: 0 },
    { id: 2, name: "QuantumKeys", wpm: 0, accuracy: 0 }
  ])

  const [isHost] = useState(true)
  const [isLobby, setIsLobby] = useState(true)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameStart, setIsGameStart] = useState(false)

  // Memoize timer effect dependencies
  useEffect(() => {
    if (!isGameStart) return

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsGameOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameStart])

  // Memoize callback functions
  const updateCompetitorStats = useCallback((id, wpm, accuracy) => {
    setCompetitors(prevCompetitors =>
      prevCompetitors.map(competitor =>
        competitor.id === id ? { ...competitor, wpm, accuracy } : competitor
      )
    )
  }, [])

  const handleGameStart = useCallback(() => {
    setIsLobby(false)
    setIsGameStart(true)
  }, [])

  // Memoize static values
  const streamId = useMemo(() => "test", [])
  const userId = useMemo(() => `user-${Math.random()}`, [])
  const username = useMemo(() => `User ${Math.floor(Math.random() * 1000)}`, [])

  // Memoize the game interface
  const GameInterface = useMemo(
    () => (
      <>
        <div className="flex items-center justify-center gap-2 text-4xl font-bold mb-4 text-red-500 font-digital">
          <Timer className="animate-pulse" />
          {timeLeft > 0 ? `${timeLeft}s` : "GAME OVER"}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitors.map(competitor => (
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
    ),
    [competitors, timeLeft, isGameOver, isGameStart, updateCompetitorStats]
  )

  // Memoize the lobby interface
  const LobbyInterface = useMemo(
    () => (
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
    ),
    [handleGameStart]
  )

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

          {isLobby && isHost ? LobbyInterface : GameInterface}
        </motion.div>
        <Scoreboard competitors={competitors} />
      </div>
      <div className="space-y-8">
        {!streamId ? (
          <div className="animate-pulse h-64 bg-gray-800 rounded-lg"></div>
        ) : (
          <LiveChat streamId={streamId} userId={userId} username={username} />
        )}
        <BiddingSystem competitors={competitors} />
      </div>
    </div>
  )
}
