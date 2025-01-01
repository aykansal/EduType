'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, BadgeIcon as Certificate } from 'lucide-react'

const mockScores = [
  { name: 'Alice', wpm: 75, accuracy: 98, date: '2023-06-15' },
  { name: 'Bob', wpm: 68, accuracy: 95, date: '2023-06-14' },
  { name: 'Charlie', wpm: 82, accuracy: 97, date: '2023-06-13' },
  { name: 'Diana', wpm: 70, accuracy: 96, date: '2023-06-12' },
  { name: 'Ethan', wpm: 65, accuracy: 94, date: '2023-06-11' },
]

const mockCertificates = [
  { name: 'Typing Master', level: 'Advanced', date: '2023-05-20' },
  { name: 'Speed Demon', level: 'Intermediate', date: '2023-04-15' },
  { name: 'Accuracy Pro', level: 'Beginner', date: '2023-03-10' },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('scores')

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="scores">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {mockScores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-black font-semibold">{score.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{score.wpm} WPM</span>
                  <span className="mx-2">|</span>
                  <span>{score.accuracy}% accuracy</span>
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="certificates">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {mockCertificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <Certificate className="w-5 h-5 text-blue-500" />
                  <div>
                    <span className="font-semibold text-black">{cert.name}</span>
                    <p className="text-xs text-gray-500">{cert.level}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {cert.date}
                </div>
              </motion.div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

