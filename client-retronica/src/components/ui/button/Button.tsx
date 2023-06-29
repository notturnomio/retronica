import cn from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'yellow' | 'white';
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  theme,
  ...rest
}) => {
  return (
    <button
      className={cn(
        'rounded-full font-medium shadow px-8 py-2',
        {
          'text-black bg-primary': theme === 'yellow',
          'text-primary bg-bg_light': theme === 'white'
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
