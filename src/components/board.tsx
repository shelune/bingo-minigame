import React from "react";
import classnames from "classnames";

import css from "./board.module.scss";

export type Tile = {
  id: number;
  value: number;
  marked: boolean;
};

export type Props = {
  tiles: Tile[];
  onMark: (tiles: Tile[], id: number) => void;
};

export default function Board({ tiles, onMark }: Props) {
  return (
    <div className={css.content}>
      <h1 className={css.title}>
        {["B", "I", "N", "G", "O"].map((letter) => (
          <div key={letter}>
            <span>{letter}</span>
          </div>
        ))}
      </h1>
      <div className={css.board}>
        {tiles.map((tile, idx) => {
          return (
            <div
              className={classnames(css.tile, {
                [css.marked]: tile.marked,
              })}
              onClick={() => {
                onMark(tiles, tile.id);
              }}
              key={tile.id}
            >
              {idx === 12 ? "Free" : tile.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
