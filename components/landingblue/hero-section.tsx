'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "./type-animation"

export function HeroSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-transparent bg-clip-text">
            Improve Your Typing Speed in Fun and Interactive Ways
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master touch typing with engaging lessons, real-time feedback, and track your progress
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Typing Test
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Lessons
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <TypeAnimation />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full animate-bounce" />
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-400 rounded-full animate-bounce delay-150" />
        </motion.div>
      </div>
    </section>
  )
}

