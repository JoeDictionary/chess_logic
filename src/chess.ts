import { BoardState, WHITE, BLACK, MoveType as mt } from './declarations';

export class Chess {
  board: BoardState = new Array();
  kings = { w: undefined, b: undefined };
  white_turn = true;
  castling = undefined;
  ep_square = undefined;
	history = undefined;

	state = {
		board: this.board,
		turn: this.white_turn,
		castling: this.castling,
		ep_square: this.ep_square
	}
}
