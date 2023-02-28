import { generateBoardTiles, getBoardNumbers } from "./utils";

const numbers = getBoardNumbers().flat();
const baseBoard = generateBoardTiles(numbers);

export const mockBareBoard = [
  { id: 0, marked: false, value: 2 },
  { id: 1, marked: false, value: 16 },
  { id: 2, marked: false, value: 39 },
  { id: 3, marked: false, value: 55 },
  { id: 4, marked: false, value: 61 },
  { id: 5, marked: false, value: 9 },
  { id: 6, marked: false, value: 25 },
  { id: 7, marked: false, value: 32 },
  { id: 8, marked: false, value: 53 },
  { id: 9, marked: false, value: 67 },
  { id: 10, marked: false, value: 10 },
  { id: 11, marked: false, value: 19 },
  { id: 12, marked: false, value: 45 },
  { id: 13, marked: false, value: 59 },
  { id: 14, marked: false, value: 63 },
  { id: 15, marked: false, value: 13 },
  { id: 16, marked: false, value: 27 },
  { id: 17, marked: false, value: 43 },
  { id: 18, marked: false, value: 47 },
  { id: 19, marked: false, value: 64 },
  { id: 20, marked: false, value: 7 },
  { id: 21, marked: false, value: 18 },
  { id: 22, marked: false, value: 38 },
  { id: 23, marked: false, value: 58 },
  { id: 24, marked: false, value: 71 },
];

export const mockWonBoardColumn = baseBoard.map((tile) => {
  // board win by 2nd column
  if (tile.id % 5 === 1) {
    return {
      ...tile,
      marked: true,
    };
  }
  return tile;
});

export const mockWonBoardRow = baseBoard.map((tile) => {
  // board win by first row
  if (Math.floor(tile.id / 5) === 0) {
    return {
      ...tile,
      marked: true,
    };
  }
  return tile;
});

export const mockWonBoardDiagonal = baseBoard.map((tile) => {
  // board win by backward slash
  if (tile.id % 6 === 0) {
    return {
      ...tile,
      marked: true,
    };
  }
  return tile;
});
