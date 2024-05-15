import React, { useEffect, useRef } from "react";
import Card from "../components/Card";
import Dialog from "../components/Dialog";
import { CardContainer } from "../components/Layout";
import RoundInfo from "../components/RoundInfo";
import { Difficulty, SCREEN } from "../constants/enums";
import { RoundState } from "../types";

type Props = {
  changeScreen: (screen: SCREEN) => void;
  difficulty: Difficulty;
  roundState: RoundState;
};

const RevealScreen: React.FC<Props> = ({ changeScreen, difficulty, roundState }) => {
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const survived = new Audio("../../public/survived.mp3");
    const failed = new Audio("../../public/failed.mp3");

    survived.volume = 0.6;

    if(roundState.selectedCard.value === 'X') {
      failed.play();
    } else {
      survived.play();
    }

    timer.current = setTimeout(() => {
      changeScreen(SCREEN.INTERMISSION);
    }, 8000);

    return () => {
      failed.pause();
      survived.pause();
      clearTimeout(timer.current);
    };
  }, [changeScreen, roundState.selectedCard.value]);

  return (
    <div className="flex flex-col gap-y-4">
      <RoundInfo difficulty={difficulty} bonus={roundState.bonus} />
      <div className='flex justify-center'>
        <Dialog>{roundState.selectedCard.value === 'X' ? 'Oh no! You selected a bomb!' : 'Congrats! Your score is going up!'}</Dialog>
      </div>
      <CardContainer>
        {roundState.cards.map((card, index) => (
          <Card key={index} isRevealed index={index} value={card} selectedCard={roundState.selectedCard} />
        ))}
      </CardContainer>
    </div>
  );
};

export default RevealScreen;
