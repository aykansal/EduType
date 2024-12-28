'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessage {
  id: number
  user: string
  message: string
}

export function AudienceChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: 'ByteMaster', message: 'Go CyberTypist!' },
    { id: 2, user: 'QuantumCoder', message: 'QuantumKeys is unstoppable!' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now(), user: 'You', message: newMessage.trim() }
      ])
      setNewMessage('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6 border border-cyan-500"
    >
      <h2 className="text-3xl font-bold mb-4 text-center text-cyan-400 font-tech">Spectator Feed</h2>
      <ScrollArea className="h-[300px] mb-4 bg-gray-700 rounded-lg p-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 bg-gray-600 rounded-lg p-2 shadow"
          >
            <span className="font-bold text-cyan-400 font-tech">{msg.user}: </span>
            <span className="text-gray-200 font-mono">{msg.message}</span>
          </motion.div>
        ))}
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Send a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="bg-gray-700 border-gray-600 text-gray-100"
        />
        <Button onClick={handleSendMessage} className="bg-cyan-600 hover:bg-cyan-700 text-white">Send</Button>
      </div>
    </motion.div>
  )
}

