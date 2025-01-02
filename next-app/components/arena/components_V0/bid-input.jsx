"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function BidInput({ defaultValue = 1.22, onChange, className }) {
  const [value, setValue] = useState(defaultValue.toString())

  const handleChange = e => {
    const newValue = e.target.value
    if (/^\d*\.?\d*$/.test(newValue)) {
      setValue(newValue)
      onChange(Number(newValue))
    }
  }

  return (
    <div className={cn("flex flex-col space-y-1.5", className)}>
      <Label
        htmlFor="bidAmount"
        className="font-gaming text-purple-300 text-sm"
      >
        Bid Amount
      </Label>
      <div className="relative">
        <Input
          id="bidAmount"
          type="text"
          value={value}
          onChange={handleChange}
          className="border-purple-500/20 bg-black/40 pr-12 focus-visible:ring-purple-500/50 font-gaming text-purple-300 placeholder:text-purple-300/50"
        />
        <span className="top-1/2 right-3 absolute font-gaming text-purple-400 text-sm -translate-y-1/2">
          Edu
        </span>
      </div>
    </div>
  )
}
