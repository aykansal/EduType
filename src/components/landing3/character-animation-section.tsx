'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export function CharacterAnimationSection() {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], ['-100%', '100%'])
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
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 2
  }))

  return (
    <section className="py-20 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ x }}
          className="flex items-center justify-center"
        >
          <Image
            src="/placeholder.svg"
            alt="Goku running"
            width={300}
            height={200}
            className="object-contain"
          />
        </motion.div>
      </div>
      {isClient && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-4 h-4 bg-orange-500 rounded-full"
              initial={{ 
                x: particle.initialX,
                y: -20,
                opacity: 0,
              }}
              animate={{ 
                y: dimensions.height,
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}