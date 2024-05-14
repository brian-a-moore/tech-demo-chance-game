import { Difficulty } from "./enums";

export const buttonMap = new Map([
  [Difficulty.EASY, { buttons: 20, bombs: 1 }], // 95%
  [Difficulty.MEDIUM, { buttons: 10, bombs: 1 }], // 90%
  [Difficulty.HARD, { buttons: 10, bombs: 2 }], // 80%
  [Difficulty.VERY_HARD, { buttons: 4, bombs: 1 }], // 75%
  [Difficulty.EXTREME, { buttons: 3, bombs: 1 }], // 66%
  [Difficulty.IMPOSSIBLE, { buttons: 2, bombs: 1 }], // 50%
]);

export const difficultyLabelMap = new Map([
  [Difficulty.EASY, "Easy"],
  [Difficulty.MEDIUM, "Medium"],
  [Difficulty.HARD, "Hard"],
  [Difficulty.VERY_HARD, "Very Hard"],
  [Difficulty.EXTREME, "Extreme"],
  [Difficulty.IMPOSSIBLE, "Impossible"],
]);

export const pointsMap = new Map([
  [Difficulty.EASY, { min: 1, max: 10 }],
  [Difficulty.MEDIUM, { min: 5, max: 15 }],
  [Difficulty.HARD, { min: 10, max: 20 }],
  [Difficulty.VERY_HARD, { min: 15, max: 25 }],
  [Difficulty.EXTREME, { min: 20, max: 30 }],
  [Difficulty.IMPOSSIBLE, { min: 25, max: 35 }],
]);

export const multiplierMap = new Map([
  [Difficulty.EASY, { min: 2, max: 3 }],
  [Difficulty.MEDIUM, { min: 2, max: 4 }],
  [Difficulty.HARD, { min: 3, max: 5 }],
  [Difficulty.VERY_HARD, { min: 3, max: 6 }],
  [Difficulty.EXTREME, { min: 5, max: 15 }],
  [Difficulty.IMPOSSIBLE, { min: 10, max: 20 }],
]);
