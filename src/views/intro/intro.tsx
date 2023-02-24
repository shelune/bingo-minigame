import React, { useState } from "react";
import classNames from "classnames";

import css from "./intro.module.scss";

type Props = {
  setUsername: (name: string) => void;
  setShowingGame: (show: boolean) => void;
  username: string;
};

export default function IntroView({
  setUsername,
  setShowingGame,
  username,
}: Props) {
  const [error, setError] = useState("");

  return (
    <div className={css.gameView}>
      <div className={css.dialog}>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            setShowingGame(true);
          }}
        >
          <div className={css.formControl}>
            <label
              htmlFor="username"
              className={classNames(css.label, {
                [css.isEditing]: !!username,
              })}
            >
              Name
            </label>
            <input
              className={css.textInput}
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          {error && (
            <div data-testid="login-error" className={css.formError}>
              {error}
            </div>
          )}
          <div className={css.formFunctions}>
            <button
              type="submit"
              className={css.submitButton}
              data-testid="login-submit"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
