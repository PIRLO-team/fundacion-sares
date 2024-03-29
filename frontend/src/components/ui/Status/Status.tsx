// Styles
import s from './Status.module.scss';

export const Status = ({
  status,
  className,
}: {
  status: boolean;
  className?: string;
}) => {
  return (
    <div className={`${status ? s.done : s.inProgress} ${className} `}>
      {status ? 'Activo' : 'Inactivo'}
    </div>
  );
};
