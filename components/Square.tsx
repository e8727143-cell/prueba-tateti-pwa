
import React from 'react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

const XIcon = () => (
  <svg className="w-full h-full p-4 stroke-current text-sky-400" viewBox="0 0 52 52">
    <path strokeWidth="6" strokeLinecap="round" d="M10 10 L 42 42 M 42 10 L 10 42" />
  </svg>
);

const OIcon = () => (
  <svg className="w-full h-full p-4 stroke-current text-amber-400" viewBox="0 0 52 52">
    <circle strokeWidth="6" cx="26" cy="26" r="16" fill="none" />
  </svg>
);

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  const baseStyle = "aspect-square w-full h-full flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-400";
  const bgStyle = isWinning 
    ? "bg-teal-500/50" 
    : "bg-slate-800 hover:bg-slate-700 cursor-pointer";
  const content = value === 'X' ? <XIcon /> : value === 'O' ? <OIcon /> : null;

  return (
    <button onClick={onClick} className={`${baseStyle} ${bgStyle}`} disabled={!!value}>
      {value && (
        <div className="w-full h-full transform transition-transform duration-300 ease-out scale-0 animate-pop-in">
          {content}
        </div>
      )}
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .animate-pop-in {
          animation: pop-in 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </button>
  );
};
