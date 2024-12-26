'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"

export function NavBar() {
  return (
    <motion.nav 
      className="w-full py-4 px-6 z-50 relative"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
          EduType
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/typing-test" className="text-gray-800 hover:text-orange-600 transition-colors">
            Power Level Test
          </Link>
          <Link href="/learn" className="text-gray-800 hover:text-orange-600 transition-colors">
            Training Arc
          </Link>
          <Link href="/leaderboard" className="text-gray-800 hover:text-orange-600 transition-colors">
            Leaderboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hover:text-orange-600">Log in</Button>
          <Button className="bg-orange-600 hover:bg-orange-700">Join the Guild</Button>
        </div>
      </div>
    </motion.nav>
  )
}

