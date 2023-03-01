import React from "react";
import classNames from "classnames";

import css from "./intro.module.scss";

type Props = {
  setUsername: (name: string) => void;
  setShowingGame: (show: boolean) => void;
  username: string;
};

export function IntroView({ setUsername, setShowingGame, username }: Props) {
  return (
    <div className={css.content}>
      <div className={css.dialog}>
        <h1>Let's play Bingo!</h1>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            setShowingGame(true);
          }}
        >
          <div className={css.formControl}>
            <label htmlFor="username" className={css.label}>
              Player name
            </label>
            <input
              className={classNames(css.textInput, {
                [css.isEditing]: !!username,
              })}
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              maxLength={25}
            />
          </div>
          <div className={css.formFunctions}>
            <button type="submit" className={css.button} disabled={!username}>
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
