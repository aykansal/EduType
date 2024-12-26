'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/src/components/ui/card"
import { Sword, Star, LineChart, Zap, Sparkles, Users } from 'lucide-react'

const features = [
  {
    title: "Power Level Test",
    description: "Measure your typing speed and accuracy",
    icon: Zap,
    color: "bg-orange-500"
  },
  {
    title: "Training Grounds",
    description: "Level up your skills with guided exercises",
    icon: Sword,
    color: "bg-red-500"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement over time",
    icon: LineChart,
    color: "bg-pink-500"
  },
  {
    title: "Achievement Badges",
    description: "Earn badges for your typing prowess",
    icon: Star,
    color: "bg-yellow-500"
  },
  {
    title: "Special Techniques",
    description: "Learn advanced typing moves and combos",
    icon: Sparkles,
    color: "bg-purple-500"
  },
  {
    title: "Typing Guild",
    description: "Join a community of fellow keyboard warriors",
    icon: Users,
    color: "bg-blue-500"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
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
              <Card className="h-full hover:shadow-lg transition-shadow border-orange-100 overflow-hidden group">
                <CardContent className="p-6 relative">
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`p-3 rounded-xl ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

