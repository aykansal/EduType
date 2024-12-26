'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SeasonalBackground() {
  const [season, setSeason] = useState<'spring' | 'fall'>('spring')

  useEffect(() => {
    const interval = setInterval(() => {
      setSeason(prev => prev === 'spring' ? 'fall' : 'spring')
    }, 10000) // Change season every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 ${
            season === 'spring' 
              ? 'bg-pink-200 rounded-full' 
              : 'bg-orange-200 rotate-45'
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: 0,
          }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

