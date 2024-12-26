'use client'

import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from "react"

export function CtaSection() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: isClient ? Math.random() * dimensions.width : 0,
    initialY: isClient ? Math.random() * dimensions.height : 0,
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2
  }))

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-pink-500 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Join the Typing Battle Today!
        </h2>
        <p className="text-xl text-white mb-8">
          Become a keyboard warrior and climb the ranks of the typing elite
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-orange-100 rounded-full shadow-lg"
          >
            Start Your Journey
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      {isClient && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-4 h-4 bg-white rounded-full opacity-50"
          initial={{ 
            x: particle.initialX,
            y: particle.initialY,
          }}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </section>
  )
}