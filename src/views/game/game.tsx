import React from "react";
import Board, { Tile } from "../../components/board";
import { WinCondition } from "./data";

import css from "./game.module.scss";

type Props = {
  username: string;
  tiles: Tile[];
  onMark: (tiles: Tile[], id: number) => void;
  won: WinCondition;
};

export function GameView({ username, tiles, onMark, won }: Props) {
  return (
    <div className={css.gameView}>
      Hello {username}
      <Board tiles={tiles} onMark={onMark} />
      {won ? `You won by ${won}` : null}
    </div>
  );
}
