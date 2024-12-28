import { useEffect } from 'react';
import { socket } from '@/utils/socket';

export const GameRoom = ({ roomId }) => {
  useEffect(() => {
    socket.on('progress-updated', ({ room }) => {
      // Update UI with new progress
    });

    socket.on('game-started', ({ countdown }) => {
      // Start countdown and game
    });

    socket.on('game-ended', ({ room, winner }) => {
      // Show results
    });

    return () => {
      socket.off('progress-updated');
      socket.off('game-started');
      socket.off('game-ended');
    };
  }, []);

};