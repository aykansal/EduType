"use client"
import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const getRankColor = index => {
  switch (index) {
    case 0:
      return "text-yellow-400"
    case 1:
      return "text-gray-400"
    case 2:
      return "text-amber-600"
    default:
      return "text-gray-500"
  }
}

export function LeaderboardDrawer({
  isOpen,
  onClose,
  players,
  globalRankings
}) {
  const [animatedPlayers, setAnimatedPlayers] = useState(players)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPlayers(prev =>
        prev
          .map(player => ({
            ...player,
            wpm: player.wpm + Math.floor(Math.random() * 5 - 2), // Random WPM change between -2 and +2
            score: player.score + Math.floor(Math.random() * 10)
          }))
          .sort((a, b) => b.score - a.score)
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const PlayerRankingItem = ({ player, index }) => {
    const progressWidth = (player.wpm / 150) * 100 // Assuming max WPM is 150

    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center space-x-4 hover:bg-white/5 p-4"
      >
        <span className={`text-2xl font-bold w-8 ${getRankColor(index)}`}>
          {index + 1}
        </span>
        <div className="border-2 border-white/10 rounded-full w-12 h-12 overflow-hidden">
          <img
            src={`/placeholder.svg?height=48&width=48&text=${player.name[0]}`}
            alt={player.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-white truncate">{player.name}</p>
            <p className="text-sm text-yellow-400">{player.score} pts</p>
          </div>
          <div className="relative bg-white/10 rounded-full w-full h-2">
            <motion.div
              className="top-0 left-0 absolute bg-cyan-400 rounded-full h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="mt-1 text-white/60 text-xs">
            level {Math.floor(player.score / 100)}
          </p>
        </div>
      </motion.div>
    )
  }

  const GlobalRankingItem = ({ ranking, index }) => {
    const progressWidth = (ranking.wpm / 150) * 100

    return (
      <div className="relative flex items-center space-x-4 hover:bg-white/5 p-4">
        <span className={`text-2xl font-bold w-8 ${getRankColor(index)}`}>
          {index + 1}
        </span>
        <div className="border-2 border-white/10 rounded-full w-12 h-12 overflow-hidden">
          <img
            src={`/placeholder.svg?height=48&width=48&text=${ranking.playerName[0]}`}
            alt={ranking.playerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <p className="font-medium text-white truncate">
              {ranking.playerName}
            </p>
            <p className="text-sm text-yellow-400">{ranking.wpm} WPM</p>
          </div>
          <div className="relative bg-white/10 rounded-full w-full h-2">
            <div
              className="top-0 left-0 absolute bg-cyan-400 rounded-full h-full"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <p className="mt-1 text-white/60 text-xs">
            level {Math.floor(ranking.score / 100)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-[#0f1729] border-l-white/10 w-[400px] sm:w-[540px]">
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7z" />
                </svg>
              </span>
              <SheetTitle className="text-white">
                Friends Leaderboard
              </SheetTitle>
            </div>
            <Menu className="w-5 h-5 text-white" />
          </div>
        </SheetHeader>
        <Tabs defaultValue="match" className="mt-6">
          <TabsList className="bg-white/10 w-full">
            <TabsTrigger
              value="match"
              className="flex-1 data-[state=active]:bg-white/20 text-white"
            >
              Match Rankings
            </TabsTrigger>
            <TabsTrigger
              value="global"
              className="flex-1 data-[state=active]:bg-white/20 text-white"
            >
              Global Rankings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="match">
            <ScrollArea className="pr-4 h-[600px]">
              <AnimatePresence>
                {animatedPlayers.map((player, index) => (
                  <PlayerRankingItem
                    key={player.id}
                    player={player}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="global">
            <ScrollArea className="pr-4 h-[600px]">
              {globalRankings
                .sort((a, b) => b.wpm - a.wpm)
                .map((ranking, index) => (
                  <GlobalRankingItem
                    key={ranking.playerId}
                    ranking={ranking}
                    index={index}
                  />
                ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
