import { Difficulty } from "../constants/enums";
import { buttonMap, multiplierMap, pointsMap } from "../constants/maps";

const pickRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateButtonValues = (
  difficulty: Difficulty
): (number | string)[] => {
  const buttonSet = buttonMap.get(difficulty);
  const pointSet = pointsMap.get(difficulty);
  if (!buttonSet || !pointSet) {
    throw new Error("Invalid difficulty");
  }
  const { buttons, bombs } = buttonSet;
  const { min, max } = pointSet;

  const values: (number | string)[] = new Array(buttons);

  for (let i = 0; i < bombs; i++) {
    values[i] = "X";
  }

  for (let i = bombs; i < buttons; i++) {
    values[i] = pickRandomNumber(min, max);
  }

  // Shuffle the array
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  return values;
};

export const generateMultiplier = (difficulty: Difficulty): number | null => {
  const chance = Math.random();

  if (chance <= 0.5) {
    return null;
  }

  const multiplierSet = multiplierMap.get(difficulty);

  if (!multiplierSet) {
    throw new Error("Invalid difficulty");
  }

  const { min, max } = multiplierSet;
  return pickRandomNumber(min, max);
};

export const getScore = (
  selectedValue: number,
  multiplier: number | null
): number => {
  return multiplier ? selectedValue * multiplier : selectedValue;
};

export const showNumber = (number: number): string => {
  return Number.isInteger(number)
    ? number.toLocaleString()
    : number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SCORE_KEY = "HIGH_SCORES";

export const getHighScore = (): HighScore[] => {
  const rawHighScores = localStorage.getItem(SCORE_KEY);
  const highScores: HighScore[] = rawHighScores
    ? JSON.parse(rawHighScores)
    : [];
  return highScores;
};

export const saveScore = (initials: string, score: number): void => {
  const highScores = getHighScore();
  highScores.push({ initials: initials.toUpperCase(), score });
  highScores.sort((a, b) => b.score - a.score);

  if (highScores.length > 10) {
    highScores.pop();
  }

  localStorage.setItem(SCORE_KEY, JSON.stringify(highScores));
};

type HighScore = {
  initials: string;
  score: number;
};
