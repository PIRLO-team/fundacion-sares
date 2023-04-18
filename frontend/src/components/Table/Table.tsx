// Local Component for Activities info
import InfoCard from './components/infoCard/InfoCard';

// Styles
import s from './Table.module.scss';

// Types
import { TUser } from '@/utils/types/';

type TTable = {
  headers: string[];
  data: TUser[];
};

export const Table = ({ headers, data }: TTable) => {
  return (
    <table className={s.table}>
      {data.length > 0 && (
        <thead className={s.table__header}>
          <tr>
            {headers.map((header) => (
              <th key={header} className={s.table__header__item}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={4} className={s.table__empty}>
              No hay usuarios para mostar
            </td>
          </tr>
        ) : (
          data.map((data, index) => <InfoCard data={data} key={index} />)
        )}
      </tbody>
    </table>
  );
};
