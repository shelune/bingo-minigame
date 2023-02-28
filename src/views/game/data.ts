import { ComponentProps, useEffect, useState } from "react";
import differenceInSeconds from "date-fns/differenceInSeconds";

import { Tile } from "../../components/board/board";
import { GameView } from "./game";
import {
  checkColumn,
  checkDiagonal,
  checkRow,
  getBoardNumbers,
  getNumberFromRange,
} from "./utils";
import { useStorage } from "../../utils/hooks/useStorage";
import { PlayerData } from "../../components/profile/profile";

export type WinCondition = "column" | "row" | "diagonal" | "";

export const useData = (
  username: string
): Omit<ComponentProps<typeof GameView>, "username"> => {
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
  const [elapsedTime, setElapsedTime] = useState(0);

  const { storedValue, setValue, clearKey } = useStorage<PlayerData>(
    `bingo-player-${username}`
  );

  const onReset = () => {
    // Save to profile
    if (!storedValue) {
      setValue({
        name: username,
        gamesCount: 1,
        totalTimeSpent: elapsedTime,
        recentGames: [
          {
            winCondition,
            turns: picked.length,
            elapsedTime: elapsedTime,
          },
        ],
      });
    } else {
      const { gamesCount, totalTimeSpent, recentGames } = storedValue;
      setValue({
        ...storedValue,
        gamesCount: gamesCount + 1,
        totalTimeSpent: totalTimeSpent + elapsedTime,
        recentGames: [
          ...recentGames,
          {
            winCondition,
            turns: picked.length,
            elapsedTime: elapsedTime,
          },
        ].slice(0, 5),
      });
    }

    // Reset
    const newBoard = getNewBoard();
    setTiles(newBoard);
    setWinCondition("");
    setPicked([]);
    setTimeStart(null);
    setElapsedTime(0);
  };

  const onAdvanceTurn = () => {
    const newNumber = getNumberFromRange(tiles.length, picked);
    setPicked([...picked, newNumber]);
    onMark(tiles, newNumber);
  };

  const onMark = (tiles: Tile[], id: number) => {
    if (picked.includes(id)) {
      return;
    }
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

  const onDeleteProfile = () => {
    clearKey();
  };

  useEffect(() => {
    if (timeStart === null && picked.length !== 0) {
      setTimeStart(new Date());
    }
  }, [picked, timeStart]);

  useEffect(() => {
    if (!!winCondition && timeStart) {
      const elapsed = differenceInSeconds(new Date(), timeStart);
      setElapsedTime(elapsed);
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
    profile: storedValue,
    onDeleteProfile,
  };
};
