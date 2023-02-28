import { Tile } from "../../components/board";
import shuffle from "lodash.shuffle";

const MIN_NUMBER = 1;
const MAX_NUMMBER = 75;

export function range(min = MIN_NUMBER, max = MAX_NUMMBER) {
  return Array.from({ length: max - min + 1 }, (_, idx) => min + idx);
}

export function getNumberFromRange(numbers: number[]) {
  return Math.round(Math.random() * (numbers.length - 1));
}

function transpose(matrix: number[][]) {
  return matrix[0].map((_, colIdx) =>
    matrix.map((_, rowIdx) => matrix[rowIdx][colIdx])
  );
}

export function getBoardNumbers() {
  const numbers = [0, 1, 2, 3, 4].map((columnIdx) => {
    const selections = shuffle(range(columnIdx * 15 + 1, (columnIdx + 1) * 15));
    return [1, 2, 3, 4, 5].map((idx) => selections[idx]);
  });
  // transpose so the bingo card follows column not row
  const transposed = transpose(numbers);
  return transposed;
}

export function checkRow(board: Tile[], idxOnBoard: number) {
  const rowIdx = Math.floor(idxOnBoard / 5);
  const markedCount = [0, 1, 2, 3, 4].reduce((accu, curr) => {
    const boardIdx = rowIdx * 5 + curr;
    if (board[boardIdx].marked) {
      return accu + 1;
    }
    return accu;
  }, 0);
  return markedCount === 5;
}

export function checkColumn(board: Tile[], idxOnBoard: number) {
  const columnIdx = idxOnBoard % 5;
  const markedCount = [0, 1, 2, 3, 4].reduce((accu, curr) => {
    const boardIdx = curr * 5 + columnIdx;
    console.log(board[boardIdx]);
    if (board[boardIdx].marked) {
      return accu + 1;
    }
    return accu;
  }, 0);
  return markedCount === 5;
}

export function checkDiagonal(board: Tile[]) {
  const diagonalForwardTiles = board.filter((tile) => {
    return tile.id > 0 && tile.id % 4 === 0 && tile.id < 24;
  });
  const diagonalBackwardTiles = board.filter((tile) => {
    return tile.id % 6 === 0;
  });
  return (
    diagonalForwardTiles.every((tile) => tile.marked) ||
    diagonalBackwardTiles.every((tile) => tile.marked)
  );
}
