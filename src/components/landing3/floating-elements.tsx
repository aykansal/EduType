'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function FloatingElements() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions after component mounts
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    initialX: dimensions.width ? Math.random() * dimensions.width : 0,
    initialY: dimensions.height ? Math.random() * dimensions.height : 0,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute w-4 h-4 rounded-full ${
            element.id % 3 === 0 ? 'bg-blue-400' : 
            element.id % 3 === 1 ? 'bg-yellow-400' : 
            'bg-cyan-400'
          }`}
          initial={{
            x: element.initialX,
            y: element.initialY,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
          }}
          style={{
            left: element.left,
            top: element.top,
          }}
        />
      ))}
    </div>
  );
}