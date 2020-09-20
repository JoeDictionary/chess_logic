import { Subject } from './observer';
import { move } from './declarations';
import { BoardState, coord } from './declarations';
import { Piece, Rook, Knight, Bishop, Queen, King, Pawn } from './piece';

export const BOARD_SIZE = 8;
export const EMPTY = undefined;
const BACKLINE = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];

// TODO Should data for the piece's image be stored here, in Piece class or somewhere else?

export class ChessBoard {
  state: BoardState;
  enPass: [coord, coord] | undefined;
	isWhiteTurn: boolean = true;
  actionSub = new Subject();

  constructor() {
    this.state = Array(8)
      .fill(0)
      .map(() => new Array(8));
  }

  removePiece({ y, x }: coord) {
    const p = this.state[y][x];
    if (p instanceof Piece) {
      p.domElement.remove();
      this.state[y][x] = undefined;
    }
  }

  insertPiece(p: Piece) {
    const [y, x] = [p.y, p.x];
    this.removePiece({ y: y, x: x });
    this.state[y][x] = p;
  }

  movePiece({ p, to }: move) {
    let piece = this.state[p.y][p.x]!;
    this.state[to.y][to.x] = piece;
    this.state[p.y][p.x] = undefined;
    piece.move(to);
  }

  turnMovePiece({ p, to, action }: move): boolean {
    let move = this.isMoveValid(p, to);
    if (move) [p, to, action] = [move.p, move.to, move.action];
    else return false;

    // Check if en passant move
    // if (this.enPass && this.enPass[1].y === to.y && this.enPass[1].x === to.x) {
    //   this.removePiece({ y: this.enPass[0].y, x: this.enPass[0].x });
    // }

    this.isWhiteTurn = !this.isWhiteTurn;
    this.enPass = this.getEnPassant(p, to);
    this.movePiece({ p: p, to: to });
    this.actionSub.notify(action);
    return true;
  }

  isMoveValid(p: coord, to: coord): move | undefined {
    const piece = this.state[p.y][p.x]!;
    if (!(piece instanceof Piece) || piece.isWhite !== this.isWhiteTurn)
      return undefined; // False if there is no piece or piece of wrong color

    let validPieceMoves = piece.getValidMoves(this.state, this.enPass);

    for (let m of validPieceMoves) {
      if (m.to.y === to.y && m.to.x === to.x) return m;
    }

    return undefined;
  }

  /**
   *
   * @param p
   * @param to
   */
  getEnPassant(p: coord, to: coord): [coord, coord] | undefined {
    let piece = this.state[p.y][p.x];
    if (!(piece instanceof Pawn) || piece.hasMoved) return undefined;

    const offset = piece.isWhite ? -1 : 1;

    if (Math.abs(p.y - to.y) === 2)
      return [
        { y: to.y, x: to.x },
        { y: p.y + offset, x: p.x },
      ];
    else return undefined;
  }
}
