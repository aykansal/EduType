"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { Keyboard } from "./keyboard";
import { useTyping } from "@/hooks/use-typing";
import { Button } from "@/components/ui/button";
import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect, useCallback } from "react";

const GameOverDialog = dynamic(() => import("@/components/GameOverDialog"), {
  // loading: () => <div>Loading...</div>,
  ssr: false,
});

const Fade = ({ children, show }) => (
  <div
    className={`transition-opacity duration-200 ${
      show ? "opacity-100" : "opacity-0"
    }`}
  >
    {children}
  </div>
);
const SAMPLE_TEXT =
  "The quick ";

export function TypingTutor() {
  const account = useActiveAccount();
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const {
    wpm,
    text,
    accuracy,
    typedText,
    currentKey,
    resetTyping,
    handleKeyPress,
  } = useTyping(SAMPLE_TEXT); // Untimed mode

  const handleGenerateCertificate = useCallback(async () => {
    // if (certificateGenerated) return ""; // Skip if already generated

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate/generate`,
        {
          params: {
            walletAddress: account?.address,
            wpm: wpm.toString(),
            accuracy: accuracy.toString(),
          },
        }
      );
      setCertificateGenerated(true);
      return response?.data?.certificate?.url;
    } catch (error) {
      console.error("Error generating certificate:", error?.response?.data);
      return "";
    }
  }, [accuracy, wpm, certificateGenerated]);

  const handleStart = () => {
    setIsStarted(true);
    setIsGameOver(false);
    setCertificateGenerated(false);
    resetTyping();
  };

  const preventSpaceScroll = (e) => {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (
      typedText.length === text.length &&
      typedText.length > 0 &&
      !isGameOver
    ) {
      setIsGameOver(true);
      setIsStarted(false);
    }
  }, [typedText, text, isGameOver]);

  useEffect(() => {
    if (isStarted) {
      const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.code === "Space" || e.key === " ") e.preventDefault();
        handleKeyPress(e.key);
      };
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keydown", preventSpaceScroll);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keydown", preventSpaceScroll);
      };
    }
  }, [isStarted, handleKeyPress]);

  return (
    <div className="mx-auto max-w-4xl overflow-hidden">
      <div className="bg-white shadow-lg mb-8 p-8 rounded-2xl">
        {!isStarted ? (
          <Fade show={!isStarted}>
            <div className="text-center">
              <Button
                onClick={handleStart}
                className="bg-green-400 hover:bg-green-500 px-8 py-4 font-semibold text-lg text-white"
              >
                Start typing
              </Button>
            </div>
          </Fade>
        ) : (
          <Fade show={isStarted}>
            <div className="space-y-6">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>WPM: {wpm}</span>
                <span>Accuracy: {accuracy}%</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg min-h-[100px] font-mono text-2xl leading-loose">
                {text.split("").map((char, index) => {
                  const isTyped = index < typedText.length;
                  const isCorrect = char === typedText[index];
                  return (
                    <span
                      key={index}
                      className={`${
                        isTyped
                          ? isCorrect
                            ? "text-green-500"
                            : "text-red-500"
                          : "text-gray-900"
                      } ${
                        index === typedText.length &&
                        "border-r-2 border-blue-500"
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
              <div className="flex justify-end">
                {/* <Button
                  onClick={handleStart}
                  variant="outline"
                  className="text-gray-600"
                >
                  Reset
                </Button> */}
              </div>
            </div>
          </Fade>
        )}
      </div>
      <Keyboard activeKey={currentKey} />
      {isGameOver && (
        <GameOverDialog
          isOpen={isGameOver}
          onClose={() => {
            setIsGameOver(false);
            handleStart();
          }}
          wpm={wpm}
          accuracy={accuracy}
          onGenerateCertificate={handleGenerateCertificate}
        />
      )}
    </div>
  );
}
