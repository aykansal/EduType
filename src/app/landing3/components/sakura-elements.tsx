'use client'

import { motion } from "framer-motion"

export function SakuraElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 ${
            i % 3 === 0 ? 'bg-pink-200' : i % 3 === 1 ? 'bg-purple-200' : 'bg-fuchsia-200'
          } rounded-full transform rotate-45`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

