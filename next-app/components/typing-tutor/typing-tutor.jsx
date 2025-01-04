"use client";

import { Keyboard } from "./keyboard";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTyping } from "@/hooks/use-typing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";

const GameOverDialog = dynamic(() => import("../GameOverDialog"), {
  loading: () => <div>Loading...</div>,
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

export function TypingTutor() {
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const {
    text,
    typedText,
    currentKey,
    accuracy,
    wpm,
    handleKeyPress,
    resetTyping,
  } = useTyping();
  const account = useActiveAccount();
  useEffect(() => {
    if (isStarted) {
      const handleKeyDown = (e) => {
        handleKeyPress(e.key);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isStarted, handleKeyPress]);

  const handleGenerateCertificate = useCallback(async () => {
    // if (certificateGenerated) return ""; // Skip if already generated

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-certificate`,
        {
          params: {
            walletAddress: account?.address,
            wpm: wpm.toString(),
            accuracy: accuracy.toString(),
          },
        }
      );
      setCertificateGenerated(true);
      // const imagesArr = response?.data?.images;
      // return imagesArr ? imagesArr[0] : "";
      return response?.data?.certificate?.url;
    } catch (error) {
      console.error("Error generating certificate:", error?.response?.data);
      return "";
    }
  }, [accuracy, wpm, certificateGenerated]);

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

  const handleStart = () => {
    setIsStarted(true);
    setIsGameOver(false);
    setCertificateGenerated(false);
    resetTyping();
  };

  return (
    <div className="mx-auto max-w-4xl">
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
                <Button
                  onClick={handleStart}
                  variant="outline"
                  className="text-gray-600"
                >
                  Reset
                </Button>
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

// const handleGenerateCertificate = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:3001/user/generate-pdf-certificate/0xakjdfsjfsk1/certificate`
//       // {
//       //   responseType: "blob",
//       // }
//     );
//     // const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//     // const pdfUrl = URL.createObjectURL(pdfBlob);
//     // const link = document.createElement("a");
//     // link.href = pdfUrl;
//     // link.setAttribute("download", `${walletAddress}.pdf`);
//     // document.body.appendChild(link);
//     // link.click();
//     // link.remove();
//     // console.log(pdfUrl);
//     const imagesArr = response?.data?.images;
//     return imagesArr[0];
//   } catch (error) {
//     console.error("Error generating certificate:", error);
//   }
// };
