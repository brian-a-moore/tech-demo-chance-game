import React, { useEffect, useMemo } from "react";
import { EvaluatingScreen, MenuScreen, RoundScreen } from "../Screens";
import HighScores from "../Screens/HighScores";
import Screen from "../components/Screen";
import { levels } from "../constants";
import { GAME_STATE } from "../constants/enums";
import { difficultyLabelMap } from "../constants/maps";
import { saveScore, showNumber } from "../utils";

export type RoundState = {
  selectedValue: string | number;
  multiplier: number | null;
  buttons: (string | number)[];
};

const App: React.FC = () => {
  const [gameState, setGameState] = React.useState(GAME_STATE.MENU);
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(0);
  const [roundState, setRoundState] = React.useState<RoundState>();
  const [currentPlayer, setCurrentPlayer] = React.useState<string>();
  const audio = useMemo(() => new Audio("../../public/home.mp3"), []);

  useEffect(() => {
    audio.loop = true;

    if (![GAME_STATE.MENU, GAME_STATE.HIGH_SCORES].includes(gameState)) {
      audio.pause();
    } else {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [audio, gameState]);

  const _showScreen = () => {
    switch (gameState) {
      case GAME_STATE.HIGH_SCORES:
        return <HighScores goBack={() => setGameState(GAME_STATE.MENU)} />;
      case GAME_STATE.MENU:
        return (
          <MenuScreen
            startGame={_startGame}
            seeHighScores={_seeHighScores}
            setCurrentPlayer={_setCurrentPlayer}
          />
        );
      case GAME_STATE.PLAY_ROUND:
        return (
          <RoundScreen
            difficulty={levels[level]}
            setRoundState={_setRoundState}
          />
        );
      case GAME_STATE.EVALUATING:
        return (
          <EvaluatingScreen
            score={score}
            lastLevel={level === levels.length - 1}
            roundState={roundState as RoundState}
            nextLevel={_nextLevel}
            gameOver={_gameOver}
          />
        );
      default:
        return null;
    }
  };

  const _startGame = () => {
    setGameState(GAME_STATE.PLAY_ROUND);
  };

  const _seeHighScores = () => {
    setGameState(GAME_STATE.HIGH_SCORES);
  };

  const _nextLevel = (score: number) => {
    setRoundState(undefined);
    setLevel((prevState) => prevState + 1);
    setScore((prevState) => prevState + score);
    setGameState(GAME_STATE.PLAY_ROUND);
  };

  const _setRoundState = (roundState: RoundState) => {
    setRoundState(roundState);
    setGameState(GAME_STATE.EVALUATING);
  };

  const _gameOver = (incomingScore: number | undefined) => {
    if (incomingScore) {
      saveScore(currentPlayer as string, score + incomingScore);
    } else {
      saveScore(currentPlayer as string, score * 0.5);
    }
    setGameState(GAME_STATE.MENU);
    setScore(0);
    setLevel(0);
    setRoundState(undefined);
  };

  const _setCurrentPlayer = (initials: string) => {
    setCurrentPlayer(initials);
  };

  return (
    <Screen>
      {![GAME_STATE.MENU, GAME_STATE.HIGH_SCORES].includes(gameState) && (
        <div className="flex flex-col gap-y-2 w-full max-w-[690px]">
          <table className="bg-zinc-600 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th>Player</th>
                <th>Round</th>
                <th>Difficulty</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentPlayer}</td>
                <td>{level + 1}</td>
                <td>{difficultyLabelMap.get(levels[level])}</td>
                <td>{showNumber(
              roundState && roundState?.selectedValue !== "X"
                ? score +
                    (roundState?.selectedValue as number) * (roundState?.multiplier || 1)
                : score
            )}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="w-full max-w-[690px] bg-zinc-700 p-4 rounded-lg shadow-lg">
        {_showScreen()}
      </div>
    </Screen>
  );
};

export default App;
