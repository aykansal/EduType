import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { v2 as cloudinary } from 'cloudinary';
import { createCanvas, registerFont } from 'canvas';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const port = process.env.PORT || 5000;
const fontPath = "https://fonts.cdnfonts.com/s/7358/handy00.woff";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Cloudinary config
cloudinary.config({
    cloud_name: 'dxoyx4xw3',
    api_key: '226187215341891',
    api_secret: process.env.CLOUDINARY_SECRET
});

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

// Create HTTP server
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/api/generate-certificate', async (req, res) => {
    try {
        console.log('\nFontCDN inside API request :', fontPath);
        registerFont(fontPath, {
            family: 'Handy00',
            style: 'normal',
            weight: 400,
            format: 'woff2'
        });
        console.log('\nAttempting to load font from:', fontPath);
        console.log('\nFont registered successfully');
    } catch (error) {
        console.error('\nError during font registration:', error);
    }

    // fetching query params and certficate part starts here
    try {
        const { walletAddress, wpm, accuracy } = req.query;

        if (!walletAddress || !wpm || !accuracy) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        console.log(fontPath);

        // Create canvas with debug logging
        console.log('\nCreating canvas...');
        const width = 800;
        const height = 600;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Set background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Add border
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.strokeRect(25, 25, width - 50, height - 50);

        // Add decorative border
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(35, 35, width - 70, height - 70);

        // Configure text styles with debug logging
        console.log('\nSetting up text styles...');
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';

        // Draw title with logging
        ctx.font = '48px "Handy00"';
        console.log('\nSet title font:', ctx.font);
        ctx.fillText('Certificate of Achievement', width / 2, 150);

        // Draw main text
        ctx.font = '24px "Handy00"';
        console.log('\nSet main text font:', ctx.font);
        const lines = [
            `This is to certify that`,
            `User: ${walletAddress}`,
            `has achieved a typing speed of ${wpm} WPM`,
            `with an accuracy of ${accuracy}%`
        ];

        let y = 250;
        lines.forEach(line => {
            ctx.fillText(line, width / 2, y);
            y += 40;
        });

        // Add date
        const date = new Date().toLocaleDateString();
        ctx.font = '18px "Handy00"';
        console.log('\nSet Date font:', ctx.font);
        ctx.fillText(`Date: ${date}`, width / 2, height - 100);

        // Convert canvas to buffer
        console.log('\nConverting to buffer...');
        const buffer = canvas.toBuffer('image/png');
        console.log(ctx);
        // Upload to Cloudinary
        try {
            console.log('\nUploading to Cloudinary...');
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: `certificate_${walletAddress}`,
                        folder: 'certificates',
                        format: 'png',
                        transformation: {
                            quality: 'auto',
                            fetch_format: 'auto'
                        }
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                uploadStream.end(buffer);
            });

            console.log('\nUpload successful');
            return res.json({
                status: 'success',
                certificate: {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                    version: uploadResult.version
                }
            });

        } catch (cloudinaryError) {
            console.error('\nCloudinary upload error:', cloudinaryError);
            return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
        }

    } catch (error) {
        console.error('\nError generating certificate:', error);
        return res.status(500).json({ error: 'Failed to generate certificate' });
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