"use client"
import { motion } from "framer-motion"

export function PlayerStack({ player, maxSize }) {
  return (
    <div className="bg-gray-700 mx-2 p-4 rounded-lg w-1/2">
      <h3 className="mb-2 font-bold font-tech text-cyan-400 text-xl">
        {player.name}
      </h3>
      <div className="space-y-2">
        {Array.from({ length: maxSize }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-8 rounded-md ${
              index < player.stack.length ? "bg-cyan-600" : "bg-gray-600"
            }`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {index < player.stack.length && (
              <div className="flex justify-center items-center h-full font-mono text-white">
                {player.stack[index]}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
