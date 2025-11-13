
import React from 'react';

interface ScoreboardProps {
  scores: { X: number; O: number };
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div className="flex justify-around items-center w-full max-w-sm mx-auto my-4 p-3 bg-slate-800 rounded-lg shadow-md">
      <div className="text-center">
        <p className="text-lg font-semibold text-sky-400">Player X</p>
        <p className="text-3xl font-bold text-slate-100">{scores.X}</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-amber-400">Player O</p>
        <p className="text-3xl font-bold text-slate-100">{scores.O}</p>
      </div>
    </div>
  );
};
