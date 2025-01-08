# Chance Game

This application is designed to showcase a foundational understand of React, styling and working with multimedia and state management. It is an interactive game and is available to demo via Vercel.

## Run the Game

In the root directory, run the following:
- `npm install` to install the dependencies
- `npm run dev` to start the application

## How to Play

"What Will You Risk?" is a game purely based on chance and your willingness to take risks. In each round, you're presented with cards ranging from two to twenty. Each card holds a random value within a certain range, determined by the difficulty level. A card could also contain a bomb. If you click on a bomb, your game ends, and you retain 50% of your current score. If you click on a value, that value is added to your current score. If there's a "Bonus", your score is multiplied by the bonus. Each round, there is a 50% chance you get a bonus and the bonus will be a random value within a range that increases with the difficulty.

As you progress through the rounds, the game becomes riskier. The point values and bonuses increase, but your survival chances decrease (to as low as 50%). After each round, you can decide to "Cash Out" (end the game and keep your current score) or continue playing, risking losing half of your score.

The game consists of 25 rounds in total.

At the end of the game, if you have a top ten all-time score, it will be saved with the others in local storage on your browser.
