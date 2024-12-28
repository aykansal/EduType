'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Competitor {
  id: number
  name: string
  wpm: number
  accuracy: number
}

interface BiddingSystemProps {
  competitors: Competitor[]
}

export function BiddingSystem({ competitors }: BiddingSystemProps) {
  const [bids, setBids] = useState<{ [key: number]: number }>({})

  const placeBid = (competitorId: number, amount: number) => {
    setBids(prevBids => ({
      ...prevBids,
      [competitorId]: (prevBids[competitorId] || 0) + amount
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6 border border-cyan-500"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-cyan-400 font-tech">Betting Terminal</h2>
      {competitors.map(competitor => (
        <motion.div
          key={competitor.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 bg-gray-700 rounded-lg p-4 shadow-md border border-gray-600"
        >
          <h3 className="text-xl font-bold mb-2 text-cyan-400 font-tech">{competitor.name}</h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Bet amount"
              min="1"
              className="w-24 bg-gray-600 border-gray-500 text-gray-100"
            />
            <Button onClick={() => placeBid(competitor.id, 10)} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              Place Bet
            </Button>
          </div>
          <div className="mt-2 text-lg font-semibold text-cyan-400 font-digital">
            Current Pool: ${bids[competitor.id] || 0}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

