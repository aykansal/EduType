import { Suspense } from "react"
import { NavBar } from "@/components/navbar"
import { LiveSpace } from "@/components/arena/live-space"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="h-12 w-3/4 mx-auto">
        <Skeleton className="h-full w-full bg-gray-800" />
      </div>
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-32 w-full bg-gray-800"
          />
        ))}
      </div>
    </div>
  )
}

export default function LiveCompetitionPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-cyan-400 font-tech">
          Typing Arena
        </h1>
        <Suspense fallback={<LoadingSkeleton />}>
          <LiveSpace />
        </Suspense>
      </main>
    </div>
  )
}

