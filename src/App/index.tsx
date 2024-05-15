import React, { useEffect, useMemo } from "react";
import { IntermissionScreen, MenuScreen, RevealScreen, RoundScreen } from "../Screens";
import HighScores from "../Screens/HighScores";
import GameInfo from "../components/GameInfo";
import { Window, WindowContent } from "../components/Layout";
import { rounds } from "../constants";
import { SCREEN } from "../constants/enums";
import { GameState, RoundState } from "../types";
import { resolveScore, saveScore } from "../utils";

const DEFAULT_GAME_STATE: GameState = {
  player: '',
  score: 0,
  round: 0,
  lives: 3
}

const App: React.FC = () => {
  const [screen, setScreen] = React.useState(SCREEN.MENU);
  const [gameState, setGameState] = React.useState<GameState>(DEFAULT_GAME_STATE);
  const [roundState, setRoundState] = React.useState<RoundState>();

  const audio = useMemo(() => new Audio("../../public/home.mp3"), []);

  useEffect(() => {
    audio.loop = true;
    if (![SCREEN.MENU, SCREEN.HIGH_SCORES].includes(screen)) {
      audio.pause();
    } else {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [audio, screen]);

  const _setPlayerName = (player: string) => {
    setGameState(prevState => ({
      ...prevState,
      player
    }));
  };

  const _changeScreen = (screen: SCREEN) => {
    setScreen(screen);
  }

  const _resolveRound = (roundState: RoundState) => {
    setRoundState(roundState);
  };

  const _nextRound = () => {
    setGameState(prevState => ({
      ...prevState,
      lives: roundState?.selectedCard.value === "X" ? prevState.lives - 1 : prevState.lives,
      round: prevState.round + 1,
      score: resolveScore(prevState.score, roundState?.selectedCard.value, roundState?.bonus)
    }));
    setScreen(SCREEN.ROUND);
    setRoundState(undefined);
  }

  const _endGame = () => {
    let finalScore: number;
    if (roundState?.selectedCard.value !== "X") {
      finalScore = resolveScore(gameState.score, roundState?.selectedCard.value, roundState?.bonus);
    } else {
      finalScore = gameState.score === 0 ? 0 : gameState.score * 0.5
    }

    saveScore(gameState.player, finalScore);
    setScreen(SCREEN.HIGH_SCORES);
    setGameState(DEFAULT_GAME_STATE);
    setRoundState(undefined);
  };

  const _showScreen = () => {
    switch (screen) {
      case SCREEN.HIGH_SCORES:
        return <HighScores changeScreen={_changeScreen} />;
      case SCREEN.MENU:
        return <MenuScreen changeScreen={_changeScreen} setPlayerName={_setPlayerName} />;
      case SCREEN.REVEAL:
        return <RevealScreen changeScreen={_changeScreen} difficulty={rounds[gameState.round]} roundState={roundState as RoundState} />;
      case SCREEN.ROUND:
        return <RoundScreen changeScreen={_changeScreen} difficulty={rounds[gameState.round]} resolveRound={_resolveRound} />
      case SCREEN.INTERMISSION:
        return <IntermissionScreen endGame={_endGame} gameState={gameState} nextRound={_nextRound} roundState={roundState as RoundState} />;
      default:
        return null;
    }
  };

  return (
    <Window>
      {[SCREEN.ROUND, SCREEN.REVEAL].includes(screen) && (<GameInfo gameState={gameState} />)}
      <WindowContent>{_showScreen()}</WindowContent>
    </Window>
  );
};

export default App;
