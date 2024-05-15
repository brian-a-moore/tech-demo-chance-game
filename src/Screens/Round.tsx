import React, { useEffect } from "react";
import Card from "../components/Card";
import Dialog from "../components/Dialog";
import { CardContainer } from "../components/Layout";
import RoundInfo from "../components/RoundInfo";
import { Difficulty, SCREEN } from "../constants/enums";
import { RoundState } from "../types";
import { getBonus, getCards } from "../utils";

type Props = {
  difficulty: Difficulty;
  changeScreen: (screen: SCREEN) => void;
  resolveRound: (roundState: RoundState) => void;
};

type PlayState = {
  bonus: number | null;
  cards: (string | number)[];
};

const DEFAULT_PLAY_STATE = {
  bonus: null,
  cards: [],
};

const RoundScreen: React.FC<Props> = ({
  difficulty,
  changeScreen,
  resolveRound,
}) => {
  const [playState, setPlayState] =
    React.useState<PlayState>(DEFAULT_PLAY_STATE);

  useEffect(() => {
    const audio = new Audio("../../round.mp3");
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const cards = getCards(difficulty);
    const bonus = getBonus(difficulty);
    setPlayState((prevState) => ({
      ...prevState,
      cards,
      bonus,
    }));
  }, [difficulty]);

  const _pickCard = (index: number, value: string | number) => {
    resolveRound({
      selectedCard: { index, value },
      bonus: playState.bonus,
      cards: playState.cards,
    });
    changeScreen(SCREEN.REVEAL);
  };

  if (!playState.cards.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <RoundInfo difficulty={difficulty} bonus={playState.bonus} />
      <div className='flex justify-center'>
        <Dialog>Select your card...</Dialog>
      </div>
      <CardContainer>
        {playState.cards.map((value, index) => (
          <Card key={index} index={index} value={value} pickCard={_pickCard} />
        ))}
      </CardContainer>
    </div>
  );
};

export default RoundScreen;
