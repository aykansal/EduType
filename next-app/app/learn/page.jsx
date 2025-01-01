"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { NavBar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { DecorativeWave } from "@/components/decorative-wave";

// Dynamic imports with loading states
const CurrentProgress = dynamic(
  () => import("@/components/learn/current-progress").then((mod) => mod.CurrentProgress),
  {
    loading: () => <ProgressSkeleton />,
    ssr: true
  }
);

const LessonCategories = dynamic(
  () => import("@/components/learn/lesson-categories").then((mod) => mod.LessonCategories),
  {
    loading: () => <CategoriesSkeleton />,
    ssr: false
  }
);

const LearningPath = dynamic(
  () => import("@/components/learn/learning-path").then((mod) => mod.LearningPath),
  {
    loading: () => <PathSkeleton />,
    ssr: false
  }
);

// Loading skeleton components
const ProgressSkeleton = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    </div>
  </Card>
);

const CategoriesSkeleton = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    </div>
  </Card>
);

const PathSkeleton = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/4" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  </Card>
);

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <Suspense fallback={<ProgressSkeleton />}>
            <CurrentProgress />
          </Suspense>
          
          <Suspense fallback={<CategoriesSkeleton />}>
            <LessonCategories />
          </Suspense>
          
          <Suspense fallback={<PathSkeleton />}>
            <LearningPath />
          </Suspense>
        </div>
      </main>
    </div>
  )
}