import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameOverDialogProps {
  isOpen: boolean;
  onClose: () => void;
  wpm: number;
  accuracy: number;
  onGenerateCertificate: () => Promise<string>;
}

const GameOverDialog = ({
  isOpen,
  onClose,
  wpm,
  accuracy,
  onGenerateCertificate,
}: GameOverDialogProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchCertificate = async () => {
        const image = await onGenerateCertificate();
        setImageUrl(image?.split("public")[0]);
      };
      fetchCertificate();
    }
  }, [isOpen, onGenerateCertificate]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
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
          <div className="text-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Certificate" className="w-full h-auto" />
            ) : (
              <p className="text-black" >Loading certificate...</p>
            )}
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Try Again
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
