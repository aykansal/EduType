"use client"

import { useState, useCallback, useEffect } from "react"

export function useTypingGame(text, duration) {
  const [typedText, setTypedText] = useState("")
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  const startGame = useCallback(() => {
    setTypedText("")
    setTimeLeft(duration)
    setIsGameStarted(true)
    setWpm(0)
    setAccuracy(100)
  }, [duration])

  const handleKeyPress = useCallback(
    key => {
      if (isGameStarted && timeLeft > 0) {
        if (key === "Backspace") {
          setTypedText(prev => prev.slice(0, -1))
        } else if (key.length === 1) {
          setTypedText(prev => prev + key)
        }
      }
    },
    [isGameStarted, timeLeft]
  )

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isGameStarted, timeLeft])

  useEffect(() => {
    if (isGameStarted) {
      const wordsTyped = typedText.trim().split(" ").length
      const minutesElapsed = (duration - timeLeft) / 60
      const newWpm = Math.round(wordsTyped / minutesElapsed) || 0
      setWpm(newWpm)

      const correctChars = typedText
        .split("")
        .filter((char, i) => char === text[i]).length
      const newAccuracy =
        Math.round((correctChars / typedText.length) * 100) || 100
      setAccuracy(newAccuracy)
    }
  }, [typedText, timeLeft, isGameStarted, text, duration])

  return {
    typedText,
    accuracy,
    wpm,
    timeLeft,
    isGameStarted,
    startGame,
    handleKeyPress
  }
}
