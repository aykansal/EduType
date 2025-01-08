"use client";
import { useState, useEffect, useRef } from "react";

import { useToast } from "@/hooks/use-toast";

import { getSocket } from "@/lib/socket";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LiveChat() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const MESSAGES_PER_PAGE = 50;

  useEffect(() => {
    const socketIo = getSocket();
    setSocket(socketIo);

    socketIo.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketIo.on("chatHistory", (history) => {
      setMessages(history);
    });

    socketIo.on("userJoined", ({ username, totalUsers }) => {
      setUserCount(totalUsers);
      toast({
        title: "New user joined",
        description: `${username} joined the chat`,
      });
    });

    socketIo.on("userLeft", ({ username, totalUsers }) => {
      setUserCount(totalUsers);
      toast({
        title: "User left",
        description: `${username} left the chat`,
        variant: "destructive",
      });
    });

    return () => socketIo.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    return () => {
      socket?.off("message");
      socket?.off("chatHistory");
      socket?.off("userJoined");
      socket?.off("userLeft");
    };
  }, [socket]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit("join", username);
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };
  const getInitials = (name) => {
    return name.slice(0, 2).toUpperCase();
  };

  const MessageBubble = ({ message, isCurrentUser }) => {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <Avatar className="flex-shrink-0">
          <AvatarFallback>{getInitials(message.username)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1 max-w-[80%]">
          <span className="font-medium text-sm">
            {isCurrentUser ? "You" : message.username}
          </span>
          <div
            className={`rounded-lg px-3 py-2 ${
              isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <p className="break-words">{message.content}</p>
          </div>
          <span className="text-muted-foreground text-xs">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  };

  if (!isJoined) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Join Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-4">
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Join Chat
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 max-w-4xl container">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center space-y-0">
          <CardTitle>Chat Room</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">
              Online Users: {userCount}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="p-4 border rounded-md w-full h-[60vh]">
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isCurrentUser={msg.username === username}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator />

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
