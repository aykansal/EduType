'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/src/components/ui/card"
import { Keyboard, Type, Zap, Gauge, Trophy, Sparkles } from 'lucide-react'

const categories = [
  {
    title: "Basic Lessons",
    description: "Learn proper finger placement and basic typing techniques",
    icon: Keyboard,
    color: "bg-blue-500",
    progress: 60
  },
  {
    title: "Speed Training",
    description: "Improve your typing speed with targeted exercises",
    icon: Zap,
    color: "bg-yellow-500",
    progress: 30
  },
  {
    title: "Accuracy Drills",
    description: "Focus on precision and reducing errors",
    icon: Type,
    color: "bg-green-500",
    progress: 45
  },
  {
    title: "Advanced Practice",
    description: "Challenge yourself with complex typing exercises",
    icon: Gauge,
    color: "bg-purple-500",
    progress: 15
  },
  {
    title: "Achievements",
    description: "Track your progress and earn certificates",
    icon: Trophy,
    color: "bg-pink-500",
    progress: 25
  },
  {
    title: "Special Lessons",
    description: "Practice numbers, symbols, and shortcuts",
    icon: Sparkles,
    color: "bg-indigo-500",
    progress: 10
  }
]

export function LessonCategories() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Choose your path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${category.color}`}
                        style={{ width: `${category.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {category.progress}% Complete
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

