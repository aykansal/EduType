'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function NavBar() {
  return (
    <motion.nav 
      className="w-full py-4 px-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          EduType
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/learn" className="text-gray-600 hover:text-purple-600 transition-colors">
            Learn
          </Link>
          <Link href="/typing-tutor" className="text-gray-600 hover:text-purple-600 transition-colors">
            Typing Tutor
          </Link>
          <Link href="/typing-test" className="text-gray-600 hover:text-purple-600 transition-colors">
            Typing Test
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
            About
          </Link>
          <Link href="/arena" className="text-gray-600 hover:text-purple-600 transition-colors">
            Arena
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hover:text-purple-600">Log in</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Join the Guild</Button>
        </div>
      </div>
    </motion.nav>
  )
}

