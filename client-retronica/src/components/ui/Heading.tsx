import cn from 'clsx';
import { title } from 'process';
import { FC, PropsWithChildren } from 'react';

interface IHeading {
  className?: string;
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
  return <h1 className={cn('text-3xl font-bold', className)}>{children}</h1>;
};

export default Heading;
