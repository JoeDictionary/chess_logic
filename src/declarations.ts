import { Pawn, Knight, Rook, Bishop, Queen, King, Piece } from './piece';

export const SQUARE = 'square';
export const PIECE = 'piece';
export const WHITE = 'w';
export const BLACK = 'b';

// prettier-ignore
export const enum MoveType {
  NORMAL, 			// Normal move
  CAPTURE, 			// Capture move
  LONG_PAWN,		// Pawn long move
  EP_CAPTURE,		// en passant capture
  PROMOTION, 		// pawn promotion
  KSIDE_CASTLE, // kinf-side castling
  QSIDE_CASTLE, // queen-side castl
}

export type Square = Piece | undefined;
export type BoardState = Square[][];

export interface coord {
  y: number;
  x: number;
}

export interface move {
  p: coord;
  to: coord;
  action?: chessAction;
}

export interface chessAction {
  move?: move;
  remove?: coord;
  promote?: coord;
}

export interface loop {
  yStart: number;
  xStart: number;
  isWhite: boolean;
  compare: Function;
  modifyY: boolean;
  modifyX: boolean;
  yIncrement?: boolean;
  xIncrement?: boolean;
}
