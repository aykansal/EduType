'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  "Welcome to EduType!",
  "Learn to type faster...",
  "Practice makes perfect!",
  "Start your journey today!"
]

export function TypeAnimation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const word = words[currentWordIndex]
    
    if (isTyping) {
      if (currentText.length < word.length) {
        const timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText.length === 0) {
        const nextIndex = (currentWordIndex + 1) % words.length
        setCurrentWordIndex(nextIndex)
        setIsTyping(true)
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentText, currentWordIndex, isTyping])

  return (
    <div className="h-32 flex items-center justify-center">
      <div className="font-mono text-2xl">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-block"
          >
            {currentText}
          </motion.span>
        </AnimatePresence>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-6 bg-blue-500 ml-1"
        />
      </div>
    </div>
  )
}

