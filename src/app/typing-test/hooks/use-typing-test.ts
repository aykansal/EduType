'use client'

import { useState, useCallback, useEffect } from 'react'

const SAMPLE_TEXT = "The Sahara Desert is the largest hot desert in the world, covering an area of 3.6 million square miles. Despite its harsh environment, the Sahara is home to a"
const TEST_DURATION = 60 // seconds

export function useTypingTest() {
  const [text] = useState(SAMPLE_TEXT)
  const [typedText, setTypedText] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isComplete, setIsComplete] = useState(false)

  const calculateStats = useCallback(() => {
    if (!startTime) return

    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
    const wordsTyped = typedText.length / 5 // assume average word length of 5
    const newWpm = Math.round(wordsTyped / timeElapsed)

    const correctChars = typedText.split('').filter((char, i) => char === text[i]).length
    const newAccuracy = Math.round((correctChars / typedText.length) * 100) || 100

    setWpm(newWpm)
    setAccuracy(newAccuracy)
  }, [startTime, text, typedText])

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsComplete(true)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isStarted, timeLeft])

  useEffect(() => {
    if (typedText.length > 0 && !startTime) {
      setStartTime(Date.now())
    }
    calculateStats()
  }, [typedText, startTime, calculateStats])

  const handleKeyPress = useCallback((key: string) => {
    if (!isStarted || isComplete) return

    if (key.length === 1) {
      setTypedText(prev => {
        if (prev.length < text.length) {
          return prev + key
        }
        return prev
      })
    } else if (key === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1))
    }
  }, [text, isStarted, isComplete])

  const startTest = useCallback(() => {
    setIsStarted(true)
    setTimeLeft(TEST_DURATION)
    setTypedText('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
  }, [])

  const resetTest = useCallback(() => {
    setIsStarted(false)
    setTimeLeft(TEST_DURATION)
    setTypedText('')
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setIsComplete(false)
  }, [])

  return {
    text,
    typedText,
    timeLeft,
    wpm,
    accuracy,
    isStarted,
    isComplete,
    stats: {
      wpm,
      accuracy,
      characters: typedText.length
    },
    handleKeyPress,
    startTest,
    resetTest,
  }
}

