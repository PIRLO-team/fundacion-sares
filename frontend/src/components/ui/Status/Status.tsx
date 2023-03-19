// Styles
import s from './Status.module.scss';

export const Status = ({
  done,
  className,
}: {
  done: boolean | undefined;
  className?: string;
}) => {
  return (
    <div className={`${done ? s.done : s.inProgress} ${className} `}>
      {done ? 'Finalizada' : 'En curso'}
    </div>
  );
};
