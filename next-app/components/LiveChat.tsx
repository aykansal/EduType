import React, { useEffect, useRef, useState } from "react";

interface ChatMessage {
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

interface LiveChatProps {
  streamId: string;
  userId: string;
  username: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ streamId, userId, username }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_SERVER}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_stream",
          streamId,
          userId,
          username,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat_message") {
        setMessages((prev) => [...prev, data]);
      } else if (data.type === "message_history") {
        setMessages(data.messages);
      }
    };

    return () => ws.close();
  }, [streamId, userId, username]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    wsRef.current?.send(
      JSON.stringify({
        type: "chat_message",
        streamId,
        userId,
        username,
        message: newMessage.trim(),
      })
    );

    setNewMessage("");
  };

  return (
    <div className="w-96 border rounded-lg p-4 text-black">
      <div className="h-96 overflow-y-auto mb-4 border rounded p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.userId === userId ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <div className="font-bold">{msg.username}</div>
            <div>{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
