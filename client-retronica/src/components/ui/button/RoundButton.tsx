import { FC } from 'react';
import { IconType } from 'react-icons';

interface IRoundButton {
  Icon: IconType;
  onClick?: () => void;
  number?: number;
}

const RoundButton: FC<IRoundButton> = ({ Icon, onClick, number }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-colors duration-200 hover:bg-primary/90"
    >
      {!!number && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 text-[0.75rem] font-bold text-secondary">
          {number}
        </span>
      )}
      <Icon className="text-black" size={21} />
    </button>
  );
};

export default RoundButton;
