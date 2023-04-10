// Local Component for Activities info
import InfoCard from './components/infoCard/InfoCard';

// Styles
import s from './Table.module.scss';

// Types
type TTable = {
  headers: string[];
  data: any[];
};

export const Table = ({ headers, data }: TTable) => {
  return (
    <table className={s.table}>
      {/* <colgroup>
        <col span={1} style={{ width: '30%' }} />
        <col span={1} style={{ width: '20%' }} />
        <col span={1} style={{ width: '10%' }} />
        <col span={1} style={{ width: '10%' }} />
        <col span={1} style={{ width: '15%' }} />
        <col span={1} style={{ width: '5%' }} />
      </colgroup> */}

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
            <td colSpan={6} className={s.table__empty}>
              No hay Usuarios
            </td>
          </tr>
        ) : (
          data.map((data, index) => <InfoCard data={data} key={index} />)
        )}
      </tbody>
    </table>
  );
};
