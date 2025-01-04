"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function Chat({ messages, users }) {
  const [newMessage, setNewMessage] = useState("")

  const onlineCount = users.filter(u => u.online).length

  return (
    <div className="flex flex-col border-l h-full text-white">
      <div className="p-4 border-b">
        <span className="text-muted-foreground text-sm">
          Online Users: <span className="text-green-500">{onlineCount}</span>
        </span>
      </div>

      <div className="flex-1 space-y-4 p-4 overflow-y-auto">
        {messages.map(message => {
          const user = users.find(u => u.id === message.userId)
          return (
            <div key={message.id} className="flex items-start gap-3">
              <div className="bg-gray-200 rounded-full w-8 h-8">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1"
          />
          <Button size="icon" className="shrink-0">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
