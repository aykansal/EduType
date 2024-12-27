'use client'

import { Share2, Award, RotateCcw } from 'lucide-react'
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

interface ResultsModalProps {
  stats: {
    wpm: number
    accuracy: number
    characters: number
  }
  onClose: () => void
}

export function ResultsModal({ stats, onClose }: ResultsModalProps) {
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Results</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.wpm}</div>
              <div className="text-sm text-gray-600">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.characters}</div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button className="w-full gap-2">
              <Award className="w-4 h-4" />
              Get Certificate
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Share Result
            </Button>
            <Button 
              variant="ghost" 
              className="w-full gap-2"
              onClick={onClose}
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

