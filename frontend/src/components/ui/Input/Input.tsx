// React
import { InputHTMLAttributes, PropsWithChildren } from 'react';

// Next

// Styles
import s from './Input.module.scss';

type TInput = InputHTMLAttributes<HTMLInputElement>;

interface Props extends TInput {
  inputType?: 'primary' | 'secondary';
  title?: string;
  htmlfor?: string;
}

export const Input = ({
  inputType,
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

      <input
        {...props}
        className={`${
          inputType === 'secondary' ? s.input__secondary : s.input__primary
        } ${className}`}
      ></input>
    </>
  );
};
