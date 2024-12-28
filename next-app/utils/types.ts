interface Player {
    id: string;
    username: string;
    wpm: number;
    accuracy: number;
    progress: number;
}

interface Room {
    id: string;
    name: string;
    status: 'waiting' | 'in-progress' | 'completed';
    players: Player[];
    audience: string[];
    bids: Record<string, { playerId: string; amount: number }>;
    text: string;
    startTime?: Date;
    scheduledFor?: Date;
}
