'use client'

import { motion } from "framer-motion"
import { TypeAnimation } from "./type-animation"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-transparent bg-clip-text">
            Level Up Your Typing Skills!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join the typing dojo and master the art of swift keystrokes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 bg-purple-600 hover:bg-purple-700"
            >
              Begin Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              View Training Grounds
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
            <TypeAnimation />
          </div>
          
          {/* Anime-style decorative elements */}
          <motion.div 
            className="absolute -top-12 -left-12 w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/placeholder.svg"
              alt="Magical circle"
              width={96}
              height={96}
              className="opacity-50"
            />
          </motion.div>
          <motion.div 
            className="absolute -bottom-12 -right-12 w-24 h-24"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/placeholder.svg"
              alt="Magical circle"
              width={96}
              height={96}
              className="opacity-50"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

