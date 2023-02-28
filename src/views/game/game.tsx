import React from "react";
import Board, { Tile } from "../../components/board";
import { WinCondition } from "./data";

import css from "./game.module.scss";

type Props = {
  username: string;
  tiles: Tile[];
  onMark: (tiles: Tile[], id: number) => void;
  onAdvanceTurn: () => void;
  onReset: () => void;
  winCondition: WinCondition;
  picked: number[];
  elapsedTime: string;
  timeStart: Date | null;
};

export function GameView({
  username,
  tiles,
  onMark,
  winCondition,
  onAdvanceTurn,
  onReset,
  picked,
  elapsedTime,
  timeStart,
}: Props) {
  const pickedValue = picked.map((number) =>
    number === 12 ? "Free" : tiles[number].value
  );
  return (
    <div className={css.content}>
      <div className={css.header}>Hello {username}</div>
      <div className={css.gameView}>
        <Board tiles={tiles} onMark={onMark} />
        <div className={css.announcement}>
          <div>Tiles picked: {pickedValue.join(", ")}</div>
          {!!winCondition ? (
            <div className={css.victory}>
              You won by matching {winCondition} after {picked.length} turns.
              The game lasted for {elapsedTime}.
            </div>
          ) : null}
        </div>
        <div className={css.interactions}>
          <button
            disabled={!!winCondition}
            type="button"
            className={css.button}
            onClick={onAdvanceTurn}
          >
            Get Number
          </button>
          <button type="button" className={css.button} onClick={onReset}>
            Reset Board
          </button>
        </div>
      </div>
    </div>
  );
}
