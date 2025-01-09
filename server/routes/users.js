import { Router } from 'express';
const router = Router();
import prisma from '@prisma/client';

const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

router.get('/', async (req, res) => {
    const users = await prismaClient.user.findMany();
    return res.json(users);
});

router.get('/checkdb/:walletAddress', async (req, res) => {
    const { walletAddress } = req.params;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required' });
    }

    const user = await prismaClient.user.findUnique({
        where: {
            walletAddress
        }
    });

    if (user) {
        return res.json({ user, message: 'User already exists' });
    }

    return res.status(404).json({ message: 'User not found' });
});

router.post('/create-user', async (req, res) => {
    const { walletAddress, username } = req.body;

    if (!walletAddress || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newUser = await prismaClient.user.create({
            data: {
                walletAddress,
                username
            }
        });
        return res.json({ newUser, message: 'New User created' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
});

export default router;
