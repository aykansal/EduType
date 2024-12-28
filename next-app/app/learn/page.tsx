import { LessonCategories } from "@/components/learn/lesson-categories"
import { LearningPath } from "@/components/learn/learning-path"
import { CurrentProgress } from "@/components/learn/current-progress"
import { NavBar } from "@/components/navbar"
import { DecorativeWave } from "@/components/decorative-wave"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <DecorativeWave />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <CurrentProgress />
          <LessonCategories />
          <LearningPath />
        </div>
      </main>
    </div>
  )
}

