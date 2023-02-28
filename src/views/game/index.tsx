import React from "react";
import { useData } from "./data";
import { GameView as MainComponent } from "./game";

type Props = {
  username: string;
};

export const GameView = ({ username }: Props) => {
  const props = useData(username);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MainComponent username={username} {...props} />;
};
