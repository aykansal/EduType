import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export function NavBar() {
  return (
    <nav className="w-full py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          RATATYPE
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/typing-tutor" className="text-gray-600 hover:text-gray-900">
            Typing tutor
          </Link>
          <Link href="/typing-test" className="text-gray-600 hover:text-gray-900">
            Typing test
          </Link>
          <Link href="/learn" className="text-gray-600 hover:text-gray-900">
            Learn
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-gray-600">Hey!</span>
          <Button variant="outline">Log in</Button>
        </div>
      </div>
    </nav>
  )
}
