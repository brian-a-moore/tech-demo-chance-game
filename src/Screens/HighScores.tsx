import React from "react";
import { Button } from "../components/Button";
import { SCREEN } from "../constants/enums";
import { getHighScore, showNumber } from "../utils";

type Props = {
  changeScreen: (screen: SCREEN) => void;
};

const HighScoresScreen: React.FC<Props> = ({ changeScreen }) => {
  const highScores = getHighScore();

  const _goBack = () => {
    changeScreen(SCREEN.MENU);
  }

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className='text-lg font-bold'>High Scores</h1>
      {highScores.map((score, index) => (
        <div key={index} className="flex gap-x-2">
          <span className="w-12 bg-zinc-600 text-right px-2 font-semibold rounded-sm">
            {score.initials}
          </span>
          <span className="w-[84px] bg-zinc-500 text-left px-2 font-mono rounded-sm">
            {showNumber(score.score)}
          </span>
        </div>
      ))}
      <hr />
      <Button variant="transparent" onClick={_goBack}>Main Menu</Button>
    </div>
  );
};

export default HighScoresScreen;
