"use client"
import React, { useState, useEffect, useCallback } from "react"
import { generateWord } from "./utils/wordGenerator"

const GAME_DURATION = 30 // seconds
const BUBBLE_SPAWN_INTERVAL = 2000 // milliseconds

export default function TypingGame() {
  const [bubbles, setBubbles] = useState([])
  const [input, setInput] = useState("")
  const [scores, setScores] = useState([0, 0])
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gameOver, setGameOver] = useState(false)

  const spawnBubble = useCallback(() => {
    const newBubble = {
      id: Date.now(),
      word: generateWord(
        Math.random() < 0.5 ? "easy" : Math.random() < 0.8 ? "medium" : "hard"
      ),
      position: { x: Math.random() * 80 + 10, y: -10 },
      captured: false,
      capturedBy: null
    }
    setBubbles(prev => [...prev, newBubble])
  }, [])

  useEffect(() => {
    const spawnInterval = setInterval(spawnBubble, BUBBLE_SPAWN_INTERVAL)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          clearInterval(spawnInterval)
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(timer)
    }
  }, [spawnBubble])

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setBubbles(prev =>
        prev
          .map(bubble => ({
            ...bubble,
            position: { ...bubble.position, y: bubble.position.y + 0.5 }
          }))
          .filter(bubble => bubble.position.y < 100)
      )
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [bubbles])

  const handleInputChange = e => {
    const value = e.target.value.toLowerCase()
    setInput(value)

    const matchedBubbleIndex = bubbles.findIndex(
      bubble => bubble.word.toLowerCase() === value && !bubble.captured
    )
    if (matchedBubbleIndex !== -1) {
      const playerIndex = Math.floor(Math.random() * 2) // Simulate two players
      setBubbles(prev =>
        prev.map((bubble, index) =>
          index === matchedBubbleIndex
            ? { ...bubble, captured: true, capturedBy: playerIndex }
            : bubble
        )
      )
      setScores(prev =>
        prev.map((score, index) => (index === playerIndex ? score + 1 : score))
      )
      setInput("")
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-400 to-purple-500 w-full h-screen overflow-hidden">
      <div className="top-4 left-4 absolute font-bold text-2xl text-white">
        Time: {timeLeft}s
      </div>
      <div className="top-4 right-4 absolute font-bold text-2xl text-white">
        Player 1: {scores[0]} | Player 2: {scores[1]}
      </div>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute transition-all duration-300 ease-out ${
            bubble.captured ? "opacity-0 scale-150" : "opacity-100 scale-100"
          }`}
          style={{
            left: `${bubble.position.x}%`,
            top: `${bubble.position.y}%`,
            transform: `translate(-50%, -50%)`
          }}
        >
          <div
            className={`p-2 rounded-full ${
              bubble.captured
                ? bubble.capturedBy === 0
                  ? "bg-green-400"
                  : "bg-red-400"
                : "bg-white"
            }`}
          >
            {bubble.word}
          </div>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="bottom-8 left-1/2 absolute p-2 rounded w-64 text-lg transform -translate-x-1/2"
        placeholder="Type here..."
        disabled={gameOver}
      />
      {gameOver && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="mb-4 font-bold text-3xl">Game Over!</h2>
            <p className="text-xl">
              {scores[0] > scores[1]
                ? "Player 1 wins!"
                : scores[1] > scores[0]
                ? "Player 2 wins!"
                : "It's a tie!"}
            </p>
            <p className="mt-4">
              Player 1: {scores[0]} | Player 2: {scores[1]}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
