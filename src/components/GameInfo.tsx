import { rounds } from "../constants";
import { difficultyLabelMap } from "../constants/maps";
import { GameState } from "../types";

type Props = {
    gameState: GameState;
}

const GameInfo: React.FC<Props> = ({ gameState }) => {
    const { player, score, round, lives } = gameState;

    return (
        <div className="flex flex-col gap-y-2 w-full max-w-[690px]">
          <table className="bg-zinc-600 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th>Player</th>
                <th>Round</th>
                <th>Difficulty</th>
                <th>Remaining Lives</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{player?.toUpperCase()}</td>
                <td>{round + 1}</td>
                <td>{difficultyLabelMap.get(rounds[round])}</td>
                <td>{lives}/3</td>
                <td>{score}</td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}

export default GameInfo;