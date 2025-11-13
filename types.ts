
export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type BoardState = SquareValue[];
export type Winner = Player | 'draw' | null;
