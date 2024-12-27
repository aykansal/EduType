'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Progress } from "@/src/components/ui/progress"
import { useTypingTest } from '@/src/hooks/use-typing-test'

// const SAMPLE_TEXT = "The Sahara Desert is the largest hot desert in the world, covering an area of 3.6 million square miles. Despite its harsh environment, the Sahara is home to a"

interface TestInterfaceProps {
  onComplete: () => void
}

export function TestInterface({ onComplete }: TestInterfaceProps) {
  const {
    text,
    typedText,
    timeLeft,
    wpm,
    accuracy,
    handleKeyPress,
    isComplete
  } = useTypingTest()

  useEffect(() => {
    if (isComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyPress])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-sm font-medium">Time Left</div>
          <div className="text-2xl font-bold">{timeLeft}s</div>
        </div>
        <div className="space-y-1 text-right">
          <div className="text-sm font-medium">WPM</div>
          <div className="text-2xl font-bold">{wpm}</div>
        </div>
      </div>

      <Progress value={(60 - timeLeft) * (100/60)} className="h-2" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-xl leading-relaxed p-6 bg-gray-50 rounded-lg min-h-[200px]"
      >
        {text.split('').map((char, index) => {
          const isTyped = index < typedText.length
          const isCorrect = char === typedText[index]
          return (
            <span
              key={index}
              className={`${
                isTyped
                  ? isCorrect
                    ? 'text-green-500'
                    : 'text-red-500'
                  : 'text-gray-900'
              } ${
                index === typedText.length ? 'border-r-2 border-blue-500 animate-pulse' : ''
              }`}
            >
              {char}
            </span>
          )
        })}
      </motion.div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Accuracy: {accuracy}%</span>
        <span>Characters: {typedText.length}</span>
      </div>
    </div>
  )
}

