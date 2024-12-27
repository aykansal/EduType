import { LessonCategories } from "@/src/components/learn/lesson-categories"
import { LearningPath } from "@/src/components/learn/learning-path"
import { CurrentProgress } from "@/src/components/learn/current-progress"
import { NavBar } from "@/src/components/nav-bar"
import { DecorativeWave } from "@/src/components/decorative-wave"

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

