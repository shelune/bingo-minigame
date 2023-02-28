import { ComponentProps, useEffect, useState } from "react";
import differenceInSeconds from "date-fns/differenceInSeconds";

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
  const [winCondition, setWinCondition] = useState<WinCondition>("");
  const [picked, setPicked] = useState<number[]>([]);
  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("");

  const onReset = () => {
    const newBoard = getNewBoard();
    setTiles(newBoard);
    setWinCondition("");
    setPicked([]);
    setTimeStart(null);
    setElapsedTime("");
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
    setPicked([...picked, id]);
    setTiles(newTiles);
    const hasRowWinner = checkRow(newTiles, id);
    const hasColumnWinner = checkColumn(newTiles, id);
    const hasDiagonalWinner = checkDiagonal(newTiles);
    if (hasRowWinner) {
      setWinCondition("row");
    }
    if (hasColumnWinner) {
      setWinCondition("column");
    }
    if (hasDiagonalWinner) {
      setWinCondition("diagonal");
    }
  };

  useEffect(() => {
    if (timeStart === null && picked.length !== 0) {
      setTimeStart(new Date());
    }
  }, [picked, timeStart]);

  useEffect(() => {
    if (!!winCondition && timeStart) {
      const elapsed = differenceInSeconds(new Date(), timeStart);
      setElapsedTime(`${elapsed} seconds`);
    }
  }, [timeStart, winCondition]);

  return {
    tiles,
    onMark,
    winCondition,
    onAdvanceTurn,
    onReset,
    picked,
    elapsedTime,
    timeStart,
  };
};
