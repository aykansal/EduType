'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard } from './keyboard'
import { Button } from "@/components/ui/button"
import { useTyping } from '@/hooks/use-typing'

export function TypingTutor() {
  const [isStarted, setIsStarted] = useState(false)
  const { 
    text, 
    typedText, 
    currentKey,
    accuracy,
    wpm,
    handleKeyPress,
    resetTyping 
  } = useTyping()

  useEffect(() => {
    if (isStarted) {
      const handleKeyDown = (e: KeyboardEvent) => {
        handleKeyPress(e.key)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isStarted, handleKeyPress])

  const handleStart = () => {
    setIsStarted(true)
    resetTyping()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Button 
                onClick={handleStart}
                className="bg-green-400 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4"
              >
                Start typing
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between text-sm text-gray-600">
                <span>WPM: {wpm}</span>
                <span>Accuracy: {accuracy}%</span>
              </div>
              <div className="font-mono text-2xl leading-loose p-4 bg-gray-50 rounded-lg min-h-[100px]">
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
                        index === typedText.length ? 'border-r-2 border-blue-500' : ''
                      }`}
                    >
                      {char}
                    </span>
                  )
                })}
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleStart}
                  variant="outline"
                  className="text-gray-600"
                >
                  Reset
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Keyboard activeKey={currentKey} />
    </div>
  )
}

