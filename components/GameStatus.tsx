
import React from 'react';
import { Player, Winner } from '../types';

interface GameStatusProps {
  winner: Winner;
  isXNext: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, isXNext }) => {
  const nextPlayer: Player = isXNext ? 'X' : 'O';

  let statusText: string;
  let textColor = 'text-slate-300';

  if (winner) {
    if (winner === 'draw') {
      statusText = 'It\'s a Draw!';
      textColor = 'text-amber-400';
    } else {
      statusText = `Player ${winner} Wins!`;
      textColor = winner === 'X' ? 'text-sky-400' : 'text-amber-400';
    }
  } else {
    statusText = `Next Player: ${nextPlayer}`;
    textColor = nextPlayer === 'X' ? 'text-sky-400' : 'text-amber-400';
  }

  return (
    <div className="text-center my-4 h-9">
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-wider transition-colors duration-300 ${textColor}`}>
        {statusText}
      </h2>
    </div>
  );
};
