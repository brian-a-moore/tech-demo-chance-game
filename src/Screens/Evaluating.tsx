import React, { useEffect } from "react";
import { RoundState } from "../App";
import { Button } from "../components/Button";
import { getScore, showNumber } from "../utils";

type Props = {
  score: number;
  lastLevel: boolean;
  roundState: RoundState;
  lives: number;
  loseLife: () => void;
  nextLevel: (score: number) => void;
  gameOver: (score: number | undefined) => void;
};

const EvaluatingScreen: React.FC<Props> = ({
  score,
  lastLevel,
  roundState,
  lives,
  loseLife,
  nextLevel,
  gameOver,
}) => {
  const { selectedValue, multiplier } = roundState;
  const roundScore = getScore(selectedValue as number, multiplier);

  useEffect(() => {
    const audio = new Audio("../../public/evaluating.mp3");
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  const timer = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (lives > 1) {
      timer.current = setTimeout(() => {
        nextLevel(roundScore);
        if(selectedValue === "X") {
          loseLife();
        }
      }, 10000);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [selectedValue, nextLevel, roundScore, timer, loseLife, lives]);

  const _bankAndQuit = () => {
    if (timer.current) clearTimeout(timer.current);
    gameOver(roundScore);
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      {selectedValue === "X" && lives === 1 ? (
        <h1 className="text-red-400 text-lg font-semibold">You lost...</h1>
      ) : selectedValue === "X" ? (
        <h1 className="text-yellow-400 text-lg font-semibold">
          {lastLevel ? "You won!" : "You've been hurt!"}
        </h1>  
      ) : (
        <h1 className="text-green-400 text-lg font-semibold">
          {lastLevel ? "You won!" : "You survived!"}
        </h1>
      )}
      {selectedValue !== "X" ? (
        <>
          <h2>Round Score</h2>
          <p className="text-2xl font-bold mb-4">{showNumber(roundScore)}</p>
          <p className="bg-teal-600 px-4 py-2 rounded-md shadow-md mt-[-1rem] text-center">
            Cash out now to keep all your winnings <br /> or continue and risk
            half for higher rewards!
          </p>
        </>
      ) : lives === 1 ? (
        <p>You lost half of your current score, your final score is: <span className="font-bold font-mono">{showNumber(score !== 0 ? score / 2 : 0)}</span></p>
      ) : (
        <p>You have lost a life, but you have {lives -1} remaining...</p>
      )}
      <hr />
      {selectedValue === "X" && lives === 1 ? (
        <Button variant="destructive" onClick={() => gameOver(undefined)}>
          End Game
        </Button>
      ) : (
        <div
          className={`flex w-full items-center ${
            lastLevel ? "justify-center" : "justify-between"
          }`}
        >
          <CountdownTimer />
          <Button onClick={_bankAndQuit}>
            {lastLevel ? "End Game" : "Cash Out"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EvaluatingScreen;

const CountdownTimer = () => {
  const [countdown, setCountdown] = React.useState(10);
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

  return <p>Next round begins in {countdown} second(s)</p>;
};
