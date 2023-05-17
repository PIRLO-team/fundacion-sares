// Styles
import s from './Category.module.scss';

export const Category = ({ category_name }: { category_name: string }) => {
  return (
    <div className={s.category}>
      <p className={s.category__name}>{category_name}</p>
    </div>
  );
};
