'use client'

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"

export function GameHero() {
  return (
    <div className="bg-yellow-300 rounded-3xl mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl my-8 overflow-hidden">
      <div className="p-8 md:p-12 relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Is it possible? How to play and learn touch typing at the same time
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-8">
            Games are loved by adults and children. That's why Captain Ratatype has come up with a way to make typing lessons even more interesting and effective: just turn on the game mode!
          </p>
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Start typing with a game mode
          </Button>
        </div>

        {/* Animated characters */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="relative w-64 h-64">
            <motion.div
              className="absolute right-32 top-0"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-16 h-16 bg-brown-400 rounded-full" />
            </motion.div>
            <motion.div
              className="absolute right-16 top-8"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-20 h-20 bg-green-400 rounded-full" />
            </motion.div>
            <motion.div
              className="absolute right-0 bottom-8"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-14 h-14 bg-pink-300 rounded-full" />
            </motion.div>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <h2 className="font-mono text-4xl font-bold">rtt rtr</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

