"use client"
import { getSocket } from "@/config/socket";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

export default function Message() {
  const [counter, setcounter] = useState(0);
  const socket = useMemo(() => {
    const socket = getSocket();
    return socket.connect();
  });

  useEffect(() => {
    console.log("The Socket ", socket);
    socket.emit("message", "Ayush");

    socket.on("add", (payload) => {
      setcounter((prev) => prev + 1);
    });
    socket.on("minus", (payload) => {
      setcounter((prev) => prev - 1);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = (type) => {
    type === "add" ? socket.emit("add", 1) : socket.emit("minus", 1);
  };

  return (
    <div className="flex gap-10">
      <Button onClick={() => handleClick("add")}> Add </Button>
      <p>{counter}</p>
      <Button onClick={() => handleClick("minus")}> Minus </Button>
    </div>
  );
}
