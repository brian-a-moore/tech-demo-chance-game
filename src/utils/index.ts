import { SCORE_KEY, rounds } from "../constants";
import { Difficulty } from "../constants/enums";
import { bonusMap, cardMap, pointsMap } from "../constants/maps";
import { HighScore } from "../types";

const pickRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getCards = (difficulty: Difficulty): (number | string)[] => {
  const cardSet = cardMap.get(difficulty);
  const pointSet = pointsMap.get(difficulty);

  if (!cardSet || !pointSet) {
    throw new Error("Invalid difficulty");
  }
  const { cards, bombs } = cardSet;
  const { min, max } = pointSet;

  const values: (number | string)[] = new Array(cards);

  for (let i = 0; i < bombs; i++) values[i] = "X";

  for (let i = bombs; i < cards; i++) {
    values[i] = pickRandomNumber(min, max);
  }

  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }

  return values;
};

export const getBonus = (difficulty: Difficulty): number | null => {
  const chance = Math.random();

  if (chance <= 0.5) return null;

  const bonusSet = bonusMap.get(difficulty);

  if (!bonusSet) {
    throw new Error("Invalid difficulty");
  }

  const { min, max } = bonusSet;
  return pickRandomNumber(min, max);
};

export const getScore = (
  selectedValue: number,
  bonus: number | null
): number => {
  return bonus ? selectedValue * bonus : selectedValue;
};

export const showNumber = (number: number): string => {
  if (isNaN(number)) return "0";
  return Number.isInteger(number)
    ? number.toLocaleString()
    : number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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

export const intermissionDialog = (
  value: string | number,
  lives: number,
  round: number
) => {
  if (round < rounds.length - 1) {
    if (value === "X" && lives > 1) {
      return {
        color: "#FACC15",
        title: "You hit a bomb!",
        message: `You have ${
          lives - 1
        } live(s) left. You can either cash out or risk half of your score and continue. What will you do?`,
      };
    } else if (value === "X" && lives <= 1) {
      return {
        color: "#F87171",
        title: "You're out!",
        message: `You're out of lives. It's game over...`,
      };
    } else {
      return {
        color: "#34D399",
        title: "You survived!",
        message: `You can either cash out or risk half of your score and continue. What will you do?`,
      };
    }
  } else {
    if (value === "X" && lives <= 1) {
      return {
        color: "#F87171",
        title: "You're out!",
        message: `You're out of lives. It's game over...`,
      };
    } else {
      return {
        color: "#34D399",
        title: "You won!",
        message: `Your luck is outstanding! Try again and see if you can beat your score!`,
      };
    }
  }
};

export const resolveScore = (
  prevScore: number,
  roundScore: number | string | undefined,
  bonus: number | null | undefined
) => {
  if (Number.isInteger(roundScore)) {
    return prevScore + (roundScore as number) * (bonus || 1);
  } else {
    return prevScore;
  }
};
