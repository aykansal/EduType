import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

export function Header() {
  return (
    <header className="relative border-purple-500/20 bg-black/40 backdrop-blur-sm border-b">
      <div className="-z-10 absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />

      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <div className="border-purple-500/20 bg-black/40 px-6 py-2 border rounded-xl">
            <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-gaming text-transparent text-xl">
              EduType
            </span>
          </div>
        </div>

        <h1 className="font-gaming text-3xl text-purple-300">Arena</h1>

        <Button variant="gaming" className="gap-2">
          <Keyboard className="w-4 h-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
