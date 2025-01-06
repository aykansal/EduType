import { io } from "socket.io-client";

let socket;
export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
  }
  return socket;
};