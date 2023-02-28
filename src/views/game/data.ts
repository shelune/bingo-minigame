import { ComponentProps, useState } from "react";
import { Tile } from "../../components/board";
import { GameView } from "./game";
import {
  checkColumn,
  checkDiagonal,
  checkRow,
  getBoardNumbers,
  getNumberFromRange,
} from "./utils";

export type WinCondition = "column" | "row" | "diagonal" | "";

export const useData = (): Omit<
  ComponentProps<typeof GameView>,
  "username"
> => {
  const getNewBoard = () => {
    const numbers = getBoardNumbers().flat();
    const tiles: Tile[] = numbers.map((number, idx) => {
      return {
        id: idx,
        value: number,
        marked: false,
      };
    });
    return tiles;
  };
  const [tiles, setTiles] = useState(getNewBoard());
  const [won, setWon] = useState<WinCondition>("");
  const [picked, setPicked] = useState<number[]>([]);

  const onReset = () => {
    const newBoard = getNewBoard();
    setTiles(newBoard);
    setWon("");
    setPicked([]);
  };

  const onAdvanceTurn = () => {
    const newNumber = getNumberFromRange(tiles.length, picked);
    setPicked([...picked, newNumber]);
    onMark(tiles, newNumber);
  };

  const onMark = (tiles: Tile[], id: number) => {
    const newTiles = tiles.slice();
    const newTile = newTiles.find((tile) => tile.id === id);
    if (newTile) {
      newTiles[id].marked = true;
    }
    setTiles(newTiles);
    const hasRowWinner = checkRow(newTiles, id);
    const hasColumnWinner = checkColumn(newTiles, id);
    const hasDiagonalWinner = checkDiagonal(newTiles);
    if (hasRowWinner) {
      setWon("row");
    }
    if (hasColumnWinner) {
      setWon("column");
    }
    if (hasDiagonalWinner) {
      setWon("diagonal");
    }
  };

  return {
    tiles,
    onMark,
    won,
    onAdvanceTurn,
    onReset,
  };
};
