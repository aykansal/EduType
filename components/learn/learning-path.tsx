'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lock, Check, ArrowRight } from 'lucide-react'

const lessons = [
  {
    title: "Home Row Keys",
    description: "Master the foundation keys: ASDF JKL;",
    duration: "20 min",
    difficulty: "Beginner",
    status: "completed"
  },
  {
    title: "Top Row Introduction",
    description: "Learn the top row keys: QWERTY UIOP",
    duration: "25 min",
    difficulty: "Beginner",
    status: "in-progress"
  },
  {
    title: "Bottom Row Basics",
    description: "Practice with ZXCVBNM keys",
    duration: "25 min",
    difficulty: "Beginner",
    status: "locked"
  },
  {
    title: "Number Row",
    description: "Master typing numbers efficiently",
    duration: "30 min",
    difficulty: "Intermediate",
    status: "locked"
  }
]

export function LearningPath() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Path</h2>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {lesson.status === 'completed' ? (
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 grid place-items-center">
                        <Check className="w-5 h-5" />
                      </div>
                    ) : lesson.status === 'in-progress' ? (
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 grid place-items-center">
                        {index + 1}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 grid place-items-center">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                    <div className="text-xs text-gray-500">
                      Duration: {lesson.duration}
                    </div>
                  </div>
                  <Button 
                    variant={lesson.status === 'locked' ? 'ghost' : 'default'}
                    disabled={lesson.status === 'locked'}
                    className="gap-2"
                  >
                    {lesson.status === 'completed' ? 'Review' : 'Start'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

