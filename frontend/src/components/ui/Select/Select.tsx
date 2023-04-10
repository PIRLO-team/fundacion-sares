// React
import { InputHTMLAttributes, PropsWithChildren } from 'react';

// Next

// Styles
import s from './Select.module.scss';

type TInput = InputHTMLAttributes<HTMLSelectElement>;

interface Props extends TInput {
  SelectType?: 'primary' | 'secondary';
  title?: string;
  htmlfor?: string;
  options?: string[];
}

export const Select = ({
  SelectType,
  children,
  className,
  title,
  htmlfor,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <>
      {title && <p className={s.labelTitle}>{title}</p>}
      {htmlfor && <p className={s.labelTitle}>{htmlfor}</p>}

      <select
        {...props}
        className={`${
          SelectType === 'secondary' ? s.input__secondary : s.input__primary
        } ${className}`}
      >
        {children}
      </select>
    </>
  );
};
