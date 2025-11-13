
import React from 'react';
import { Square } from './Square';
import { BoardState } from '../types';

interface BoardProps {
  board: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

export const Board: React.FC<BoardProps> = ({ board, onSquareClick, winningLine }) => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 bg-slate-900/50 rounded-xl shadow-lg">
      {board.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          isWinning={winningLine?.includes(i) ?? false}
        />
      ))}
    </div>
  );
};
