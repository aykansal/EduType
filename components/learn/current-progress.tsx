'use client'

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'

export function CurrentProgress() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Continue your journey</h1>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Current Lesson: Home Row Keys</span>
                <span className="text-blue-600">75% Complete</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <p className="text-gray-600">
              Master the foundation of touch typing with the home row keys (ASDF JKL;)
            </p>
            <Button className="gap-2">
              <PlayCircle className="w-5 h-5" />
              Continue Lesson
            </Button>
          </div>
        </div>
        <motion.div 
          className="relative h-48 md:h-64"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-6xl font-mono space-x-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                  className="text-blue-500"
                >
                  A
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.2 }}
                  className="text-purple-500"
                >
                  S
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.4 }}
                  className="text-pink-500"
                >
                  D
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                  className="text-blue-500"
                >
                  F
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

