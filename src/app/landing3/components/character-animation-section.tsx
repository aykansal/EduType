'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function CharacterAnimationSection() {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], ['-100%', '100%'])

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
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-orange-500 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0,
            }}
            animate={{ 
              y: window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}

