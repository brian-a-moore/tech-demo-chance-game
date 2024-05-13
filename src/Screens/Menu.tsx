import React from "react";
import { Button } from "../components/Button";
import TextInput from "../components/TextInput";

type Props = {
  startGame: () => void;
  seeHighScores: () => void;
  setCurrentPlayer: (initials: string) => void;
};

const MenuScreen: React.FC<Props> = ({
  startGame,
  setCurrentPlayer,
  seeHighScores,
}) => {
  const [initials, setInitials] = React.useState<string>("");

  const _startGame = () => {
    setCurrentPlayer(initials);
    startGame();
  };

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-3xl font-bold">What Will You Risk?</h1>
      <p className='text-sm opacity-50 mt-[-0.5rem]'>By: Brian Moore</p>
      <p className="text-sm text-center">
        Play round after round of lowering chances of survival to get the
        highest score possible.
      </p>
      <hr />
      <div className="flex gap-x-4">
        <TextInput
          disabled={false}
          label="Identify Yourself"
          onChange={(e) => setInitials(e.target.value)}
        />
      <Button disabled={initials.length < 3} onClick={_startGame}>
        New Game
      </Button>
      </div>
      <div className="scale-[0.75] opacity-60">
        <Button variant="transparent" onClick={seeHighScores}>
          High Scores
        </Button>
      </div>
    </div>
  );
};

export default MenuScreen;
