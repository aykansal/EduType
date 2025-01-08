"use client"
import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

export function ModularKeyboard({
  onKeyPress,
  disabled = false,
  sampleText,
  typedText
}) {
  const [currentKey, setCurrentKey] = useState(null)

  const handleKeyDown = useCallback(
    e => {
      if (!disabled) {
        setCurrentKey(e.key)
        onKeyPress(e.key)
      }
    },
    [disabled, onKeyPress]
  )

  const handleKeyUp = useCallback(() => {
    setCurrentKey(null)
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const keyboardLayout = [
    [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "Backspace"
    ],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
    ["Shift-L", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift-R"],
    ["Space"]
  ]

  return (
    <div className="mt-4">
      <div className="relative bg-gray-700 mb-4 p-4 rounded-lg min-h-[100px] font-mono text-lg leading-relaxed">
        {sampleText.split("").map((char, index) => (
          <span
            key={index}
            className={`${
              index < typedText.length
                ? typedText[index] === char
                  ? "text-green-400"
                  : "text-red-400"
                : "text-gray-400"
            } ${
              index === typedText.length
                ? "border-r-2 border-cyan-400 animate-pulse"
                : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="bg-gray-800 p-4 rounded-lg select-none">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map(key => {
              const isActive = currentKey?.toLowerCase() === key.toLowerCase()
              const displayKey =
                key === "Shift-L" || key === "Shift-R" ? "Shift" : key
              return (
                <motion.div
                  key={key}
                  className={`
                    ${isActive ? "bg-cyan-600" : "bg-gray-700"}
                    ${
                      disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    m-1 rounded-md flex items-center justify-center text-white font-semibold shadow-md
                    ${
                      key === "Space"
                        ? "w-64"
                        : key.length > 1
                        ? "w-16"
                        : "w-10"
                    } h-10
                  `}
                  whileHover={!disabled ? { scale: 1.05 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                >
                  {displayKey}
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
