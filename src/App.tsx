import React, { useState } from "react";
import { GameView } from "./views/game";
import IntroView from "./views/intro/intro";

function App() {
  const [username, setUsername] = useState("Stranger");
  const [showingGame, setShowingGame] = useState(true);

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
