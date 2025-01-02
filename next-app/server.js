// // import express from 'express';
// import { createServer } from 'http';
// import next from 'next';
// import { Server } from 'socket.io';
// // import socketIO from 'socket.io';

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = 3000;
// // when using middleware `hostname` and `port` must be provided below
// const nextApp = next({ dev, hostname, port });
// const nextHandler = nextApp.getRequestHandler();

// // Keep track of connected users and their messages
// const users = new Map();
// const chatHistory = [];

// nextApp.prepare().then(() => {
//   const httpServer = createServer(nextHandler);

//   const io = new Server(httpServer);

//   // Handle socket connections
//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Handle user joining
//     socket.on('join', (username) => {
//       users.set(socket.id, username);
//       socket.emit('chatHistory', chatHistory);
//       io.emit('userJoined', { username, totalUsers: users.size });
//     });

//     // Handle new messages
//     socket.on('message', (message) => {
//       const username = users.get(socket.id);
//       const messageData = {
//         id: Date.now(),
//         username,
//         content: message,
//         timestamp: new Date().toISOString()
//       };
//       chatHistory.push(messageData);
//       // Keep only last 100 messages
//       if (chatHistory.length > 100) chatHistory.shift();
//       io.emit('message', messageData);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//       const username = users.get(socket.id);
//       users.delete(socket.id);
//       io.emit('userLeft', { username, totalUsers: users.size });
//     });
//   });

//   // Handle all other routes with Next.js
//   // nextApp.all('*', (req, res) => nextHandler(req, res));

//   const PORT = process.env.PORT || 3000;
//   httpServer.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: 'localhost', port: 3000 });
const nextHandler = app.getRequestHandler();

let matches = [
  {
    id: 1,
    player1: { wpm: 50, score: 45 },
    player2: { wpm: 50, score: 45 },
    bidAmount: 1.22,
    status: 'active'
  },
  {
    id: 2,
    player1: { wpm: 50, score: 45 },
    player2: { wpm: 50, score: 45 },
    bidAmount: 1.5,
    status: 'active'
  }
];

const onlineUsers = new Map();
const chatMessages = [];

app.prepare().then(() => {
  const server = createServer(nextHandler);

  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('Client connected');

    // Handle user joining
    socket.on('joinArena', (userData) => {
      onlineUsers.set(socket.id, {
        id: socket.id,
        username: userData.username,
        avatar: userData.avatar
      });

      // Send initial data to the new user
      socket.emit('initialData', {
        matches,
        users: Array.from(onlineUsers.values()),
        chatMessages
      });

      // Broadcast new user to others
      io.emit('userJoined', {
        user: onlineUsers.get(socket.id),
        totalUsers: onlineUsers.size
      });
    });

    // Handle match interactions
    socket.on('placeBid', ({ matchId, player, amount }) => {
      const match = matches.find(m => m.id === matchId);
      if (match) {
        match.bids = match.bids || [];
        match.bids.push({
          userId: socket.id,
          player,
          amount
        });
        io.emit('matchUpdated', match);
      }
    });

    // Handle chat messages
    socket.on('chatMessage', (message) => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        const messageData = {
          id: Date.now(),
          user,
          content: message,
          timestamp: new Date()
        };
        chatMessages.push(messageData);
        io.emit('newChatMessage', messageData);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        onlineUsers.delete(socket.id);
        io.emit('userLeft', {
          user,
          totalUsers: onlineUsers.size
        });
      }
    });
  });

  // Handle all other routes with Next.js
  // app.all('*', (req, res) => nextHandler(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});