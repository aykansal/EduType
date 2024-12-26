'use client'

import { motion } from 'framer-motion'

interface KeyboardProps {
  activeKey: string | null
}

const keyboardLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
]

const keyColors: { [key: string]: string } = {
  q: 'bg-purple-200',
  w: 'bg-green-200',
  e: 'bg-pink-200',
  r: 'bg-cyan-200',
  t: 'bg-cyan-200',
  y: 'bg-yellow-200',
  u: 'bg-yellow-200',
  i: 'bg-pink-200',
  o: 'bg-orange-200',
  p: 'bg-green-200',
  a: 'bg-purple-200',
  s: 'bg-green-200',
  d: 'bg-pink-200',
  f: 'bg-cyan-200',
  g: 'bg-cyan-200',
  h: 'bg-yellow-200',
  j: 'bg-yellow-200',
  k: 'bg-pink-200',
  l: 'bg-orange-200',
  z: 'bg-purple-200',
  x: 'bg-green-200',
  c: 'bg-pink-200',
  v: 'bg-cyan-200',
  b: 'bg-cyan-200',
  n: 'bg-yellow-200',
  m: 'bg-yellow-200',
}

export function Keyboard({ activeKey }: KeyboardProps) {
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 mb-1">
            {row.map((key) => {
              const isActive = activeKey?.toLowerCase() === key.toLowerCase()
              const baseColor = keyColors[key.toLowerCase()] || 'bg-gray-100'
              
              return (
                <motion.div
                  key={key}
                  className={`
                    ${baseColor}
                    relative h-12 rounded-lg flex items-center justify-center
                    ${key === 'Backspace' ? 'w-20' : key === 'Tab' ? 'w-16' : 
                      key === 'Caps' ? 'w-20' : key === 'Enter' ? 'w-20' : 
                      key === 'Shift' ? 'w-24' : 'w-12'}
                    ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow'}
                  `}
                  animate={isActive ? { scale: 0.95 } : { scale: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-gray-700 text-sm font-medium">
                    {key}
                  </span>
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
      {/* Decorative hands illustration */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
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
      </div>
    </div>
  )
}
