"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="flex flex-col justify-center items-center bg-black p-4 min-h-screen text-white">
      <h1 className="bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 font-bold text-4xl text-center text-transparent md:text-6xl">
        Choose Your Experience
      </h1>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl">
        <Card
          className={`group relative overflow-hidden transition-all duration-300 ${
            hoveredCard === "watch" ? "scale-105" : ""
          }`}
          onMouseEnter={() => setHoveredCard("watch")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 flex flex-col justify-center items-center h-64">
            <Eye className="mb-4 w-16 h-16 text-white" />
            <h2 className="mb-2 font-bold text-3xl">Watch</h2>
            <p className="mb-4 text-center">
              Immerse yourself in captivating content
            </p>
            <Link href="/arena/watch">
              <Button variant="secondary" size="lg">
                Choose Watch
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card
          className={`group relative overflow-hidden transition-all duration-300 ${
            hoveredCard === "play" ? "scale-105" : ""
          }`}
          onMouseEnter={() => setHoveredCard("play")}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-yellow-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <CardContent className="relative z-10 flex flex-col justify-center items-center h-64">
            <Gamepad2 className="mb-4 w-16 h-16 text-white" />
            <h2 className="mb-2 font-bold text-3xl">Play</h2>
            <p className="mb-4 text-center">
              Engage in thrilling interactive experiences
            </p>
            <Link href="/arena/play">
              <Button variant="secondary" size="lg">
                Choose Play
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
