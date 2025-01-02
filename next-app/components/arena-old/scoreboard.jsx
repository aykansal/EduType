"use client"
import { motion } from "framer-motion"

export function Scoreboard({ competitors }) {
  const sortedCompetitors = [...competitors].sort((a, b) => b.wpm - a.wpm)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6 border border-cyan-500"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-cyan-400 font-tech">
        Leaderboard
      </h2>
      <div className="space-y-4">
        {sortedCompetitors.map((competitor, index) => (
          <motion.div
            key={competitor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600"
          >
            <div className="flex items-center">
              <span className="text-3xl font-bold mr-4 text-cyan-400 font-digital">
                #{index + 1}
              </span>
              <span className="text-xl font-semibold text-gray-100 font-tech">
                {competitor.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-400 font-digital">
                {competitor.wpm} WPM
              </div>
              <div className="text-sm font-medium text-gray-300 font-mono">
                {competitor.accuracy}% Accuracy
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
