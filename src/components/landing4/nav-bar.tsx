'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"

export function NavBar() {
  return (
    <motion.nav 
      className="w-full py-4 px-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
          EduType
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/typing-tutor" className="text-gray-600 hover:text-gray-900">
            Typing Tutor
          </Link>
          <Link href="/typing-test" className="text-gray-600 hover:text-gray-900">
            Typing Test
          </Link>
          <Link href="/learn" className="text-gray-600 hover:text-gray-900">
            Learn
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </motion.nav>
  )
}

