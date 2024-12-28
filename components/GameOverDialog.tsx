import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Download } from "lucide-react";

interface GameOverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  onGenerateCertificate: () => void;
}

const GameOverDialog = ({
  isOpen,
  onClose,
  wpm,
  accuracy,
  onGenerateCertificate,
}: GameOverDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Game Over!
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">{wpm}</div>
              <div className="text-sm text-gray-500">Words per minute</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {accuracy}%
              </div>
              <div className="text-sm text-gray-500">Accuracy</div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            {getPerformanceMessage(wpm, accuracy)}
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
          <Button
            onClick={onGenerateCertificate}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Generate Certificate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getPerformanceMessage = (wpm: number, accuracy: number): string => {
  if (wpm >= 60 && accuracy >= 95) {
    return "Outstanding! You're a typing master! 🏆";
  } else if (wpm >= 40 && accuracy >= 90) {
    return "Great job! Keep practicing to improve further! 🌟";
  } else if (wpm >= 20 && accuracy >= 80) {
    return "Good effort! Regular practice will help you type faster! 💪";
  }
  return "Keep practicing! You'll get better with time! 😊";
};

export default GameOverDialog;
