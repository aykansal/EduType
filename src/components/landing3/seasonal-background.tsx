'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SeasonalBackground() {
  const [season, setSeason] = useState<'spring' | 'fall'>('spring')
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

    const seasonInterval = setInterval(() => {
      setSeason(prev => prev === 'spring' ? 'fall' : 'spring')
    }, 10000)

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(seasonInterval)
    }
  }, [])

  if (!isClient) {
    return null
  }

  const elements = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    initialX: Math.random() * dimensions.width,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 5
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute w-4 h-4 ${
            season === 'spring' 
              ? 'bg-pink-200 rounded-full' 
              : 'bg-orange-200 rotate-45'
          }`}
          initial={{
            x: element.initialX,
            y: -20,
            opacity: 0,
          }}
          animate={{ 
            y: dimensions.height + 20,
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}
    </div>
  )
}