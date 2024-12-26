'use client'

import { motion } from "framer-motion"
import { Flame, Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">EduType</h3>
          <p className="text-gray-400">Unleash your typing potential and become a keyboard warrior!</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Typing Test</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lessons</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Leaderboard</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center"
              >
                <Flame className="w-6 h-6" />
              </motion.div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <motion.div
                whileHover={{ scale: 1.2, rotate: -15 }}
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"
              >
                <Leaf className="w-6 h-6" />
              </motion.div>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2023 EduType. All rights reserved.</p>
      </div>

      {/* Seasonal elements */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
        animate={{ 
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  )
}

