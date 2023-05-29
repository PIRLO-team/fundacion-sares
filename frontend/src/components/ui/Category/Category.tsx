// Styles
import Image from 'next/image';
import s from './Category.module.scss';

export const Category = ({
  category_name,
  isCreated,
}: {
  category_name: string;
  isCreated?: boolean;
}) => {
  return (
    <div className={s.category}>
      <p className={s.category__name}>{category_name}</p>

      {isCreated && (
        <Image
          src="/icons/Actions/close1.svg"
          alt="Public"
          width={15}
          height={15}
          className={s.ActivityTags__currentTags__tag__icon}
        />
      )}
    </div>
  );
};
