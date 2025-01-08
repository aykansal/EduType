"use client"

import { useState, useCallback, useEffect } from "react"

export function useTyping(initialText, duration = null) {
  // Core state
  const [text] = useState(initialText)
  const [typedText, setTypedText] = useState("")
  const [startTime, setStartTime] = useState(null)
  const [currentKey, setCurrentKey] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)

  // Additional state for timed mode
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isGameStarted, setIsGameStarted] = useState(false)

  // Calculate typing statistics
  const calculateStats = useCallback(() => {
    if (!startTime || isGameOver) return

    // Calculate time elapsed, handling both timed and untimed modes
    const timeElapsed = duration
      ? (duration - timeLeft) / 60 // For timed mode
      : (Date.now() - startTime) / 1000 / 60 // For untimed mode

    // Calculate WPM
    const wordsTyped = typedText.length / 5 // assume average word length of 5
    const newWpm = Math.round(wordsTyped / timeElapsed) || 0

    // Calculate accuracy based on total attempts
    const totalAttemptCount = totalAttempts.reduce((sum, attempts) => sum + attempts, 0)
    const correctChars = typedText.length // Since typedText only contains correct characters
    const newAccuracy = Math.round((correctChars / Math.max(totalAttemptCount, 1)) * 100)

    setWpm(newWpm)
    setAccuracy(newAccuracy)
  }, [startTime, typedText, totalAttempts, duration, timeLeft, isGameOver])

  // Check for game over conditions
  useEffect(() => {
    if (isGameStarted && !isGameOver && 
        ((duration && timeLeft <= 0) || typedText.length === text.length)) {
      setIsGameOver(true)
      setIsGameStarted(false)
      // Calculate final stats
      calculateStats()
    }
  }, [isGameStarted, timeLeft, typedText.length, text.length, duration, isGameOver, calculateStats])

  // Handle key presses
  const handleKeyPress = useCallback(
    key => {
      // Don't process input if game hasn't started, is over, or time is up
      if (!isGameStarted || isGameOver) return
      if (duration && timeLeft <= 0) return

      if (key.length === 1) {
        const currentPosition = typedText.length

        if (currentPosition < text.length) {
          // Track attempts for accuracy calculation
          setTotalAttempts(prev => {
            const newAttempts = [...prev]
            if (!newAttempts[currentPosition]) {
              newAttempts[currentPosition] = 0
            }
            newAttempts[currentPosition]++
            return newAttempts
          })

          // Only advance if correct character is typed
          if (key === text[currentPosition]) {
            setTypedText(prev => prev + key)
          }
          setCurrentKey(key)
        }
      } else if (key === "Backspace") {
        setTypedText(prev => prev.slice(0, -1))
        setCurrentKey(key)
      }
    },
    [text, typedText, isGameStarted, timeLeft, duration, isGameOver]
  )

  // Timer effect for timed mode
  useEffect(() => {
    if (duration && isGameStarted && timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isGameStarted, timeLeft, duration, isGameOver])

  // Start time tracking effect
  useEffect(() => {
    if (typedText.length > 0 && !startTime && !isGameOver) {
      setStartTime(Date.now())
    }
    if (!isGameOver) {
      calculateStats()
    }
  }, [typedText, startTime, calculateStats, isGameOver])

  // Reset function
  const resetTyping = useCallback(() => {
    setTypedText("")
    setStartTime(null)
    setCurrentKey(null)
    setWpm(0)
    setAccuracy(0)
    setTotalAttempts([])
    setIsGameOver(false)
    setTimeLeft(duration)
    setIsGameStarted(false)
  }, [duration])

  // Start game function
  const startGame = useCallback(() => {
    resetTyping()
    setIsGameStarted(true)
  }, [resetTyping])

  return {
    text,
    typedText,
    currentKey,
    wpm,
    accuracy,
    timeLeft,
    isGameStarted,
    isGameOver,
    handleKeyPress,
    resetTyping,
    startGame,
    setIsGameStarted
  }
}