"use client"
import { motion } from "framer-motion"

export function VictoryScreen({ winner, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-90"
    >
      <div className="text-center">
        <motion.h2
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="mb-4 font-bold font-tech text-4xl text-cyan-400"
        >
          {winner.name} Wins!
        </motion.h2>
        <motion.p
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="mb-8 text-white text-xl"
        >
          Congratulations! You typed {winner.wordCount} words!
        </motion.p>
        <motion.button
          onClick={onRestart}
          className="bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-lg font-semibold font-tech text-lg text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  )
}
