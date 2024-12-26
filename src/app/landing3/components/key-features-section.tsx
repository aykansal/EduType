'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"

const features = [
  {
    title: "Lightning-Fast Typing Tests",
    description: "Challenge yourself with our dynamic typing tests that adapt to your skill level.",
    progress: 75
  },
  {
    title: "Personalized Practice Lessons",
    description: "Improve your weaknesses with tailored lessons designed just for you.",
    progress: 60
  },
  {
    title: "Real-Time Performance Tracking",
    description: "Watch your typing speed and accuracy improve in real-time with detailed analytics.",
    progress: 90
  }
]

export function KeyFeaturesSection() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Supercharge Your Typing Skills
          </h2>
          <p className="text-xl text-gray-600">
            Unleash your full potential with these powerful features
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ scale }}
        >
          {features.map((feature, index) => (
            <Card key={feature.title} className="overflow-hidden group">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="relative">
                  <Progress value={feature.progress} className="h-2" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-75 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

