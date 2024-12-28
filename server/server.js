const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
require('dotenv').config();

const activeStreams = new Map();
const messageHistory = new Map();

wss.on('connection', (ws) => {
  let currentStreamId = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join_stream':
        currentStreamId = data.streamId;
        if (!activeStreams.has(currentStreamId)) {
          activeStreams.set(currentStreamId, new Set());
          messageHistory.set(currentStreamId, []);
        }
        activeStreams.get(currentStreamId).add(ws);

        const history = messageHistory.get(currentStreamId);
        ws.send(JSON.stringify({
          type: 'message_history',
          messages: history
        }));
        break;

      case 'chat_message':
        if (currentStreamId && activeStreams.has(currentStreamId)) {
          const chatMessage = {
            type: 'chat_message',
            userId: data.userId,
            username: data.username,
            message: data.message,
            timestamp: new Date().toISOString()
          };

          messageHistory.get(currentStreamId).push(chatMessage);

          activeStreams.get(currentStreamId).forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(chatMessage));
            }
          });
        }
        break;
    }
  });

  ws.on('close', () => {
    if (currentStreamId) {
      activeStreams.get(currentStreamId)?.delete(ws);
    }
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`WebSocket server running on port ${process.env.PORT || 5000}`);
});