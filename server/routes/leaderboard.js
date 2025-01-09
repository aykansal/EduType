import { Router } from 'express';
const router = Router();
import prisma from '@prisma/client';

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Route to save user scores
router.post('/save-score', async (req, res) => {
    const { walletAddress, wpm, accuracy } = req.body;

    // Validate required fields
    if (!walletAddress || !wpm || !accuracy) {
        return res.status(400).json({ error: 'Missing required fields: walletAddress, wpm, or accuracy.' });
    }

    try {
        // Check if the user's score already exists
        const existingScore = await prismaClient.score.findFirst({
            where: {
                user: {
                    walletAddress: walletAddress, // Correct usage
                },
            },
        });

        if (existingScore) {
            // Update the existing score
            const updatedScore = await prismaClient.score.update({
                where: {
                    id: existingScore.id,
                },
                data: {
                    wpm,
                    accuracy,
                },
            });

            return res.status(200).json({ message: 'Score updated successfully!', score: updatedScore });
        } else {
            // Create a new score if no existing score is found
            const newScore = await prismaClient.score.create({
                data: {
                    user: {
                        connect: {
                            walletAddress: walletAddress, // Ensure the user exists with this wallet address
                        },
                    },
                    wpm,
                    accuracy,
                },
            });

            return res.status(201).json({ message: 'Score saved successfully!', score: newScore });
        }
    } catch (error) {
        console.error('Error saving score:', error);

        // Handle specific Prisma errors (e.g., foreign key constraints)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found for the given wallet address.' });
        }

        return res.status(500).json({ error: 'Internal server error.' });
    }
});


// Route to fetch leaderboard data
router.get('/', async (req, res) => {

    try {
        const leaderboard = await prismaClient.score.findMany({
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