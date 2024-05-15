import { mdiBomb, mdiCardsPlaying } from "@mdi/js";
import Icon from "@mdi/react";

type Props = {
  isRevealed?: boolean;
  index: number;
  value: string | number;
  selectedCard?: {
    index: number;
    value: string | number;
  }
  pickCard?: (index: number, value: string | number) => void;
};

const classNames= 'bg-zinc-300 w-12 h-[4.5rem] flex items-center justify-center text-zinc-600 font-bold rounded-md shadow-md';
const buttonClassNames ='hover:bg-zinc-400';

const Card: React.FC<Props> = ({ isRevealed = false, index, value, selectedCard, pickCard }) => {
  if(isRevealed) return (
    <div className={classNames} style={selectedCard?.index === index ? {
      border: '2px solid yellow',
      transform: 'scale(1.25)',
    } : {}}>
      {value === 'X' ? <Icon path={mdiBomb} color='#DC2626' size={1.25} /> : <span className='text-[rgba(0,0,0,0.5)] font-semibold'>+{value}</span>}
    </div>
  );
  return (
    <button
      className={`${classNames} ${buttonClassNames}`}
      onClick={() => pickCard && pickCard(index, value)}
    >
      <Icon path={mdiCardsPlaying} size={1.25} color="rgba(0,0,0,0.3" />
    </button>
  );
};

export default Card;