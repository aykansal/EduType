'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SakuraElements() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    initialX: isClient ? Math.random() * dimensions.width : 0,
    initialY: isClient ? Math.random() * dimensions.height : 0,
    duration: 4 + Math.random() * 2,
    delay: Math.random() * 2
  }))

  if (!isClient) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute w-3 h-3 ${
            element.id % 3 === 0 ? 'bg-pink-200' : 
            element.id % 3 === 1 ? 'bg-purple-200' : 
            'bg-fuchsia-200'
          } rounded-full transform rotate-45`}
          initial={{
            x: element.initialX,
            y: element.initialY,
            opacity: 0.3,
            scale: 0.5,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
            rotate: [45, 90, 45],
            opacity: [0.3, 0.6, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
          }}
          style={{
            left: element.left,
            top: element.top,
          }}
        />
      ))}
    </div>
  )
}