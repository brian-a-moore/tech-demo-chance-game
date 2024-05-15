export type GameState = {
  player: string;
  score: number;
  round: number;
  lives: number;
};

export type HighScore = {
  initials: string;
  score: number;
};

export type RoundState = {
  bonus: number | null;
  cards: (string | number)[];
  selectedCard: {
    index: number;
    value: string | number;
  };
};
