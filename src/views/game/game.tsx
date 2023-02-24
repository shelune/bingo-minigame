import React from "react";

import css from "./game.module.scss";

type Props = {
  username: string;
};

export default function GameView({ username }: Props) {
  return <div className={css.gameView}>Hello {username}</div>;
}
