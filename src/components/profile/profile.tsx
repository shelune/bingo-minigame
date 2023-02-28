import React from "react";
import classNames from "classnames";

import css from "./profile.module.scss";
import { WinCondition } from "../../views/game/data";

export type PlayerData = {
  name: string;
  gamesCount: number;
  totalTimeSpent: number;
  recentGames: {
    winCondition: WinCondition;
    turns: number;
    elapsedTime: number;
  }[];
};

type Props = {
  setOpen: () => void;
  isOpen: boolean;
  playerData: PlayerData | null;
  deleteProfile: () => void;
};

export default function Profile({
  setOpen,
  isOpen,
  playerData,
  deleteProfile,
}: Props) {
  return (
    <div
      className={classNames(css.content, {
        [css.isOpen]: isOpen,
      })}
    >
      <div className={css.profileHeader}>
        <div role="button" onClick={setOpen} className={css.closeButton}>
          &gt; Close
        </div>
        <h2>Profile</h2>
      </div>
      {playerData ? (
        <>
          <div className={css.profileBody}>
            <h3>{playerData.name}'s statistics</h3>
            <div>
              <div>Total games played: {playerData.gamesCount}</div>
              <div>
                Total time played (seconds): {playerData.totalTimeSpent}s
              </div>
              <div>
                <span>Latest 5 games summary:</span>
                <ul>
                  {playerData.recentGames.map((game) => (
                    <li>
                      Won by{" "}
                      <span className={css.hightlight}>
                        {game.winCondition}
                      </span>{" "}
                      in <span className={css.hightlight}>{game.turns}</span>{" "}
                      turns (
                      <span className={css.hightlight}>{game.elapsedTime}</span>{" "}
                      seconds)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={css.profileFooter}>
            <button
              className={css.button}
              type="button"
              onClick={deleteProfile}
            >
              Delete Profile
            </button>
          </div>
        </>
      ) : (
        <div className={css.profileError}>
          No record of this player yet. Please play some games first!
        </div>
      )}
    </div>
  );
}
