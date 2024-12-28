import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const socket = io(SOCKET_URL);

export const initializeSocket = (onMessageReceived) => {
  socket.on('receive-message', onMessageReceived);
  return () => socket.off('receive-message');
};

export const sendMessage = (messageData) => {
  socket.emit('new-message', messageData);
};

export const joinRoom = (room) => {
  socket.emit('join-room', room);
};

export default socket;