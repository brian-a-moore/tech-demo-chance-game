import React, { useEffect, useRef } from "react";
import { Button } from "../components/Button";
import Dialog from "../components/Dialog";
import { rounds } from "../constants";
import { GameState, RoundState } from "../types";
import {
  getScore,
  intermissionDialog,
  resolveScore,
  showNumber,
} from "../utils";

type Props = {
  endGame: () => void;
  gameState: GameState;
  nextRound: () => void;
  roundState: RoundState;
};

const IntermissionScreen: React.FC<Props> = ({
  endGame,
  gameState,
  nextRound,
  roundState,
}) => {
  const { bonus, selectedCard } = roundState;
  const roundScore = getScore(selectedCard.value as number, bonus);
  const isGameOver =
    (gameState.lives <= 1 && selectedCard.value === "X") ||
    gameState.round >= rounds.length - 1;

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const audio = new Audio("../../intermission.mp3");
    audio.loop = true;
    audio.play();

    timer.current = setTimeout(() => {
      isGameOver ? endGame() : nextRound();
    }, 7000);

    return () => {
      audio.pause();
      clearTimeout(timer.current);
    };
  }, [endGame, isGameOver, nextRound]);

  const _cashOut = () => {
    clearTimeout(timer.current);
    endGame();
  };

  const { color, title, message } = intermissionDialog(
    selectedCard.value,
    gameState.lives,
    gameState.round
  );

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-xl font-bold" style={{ color }}>
        {title}
      </h1>
      {selectedCard.value !== "X" || gameState.lives > 1 ? (
        <table>
          <thead>
            <tr>
              <th>Current Score</th>
              <th>Round Score</th>
              <th>{isGameOver ? "Final" : "New"} Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{showNumber(gameState.score)}</td>
              <td>+{showNumber(roundScore)}</td>
              <td>
                {showNumber(
                  resolveScore(gameState.score, roundScore, undefined)
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Final Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{gameState.score === 0 ? 0 : gameState.score * 0.5}</td>
            </tr>
          </tbody>
        </table>
      )}
      <Dialog>{message}</Dialog>
      {!isGameOver && <Button onClick={_cashOut}>Cash Out</Button>}
      {!isGameOver && (
        <>
          <hr />
          <CountdownTimer />
        </>
      )}
    </div>
  );
};

export default IntermissionScreen;

const CountdownTimer = () => {
  const [countdown, setCountdown] = React.useState(7);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return <p className="text-sm">Next round begins in {countdown} second(s)</p>;
};
