"use client"
import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export function WordBubble({ word, containerRef }) {
  const controls = useAnimation()
  const bubbleRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (containerRef.current && bubbleRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const bubbleRect = bubbleRef.current.getBoundingClientRect()

      const maxX = containerRect.width - bubbleRect.width
      const maxY = containerRect.height - bubbleRect.height

      const randomX = Math.random() * maxX
      const randomY = Math.random() * maxY

      setPosition({ x: randomX, y: randomY })
    }
  }, [containerRef])

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (containerRef.current && bubbleRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const bubbleRect = bubbleRef.current.getBoundingClientRect()

        const maxX = containerRect.width - bubbleRect.width
        const maxY = containerRect.height - bubbleRect.height

        const newX = Math.max(
          0,
          Math.min(position.x + (Math.random() - 0.5) * 50, maxX)
        )
        const newY = Math.max(
          0,
          Math.min(position.y + (Math.random() - 0.5) * 50, maxY)
        )

        setPosition({ x: newX, y: newY })
        controls.start({ x: newX, y: newY, transition: { duration: 2 } })
      }
    }, 2000)

    return () => clearInterval(moveInterval)
  }, [controls, position, containerRef])

  return (
    <motion.div
      ref={bubbleRef}
      className="absolute bg-cyan-600 px-4 py-2 rounded-full font-tech text-white"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ ...position, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
    >
      {word}
    </motion.div>
  )
}
