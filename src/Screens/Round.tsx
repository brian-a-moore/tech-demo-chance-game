import { mdiBomb, mdiCardsPlaying } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect } from "react";
import { RoundState } from "../App";
import { Difficulty } from "../constants/enums";
import { buttonMap } from "../constants/maps";
import { generateButtonValues, generateMultiplier, showNumber } from "../utils";

type Props = {
  difficulty: Difficulty;
  setRoundState: (roundState: RoundState) => void;
};

const RoundScreen: React.FC<Props> = ({ difficulty, setRoundState }) => {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [buttons, setButtons] = React.useState<(string | number)[]>([]);
  const [multiplier, setMultiplier] = React.useState<number | null>(null);

  useEffect(() => {
    const audio = new Audio('../../public/round.mp3');
    const audio2 = new Audio('../../public/choice_made.mp3');
    audio2.volume = 0.6;

    if(!isRevealed) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
      audio2.play();
    }

    return () => {
      audio.pause();
      audio2.pause();
    };
  }, [isRevealed]);

  useEffect(() => {
    const buttonValues = generateButtonValues(difficulty);
    const multiplierValue = generateMultiplier(difficulty);
    setButtons(buttonValues);
    setMultiplier(multiplierValue);
  }, [difficulty]);

useEffect(() => {
  let timer: number;

  const _completeRound = () => {
    if (selectedIndex !== undefined) {
      setRoundState({
        selectedValue: buttons[selectedIndex],
        multiplier,
        buttons,
      });
    } else {
      throw new Error("GAME ERROR: No value selected");
    }
  };

  if (isRevealed) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    timer = setTimeout(() => {
      _completeRound();
    }, 7000);
  }

  return () => {
    clearTimeout(timer);
  };
}, [buttons, isRevealed, multiplier, selectedIndex, setRoundState]);

  const _setRevealed = (index: number) => {
    setIsRevealed(true);
    setSelectedIndex(index);
  };

  const set = buttonMap.get(difficulty);

  if (!set) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <table>
        <thead>
          <tr>
            <th>Cards</th>
            <th>Bombs</th>
            <th>Bonus</th>
            <th>Survival</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{set.buttons}</td>
            <td>{set.bombs}</td>
            <td>{multiplier ? `x${multiplier}` : ""}</td>
            <td>{showNumber(100 - (set.bombs / set.buttons) * 100)}%</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center">
        <p className="bg-teal-600 px-4 py-2 rounded-md shadow-md">
          {isRevealed ? "You selected..." : "Select your card, good luck!"}
        </p>
      </div>
      <div className="bg-zinc-800 flex gap-4 flex-wrap items-center justify-center p-4 rounded-md">
        {buttons.map((value, index) => (
          <Card
            key={index}
            index={index}
            value={value}
            isRevealed={isRevealed}
            selectedIndex={selectedIndex}
            onClick={() => _setRevealed(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoundScreen;

const Card = ({
  value,
  index,
  selectedIndex,
  isRevealed,
  onClick,
}: {
  value: string | number;
  index: number;
  selectedIndex: number | undefined;
  isRevealed: boolean;
  onClick: () => void;
}) => {
  const isSelected = selectedIndex === index;
  return (
    <button
      disabled={isRevealed}
      className={`bg-zinc-300 enabled:hover:bg-zinc-400 w-12 h-[4.5rem] flex items-center justify-center text-zinc-600 font-bold rounded-md shadow-md ${
        isSelected ? "transform scale-125 border-yellow-300 border-2" : ""
      }`}
      onClick={onClick}
    >
      {isRevealed && value !== "X" ? (
        `+${value}`
      ) : (
        <Icon
          path={isRevealed ? mdiBomb : mdiCardsPlaying}
          size={1.25}
          color={isRevealed ? "#EF4444" : "rgba(0,0,0,0.3"}
        />
      )}
    </button>
  );
};
