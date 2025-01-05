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
import confetti from "canvas-confetti";
import MintCertificate from "@/components/satyansh-components/MintCertificate";

const GameOverDialog = ({
  isOpen,
  onClose,
  wpm,
  accuracy,
  onGenerateCertificate,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificate = async () => {
    if (!isOpen) return; // Don't fetch if dialog isn't open

    setIsLoading(true);
    setError(null);
    try {
      const imageResponse = await onGenerateCertificate();
      if (imageResponse) {
        // Assuming the server is running on localhost:5000
        // const fullImageUrl = `http://localhost:5000/${imageResponse}`;
        setImageUrl(imageResponse);
      } else {
        setError("Failed to generate certificate");
      }
    } catch (err) {
      setError("Error generating certificate");
      console.error("Certificate generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    // Import and start confetti when image loads
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });
  };


  useEffect(() => {
    if (isOpen) {
      fetchCertificate();
    } else {
      // Reset states when dialog closes
      setImageUrl("");
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Game Over!
          </DialogTitle>
        </DialogHeader>
        <div className="gap-6 grid py-4">
          <div className="gap-4 grid grid-cols-2 text-center">
            <div className="space-y-2">
              <div className="font-bold text-3xl text-blue-600">{wpm}</div>
              <div className="text-gray-500 text-sm">Words per minute</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-3xl text-green-600">
                {accuracy}%
              </div>
              <div className="text-gray-500 text-sm">Accuracy</div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            {getPerformanceMessage(wpm, accuracy)}
          </div>
          <div className="text-center">
            {isLoading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="border-b-2 border-blue-500 rounded-full w-6 h-6 animate-spin"></div>
                <p className="text-gray-600">Generating certificate...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : imageUrl ? (
              (
                <div className="relative shadow-lg rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Certificate" 
                  className="w-full h-auto"
                  onError={() => setError("Failed to load certificate image")}
                  onLoad={handleImageLoad}
                />
              </div>
              )
            ) : null}
          </div>
        </div>
        <DialogFooter className="sm:flex-row flex-col gap-2 justify-center items-center">
          <MintCertificate image={""} name={""} description={""}/>

          <Button onClick={onClose} className="w-full sm:w-auto">
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getPerformanceMessage = (wpm, accuracy) => {
  if (wpm >= 60 && accuracy >= 95) {
    return "Outstanding! You're a typing master! 🏆";
  } else if (wpm >= 40 && accuracy >= 90) {
    return "Great job! Keep practice to improve further! 🌟";
  } else if (wpm >= 20 && accuracy >= 80) {
    return "Good effort! Regular practice will help you type faster! 💪";
  }
  return "Keep practicing! You'll get better with time! 😊";
};

export default GameOverDialog;
