import { Suspense } from "react"
import { NavBar } from "@/components/navbar"
import { LiveSpace } from "@/components/arena-old/live-space"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="mx-auto w-3/4 h-12">
        <Skeleton className="bg-gray-800 w-full h-full" />
      </div>
      <div className="gap-4 grid">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="bg-gray-800 w-full h-32"
          />
        ))}
      </div>
    </div>
  )
}

export default function LiveCompetitionPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <NavBar />
      <main className="mx-auto px-4 py-8 container">
        <h1 className="mb-8 font-bold font-tech text-5xl text-center text-cyan-400">
          Typing Arena
        </h1>
        <Suspense fallback={<LoadingSkeleton />}>
          <LiveSpace />
        </Suspense>
      </main>
    </div>
  )
}

