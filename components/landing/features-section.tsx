'use client'

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sword, Star, LineChart, Zap, Sparkles, Users } from 'lucide-react'

const features = [
  {
    title: "Training Grounds",
    description: "Master typing with guided exercises for all skill levels",
    icon: Sword,
    color: "bg-purple-500"
  },
  {
    title: "Swift Feedback",
    description: "Instant feedback on your typing technique",
    icon: Zap,
    color: "bg-pink-500"
  },
  {
    title: "Power Level Tracking",
    description: "Monitor your progress with detailed stats",
    icon: LineChart,
    color: "bg-indigo-500"
  },
  {
    title: "Achievement Badges",
    description: "Collect badges as you level up your skills",
    icon: Star,
    color: "bg-violet-500"
  },
  {
    title: "Special Techniques",
    description: "Learn advanced typing moves and combos",
    icon: Sparkles,
    color: "bg-fuchsia-500"
  },
  {
    title: "Typing Guild",
    description: "Join fellow typists in friendly competitions",
    icon: Users,
    color: "bg-purple-500"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Your Typing Powers
          </h2>
          <p className="text-xl text-gray-600">
            Master these techniques to become a typing legend
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

