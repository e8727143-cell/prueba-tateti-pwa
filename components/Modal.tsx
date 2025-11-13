
import React from 'react';
import { Winner } from '../types';

interface ModalProps {
  winner: Winner;
  onPlayAgain: () => void;
  onRestart: () => void;
}

export const Modal: React.FC<ModalProps> = ({ winner, onPlayAgain, onRestart }) => {
  if (!winner) return null;

  const message = winner === 'draw' ? 'It\'s a Draw!' : `Player ${winner} Wins!`;
  const textColor = winner === 'X' ? 'text-sky-400' : winner === 'O' ? 'text-amber-400' : 'text-slate-100';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl text-center transform scale-100 animate-pop-in-modal w-11/12 max-w-md">
        <h2 className={`text-4xl font-extrabold mb-4 ${textColor}`}>{message}</h2>
        <p className="text-slate-300 mb-8">What would you like to do next?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400"
          >
            Play Again
          </button>
          <button
            onClick={onRestart}
            className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-400"
          >
            Restart Game (Reset Scores)
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes pop-in-modal {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in-modal {
          animation: pop-in-modal 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </div>
  );
};
