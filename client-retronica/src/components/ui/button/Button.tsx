import cn from 'clsx';
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'yellow' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  theme,
  size = 'md',
  ...rest
}) => {
  return (
    <button
      className={cn(
        'rounded-full font-medium shadow transition duration-100 ease-in-out hover:shadow-lg',
        {
          'bg-primary text-black': theme === 'yellow',
          'bg-white text-primary': theme === 'white',
          'px-5 py-2 text-sm': size === 'sm',
          'text-md px-7 py-3': size === 'md',
          'px-8 py-3 text-xl': size === 'lg'
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
