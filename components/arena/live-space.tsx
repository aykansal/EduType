'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypingInterface } from './typing-interface'
import { Scoreboard } from './scoreboard'
import { AudienceChat } from './audience-chat'
import { BiddingSystem } from './bidding-system'

export function LiveSpace() {
  const [competitors, setCompetitors] = useState([
    { id: 1, name: 'CyberTypist', wpm: 0, accuracy: 0 },
    { id: 2, name: 'QuantumKeys', wpm: 0, accuracy: 0 },
  ])

  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setIsGameOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const updateCompetitorStats = (id: number, wpm: number, accuracy: number) => {
    setCompetitors(prevCompetitors =>
      prevCompetitors.map(competitor =>
        competitor.id === id ? { ...competitor, wpm, accuracy } : competitor
      )
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg p-6 border border-cyan-500"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-cyan-400 font-tech">Battle Arena</h2>
          <div className="text-center text-4xl font-bold mb-4 text-red-500 font-digital">
            {timeLeft > 0 ? `${timeLeft}s` : "GAME OVER"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competitors.map(competitor => (
              <TypingInterface
                key={competitor.id}
                competitor={competitor}
                updateStats={updateCompetitorStats}
                isGameOver={isGameOver}
              />
            ))}
          </div>
        </motion.div>
        <Scoreboard competitors={competitors} />
      </div>
      <div className="space-y-8">
        <BiddingSystem competitors={competitors} />
        <AudienceChat />
      </div>
    </div>
  )
}

