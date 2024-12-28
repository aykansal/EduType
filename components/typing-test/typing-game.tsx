'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTypingGame } from '@/hooks/use-typing-game'

const SAMPLE_TEXT = " The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!"

export function TypingGame() {
  const { 
    typedText, 
    accuracy, 
    wpm, 
    timeLeft, 
    isGameStarted,
    startGame,
    handleKeyPress,
  } = useTypingGame(SAMPLE_TEXT, 60)

  useEffect(() => {
    if (isGameStarted) {
      const handleKeyDown = (e: KeyboardEvent) => {
        handleKeyPress(e.key)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isGameStarted, handleKeyPress])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Typing Game</h2>
      {!isGameStarted ? (
        <div className="text-center py-12">
          <Button 
            onClick={startGame}
            size="lg"
            className="bg-green-400 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4"
          >
            Begin Certification Test
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Time left: {timeLeft}s</div>
            <div className="text-lg font-semibold">WPM: {wpm}</div>
          </div>
          <Progress value={(60 - timeLeft) * (100/60)} className="h-2" />
          <div className="font-mono text-neutral-300 text-lg leading-relaxed p-4 bg-gray-50 rounded-lg min-h-[200px]">
            {SAMPLE_TEXT.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`${
                  index < typedText.length
                    ? typedText[index] === char
                      ? 'text-green-500'
                      : 'text-red-500'
                    : ''
                } ${
                  index === typedText.length ? 'border-r-2 border-blue-500' : ''
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="text-right text-lg font-semibold">
            Accuracy: {accuracy}%
          </div>
        </div>
      )}
    </div>
  )
}

