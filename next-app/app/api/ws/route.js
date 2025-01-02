// import { WebSocketServer } from "ws";

// const setupWebSocketServer = (server) => {
//   const wss = new WebSocketServer({ noServer: true });

//   const activeStreams = new Map();
//   const messageHistory = new Map();
//   const MESSAGE_LIMIT = 100;

//   wss.on("connection", (ws) => {
//     let currentStreamId = null;

//     ws.on("message", (message) => {
//       try {
//         const data = JSON.parse(message);

//         switch (data.type) {
//           case "join_stream":
//             currentStreamId = data.streamId;
//             activeStreams.set(
//               currentStreamId,
//               activeStreams.get(currentStreamId) || new Set()
//             );
//             activeStreams.get(currentStreamId).add(ws);
//             const history = messageHistory.get(currentStreamId) || [];
//             ws.send(JSON.stringify({ type: "message_history", messages: history }));
//             break;

//           case "chat_message":
//             if (currentStreamId) {
//               const chatMessage = {
//                 type: "chat_message",
//                 userId: data.userId,
//                 username: data.username,
//                 message: data.message,
//                 timestamp: new Date().toISOString(),
//               };
//               const history = messageHistory.get(currentStreamId) || [];
//               if (history.length >= MESSAGE_LIMIT) history.shift();
//               history.push(chatMessage);
//               messageHistory.set(currentStreamId, history);
//               activeStreams.get(currentStreamId)?.forEach((client) => {
//                 if (client.readyState === ws.OPEN) {
//                   client.send(JSON.stringify(chatMessage));
//                 }
//               });
//             }
//             break;

//           default:
//             ws.send(JSON.stringify({ type: "error", message: "Unknown message type" }));
//         }
//       } catch (error) {
//         console.error("WebSocket error:", error);
//         ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
//       }
//     });

//     ws.on("close", () => {
//       if (currentStreamId) {
//         activeStreams.get(currentStreamId)?.delete(ws);
//       }
//     });
//   });

//   server.on("upgrade", (req, socket, head) => {
//     wss.handleUpgrade(req, socket, head, (ws) => {
//       wss.emit("connection", ws, req);
//     });
//   });

//   return wss;
// };

// export default function handler(req, res) {
//   if (!res.socket.server.wss) {
//     res.socket.server.wss = setupWebSocketServer(res.socket.server);
//     console.log("WebSocket server initialized");
//   }
//   res.end();
// }
