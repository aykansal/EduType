import { Router } from 'express';
const router = Router();
import prisma from '@prisma/client';

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Route to save user scores
router.post('/save-score', async (req, res) => {
    const { userId, wpm, accuracy } = req.body;
    if (!userId || !wpm || !accuracy) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    try {
        const savedScore = await prismaClient.score.create({
            data: {
                user: {
                    connect: {
                        walletAddress: userId,
                    },
                },
                wpm,
                accuracy,
            },
        });
        return res.status(201).json({ message: 'Score saved successfully!', savedScore });
    } catch (error) {
        console.error('Error saving score:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Route to fetch leaderboard data
router.get('/', async (req, res) => {
    const { walletAddress } = req.query;

    if (!walletAddress) {
        return res.status(400).json({ error: 'walletAddress query parameter is required.' });
    }

    try {
        const leaderboard = await prismaClient.score.findMany({
            // where: {
            //     user: {
            //         walletAddress, // Filter by walletAddress
            //     },
            // },
            include: {
                user: true, // Join user data
            },
            orderBy: {
                wpm: 'desc', // Sort by highest words per minute (wpm)
            },
            take: 10, // Fetch top 10 scores for the specific user
        });

        return res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});


export default router;