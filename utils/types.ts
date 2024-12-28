export interface Player {
    id: string;
    username: string;
    wpm: number;
    accuracy: number;
    progress: number;
}

export interface Room {
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

export interface CertificateProps {
    date: string;
    wpm: number;
    accuracy: number;
    text: string;
  }
  