'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Keyboard, Trophy, LineChart, Zap, Sparkles, Users } from 'lucide-react'

const features = [
  {
    title: "Interactive Lessons",
    description: "Learn with guided exercises designed for all skill levels",
    icon: Keyboard,
    color: "bg-blue-500"
  },
  {
    title: "Real-time Feedback",
    description: "Get instant feedback on your typing accuracy and speed",
    icon: Zap,
    color: "bg-yellow-500"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed statistics",
    icon: LineChart,
    color: "bg-green-500"
  },
  {
    title: "Achievements",
    description: "Earn badges and certificates as you improve",
    icon: Trophy,
    color: "bg-purple-500"
  },
  {
    title: "Game Modes",
    description: "Make learning fun with typing games and challenges",
    icon: Sparkles,
    color: "bg-pink-500"
  },
  {
    title: "Community",
    description: "Join others and participate in typing competitions",
    icon: Users,
    color: "bg-cyan-500"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to type faster
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive tools and features to improve your typing skills
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
              <Card className="h-full hover:shadow-lg transition-shadow">
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

