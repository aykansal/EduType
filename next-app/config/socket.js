import { io } from "socket.io-client";


let socket;
export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_SERVER || "http://localhost:3000");
  }
  return socket;
};