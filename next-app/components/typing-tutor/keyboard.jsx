// "use client"
import { motion } from "framer-motion"
import { keyboardLayout, keyColors } from "@/lib/data"

export function Keyboard({ activeKey }) {
  return (
    <div className="relative">
      <div className="bg-white shadow-lg p-6 rounded-3xl">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 mb-1">
            {row.map(key => {
              const isActive = activeKey?.toLowerCase() === key.toLowerCase()
              const baseColor = keyColors[key.toLowerCase()] || "bg-gray-100"
              return (
                <motion.div
                  key={key}
                  className={`
                    ${baseColor}
                    relative h-12 rounded-lg flex items-center justify-center
                    ${
                      key === "Backspace"
                        ? "w-20"
                        : key === "Tab"
                        ? "w-16"
                        : key === "Caps"
                        ? "w-20"
                        : key === "Enter"
                        ? "w-20"
                        : key === "Shift"
                        ? "w-24"
                        : "w-12"
                    }
                    ${isActive ? "ring-2 ring-blue-500 shadow-lg" : "shadow"}
                  `}
                  animate={isActive ? { scale: 0.95 } : { scale: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="font-medium text-gray-700 text-sm">
                    {key}
                  </span>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
      {/* Decorative hands illustration */}
      {/* <div className="-bottom-16 left-1/2 absolute transform -translate-x-1/2">
        <svg
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-50"
        >
          <path
            d="M40 20C60 0 140 0 160 20C180 40 180 60 160 80C140 100 60 100 40 80C20 60 20 40 40 20Z"
            fill="currentColor"
            className="text-gray-200"
          />
        </svg>
      </div> */}
    </div>
  )
}
