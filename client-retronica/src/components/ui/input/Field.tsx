import cn from 'clsx';
import { forwardRef } from 'react';

import { IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      label,
      placeholder,
      Icon,
      error,
      className,
      type = 'text',
      style,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={cn('mb-4', className)} style={style}>
        <label>
          <span className="mb-1 block">
            {Icon && <Icon className="mr-3" />}
            {label}
          </span>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
            className={cn(
              'w-full rounded-md border border-solid border-bg_yellow px-4 py-2 outline-none transition-all placeholder:font-light focus:border-primary',
              { 'border-red': !!error }
            )}
          />
        </label>
        {error && <div className="mt-3 text-xs text-red">{error}</div>}
      </div>
    );
  }
);

Field.displayName = 'Field';

export default Field;
