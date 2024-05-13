import { Difficulty } from "./enums";

// Total possible points: 5850
export const levels: Difficulty[] = [
  // 290
  Difficulty.EASY, // 30
  Difficulty.EASY, // 30
  Difficulty.MEDIUM, // 60
  Difficulty.MEDIUM, // 60
  Difficulty.HARD, // 100

  // 320
  Difficulty.EASY, // 30
  Difficulty.EASY, // 30
  Difficulty.MEDIUM, // 60
  Difficulty.HARD, // 100
  Difficulty.HARD, // 100

  // 470
  Difficulty.MEDIUM, // 60
  Difficulty.MEDIUM, // 60
  Difficulty.HARD, // 100
  Difficulty.HARD, // 100
  Difficulty.VERY_HARD, // 150

  // 820
  Difficulty.MEDIUM, // 60
  Difficulty.MEDIUM, // 60
  Difficulty.HARD, // 100
  Difficulty.VERY_HARD, // 150
  Difficulty.EXTREME, // 450

  // 950
  Difficulty.HARD, // 100
  Difficulty.HARD, // 100
  Difficulty.VERY_HARD, // 150
  Difficulty.VERY_HARD, // 150
  Difficulty.EXTREME, // 450

  /// 3000
  Difficulty.EXTREME, // 450
  Difficulty.EXTREME, // 450
  Difficulty.IMPOSSIBLE, // 700
  Difficulty.IMPOSSIBLE, // 700
  Difficulty.IMPOSSIBLE, // 700
];
