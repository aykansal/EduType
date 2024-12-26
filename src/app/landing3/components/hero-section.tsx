'use client'

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-transparent bg-clip-text">
            Unleash Your Inner Power and Master Your Typing Speed!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Join the ultimate typing dojo and become a keyboard warrior!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-orange-600 hover:bg-orange-700 rounded-full shadow-lg"
            >
              Start Typing Test
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <Image
            src="/placeholder.svg"
            alt="Goku typing"
            width={800}
            height={600}
            className="rounded-xl shadow-2xl"
          />
          
          {/* Flame effects */}
          <motion.div 
            className="absolute -top-10 -left-10 w-40 h-40"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Image
              src="/placeholder.svg"
              alt="Flame effect"
              width={160}
              height={160}
              className="opacity-75"
            />
          </motion.div>
          <motion.div 
            className="absolute -bottom-10 -right-10 w-40 h-40"
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Image
              src="/placeholder.svg"
              alt="Flame effect"
              width={160}
              height={160}
              className="opacity-75"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

