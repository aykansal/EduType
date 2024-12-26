'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Coins } from 'lucide-react'

export function GameModeExplanation() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px]"
        >
          <div className="absolute bottom-0 left-0 flex items-end space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Image
                    src="/placeholder.svg"
                    alt={`Character ${i}`}
                    width={60}
                    height={60}
                    className="mb-2"
                  />
                </motion.div>
                <div className="flex flex-col items-center">
                  {Array.from({ length: i * 2 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.2 + j * 0.1 }}
                    >
                      <Coins className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How game mode works on Ratatype
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              In the game mode, you can earn ratacoins by completing the exercises:
            </p>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <Coins className="w-5 h-5 text-yellow-400" />
                <span>typed a symbol — received a coin;</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <Coins className="w-5 h-5 text-yellow-400" />
                <span>received an exercise award — received a lot of coins;</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <Coins className="w-5 h-5 text-yellow-400" />
                <span>finished the lesson — got plenty of coins!</span>
              </motion.li>
            </ul>
            <p className="text-lg text-gray-600">
              And the more lessons you take, the more coins you get for rewards and for the end of the lesson ;)
            </p>
            <p className="text-lg text-gray-600">
              Of course, this is not real money, but Captain Ratatype took care of how it can be spent: you can replace the standard Paco hero with Cato, Froga, Dragy, or Alba! Just buy them :)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

