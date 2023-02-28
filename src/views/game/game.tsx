import classNames from "classnames";
import React, { useState } from "react";
import Board, { Tile } from "../../components/board/board";
import Profile, { PlayerData } from "../../components/profile/profile";
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
  elapsedTime: number;
  profile: PlayerData | null;
  onDeleteProfile: () => void;
};

export function GameView({
  username,
  tiles,
  onMark,
  onAdvanceTurn,
  onReset,
  winCondition,
  picked,
  elapsedTime,
  profile,
  onDeleteProfile,
}: Props) {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const pickedValue = picked.map((number) =>
    number === 12 ? "Free" : tiles[number].value
  );
  return (
    <div className={css.content}>
      <Profile
        isOpen={profileIsOpen}
        setOpen={() => setProfileIsOpen(false)}
        playerData={profile}
        deleteProfile={onDeleteProfile}
      />
      <div className={css.header}>
        <div className={css.leftSide}>A game of Bingo</div>
        <div className={css.rightSide}>
          <div
            className={css.profile}
            role="button"
            onClick={() => setProfileIsOpen(true)}
          >
            {username}
          </div>
        </div>
      </div>
      <div className={css.gameView}>
        <Board tiles={tiles} onMark={onMark} />
        <div className={css.announcement} data-testid="announcement">
          <div>Tiles picked: {pickedValue.join(", ")}</div>
          {!!winCondition ? (
            <div className={css.victory}>
              🎉 You won by matching {winCondition} after {picked.length} turns.
              The game lasted for {elapsedTime} seconds 🎉
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
          <button
            type="button"
            className={classNames(css.button, css.ghostButton)}
            onClick={onReset}
          >
            Reset Board
          </button>
        </div>
      </div>
    </div>
  );
}
