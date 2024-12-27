'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function CertificateShowcase() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Get your own certificate
      </h2>
      <motion.div 
        className="relative h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full">
          <div className="relative w-full h-full">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  rotateY: `${(i - 1) * 15}deg`,
                  translateX: `${(i - 1) * 50}px`,
                  zIndex: 3 - i,
                }}
              >
                <Image
                  src="/placeholder.svg"
                  alt={`Certificate ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

