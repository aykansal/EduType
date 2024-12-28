'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs."

interface Competitor {
  id: number
  name: string
  wpm: number
  accuracy: number
}

interface TypingInterfaceProps {
  competitor: Competitor
  updateStats: (id: number, wpm: number, accuracy: number) => void
  isGameOver: boolean,
  isGameStart:boolean
}

export function TypingInterface({ competitor, updateStats, isGameOver }: TypingInterfaceProps) {
  const [typedText, setTypedText] = useState('')

  const calculateStats = useCallback(() => {
    const words = typedText.trim().split(' ').length
    const characters = typedText.length
    const correctCharacters = typedText.split('').filter((char, index) => char === SAMPLE_TEXT[index]).length

    const wpm = Math.round((words / 1) * 60) // Assuming 1 minute game
    const accuracy = Math.round((correctCharacters / characters) * 100) || 0

    updateStats(competitor.id, wpm, accuracy)
  }, [typedText, competitor.id, updateStats])

  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(calculateStats, 1000)
      return () => clearInterval(interval)
    }
  }, [calculateStats, isGameOver])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isGameOver) {
      setTypedText(e.currentTarget.value)
    }
  }, [isGameOver])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-700 rounded-lg p-4 shadow-lg border border-cyan-600"
    >
      <h3 className="text-xl font-bold mb-2 text-cyan-400 font-tech">{competitor.name}</h3>
      <div className="mb-2 text-sm text-gray-300 font-mono">
        <span className="font-medium">WPM: {competitor.wpm}</span>
        <span className="mx-2">|</span>
        <span className="font-medium">Accuracy: {competitor.accuracy}%</span>
      </div>
      <div className="relative">
        <div className="absolute inset-0 font-mono text-gray-500 whitespace-pre-wrap pointer-events-none p-2 opacity-50">
          {SAMPLE_TEXT}
        </div>
        <textarea
          className="w-full h-32 font-mono bg-gray-800 text-cyan-300 resize-none outline-none p-2 rounded border border-gray-600 focus:border-cyan-500 transition-colors"
          value={typedText}
          onChange={handleKeyPress}
          disabled={isGameOver}
          placeholder="Start typing here..."
        />
      </div>
    </motion.div>
  )
}

