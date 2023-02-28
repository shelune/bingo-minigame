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
  won: WinCondition;
};

export function GameView({
  username,
  tiles,
  onMark,
  won,
  onAdvanceTurn,
  onReset,
}: Props) {
  return (
    <div className={css.gameView}>
      Hello {username}
      <Board tiles={tiles} onMark={onMark} />
      {won ? `You won by ${won}` : null}
      <div className={css.interactions}>
        <button
          disabled={!!won}
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
  );
}
