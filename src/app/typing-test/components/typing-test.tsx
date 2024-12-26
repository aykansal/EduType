'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/src/components/ui/button"
import { TestInterface } from './test-interface'
import { ResultsModal } from './results-modal'
import { useTypingTest } from '../hooks/use-typing-test'
import Image from 'next/image'

export function TypingTest() {
  const [showResults, setShowResults] = useState(false)
  const { 
    isStarted,
    startTest,
    stats,
    resetTest
  } = useTypingTest()

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-16 h-16">
          <Image
            src="/placeholder.svg"
            alt="Mascot"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Typing Certification Test
          </h1>
          <p className="text-gray-600">
            Take a <span className="font-semibold">1 min</span> test and clarify your typing speed with{' '}
            <span className="text-blue-600 hover:underline cursor-pointer">
              English for Beginners
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Button 
                onClick={startTest}
                size="lg"
                className="bg-green-400 hover:bg-green-500 text-white font-semibold text-lg px-8 py-4"
              >
                Start Test
              </Button>
            </motion.div>
          ) : (
            <TestInterface onComplete={() => setShowResults(true)} />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
        >
          🎯 Remove ads
        </Button>
      </div>

      <AnimatePresence>
        {showResults && (
          <ResultsModal 
            stats={stats}
            onClose={() => {
              setShowResults(false)
              resetTest()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

