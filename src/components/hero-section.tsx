import { Button } from "@/src/components/ui/button"

export function HeroSection() {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        Type faster
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Learn to type faster with Ratatype typing tutor. Take our typing lessons for free.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900"
        >
          Start learning
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-blue-400 text-blue-500 hover:bg-blue-50"
        >
          Test your speed
        </Button>
      </div>
    </div>
  )
}
