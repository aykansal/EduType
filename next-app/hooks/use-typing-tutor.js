"use client"

import { useState, useCallback, useEffect } from "react"

const SAMPLE_TEXT = "type me to find out how many words per minute you can type"

export function useTyping() {
  const [text] = useState(SAMPLE_TEXT)
  const [typedText, setTypedText] = useState("")
  const [startTime, setStartTime] = useState(null)
  const [currentKey, setCurrentKey] = useState(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  const calculateStats = useCallback(() => {
    if (!startTime) return

    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
    const wordsTyped = typedText.length / 5 // assume average word length of 5
    const newWpm = Math.round(wordsTyped / timeElapsed)

    const correctChars = typedText
      .split("")
      .filter((char, i) => char === text[i]).length
    const newAccuracy =
      Math.round((correctChars / typedText.length) * 100) || 100

    setWpm(newWpm)
    setAccuracy(newAccuracy)
  }, [startTime, text, typedText])

  useEffect(() => {
    if (typedText.length > 0 && !startTime) {
      setStartTime(Date.now())
    }
    calculateStats()
  }, [typedText, startTime, calculateStats])

  const handleKeyPress = useCallback(
    key => {
      if (key.length === 1) {
        setTypedText(prev => {
          if (prev.length < text.length) {
            return prev + key
          }
          return prev
        })
        setCurrentKey(key)
      } else if (key === "Backspace") {
        setTypedText(prev => prev.slice(0, -1))
        setCurrentKey(key)
      }
    },
    [text]
  )

  const resetTyping = useCallback(() => {
    setTypedText("")
    setStartTime(null)
    setCurrentKey(null)
    setWpm(0)
    setAccuracy(100)
  }, [])

  return {
    text,
    typedText,
    currentKey,
    wpm,
    accuracy,
    handleKeyPress,
    resetTyping
  }
}
