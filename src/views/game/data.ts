import { ComponentProps, useState } from "react";
import { Tile } from "../../components/board";
import { GameView } from "./game";
import { checkColumn, checkDiagonal, checkRow, getBoardNumbers } from "./utils";

export type WinCondition = "column" | "row" | "diagonal" | "";

export const useData = (): Omit<
  ComponentProps<typeof GameView>,
  "username"
> => {
  const numbers = getBoardNumbers().flat();
  const initTiles: Tile[] = numbers.map((number, idx) => {
    return {
      id: idx,
      value: number,
      marked: false,
    };
  });
  const [tiles, setTiles] = useState(initTiles);
  const [won, setWon] = useState<WinCondition>("");

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
  };
};
