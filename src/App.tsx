import React, { useState } from "react";
import { GameView } from "./views/game";
import IntroView from "./views/intro/intro";

import "./styles/main.scss";

function App() {
  const [username, setUsername] = useState("");
  const [showingGame, setShowingGame] = useState(false);

  return (
    <div className="App">
      {username && showingGame ? (
        <GameView username={username} />
      ) : (
        <IntroView
          setUsername={setUsername}
          setShowingGame={setShowingGame}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
