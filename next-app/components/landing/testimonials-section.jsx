'use client'

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sakura K.",
    role: "Typing Ninja",
    content: "EduType helped me reach over 9000 WPM! The training exercises are super effective!",
    image: "/placeholder.svg"
  },
  {
    name: "Naruto U.",
    role: "Speed Typer",
    content: "Believe it! This is the best way to level up your typing skills. The exercises are my new ninja way!",
    image: "/placeholder.svg"
  },
  {
    name: "Goku S.",
    role: "Keyboard Warrior",
    content: "The training is intense but rewarding. I've finally mastered the ultra typing instinct!",
    image: "/placeholder.svg"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tales from the Typing Guild
          </h2>
          <p className="text-xl text-gray-600">
            Hear from our legendary typists
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {/* <AvatarImage src={testimonial.image} /> */}
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {testimonial.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-purple-600">{testimonial.role}</div>
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

