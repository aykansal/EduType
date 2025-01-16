import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { configDotenv } from 'dotenv';
import leaderboardRoutes from './routes/leaderboard.js';
import certificateRoutes from './routes/certificate.js';
import userRoutes from './routes/users.js';

configDotenv();

const app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Server is running' }));

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/user', userRoutes);

// Initial data
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

const chatHistory = [];
const chatMessages = [];
const users = new Map();
const onlineUsers = new Map();
const MAX_PLAYERS = 2;
const GAME_DURATION = 60;
const players = new Set();
const spectators = new Set();
let activeWords = [
    "type",
    "fast",
    "bubble",
    "challenge",
    "keyboard",
    "speed",
    "accuracy",
    "practice",
    "improve",
    "skills",
    "compete",
    "victory",
    "words",
    "floating",
    "capture",
    "stack",
    "game",
    "player",
    "score",
    "time",
];

// Create HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket connection handling
io.on('connection', (socket) => {
    console.log(`Client connected at ${socket?.id}`);

    socket.on('joinArena', (userData) => {
        onlineUsers.set(socket.id, {
            id: socket.id,
            username: userData.username,
            avatar: userData.avatar
        });

        socket.emit('initialData', {
            matches,
            users: Array.from(onlineUsers.values()),
            chatMessages
        });

        io.emit('userJoined', {
            user: onlineUsers.get(socket.id),
            totalUsers: onlineUsers.size
        });
    });

    socket.on('placeBid', ({ matchId, player, amount }) => {
        const match = matches.find(m => m.id === matchId);
        if (match) {
            match.bids = match.bids || [];
            match.bids.push({ userId: socket.id, player, amount });
            io.emit('matchUpdated', match);
        }
    });

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

    socket.on('join', (username) => {
        users.set(socket.id, username);
        socket.emit('chatHistory', chatHistory);
        io.emit('userJoined', { username, totalUsers: users.size });
    });

    socket.on('message', (message) => {
        const username = users.get(socket.id);
        const messageData = {
            id: Date.now(),
            username,
            content: message,
            timestamp: new Date().toISOString()
        };
        chatHistory.push(messageData);
        if (chatHistory.length > 100) chatHistory.shift();
        io.emit('message', messageData);
    });

    socket.on('joinGame', (username) => {
        const player = {
            id: socket.id,
            name: username,
            wordCount: 0
        };
        players.push(player);
        io.emit('playerJoined', players);
    });

    socket.on('startGame', () => {
        const gameState = {
            activeWords,
            players,
            timeLeft: 60
        };
        io.emit('gameStarted');
        io.emit('gameState', gameState);
        // startGameLoop(io);
    });

    socket.on('wordMatched', (wordId) => {
        const player = players.find(p => p.id === socket.id);
        if (player) {
            player.wordCount++;
            io.emit('wordMatched', { playerId: player.id, wordCount: player.wordCount });

            if (player.wordCount >= WORDS_TO_WIN) {
                io.emit('gameOver', { winner: player });
            }
        }
    });

    socket.on('checkGameStatus', () => {
        const isPlayer = players.size < MAX_PLAYERS;
        if (isPlayer) {
            players.add(socket.id);
        } else {
            spectators.add(socket.id);
        }

        socket.emit('gameState', {
            activeWords,
            players: Array.from(players),
            timeLeft: GAME_DURATION,
            isPlayer
        });
    });

    socket.on('wordMatched', (wordId) => {
        if (!players.has(socket.id)) return;
        // Handle word matching logic
    });

    socket.on('disconnect', () => {
        const arenaUser = onlineUsers.get(socket.id);
        if (arenaUser) {
            onlineUsers.delete(socket.id);
            io.emit('userLeft', {
                user: arenaUser,
                totalUsers: onlineUsers.size
            });
        }

        const chatUsername = users.get(socket.id);
        if (chatUsername) {
            users.delete(socket.id);
            io.emit('userLeft', { username: chatUsername, totalUsers: users.size });
        }
        // const index = players.findIndex(p => p.id === socket.id);
        // if (index !== -1) {
        //     players.splice(index, 1);
        //     io.emit('playerJoined', players);
        // }

        players.delete(socket.id);
        spectators.delete(socket.id);
    });
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    httpServer.close(() => {
        console.log('💥 Process terminated!');
    });
});

// Start server
httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;