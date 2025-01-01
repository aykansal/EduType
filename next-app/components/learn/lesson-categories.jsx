"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Keyboard, Zap, Trophy } from "lucide-react";

const categories = [
  {
    title: "Beginner",
    description: "Start your typing journey with basic lessons and exercises",
    icon: Keyboard,
    color: "bg-green-500",
    progress: 0,
  },
  {
    title: "Intermediate",
    description:
      "Improve your speed and accuracy with more challenging content",
    icon: Zap,
    color: "bg-blue-500",
    progress: 0,
  },
  {
    title: "Advanced",
    description: "Master complex typing skills and techniques",
    icon: Trophy,
    color: "bg-purple-500",
    progress: 0,
  },
];

export function LessonCategories() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Choose your skill level</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
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
  );
}
