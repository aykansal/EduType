"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"

export function BiddingSystem({ competitors }) {
  const [bids, setBids] = useState({})
  const [amounts, setAmounts] = useState({})

  const placeBid = competitorId => {
    const amount = Number(amounts[competitorId]) || 0
    if (amount > 0) {
      setBids(prevBids => ({
        ...prevBids,
        [competitorId]: (prevBids[competitorId] || 0) + amount
      }))
      setAmounts(prev => ({ ...prev, [competitorId]: "" })) // Clear input
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur rounded-lg p-3 border border-cyan-500/50"
    >
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="text-cyan-400" size={18} />
        <h2 className="text-lg font-semibold text-cyan-400 font-tech">
          Quick Bet
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {competitors.map(competitor => (
          <div
            key={competitor.id}
            className="flex-1 min-w-[140px] bg-gray-700/50 rounded-lg p-2"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">
                {competitor.name}
              </span>
              <span className="text-xs font-digital text-cyan-400">
                ${bids[competitor.id] || 0}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                value={amounts[competitor.id] || ""}
                onChange={e =>
                  setAmounts({ ...amounts, [competitor.id]: e.target.value })
                }
                placeholder="Amount"
                className="text-sm"
              />
              <Button
                onClick={() => placeBid(competitor.id)}
                className="bg-cyan-500 text-white"
              >
                Bid
              </Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
