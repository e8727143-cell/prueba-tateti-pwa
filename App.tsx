
import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { Scoreboard } from './components/Scoreboard';
import { Modal } from './components/Modal';
import { BoardState, Winner } from './types';

// Define the type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const INITIAL_BOARD: BoardState = Array(9).fill(null);
const INITIAL_SCORES = { X: 0, O: 0 };

const calculateWinner = (squares: BoardState): { winner: Winner, line: number[] | null } => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  if (squares.every(square => square !== null)) {
    return { winner: 'draw', line: null };
  }
  return { winner: null, line: null };
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [scores, setScores] = useState<{ X: number; O: number }>(INITIAL_SCORES);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Winner, line: number[] | null }>({ winner: null, line: null });
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const handleAppInstalled = () => {
      setInstallPrompt(null);
    };
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    const newWinnerInfo = calculateWinner(board);
    if (newWinnerInfo.winner) {
      setWinnerInfo(newWinnerInfo);
      if (newWinnerInfo.winner === 'X') {
        setScores(prevScores => ({ ...prevScores, X: prevScores.X + 1 }));
      } else if (newWinnerInfo.winner === 'O') {
        setScores(prevScores => ({ ...prevScores, O: prevScores.O + 1 }));
      }
    }
  }, [board]);
  
  const handleSquareClick = (index: number) => {
    if (winnerInfo.winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const playAgain = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setIsXNext(true);
    setWinnerInfo({ winner: null, line: null });
  }, []);

  const restartGame = useCallback(() => {
    playAgain();
    setScores(INITIAL_SCORES);
  }, [playAgain]);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    await installPrompt.prompt();
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-md mx-auto flex flex-col items-center">
        <header className="text-center mb-6">
          <h1 className="text-5xl font-extrabold text-teal-400 tracking-tight">
            Tateti
          </h1>
          <p className="text-slate-400 mt-2">The classic game, reimagined.</p>
        </header>
        
        <Scoreboard scores={scores} />
        
        <GameStatus winner={winnerInfo.winner} isXNext={isXNext} />
        
        <div className="w-full p-2">
            <Board board={board} onSquareClick={handleSquareClick} winningLine={winnerInfo.line} />
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            {installPrompt && (
              <button
                onClick={handleInstallClick}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
                aria-label="Install app"
              >
                Install App
              </button>
            )}
            <button
                onClick={restartGame}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
            >
                Restart Game
            </button>
        </div>
      </main>
      <Modal winner={winnerInfo.winner} onPlayAgain={playAgain} onRestart={restartGame} />
    </div>
  );
};

export default App;
