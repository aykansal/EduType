'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Sparkles } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Begin Your Typing Adventure!
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of typing heroes who have mastered the art of swift keystrokes
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 gap-2 bg-purple-600 hover:bg-purple-700"
          >
            Start Your Training
            <Sparkles className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

