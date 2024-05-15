import { Difficulty } from "../constants/enums";
import { cardMap } from "../constants/maps";
import { showNumber } from "../utils";

type Props = {
  bonus: number | null;
  difficulty: Difficulty;
};

const RoundInfo: React.FC<Props> = ({ bonus, difficulty }) => {
  const { cards, bombs } = cardMap.get(difficulty)!;

  return (
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
          <td>{cards}</td>
          <td>{bombs}</td>
          <td>{bonus ? `x${bonus}` : ""}</td>
          <td>{showNumber(100 - (bombs / cards) * 100)}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RoundInfo;
