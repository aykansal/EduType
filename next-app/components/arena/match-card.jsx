"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BidInput } from "./bid-input"
import { Keyboard, Zap } from "lucide-react"

export function MatchCard({ match, onBid }) {
  const [bidAmount, setBidAmount] = useState(1.22)

  const handleBid = playerId => {
    onBid(match.id, playerId, bidAmount)
  }

  const PlayerCard = ({ player, label }) => {
    const progressWidth = (player.wpm / 150) * 100

    return (
      <div className="relative flex-1 border-purple-500/20 hover:border-purple-500/40 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-4 border rounded-xl text-white transition-all group">
        <div className="-z-10 absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-xl" />

        <div className="flex justify-between items-center mb-3">
          <h3 className="font-gaming text-lg text-purple-300">{label}</h3>
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-purple-400" />
            <span className="font-gaming text-purple-300 text-sm">
              {player.wpm} WPM
            </span>
          </div>
        </div>

        <div className="relative bg-purple-950/50 mb-2 rounded-full w-full h-2 overflow-hidden">
          <div
            className="top-0 left-0 absolute bg-gradient-to-r from-purple-600 to-blue-500 h-full transition-all duration-1000"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-gaming text-sm text-yellow-400">
              Score: {player.score}
            </span>
          </div>
          {match.userBid?.playerId === player.id && (
            <Badge variant="gaming" className="animate-pulse">
              Your Bid: {match.userBid.amount} Edu
            </Badge>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="relative border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="-z-10 absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

      <div className="p-6">
        <h2 className="mb-4 font-gaming text-purple-300 text-xl">
          {match.name}
        </h2>

        <div className="flex justify-between items-center gap-6">
          <PlayerCard player={match.player1} label="Player 1" />
          <div className="flex flex-col items-center gap-2">
            <div className="font-gaming text-3xl text-purple-400">VS</div>
            <div className="bg-gradient-to-r from-transparent via-purple-500 to-transparent w-8 h-px" />
          </div>
          <PlayerCard player={match.player2} label="Player 2" />
        </div>

        <div className="flex justify-between items-center gap-4 mt-6 text-white">
          <Button
            variant="gaming"
            className="flex-1"
            onClick={() => handleBid(match.player1.id)}
            disabled={!!match.userBid}
          >
            {match.userBid?.playerId === match.player1.id
              ? "Bid Placed"
              : "Select Player 1"}
          </Button>

          <BidInput
            defaultValue={bidAmount}
            onChange={setBidAmount}
            className="w-32"
          />

          <Button
            variant="gaming"
            className="flex-1"
            onClick={() => handleBid(match.player2.id)}
            disabled={!!match.userBid}
          >
            {match.userBid?.playerId === match.player2.id
              ? "Bid Placed"
              : "Bid Player 2"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
